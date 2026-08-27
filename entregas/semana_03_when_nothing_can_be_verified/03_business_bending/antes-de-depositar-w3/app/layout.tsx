import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANTES · Revisa antes de transferir",
  description:
    "Demostración de una verificación previa al depósito para promociones de inversión sospechosas.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ANTES · Revisa antes de transferir",
    description: "Conecta empresa, promotor, oferta y cuenta antes de depositar.",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/mockups/antes-de-depositar-flow-v2.png", width: 1716, height: 917, alt: "Flujo de ANTES de depositar" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
