import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://greenavto.onrender.com"),
  title: "Аренда спецтехники в Санкт-Петербурге и ЛО | ГРИНАВТО",
  description:
    "Аренда автовышек, автокранов, экскаваторов и погрузчиков в Санкт-Петербурге и Ленинградской области. Принимаем заявки 24/7.",
  icons: {
    icon: "/brand-clover.webp",
    shortcut: "/brand-clover.webp",
  },
  openGraph: {
    title: "ГРИНАВТО — аренда спецтехники в Санкт-Петербурге и ЛО",
    description:
      "Своевременная подача техники ведущих марок. Автовышки, автокраны, экскаваторы и погрузчики.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-green.png",
        width: 1680,
        height: 945,
        alt: "ГРИНАВТО — аренда спецтехники в Санкт-Петербурге и Ленинградской области",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ГРИНАВТО — аренда спецтехники",
    description: "Своевременная подача · Техника ведущих марок · СПб и ЛО",
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
