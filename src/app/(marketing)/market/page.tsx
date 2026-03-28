import type { Metadata } from 'next';
import MarketClient from './client';

export const metadata: Metadata = {
  title: 'Market',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTrade transparent agriculture marketplace.',
};

export default function MarketPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden pt-16">
      <MarketClient />
    </div>
  );
}
