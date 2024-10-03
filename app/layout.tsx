import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientLayout from "./ClientLayout"; 
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ByeBye Dengue",
  description: "A maior wiki de arboviroses do meu bairro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
