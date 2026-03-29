import type { Metadata } from 'next';
import MarketplaceClient from './client';

export const metadata: Metadata = {
  title: 'Marketplace',
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
