import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "병원 진료 관리 시스템",
  description: "환자, 의사, 진료기록 관리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-blue-700 text-white px-6 py-3 flex items-center gap-8 shadow">
          <Link href="/" className="font-bold text-lg">병원관리</Link>
          <Link href="/patients" className="hover:text-blue-200 transition-colors text-sm">환자</Link>
          <Link href="/doctors" className="hover:text-blue-200 transition-colors text-sm">의사</Link>
          <Link href="/medical-records" className="hover:text-blue-200 transition-colors text-sm">진료기록</Link>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
