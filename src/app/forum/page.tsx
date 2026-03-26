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
    <div className="min-h-screen bg-[#edf1f6] text-[#111827]">
      <ForumTopHeader />
      <ForumSubHeader />
      <ForumInfoBanner />

      <main className="mx-auto max-w-[1320px] px-4 py-5">
        <div className="grid gap-4 md:grid-cols-[272px_minmax(0,1fr)] lg:grid-cols-[272px_minmax(0,1fr)_280px]">
          <LeftRail />
          <CenterFeed />
          <div className="md:col-span-2 lg:col-span-1">
            <RightRail />
          </div>
        </div>
      </main>

      <ForumCookieBar />
    </div>
  );
}

function ForumTopHeader() {
  return (
    <header className="border-[#262d3a] border-b bg-[#131822] text-[#f3f4f6]">
      <div className="mx-auto flex h-11 max-w-[1320px] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-sm tracking-[0.08em]">
            AGRITRADE
          </Link>

          <nav className="hidden items-center gap-6 text-[#d1d5db] text-[11px] md:flex">
            <Link
              href="/marketplace"
              className="transition-colors hover:text-white"
            >
              Market Curation
            </Link>
            <Link href="/forum" className="font-semibold text-white">
              Sourcing Hub
            </Link>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-white"
            >
              Solutions <ChevronDown className="size-3" />
            </button>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-white"
            >
              Resources <ChevronDown className="size-3" />
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            type="button"
            className="rounded border border-[#3d4555] px-2.5 py-1 text-[#d7dde8] transition-colors hover:border-[#9ca3af] hover:text-white"
          >
            Get started
          </button>
          <button
            type="button"
            className="rounded bg-white px-2.5 py-1 font-medium text-[#111827] transition-colors hover:bg-[#e5e7eb]"
          >
            Get a demo
          </button>
        </div>
      </div>
    </header>
  );
}

