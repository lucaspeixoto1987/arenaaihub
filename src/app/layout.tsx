import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VENDE-C AI HUB · ARENA",
  description:
    "Preparador de reunião, análise de call, simulador de objeções e treino de vendas, com a C-CÍLIA sempre do lado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
