import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://greenavto.onrender.com"),
  title: "Аренда автовышек в Санкт-Петербурге и ЛО | ГРИНАВТО",
  description:
    "Аренда автовышек высотой от 12 до 60 метров в Санкт-Петербурге и Ленинградской области. Техника с оператором, заявки 24/7.",
  icons: {
    icon: "/brand-clover.webp",
    shortcut: "/brand-clover.webp",
  },
  openGraph: {
    title: "ГРИНАВТО — аренда автовышек в Санкт-Петербурге и ЛО",
    description:
      "Своевременная подача автовышек высотой от 12 до 60 метров с оператором.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-green.png",
        width: 1680,
        height: 945,
        alt: "ГРИНАВТО — аренда автовышек в Санкт-Петербурге и Ленинградской области",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ГРИНАВТО — аренда автовышек",
    description: "Автовышки от 12 до 60 метров · СПб и ЛО",
    images: ["/og-green.png"],
  },
};

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
