import type { LucideIcon } from 'lucide-react';

export type ForumFeaturedCard = {
  title: string;
  description: string;
  pavilionLabel: string;
  pavilionValue: string;
  imageSrc: string;
  imageAlt: string;
};

export type ForumPriceInsight = {
  commodity: string;
  origin: string;
  yoyChangeRate: number;
  latestWholesalePrice: number;
  previousWholesalePrice: number;
  currency: string;
  unit: string;
  sparklinePoints: number[];
};

export type ForumPostMedia = {
  src: string;
  alt: string;
  caption: string;
};

export type ForumPost = {
  id: string;
  companyName: string;
  isVerified: boolean;
  author: string;
  postedAt: string;
  headline: string;
  body: string;
  media: ForumPostMedia[];
};

export type CreateForumPostInput = {
  companyName: string;
  author: string;
  headline: string;
  body: string;
  media?: ForumPostMedia[];
  isVerified?: boolean;
  postedAt?: string;
};

export type ForumPostsResponse = {
  posts: ForumPost[];
};

export type ForumPostCreatedResponse = {
  message: string;
  post: ForumPost;
};

export type ForumOverviewItem = {
  name: string;
  icon: LucideIcon;
};

export type ForumRfq = {
  title: string;
  description: string;
  actionLabel: string;
};
