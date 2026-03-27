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
    <div className="min-h-[calc(100vh-4rem)] bg-lime-50 pt-16 text-lime-950">
      <div className="w-full">
        <div className="overflow-hidden border border-lime-200 bg-lime-50">
          <section className="px-4 py-7 sm:px-6 lg:px-8">
            <p className="font-semibold text-primary text-[11px] uppercase tracking-[0.22em]">
              * Community Forum
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-[272px_minmax(0,1fr)] lg:grid-cols-[272px_minmax(0,1fr)_280px]">
              <LeftRail />
              <CenterFeed posts={forumPosts} />
              <div className="md:col-span-2 lg:col-span-1">
                <RightRail />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
