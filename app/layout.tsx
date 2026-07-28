import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "arenda-vyshki.pro";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "Аренда автовышек в Санкт-Петербурге и ЛО | ГРИНАВТО",
    description:
      "Подбор и аренда автовышек с оператором в Санкт-Петербурге и Ленинградской области. Работаем 24/7.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "ГРИНАВТО — аренда автовышек в Санкт-Петербурге и ЛО",
      description:
        "Подберём автовышку под высоту, задачу и условия подъезда. Подача с оператором 24/7.",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1676,
          height: 941,
          alt: "ГРИНАВТО — аренда автовышек",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ГРИНАВТО — аренда автовышек",
      description: "Санкт-Петербург и Ленинградская область · 24/7",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