function ForumSubHeader() {
  return (
    <div className="border-[#d9dee8] border-b bg-[#f6f8fb]">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between px-4 text-[#4b5563] text-[12px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 font-medium text-[#1f2937]"
          >
            Sourcing Hub <ChevronDown className="size-3" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 hover:text-[#111827]"
          >
            Data &amp; Analytics <ChevronDown className="size-3" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="text-[#6b7280] hover:text-[#1f2937]"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            className="font-medium text-[#1f2937] hover:text-black"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

function ForumInfoBanner() {
  return (
    <div className="border-[#ced6e4] border-b bg-[#e2ebf9]">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-3 px-4 text-[#2f405f] text-[12px]">
        <p className="truncate">
          Discover your future partners and strategically promote your company
          through AgriTrade Eye&apos;s intelligence-based supply chain network.
        </p>
        <button
          type="button"
          className="shrink-0 rounded bg-[#2f59d9] px-3 py-1 font-medium text-white transition-colors hover:bg-[#264ac2]"
        >
          Browse
        </button>
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
            <div className="border-[#e5e7eb] border-t pt-2">
              <p className="text-[#6b7280] text-xs">
                {forumFeaturedCard.pavilionLabel}
              </p>
              <p className="font-medium text-[#111827] text-sm">
                {forumFeaturedCard.pavilionValue}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded border border-[#d8dee8] bg-white p-3">
        <p className="font-medium text-[#6b7280] text-xs">
          Recommended price data
        </p>

        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-zinc-900/70 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-[#111827] text-sm">
                {forumPriceInsight.commodity}
              </p>
              <p className="text-[#6b7280] text-xs">
                {forumPriceInsight.origin}
              </p>
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
                d={buildSparklinePath(
                  forumPriceInsight.sparklinePoints,
                  240,
                  56,
                  5
                )}
                fill="none"
                stroke="#93c83f"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[#6b7280] text-[11px]">
                Latest Wholesale Price
              </p>
              <p className="font-semibold text-[#111827] text-lg">
                {forumPriceInsight.latestWholesalePrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-zinc-400">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
            <div>
              <p className="text-[#6b7280] text-[11px]">
                Previous Wholesale Price
              </p>
              <p className="font-semibold text-[#111827] text-lg">
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
          <button
            type="button"
            className="flex items-center gap-1 text-[#6b7280] text-xs hover:text-[#374151]"
          >
            Personalize <ChevronRight className="size-3" />
          </button>
        </div>

        <button
          type="button"
          className="mt-3 flex w-full items-center gap-2 rounded border border-[#d7deea] bg-[#f8fafd] px-3 py-2 text-[#6b7280] text-sm"
        >
          <PenSquare className="size-4" />
          Create a post
        </button>

        <div className="mt-3 grid grid-cols-2 divide-x divide-[#e3e8f1] rounded border border-[#e3e8f1] bg-[#fbfcfe]">
          <button
            type="button"
            className="flex items-center justify-center gap-1 py-2 text-[#4b5563] text-xs hover:bg-[#f1f5fb]"
          >
            <ImageIcon className="size-3.5" />
            Photo
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 py-2 text-[#4b5563] text-xs hover:bg-[#f1f5fb]"
          >
            <Video className="size-3.5" />
            Video
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {forumPosts.map((post) => (
          <ForumPostCard
            key={`${post.companyName}-${post.postedAt}`}
            post={post}
          />
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
                {post.isVerified ? (
                  <CheckCircle2 className="size-4 text-[#2563eb]" />
                ) : null}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {post.author} - {post.postedAt}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Post menu"
            className="text-[#9ca3af] hover:text-[#6b7280]"
          >
            <Ellipsis className="size-4" />
          </button>
        </div>

        <h2 className="mt-3 font-medium text-[#111827] text-sm leading-relaxed">
          {post.headline}
        </h2>
        <p className="mt-2 text-[#374151] text-sm leading-relaxed">
          {post.body}
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {post.media.map((item) => (
            <figure
              key={item.caption}
              className={post.media.length === 1 ? 'sm:col-span-2' : ''}
            >
              <div className="overflow-hidden rounded border border-[#e0e6ef]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={680}
                  height={420}
                  className="h-52 w-full object-cover"
                />
              </div>
              <figcaption className="mt-1 text-[#4b5563] text-xs">
                {item.caption}
              </figcaption>
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
      <section className="rounded border border-[#d8dee8] bg-white p-3">
        <p className="font-medium text-[#374151] text-sm">Me</p>
        <p className="mt-2 text-[#4b5563] text-xs leading-relaxed">
          Sign in or join AgriTrade to personalize your feed. Interested in what
          we offer? Click here to find out.
        </p>
        <button
          type="button"
          className="mt-2 font-semibold text-[#1d4ed8] text-xs hover:text-[#1e40af]"
        >
          Sign in
        </button>
      </section>

      <section className="rounded border border-[#d8dee8] bg-white p-3">
        <p className="font-medium text-[#374151] text-sm">Market Overviews</p>
        <p className="mt-2 text-[#4b5563] text-xs leading-relaxed">
          Discover market overviews with key data and insights on products you
          may be interested in.
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

      <section className="rounded border border-[#d8dee8] bg-white p-3">
        <p className="font-medium text-[#374151] text-sm">{forumRfq.title}</p>
        <p className="mt-2 text-[#4b5563] text-xs leading-relaxed">
          {forumRfq.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            className="font-semibold text-[#1d4ed8] text-xs hover:text-[#1e40af]"
          >
            {forumRfq.actionLabel}
          </button>
          <ClipboardList className="size-5 text-zinc-400" />
        </div>
      </section>
    </aside>
  );
}

function ForumCookieBar() {
  return (
    <div className="border-[#d8dee8] border-t bg-[#f6f8fb]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-3 text-[#4b5563] text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <p>
          By clicking "Accept Cookies," I agree to provide cookies for
          statistical and personalized preference purpose. To learn more about
          our cookies, please read our Privacy Policy.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded bg-[#111827] px-3 py-1.5 font-medium text-white transition-colors hover:bg-black"
          >
            Accept Cookies
          </button>
          <button
            type="button"
            className="rounded border border-[#c7cfdd] bg-white px-3 py-1.5 font-medium text-[#374151] transition-colors hover:bg-[#eef2f7]"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
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
