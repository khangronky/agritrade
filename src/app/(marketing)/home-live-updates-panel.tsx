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
};

export function HomeLiveUpdatesPanel({
  compact = false,
}: HomeLiveUpdatesPanelProps) {
  const [feed, setFeed] = useState(initialFarmerFeed);
  const visibleFeed = compact ? feed.slice(0, 4) : feed;

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
        'rounded-[28px] border border-emerald-200/70 bg-linear-to-br from-white/90 via-emerald-50/75 to-slate-100/85 shadow-[0_18px_42px_rgba(16,185,129,0.16)] backdrop-blur-xl',
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          className={cn(
            'font-semibold text-slate-900',
            compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
          )}
        >
          News
        </h3>
        <Link
          href="/marketplace"
          className={cn(
            'text-slate-500 transition-colors hover:text-emerald-600',
            compact ? 'text-[11px]' : 'text-sm'
          )}
        >
          {compact ? 'View All News' : 'View all'}
        </Link>
      </div>

      <p
        className={cn(
          'mt-1 text-slate-500',
          compact ? 'text-[11px]' : 'text-sm'
        )}
      >
        Auto updates every 5s
      </p>

      {compact ? (
        <div className="mt-3 space-y-3">
          {visibleFeed.map((item) => (
            <p
              key={item.id}
              className="text-base text-slate-700 leading-snug sm:text-lg"
            >
              {item.farmer} {item.update}
            </p>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {visibleFeed.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-emerald-100/12 bg-linear-to-r from-emerald-900/30 via-teal-900/24 to-slate-900/56 px-4 py-3"
            >
              <p className="font-medium text-slate-100 text-sm leading-relaxed sm:text-base">
                {item.farmer} {item.update} ({item.country})
              </p>
              <p className="mt-1 text-slate-300/85 text-xs sm:text-sm">
                {item.detail}
              </p>
              <p className="mt-2 font-medium text-emerald-300/90 text-xs">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
