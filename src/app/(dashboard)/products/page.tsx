import type { Metadata } from 'next';
import ProductsClient from './client';

export const metadata: Metadata = {
  title: 'Products',
};

export default function ProductsPage() {
  return <ProductsClient />;
}
