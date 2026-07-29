"""Import the original homepage media from an extracted HTTrack mirror.

Usage:
  python scripts/import-home-archive.py <mirror-root>

<mirror-root> is the directory that contains arenda-vyshki.pro and the
downloaded Tilda CDN folders.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

from bs4 import BeautifulSoup


IMAGE_RE = re.compile(r"\.(?:jpe?g|png|webp|gif|svg)(?:$|[?#])", re.I)
STYLE_URL_RE = re.compile(r"url\([\"']?([^\"')]+)", re.I)


def resolve_reference(mirror_root: Path, page: Path, raw: str) -> Path | None:
    raw = unquote(raw.split("?", 1)[0].split("#", 1)[0])
    if raw.startswith(("http://", "https://")):
        parsed = urlparse(raw)
        candidate = mirror_root / parsed.netloc / parsed.path.lstrip("/")
    else:
        candidate = (page.parent / raw).resolve()
    return candidate if candidate.is_file() else None


def logical_key(mirror_root: Path, path: Path) -> str:
    parts = list(path.relative_to(mirror_root).parts)
    tilda_index = next(
        (index for index, part in enumerate(parts) if part.startswith("tild")),
        None,
    )
    if tilda_index is None:
        return "/".join(parts)
    return f"{parts[tilda_index]}/{parts[-1]}"


def inferred_alt(path: Path) -> str:
    value = re.sub(r"[-_]+", " ", path.stem).strip()
    return value.capitalize() if value and value not in {"image", "photo", "noroot"} else "Материал исходного сайта"


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Pass the extracted HTTrack mirror root")

    project_root = Path(__file__).resolve().parents[1]
    mirror_root = Path(sys.argv[1]).resolve()
    homepage = mirror_root / "arenda-vyshki.pro" / "index.html"
    output_dir = project_root / "public" / "archive-media"
    output_json = project_root / "app" / "data" / "home-archive-media.json"

    soup = BeautifulSoup(homepage.read_text(encoding="utf-8"), "html.parser")
    groups: dict[str, dict] = {}
    order = 0

    for tag in soup.find_all(True):
        if tag.name in {"link", "script", "style"}:
            continue

        references: list[str] = []
        for attribute in ("data-original", "data-src", "src", "data-bg", "poster"):
            value = tag.get(attribute)
            if isinstance(value, str) and IMAGE_RE.search(value):
                references.append(value)
        style = tag.get("style")
        if isinstance(style, str):
            references.extend(STYLE_URL_RE.findall(style))

        alt = " ".join((tag.get("alt") or "").split())
        for raw in references:
            if not IMAGE_RE.search(raw):
                continue
            resolved = resolve_reference(mirror_root, homepage, raw)
            if resolved is None:
                continue
            key = logical_key(mirror_root, resolved)
            candidate = {
                "path": resolved,
                "size": resolved.stat().st_size,
                "alt": alt,
                "order": order,
            }
            order += 1
            current = groups.get(key)
            if current is None or candidate["size"] > current["size"]:
                if current and not candidate["alt"]:
                    candidate["alt"] = current["alt"]
                candidate["order"] = current["order"] if current else candidate["order"]
                groups[key] = candidate
            elif current and not current["alt"] and candidate["alt"]:
                current["alt"] = candidate["alt"]

    output_dir.mkdir(parents=True, exist_ok=True)
    imported: list[dict[str, str]] = []
    copied_hashes: set[str] = set()

    for item in sorted(groups.values(), key=lambda value: value["order"]):
        source = item["path"]
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        if digest in copied_hashes:
            continue
        copied_hashes.add(digest)
        extension = source.suffix.lower()
        filename = f"{digest[:20]}{extension}"
        destination = output_dir / filename
        shutil.copy2(source, destination)
        imported.append(
            {
                "src": f"/archive-media/{filename}",
                "alt": item["alt"] or inferred_alt(source),
            }
        )

    output_json.write_text(
        json.dumps(
            {
                "source": "https://arenda-vyshki.pro/",
                "images": imported,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"Imported {len(imported)} unique homepage assets")


if __name__ == "__main__":
    main()
