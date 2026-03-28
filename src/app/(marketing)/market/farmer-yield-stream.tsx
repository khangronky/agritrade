'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  createMockFarmerFeedItem,
  farmerFeedMaxItems,
  farmerFeedRefreshMs,
  initialFarmerFeed,
} from '../farmer-yield-feed-data';

type FarmerYieldStreamProps = {
  countryFilter: string;
};

export function FarmerYieldStream({ countryFilter }: FarmerYieldStreamProps) {
  const [feed, setFeed] = useState(initialFarmerFeed);

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

  const visibleFeed =
    countryFilter === 'all'
      ? feed
      : feed.filter((item) => item.country === countryFilter);

  return (
    <>
      <div className="flex items-center justify-between px-1 text-muted-foreground text-xs sm:text-sm">
        <p>Auto-generated stream from ASEAN market listings</p>
        <p className="inline-flex items-center gap-2 font-medium text-lime-700">
          <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(116,189,18,0.35)]" />
          Auto updates every 5s
        </p>
      </div>

      {visibleFeed.length > 0 ? (
        visibleFeed.map((item) => (
          <Card
            key={item.id}
            className="rounded-xl border-lime-200 bg-white py-0 text-lime-950 shadow-sm"
          >
            <CardContent className="flex items-start justify-between gap-4 px-5 py-4 sm:items-center sm:py-5">
              <div>
                <p className="font-semibold text-sm leading-tight sm:text-base">
                  {item.farmer} {item.update}
                </p>
                <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                  {item.detail}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-lime-200 bg-lime-50 text-muted-foreground text-xs"
              >
                {item.time}
              </Badge>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="rounded-xl border-lime-200 bg-white py-0 text-lime-950 shadow-sm">
          <CardContent className="px-5 py-7 text-center text-muted-foreground text-sm">
            No farmer yield updates for this country yet.
          </CardContent>
        </Card>
      )}
    </>
  );
}
