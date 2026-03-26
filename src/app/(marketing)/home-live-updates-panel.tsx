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
          ? 'rounded-[28px] border border-[#c8e5a0] bg-white shadow-[0_16px_34px_rgba(123,178,40,0.18)]'
          : 'rounded-[28px] border border-emerald-500/20 bg-zinc-950/88 shadow-[0_18px_42px_rgba(0,0,0,0.55)] backdrop-blur-xl',
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            'font-semibold',
            isLight ? 'text-[#4b760f]' : 'text-zinc-100',
            compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          )}
        >
          News
        </h3>
        <Link
          href="/marketplace"
          className={cn(
            isLight
              ? 'text-[#6e7f5a] transition-colors hover:text-[#4e820f]'
              : 'text-zinc-400 transition-colors hover:text-emerald-300',
            compact ? 'text-[11px]' : 'text-sm'
          )}
        >
          {compact ? 'View All News' : 'View all'}
        </Link>
      </div>

      <p
        className={cn(
          isLight ? 'mt-1 text-[#6e7f5a]' : 'mt-1 text-zinc-400',
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
                  ? 'rounded-xl border border-[#d3e9b4] bg-[#8cde07] px-3 py-2.5 text-[#234005]'
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
                <p className="mt-2 font-semibold text-[#4c730f] text-[10px] uppercase tracking-[0.08em]">
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
                  ? 'rounded-xl border border-[#d3e9b4] bg-[#f9fef0] px-4 py-3'
                  : 'rounded-xl border border-emerald-500/20 bg-zinc-950/78 px-4 py-3'
              )}
            >
              <p
                className={cn(
                  'font-medium text-sm leading-relaxed sm:text-base',
                  isLight ? 'text-[#2f4f06]' : 'text-zinc-100'
                )}
              >
                {item.farmer} {item.update} ({item.country})
              </p>
              <p
                className={cn(
                  'mt-1 text-xs sm:text-sm',
                  isLight ? 'text-[#60794a]' : 'text-zinc-300/85'
                )}
              >
                {item.detail}
              </p>
              <p
                className={cn(
                  'mt-2 font-medium text-xs',
                  isLight ? 'text-[#4e820f]' : 'text-emerald-200/90'
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
