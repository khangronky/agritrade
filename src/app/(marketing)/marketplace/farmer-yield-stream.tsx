'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type FeedItem = {
  id: string;
  farmer: string;
  update: string;
  country: string;
  detail: string;
  time: string;
};

type FeedTemplate = {
  farmer: string;
  update: string;
  country: string;
  detail: string;
};

const refreshMs = 5_000;
const maxItems = 4;

const initialFeed: FeedItem[] = [
  {
    id: 'seed-1',
    farmer: 'Nguyen Van Hoa',
    update: 'updated ST25 Rice lot',
    country: 'Vietnam',
    detail: '24 tons - Soc Trang, Vietnam',
    time: '08:45:00',
  },
  {
    id: 'seed-2',
    farmer: 'Somchai Prasert',
    update: 'updated Cat Mango lot',
    country: 'Thailand',
    detail: '12 tons - Chanthaburi, Thailand',
    time: '09:10:00',
  },
  {
    id: 'seed-3',
    farmer: 'Siti Aisyah',
    update: 'updated Mustard Greens lot',
    country: 'Indonesia',
    detail: '8 tons - West Java, Indonesia',
    time: '09:35:00',
  },
];

const feedTemplates: FeedTemplate[] = [
  {
    farmer: 'Nguyen Van Hoa',
    update: 'updated ST25 Rice lot',
    country: 'Vietnam',
    detail: '20 tons - Soc Trang, Vietnam',
  },
  {
    farmer: 'Somchai Prasert',
    update: 'updated Cat Mango lot',
    country: 'Thailand',
    detail: '15 tons - Chanthaburi, Thailand',
  },
  {
    farmer: 'Siti Aisyah',
    update: 'updated Mustard Greens lot',
    country: 'Indonesia',
    detail: '10 tons - West Java, Indonesia',
  },
  {
    farmer: 'Maria Santos',
    update: 'updated Cat Mango lot',
    country: 'Philippines',
    detail: '14 tons - Guimaras, Philippines',
  },
  {
    farmer: 'Ahmad Faiz',
    update: 'updated Mustard Greens lot',
    country: 'Malaysia',
    detail: '11 tons - Cameron Highlands, Malaysia',
  },
  {
    farmer: 'Sokha Chan',
    update: 'updated Pangasius lot',
    country: 'Cambodia',
    detail: '18 tons - Kandal, Cambodia',
  },
  {
    farmer: 'Aung Min',
    update: 'updated ST25 Rice lot',
    country: 'Myanmar',
    detail: '16 tons - Ayeyarwady, Myanmar',
  },
  {
    farmer: 'Bounmy Vong',
    update: 'updated ST25 Rice lot',
    country: 'Laos',
    detail: '13 tons - Savannakhet, Laos',
  },
];

function formatNowTime() {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function createMockFeedItem(index: number): FeedItem {
  const template = feedTemplates[index % feedTemplates.length];

  return {
    id: `${Date.now()}-${index}`,
    farmer: template.farmer,
    update: template.update,
    country: template.country,
    detail: template.detail,
    time: formatNowTime(),
  };
}

type FarmerYieldStreamProps = {
  countryFilter: string;
};

export function FarmerYieldStream({ countryFilter }: FarmerYieldStreamProps) {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed);

  useEffect(() => {
    let templateIndex = 0;

    const intervalId = setInterval(() => {
      setFeed((previousFeed) => {
        const nextItem = createMockFeedItem(templateIndex);
        templateIndex += 1;

        return [nextItem, ...previousFeed].slice(0, maxItems);
      });
    }, refreshMs);

    return () => clearInterval(intervalId);
  }, []);

  const visibleFeed =
    countryFilter === 'all'
      ? feed
      : feed.filter((item) => item.country === countryFilter);

  return (
    <>
      <div className="flex items-center justify-between px-1 text-slate-500 text-xs sm:text-sm">
        <p>Auto-generated stream from ASEAN marketplace listings</p>
        <p className="inline-flex items-center gap-2 font-medium text-emerald-600">
          <span className="inline-block size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Auto updates every 5s
        </p>
      </div>

      {visibleFeed.length > 0 ? (
        visibleFeed.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm"
          >
            <CardContent className="flex items-start justify-between gap-4 px-5 py-4 sm:items-center sm:py-5">
              <div>
                <p className="font-semibold text-sm leading-tight sm:text-base">
                  {item.farmer} {item.update}
                </p>
                <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                  {item.detail}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-slate-600 text-xs"
              >
                {item.time}
              </Badge>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm">
          <CardContent className="px-5 py-7 text-center text-slate-600 text-sm">
            No farmer yield updates for this country yet.
          </CardContent>
        </Card>
      )}
    </>
  );
}
