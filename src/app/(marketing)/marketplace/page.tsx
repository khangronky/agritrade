import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplacePage() {
  return (
    <div className="relative overflow-hidden bg-black text-zinc-100 text-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,0,0,0.76),transparent_42%),radial-gradient(circle_at_70%_22%,rgba(0,0,0,0.68),transparent_38%),radial-gradient(circle_at_48%_70%,rgba(0,0,0,0.6),transparent_36%)]" />

      <MarketplaceClient />
    </div>
  );
}
