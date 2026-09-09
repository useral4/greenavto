from __future__ import annotations

import json
import os
import smtplib
import threading
import time
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


HOST = "127.0.0.1"
PORT = int(os.environ.get("MAILER_PORT", "3010"))
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ["SMTP_USER"]
SMTP_PASSWORD = os.environ["SMTP_PASSWORD"]
RECIPIENTS = tuple(
    address.strip()
    for address in os.environ["MAIL_RECIPIENTS"].split(",")
    if address.strip()
)
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "https://greenavto.212-193-26-163.nip.io,https://greenavto.onrender.com",
    ).split(",")
    if origin.strip()
}
MAX_BODY_BYTES = 32 * 1024
RATE_WINDOW_SECONDS = 10 * 60
RATE_LIMIT = 5

_requests_by_ip: dict[str, list[float]] = {}
_rate_lock = threading.Lock()


def limited(client_ip: str) -> bool:
    now = time.monotonic()
    cutoff = now - RATE_WINDOW_SECONDS
    with _rate_lock:
        recent = [stamp for stamp in _requests_by_ip.get(client_ip, []) if stamp >= cutoff]
        if len(recent) >= RATE_LIMIT:
            _requests_by_ip[client_ip] = recent
            return True
        recent.append(now)
        _requests_by_ip[client_ip] = recent
    return False


def clean_text(value: object, limit: int) -> str:
    text = str(value or "").strip()
    return text[:limit]


class RequestHandler(BaseHTTPRequestHandler):
    server_version = "GreenavtoRequestService"

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}", flush=True)

    def allowed_origin(self) -> str | None:
        origin = self.headers.get("Origin")
        if origin and origin in ALLOWED_ORIGINS:
            return origin
        return None

    def send_json(self, status: int, payload: dict[str, object]) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        origin = self.allowed_origin()
        if origin:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.end_headers()
        self.wfile.write(encoded)

    def do_OPTIONS(self) -> None:
        origin = self.allowed_origin()
        if not origin:
            self.send_json(403, {"ok": False})
            return
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "86400")
        self.send_header("Vary", "Origin")
        self.end_headers()

    def do_GET(self) -> None:
        if urlsplit(self.path).path == "/healthz":
            self.send_json(200, {"ok": True})
            return
        self.send_json(404, {"ok": False})

    def do_POST(self) -> None:
        if urlsplit(self.path).path not in {"/", "/api/request"}:
            self.send_json(404, {"ok": False})
            return

        request_origin = self.headers.get("Origin")
        if request_origin and not self.allowed_origin():
            self.send_json(403, {"ok": False})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"ok": False})
            return
        if content_length <= 0 or content_length > MAX_BODY_BYTES:
            self.send_json(413, {"ok": False})
            return

        try:
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_json(400, {"ok": False})
            return
        if not isinstance(payload, dict):
            self.send_json(400, {"ok": False})
            return

        if clean_text(payload.get("company"), 120):
            self.send_json(200, {"ok": True})
            return

        forwarded_for = self.headers.get("X-Forwarded-For", "")
        client_ip = forwarded_for.split(",", 1)[0].strip() or self.client_address[0]
        if limited(client_ip):
            self.send_json(429, {"ok": False})
            return

        phone = clean_text(payload.get("phone"), 80)
        address = clean_text(payload.get("address"), 300) or "Не указан"
        task = clean_text(payload.get("task"), 3000) or "Не указано"
        page = clean_text(payload.get("page"), 500) or "Не указана"
        if len(phone) < 5:
            self.send_json(400, {"ok": False})
            return

        message = EmailMessage()
        message["Subject"] = "Новая заявка с сайта ГРИНАВТО"
        message["From"] = f"ГРИНАВТО <{SMTP_USER}>"
        message["To"] = ", ".join(RECIPIENTS)
        message.set_content(
            "Новая заявка с сайта ГРИНАВТО\n\n"
            f"Телефон: {phone}\n"
            f"Адрес или район: {address}\n"
            f"Задача: {task}\n"
            f"Страница: {page}\n"
        )

        try:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
                smtp.login(SMTP_USER, SMTP_PASSWORD)
                refused = smtp.send_message(
                    message,
                    from_addr=SMTP_USER,
                    to_addrs=list(RECIPIENTS),
                )
            if refused:
                raise RuntimeError("One or more recipients were refused")
        except Exception as exc:
            print(f"SMTP delivery failed: {type(exc).__name__}", flush=True)
            self.send_json(502, {"ok": False})
            return

        print(f"SMTP accepted message for {len(RECIPIENTS)} recipients", flush=True)
        self.send_json(200, {"ok": True})


if __name__ == "__main__":
    if not RECIPIENTS:
        raise RuntimeError("MAIL_RECIPIENTS is empty")
    server = ThreadingHTTPServer((HOST, PORT), RequestHandler)
    print(f"Greenavto request service listening on {HOST}:{PORT}", flush=True)
    server.serve_forever()
