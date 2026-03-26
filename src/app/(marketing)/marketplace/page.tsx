import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplacePage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-green-200 via-green-100 to-green-50 text-slate-900 text-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,197,94,0.16),transparent_42%),radial-gradient(circle_at_70%_22%,rgba(16,185,129,0.12),transparent_38%),radial-gradient(circle_at_48%_70%,rgba(163,230,53,0.1),transparent_36%)]" />

      <MarketplaceClient />
    </div>
  );
}
