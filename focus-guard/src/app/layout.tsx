import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pixelFont = Press_Start_2P({
  weight: '400',
  variable: '--font-pixel',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Focus Guard: 1-Bit Edition',
  description: 'A hardcore 1-bit focus timer with AI monitoring',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${pixelFont.variable} font-pixel antialiased bg-black text-white selection:bg-white selection:text-black overflow-hidden h-screen w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
