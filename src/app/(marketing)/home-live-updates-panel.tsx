'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  createMockFarmerFeedItem,
  farmerFeedMaxItems,
  farmerFeedRefreshMs,
  initialFarmerFeed,
} from './farmer-yield-feed-data';

type HomeLiveUpdatesPanelProps = {
  compact?: boolean;
  theme?: 'dark' | 'light';
};

export function HomeLiveUpdatesPanel({
  compact = false,
  theme = 'dark',
}: HomeLiveUpdatesPanelProps) {
  const [feed, setFeed] = useState(initialFarmerFeed);
  const isLight = theme === 'light';
  const visibleFeed = compact ? feed.slice(0, isLight ? 3 : 4) : feed;

  useEffect(() => {
    let templateIndex = 0;

    const intervalId = setInterval(() => {
      setFeed((previousFeed) => {
        const nextItem = createMockFarmerFeedItem(templateIndex);
        templateIndex += 1;

        return [nextItem, ...previousFeed].slice(0, farmerFeedMaxItems);
      });
    }, farmerFeedRefreshMs);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        isLight
          ? 'rounded-none border border-lime-200 bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg'
          : 'rounded-[28px] border border-emerald-500/20 bg-zinc-950/88 shadow-[0_18px_42px_rgba(0,0,0,0.55)] backdrop-blur-xl',
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            'font-semibold',
            isLight ? 'text-lime-950' : 'text-zinc-100',
            compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          )}
        >
          News
        </h3>
        <Link
          href="/market"
          className={cn(
            isLight
              ? 'text-muted-foreground transition-colors hover:text-primary'
              : 'text-zinc-400 transition-colors hover:text-emerald-300',
            compact ? 'text-[11px]' : 'text-sm'
          )}
        >
          {compact ? 'View All News' : 'View all'}
        </Link>
      </div>

      <p
        className={cn(
          isLight ? 'mt-1 text-muted-foreground' : 'mt-1 text-zinc-400',
          compact ? 'text-[11px]' : 'text-sm'
        )}
      >
        Auto updates every 5s
      </p>

      {compact ? (
        <div
          className={cn(
            'mt-3',
            isLight ? 'grid gap-2.5 sm:grid-cols-3' : 'space-y-3'
          )}
        >
          {visibleFeed.map((item) => (
            <div
              key={item.id}
              className={cn(
                isLight
                  ? 'rounded-none border border-lime-200 bg-white px-3 py-2.5 text-lime-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:bg-white hover:shadow-sm'
                  : 'text-base text-zinc-300 leading-snug sm:text-lg'
              )}
            >
              <p
                className={cn(
                  isLight
                    ? 'font-medium text-xs leading-relaxed sm:text-sm'
                    : ''
                )}
              >
                {item.farmer} {item.update}
              </p>
              {isLight ? (
                <p className="mt-2 font-semibold text-[10px] text-lime-700 uppercase tracking-[0.08em]">
                  {item.time}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {visibleFeed.map((item) => (
            <div
              key={item.id}
              className={cn(
                isLight
                  ? 'rounded-xl border border-lime-200 bg-white px-4 py-3'
                  : 'rounded-xl border border-emerald-500/20 bg-zinc-950/78 px-4 py-3'
              )}
            >
              <p
                className={cn(
                  'font-medium text-sm leading-relaxed sm:text-base',
                  isLight ? 'text-lime-950' : 'text-zinc-100'
                )}
              >
                {item.farmer} {item.update} ({item.country})
              </p>
              <p
                className={cn(
                  'mt-1 text-xs sm:text-sm',
                  isLight ? 'text-muted-foreground' : 'text-zinc-300/85'
                )}
              >
                {item.detail}
              </p>
              <p
                className={cn(
                  'mt-2 font-medium text-xs',
                  isLight ? 'text-lime-700' : 'text-emerald-200/90'
                )}
              >
                {item.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
