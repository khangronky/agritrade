import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplacePage() {
  return (
    <div className="relative overflow-hidden bg-[#f5f8ef] text-[#1d3706]">
      <MarketplaceClient />
    </div>
  );
}
