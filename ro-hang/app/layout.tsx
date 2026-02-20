import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockProvider } from "./components/MockProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "로행 (ro-hang) | 마음을 잇는 편지",
  description: "익명으로 주고받는 따뜻한 편지 이야기",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F3]`}
      >
        <div className="mobile-container overflow-hidden">
          <MockProvider>
            {children}
          </MockProvider>
        </div>
      </body>
    </html>
  );
}
