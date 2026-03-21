import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from '@/providers/providers';

const font = Montserrat({ subsets: ['latin', 'vietnamese'], display: 'block' });

export const metadata: Metadata = {
  title: 'AgriTrade',
  description: 'Water Management System for Textile Companies',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
