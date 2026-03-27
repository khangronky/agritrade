import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplacePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f8ef] pt-16 text-[#1d3706]">
      <div className="w-full">
        <div className="overflow-hidden border border-[#d9e8c6] bg-[#f5f8ef]">
          <MarketplaceClient />
        </div>
      </div>
    </div>
  );
}
