import {
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Ellipsis,
  ImageIcon,
  PenSquare,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ForumPost } from './types';

type CenterFeedProps = {
  posts: ForumPost[];
};

export function CenterFeed({ posts }: CenterFeedProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-xs text-lime-700">
            Community feed <CircleHelp className="size-3" />
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-xs"
          >
            Personalize <ChevronRight className="size-3" />
          </Button>
        </div>

        <div className="relative mt-3">
          <PenSquare className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Create a post"
            placeholder="Create a post"
            className="h-10 border-lime-200 bg-lime-50 pl-9 text-sm"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 divide-x divide-lime-200 rounded-md border border-lime-200 bg-lime-50">
          <Button
            type="button"
            variant="ghost"
            className="h-9 rounded-none text-muted-foreground text-xs"
          >
            <ImageIcon className="size-3.5" />
            Photo
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-9 rounded-none text-muted-foreground text-xs"
          >
            <Video className="size-3.5" />
            Video
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
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
    <article className="rounded-xl border border-lime-200 bg-white shadow-sm">
      <div className="border-lime-200 border-b px-3 py-2 text-xs text-muted-foreground">
        Update | {post.companyName} profile verified on Mar 24, 2026
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full border border-lime-200 bg-lime-50 font-semibold text-[11px] text-lime-700">
              {initials}
            </div>
            <div>
              <p className="flex items-center gap-1 font-semibold text-sm text-lime-950 leading-none">
                {post.companyName}
                {post.isVerified ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : null}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {post.author} - {post.postedAt}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Post menu"
            className="text-muted-foreground hover:text-foreground"
          >
            <Ellipsis className="size-4" />
          </button>
        </div>

        <h2 className="mt-3 font-medium text-foreground text-sm leading-relaxed">
          {post.headline}
        </h2>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          {post.body}
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {post.media.map((item) => (
            <figure
              key={item.caption}
              className={post.media.length === 1 ? 'sm:col-span-2' : ''}
            >
              <div className="overflow-hidden rounded border border-lime-200">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={680}
                  height={420}
                  className="h-52 w-full object-cover"
                />
              </div>
              <figcaption className="mt-1 text-muted-foreground text-xs">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}
