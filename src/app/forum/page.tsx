import type { Metadata } from 'next';
import Image from 'next/image';
import {
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Ellipsis,
} from 'lucide-react';
import {
  forumFeaturedCard,
  forumOverviewItems,
  forumPriceInsight,
  forumRfq,
} from './mock-data';
import { listForumPosts } from '@/lib/forum/posts-store';
import { ForumPostComposer } from './post-composer';
import type { ForumPost } from './types';

export const metadata: Metadata = {
  title: 'Forum',
  description:
    'Join AgriTrade community updates to track sourcing opportunities, demand signals, and verified market activity.',
};

export const dynamic = 'force-dynamic';

export default function ForumPage() {
  const forumPosts = listForumPosts();
  return (
    <div className="relative isolate overflow-hidden bg-black pt-16 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,0,0,0.76),transparent_42%),radial-gradient(circle_at_70%_22%,rgba(0,0,0,0.68),transparent_38%),radial-gradient(circle_at_48%_70%,rgba(0,0,0,0.6),transparent_36%)]" />

      <div className="relative z-10">
        <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-[272px_minmax(0,1fr)] lg:grid-cols-[272px_minmax(0,1fr)_280px]">
            <LeftRail />
            <CenterFeed posts={forumPosts} />
            <div className="md:col-span-2 lg:col-span-1">
              <RightRail />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function LeftRail() {
  const isPositiveChange = forumPriceInsight.yoyChangeRate >= 0;

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-emerald-200 text-xs">Featured network</p>

        <article className="mt-2 overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-900/80">
          <Image
            src={forumFeaturedCard.imageSrc}
            alt={forumFeaturedCard.imageAlt}
            width={520}
            height={320}
            className="h-44 w-full object-cover"
          />
          <div className="space-y-2 p-3">
            <p className="font-medium text-sm text-zinc-100 leading-snug">
              {forumFeaturedCard.title}
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {forumFeaturedCard.description}
            </p>
            <div className="border-emerald-500/20 border-t pt-2">
              <p className="text-xs text-zinc-400">{forumFeaturedCard.pavilionLabel}</p>
              <p className="font-medium text-emerald-200 text-sm">{forumFeaturedCard.pavilionValue}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-emerald-200 text-xs">Recommended price snapshot</p>

        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-zinc-900/70 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm text-zinc-100">{forumPriceInsight.commodity}</p>
              <p className="text-xs text-zinc-400">{forumPriceInsight.origin}</p>
            </div>
            <span
              className={`rounded px-2 py-0.5 font-semibold text-xs ${
                isPositiveChange
                  ? 'bg-emerald-500/18 text-emerald-200'
                  : 'bg-red-500/18 text-red-300'
              }`}
            >
              {isPositiveChange ? '+' : ''}
              {forumPriceInsight.yoyChangeRate}%
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[11px] text-zinc-400">YoY Change Rate</p>
            <svg
              viewBox="0 0 240 56"
              className="mt-1 h-14 w-full"
              role="img"
              aria-label="YoY change rate sparkline"
            >
              <title>YoY change rate sparkline</title>
              <path
                d={buildSparklinePath(forumPriceInsight.sparklinePoints, 240, 56, 5)}
                fill="none"
                stroke="#93c83f"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-zinc-400">Latest Wholesale Price</p>
              <p className="font-semibold text-lg text-zinc-100">
                {forumPriceInsight.latestWholesalePrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-zinc-400">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">Previous Wholesale Price</p>
              <p className="font-semibold text-lg text-zinc-100">
                {forumPriceInsight.previousWholesalePrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-zinc-400">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-emerald-500/20 bg-zinc-900/85 px-3 py-2 font-medium text-xs text-zinc-200 hover:border-emerald-400/40 hover:text-emerald-200"
        >
          View all prices
        </button>
      </section>
    </aside>
  );
}

function CenterFeed({ posts }: { posts: ForumPost[] }) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-xs text-zinc-200">
            Community feed <CircleHelp className="size-3" />
          </p>
          <button type="button" className="flex items-center gap-1 text-xs text-zinc-400 hover:text-emerald-200">
            Customize <ChevronRight className="size-3" />
          </button>
        </div>

        <ForumPostComposer />
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function ForumPostCard({ post }: { post: ForumPost }) {
  const initials = post.companyName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <article className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 shadow-sm">
      <div className="border-emerald-500/20 border-b px-3 py-2 text-xs text-zinc-400">
        Update | {post.companyName} profile verified on Mar 24, 2026
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full border border-emerald-500/25 bg-zinc-900 font-semibold text-[11px] text-emerald-200">
              {initials}
            </div>
            <div>
              <p className="flex items-center gap-1 font-semibold text-sm text-zinc-100 leading-none">
                {post.companyName}
                {post.isVerified ? <CheckCircle2 className="size-4 text-emerald-300" /> : null}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {post.author} - {post.postedAt}
              </p>
            </div>
          </div>
          <button type="button" aria-label="Post menu" className="text-zinc-500 hover:text-zinc-300">
            <Ellipsis className="size-4" />
          </button>
        </div>

        <h2 className="mt-3 font-medium text-sm text-zinc-100 leading-relaxed">{post.headline}</h2>
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{post.body}</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {post.media.map((item) => (
            <figure key={item.caption} className={post.media.length === 1 ? 'sm:col-span-2' : ''}>
              <div className="overflow-hidden rounded-lg border border-emerald-500/20">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={680}
                  height={420}
                  className="h-52 w-full object-cover"
                />
              </div>
              <figcaption className="mt-1 text-xs text-zinc-400">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}

function RightRail() {
  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-sm text-zinc-100">Your workspace</p>
        <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
          Sign in to save preferred products, follow trusted suppliers, and receive updates relevant to your sourcing goals.
        </p>
        <button type="button" className="mt-2 font-semibold text-emerald-200 text-xs hover:text-emerald-100">
          Sign in to personalize
        </button>
      </section>

      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-sm text-zinc-100">Market Overviews</p>
        <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
          Track key products that matter to your farm, cooperative, or buying team.
        </p>

        <ul className="mt-3 space-y-2">
          {forumOverviewItems.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-transparent px-1 py-1 text-sm text-zinc-200 hover:border-emerald-500/20 hover:bg-zinc-900/75"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="size-4 text-emerald-300" />
                  {item.name}
                </span>
                <ChevronRight className="size-4 text-zinc-500" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-sm text-zinc-100">{forumRfq.title}</p>
        <p className="mt-2 text-xs text-zinc-300 leading-relaxed">{forumRfq.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <button type="button" className="font-semibold text-emerald-200 text-xs hover:text-emerald-100">
            {forumRfq.actionLabel}
          </button>
          <ClipboardList className="size-5 text-zinc-400" />
        </div>
      </section>
    </aside>
  );
}

function buildSparklinePath(
  points: number[],
  width: number,
  height: number,
  padding: number
) {
  if (points.length < 2) {
    return '';
  }

  const minPoint = Math.min(...points);
  const maxPoint = Math.max(...points);
  const xSpan = width - padding * 2;
  const ySpan = height - padding * 2;
  const range = maxPoint - minPoint || 1;

  return points
    .map((point, index) => {
      const x = padding + (index / (points.length - 1)) * xSpan;
      const normalizedY = (point - minPoint) / range;
      const y = height - padding - normalizedY * ySpan;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}





