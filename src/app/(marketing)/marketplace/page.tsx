import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplacePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-lime-50 pt-16 text-lime-950">
      <div className="w-full">
        <div className="overflow-hidden border border-lime-200 bg-lime-50">
          <MarketplaceClient />
        </div>
      </div>
    </div>
  );
}
