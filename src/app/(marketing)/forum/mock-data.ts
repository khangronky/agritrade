import { Apple, Fish, Sprout, Wheat } from 'lucide-react';
import type {
  ForumFeaturedCard,
  ForumOverviewItem,
  ForumPriceInsight,
  ForumRfq,
} from './types';

export const forumFeaturedCard: ForumFeaturedCard = {
  title: 'Connect with verified farmers and buyers across ASEAN',
  description:
    'Introduce your supply profile and receive qualified sourcing inquiries faster.',
  pavilionLabel: 'Coverage',
  pavilionValue: 'Vietnam and ASEAN Network',
  imageSrc: '/farm.jpg',
  imageAlt: 'Fresh farm produce displayed on a wooden table',
};

export const forumPriceInsight: ForumPriceInsight = {
  commodity: 'ST25 Rice @ Soc Trang',
  origin: 'Vietnam / Mekong Delta',
  yoyChangeRate: 12,
  latestWholesalePrice: 0.68,
  previousWholesalePrice: 0.61,
  currency: 'USD',
  unit: 'kg',
  sparklinePoints: [4.1, 4.2, 4.5, 4.7, 4.9, 5.1, 5.3, 5.2, 5.5, 5.8, 6.0],
};

export const forumOverviewItems: ForumOverviewItem[] = [
  { name: 'ST25 Rice', icon: Wheat },
  { name: 'Cat Mango', icon: Apple },
  { name: 'Mustard Greens', icon: Sprout },
  { name: 'Pangasius', icon: Fish },
];

export const forumRfq: ForumRfq = {
  title: 'Buyer RFQs',
  description:
    'Publish your quantity, quality, and delivery requirements to reach matching suppliers.',
  actionLabel: 'Browse Buyer RFQs',
};
