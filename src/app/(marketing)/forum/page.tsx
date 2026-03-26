import type { Metadata } from 'next';
import { listForumPosts } from '@/lib/forum/posts-store';
import { CenterFeed } from './center-feed';
import { LeftRail } from './left-rail';
import { RightRail } from './right-rail';

export const metadata: Metadata = {
  title: 'Forum',
  description:
    'Join AgriTrade community updates to track sourcing opportunities, demand signals, and verified market activity.',
};

export default function ForumPage() {
  const forumPosts = listForumPosts();

  return (
    <div className="relative mt-8 overflow-hidden px-4 py-12">
      <div className="grid gap-4 md:grid-cols-[272px_minmax(0,1fr)] lg:grid-cols-[272px_minmax(0,1fr)_280px]">
        <LeftRail />
        <CenterFeed posts={forumPosts} />
        <div className="md:col-span-2 lg:col-span-1">
          <RightRail />
        </div>
      </div>
    </div>
  );
}
