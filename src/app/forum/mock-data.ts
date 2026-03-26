import { Apple, Fish, Sprout, Wheat } from 'lucide-react';
import type {
  ForumFeaturedCard,
  ForumOverviewItem,
  ForumPost,
  ForumPriceInsight,
  ForumRfq,
} from './types';

export const forumFeaturedCard: ForumFeaturedCard = {
  title: 'Explore the finest selection of authentic agricultural specialties',
  description:
    'Promote your products to verified buyers and sourcing teams across markets.',
  pavilionLabel: 'Pavilion',
  pavilionValue: 'Made in Vietnam',
  imageSrc: '/farm.jpg',
  imageAlt: 'Fresh farm produce displayed on a wooden table',
};

export const forumPriceInsight: ForumPriceInsight = {
  commodity: 'Eggplant @ Murcia',
  origin: 'Spain / Murcia',
  yoyChangeRate: -37,
  latestWholesalePrice: 1.25,
  previousWholesalePrice: 1.98,
  currency: 'EUR',
  unit: 'kg',
  sparklinePoints: [8, 7.5, 7.4, 6.8, 6.2, 5.8, 5.9, 6.1, 5.4, 4.8, 4.2],
};

export const forumPosts: ForumPost[] = [
  {
    companyName: 'Guangzhou Vol Sea Technology Co LTD',
    isVerified: true,
    author: 'Tom Ho',
    postedAt: '3h',
    headline:
      'Choosing between Monk Fruit, Allulose, Erythritol, Tagatose, and Stevia for your next product launch?',
    body: "We took the guesswork out of natural sweetener selection. Here's a quick comparison for food manufacturers sourcing stable quality and predictable supply.",
    media: [
      {
        src: '/about-us/slide-1.jpg',
        alt: 'White sugar-like powder in a glass bowl',
        caption: 'High purity allulose powder',
      },
      {
        src: '/about-us/slide-2.jpg',
        alt: 'Fine sweetener powder sample',
        caption: 'High-purity erythritol blend',
      },
    ],
  },
  {
    companyName: 'Mekong Agro Export',
    isVerified: true,
    author: 'Linh Tran',
    postedAt: '8h',
    headline:
      'Vietnam premium jasmine rice inventory update for April shipping window',
    body: 'Contract-ready volume is open for SEA and Middle East destinations. Request specs to receive moisture profile and packaging options.',
    media: [
      {
        src: '/about-us/slide-3.jpg',
        alt: 'Rice field and harvested grains',
        caption: 'Premium jasmine rice lot',
      },
    ],
  },
];

export const forumOverviewItems: ForumOverviewItem[] = [
  { name: 'Fresh Avocado', icon: Apple },
  { name: 'Maize (Corn)', icon: Wheat },
  { name: 'Wheat', icon: Sprout },
  { name: 'Rice', icon: Fish },
];

export const forumRfq: ForumRfq = {
  title: 'RFQs',
  description:
    'Inform suppliers about your requirements by creating an RFQ in minutes.',
  actionLabel: 'Browse RFQs',
};
