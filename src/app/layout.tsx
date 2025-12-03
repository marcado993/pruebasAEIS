import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEIS Mainframe - Sistema de Casilleros",
  description: "Sistema de gestión de casilleros de la Asociación de Estudiantes de Ingeniería en Sistemas",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${firaCode.variable} ${inter.variable} antialiased bg-[var(--deep-navy)] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
