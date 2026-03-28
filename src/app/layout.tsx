import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { FloatingChatbot } from '@/components/floating-chatbot';
import Providers from '@/providers/providers';

const font = Montserrat({ subsets: ['latin', 'vietnamese'], display: 'block' });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AgriTrade',
    template: '%s | AgriTrade',
  },
  applicationName: 'AgriTrade',
  description:
    'AgriTrade helps farmers compare offers, track live market demand, and trade produce with more transparency.',
  keywords: [
    'AgriTrade',
    'agriculture marketplace',
    'farm trading platform',
    'crop marketplace',
    'farmer pricing',
    'produce buyers',
  ],
  openGraph: {
    title: 'AgriTrade',
    description:
      'A transparent agriculture marketplace for farmers, buyers, and traders to discover offers and act on live market signals.',
    type: 'website',
    images: [
      {
        url: '/farm.jpg',
        width: 1200,
        height: 630,
        alt: 'Agricultural field with machinery at sunrise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgriTrade',
    description:
      'A transparent agriculture marketplace for farmers, buyers, and traders to discover offers and act on live market signals.',
    images: ['/farm.jpg'],
  },
  icons: {
    icon: '/branding.png',
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
        <FloatingChatbot />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
