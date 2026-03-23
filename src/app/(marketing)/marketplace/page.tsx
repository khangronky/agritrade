import { ArrowLeftRight, HandCoins, Zap } from 'lucide-react';
import type { ComponentType } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type PriceRow = {
  name: string;
  price: string;
  change: string;
  positive: boolean;
};

type ListingCard = {
  name: string;
  region: string;
  pricePerKg: string;
  volume: string;
  status: string;
  trend: string;
  positive: boolean;
};

type ExchangeCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type FeedItem = {
  farmer: string;
  update: string;
  detail: string;
  time: string;
};

const livePriceRows: PriceRow[] = [
  { name: 'ST25 Rice', price: '15.5k', change: '+0.8%', positive: true },
  { name: 'Cat Chu Mango', price: '34k', change: '+2.1%', positive: true },
  { name: 'Mustard Greens', price: '11k', change: '-0.5%', positive: false },
  { name: 'Pangasius', price: '28k', change: '+1.9%', positive: true },
];

const listings: ListingCard[] = [
  {
    name: 'Watermelon - An Giang',
    region: 'An Giang',
    pricePerKg: '6,200 VND/kg',
    volume: '120 tons',
    status: 'Available now',
    trend: '+3.4%',
    positive: true,
  },
  {
    name: 'Sweet Potato - Vinh Long',
    region: 'Vinh Long',
    pricePerKg: '8,900 VND/kg',
    volume: '85 tons',
    status: 'Buyer needed',
    trend: '-1.2%',
    positive: false,
  },
  {
    name: 'Cat Hoa Loc Mango',
    region: 'Tien Giang',
    pricePerKg: '34,000 VND/kg',
    volume: '60 tons',
    status: 'Available now',
    trend: '+2.1%',
    positive: true,
  },
  {
    name: 'Fragrant ST25 Rice',
    region: 'Soc Trang',
    pricePerKg: '15,500 VND/kg',
    volume: '240 tons',
    status: 'Contract based',
    trend: '+0.8%',
    positive: true,
  },
  {
    name: 'Mustard Greens - Da Lat',
    region: 'Lam Dong',
    pricePerKg: '11,000 VND/kg',
    volume: '40 tons',
    status: 'Needs support',
    trend: '-0.5%',
    positive: false,
  },
  {
    name: 'Pangasius Fillet',
    region: 'Can Tho',
    pricePerKg: '28,000 VND/kg',
    volume: '55 tons',
    status: 'Available now',
    trend: '+1.9%',
    positive: true,
  },
];

const exchangeCards: ExchangeCard[] = [
  {
    icon: ArrowLeftRight,
    title: 'Instant Exchange',
    description:
      'Swap matching lots across regions to optimize load and delivery routes.',
  },
  {
    icon: HandCoins,
    title: 'Pre-Order Contracts',
    description:
      'Lock quantity and delivery windows early to reduce inventory risk.',
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description:
      'Confirm within minutes and track lot movement with clear milestones.',
  },
];

const farmerFeed: FeedItem[] = [
  {
    farmer: 'Nguyen Van Hoa',
    update: 'updated Red Dragon Fruit lot',
    detail: '18 tons - Binh Thuan',
    time: '08:45',
  },
  {
    farmer: 'Le Thi Thu',
    update: 'updated Cabbage lot',
    detail: '9 tons - Da Lat',
    time: '09:10',
  },
];

function MarketplaceFilterBar() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      <Input
        type="text"
        placeholder="Search by commodity"
        className="h-10 rounded-xl border-emerald-200 bg-white text-slate-700 text-xs placeholder:text-slate-400 focus-visible:border-green-500 focus-visible:ring-green-500/20 sm:w-60"
      />
      <NativeSelect className="h-10 min-w-36 rounded-xl border-emerald-200 bg-white text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20">
        <NativeSelectOption value="all">All categories</NativeSelectOption>
        <NativeSelectOption value="grains">Grains</NativeSelectOption>
        <NativeSelectOption value="fruits">Fruits</NativeSelectOption>
        <NativeSelectOption value="vegetables">Vegetables</NativeSelectOption>
        <NativeSelectOption value="seafood">Seafood</NativeSelectOption>
      </NativeSelect>
      <Button
        variant="outline"
        size="sm"
        className="h-10 rounded-xl border-emerald-300 bg-white text-emerald-800 text-xs hover:bg-emerald-50"
      >
        Refresh
      </Button>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-green-200 via-green-100 to-green-50 text-slate-900 text-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,197,94,0.16),transparent_42%),radial-gradient(circle_at_70%_22%,rgba(16,185,129,0.12),transparent_38%),radial-gradient(circle_at_48%_70%,rgba(163,230,53,0.1),transparent_36%)]" />

      <section className="relative border-emerald-200/80 border-b pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
            <div>
              <Badge className="rounded-full border-green-200 bg-green-100 px-3 py-1 text-[11px] text-green-700">
                Reduce waste - Increase transparency - Trade faster
              </Badge>

              <h1 className="mt-5 max-w-xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
                A forex for agriculture: see quantity, trade instantly.
              </h1>

              <p className="mt-4 max-w-2xl text-slate-600 text-sm leading-relaxed sm:text-base">
                AgriTrade updates farmer supply in real time so traders,
                businesses, and local communities can buy, exchange, and close
                deals before produce is wasted.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button className="h-10 rounded-full bg-green-600 px-5 font-semibold text-white text-xs hover:bg-green-700">
                  Create sell order
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-full border-green-300 bg-transparent px-5 font-semibold text-green-800 text-xs"
                >
                  Explore marketplace
                </Button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">
                    1,248 tons
                  </p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Available today
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">4,312</p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Active farmers
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">-23%</p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Waste reduced
                  </p>
                </div>
              </div>
            </div>

            <Card className="gap-0 rounded-3xl border-emerald-200 bg-white/90 py-0 text-slate-900 shadow-green-100/60 shadow-xl">
              <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl">
                    Live price board
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs sm:text-sm">
                    Updates every 60s
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 px-5 pb-5 sm:px-6 sm:pb-6">
                {livePriceRows.map((row, index) => (
                  <div key={row.name}>
                    <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 sm:px-4">
                      <p className="font-medium text-sm sm:text-base">
                        {row.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-base sm:text-lg">
                          {row.price}
                        </span>
                        <span
                          className={cn(
                            'font-semibold text-sm sm:text-base',
                            row.positive ? 'text-green-600' : 'text-amber-600'
                          )}
                        >
                          {row.change}
                        </span>
                      </div>
                    </div>
                    {index < livePriceRows.length - 1 ? (
                      <Separator className="my-2 bg-emerald-100" />
                    ) : null}
                  </div>
                ))}

                <div className="mt-3 flex items-center justify-between text-slate-500 text-xs sm:text-sm">
                  <p>Reference pricing</p>
                  <p className="inline-flex items-center gap-2 font-medium text-green-600">
                    <span className="inline-block size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.45)]" />
                    Live
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Agriculture trading board
            </h2>
            <MarketplaceFilterBar />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((listing) => (
              <Card
                key={listing.name}
                className="gap-0 rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm"
              >
                <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                  <p className="font-semibold text-base leading-tight sm:text-lg">
                    {listing.name}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-slate-500 text-xs sm:text-sm">
                    <p>{listing.region}</p>
                    <p>{listing.pricePerKg}</p>
                  </div>

                  <p className="mt-4 font-semibold text-2xl text-lime-600 sm:text-3xl">
                    {listing.volume}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <Badge className="border-green-200 bg-green-100 text-[11px] text-green-700">
                      {listing.status}
                    </Badge>
                    <span
                      className={cn(
                        'font-semibold text-lg sm:text-xl',
                        listing.positive ? 'text-green-600' : 'text-amber-600'
                      )}
                    >
                      {listing.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-emerald-200/80 border-t py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Exchange & trading market
            </h2>
            <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
              Match lot-based demand: exchange, pre-buy, or lock deliveries by
              season with full visibility.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {exchangeCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card
                  key={card.title}
                  className="rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm"
                >
                  <CardHeader className="px-5 pt-5 pb-2">
                    <Icon className="size-5 text-lime-600" />
                    <CardTitle className="mt-3 text-lg sm:text-xl">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Farmer yield stream
            </h2>
            <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
              Transparent updates: location, quantity, and harvest timing in one
              feed.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {farmerFeed.map((feed) => (
              <Card
                key={`${feed.farmer}-${feed.time}`}
                className="rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm"
              >
                <CardContent className="flex items-start justify-between gap-4 px-5 py-4 sm:items-center sm:py-5">
                  <div>
                    <p className="font-semibold text-sm leading-tight sm:text-base">
                      {feed.farmer} {feed.update}
                    </p>
                    <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                      {feed.detail}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-slate-600 text-xs"
                  >
                    {feed.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <Card className="mx-auto max-w-7xl rounded-3xl border-green-200 bg-linear-to-r from-green-100 via-emerald-100/80 to-lime-100 py-0 text-slate-900 shadow-green-100/80 shadow-lg">
          <CardContent className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-2xl leading-tight sm:text-3xl">
                Ready to sell crops today?
              </h2>
              <p className="mt-2 max-w-3xl text-slate-700 text-sm leading-relaxed sm:text-base">
                Create an account to update supply, post sell orders, and
                receive buyer requests in one transparent flow.
              </p>
            </div>

            <Button className="h-10 rounded-full bg-green-600 px-6 font-semibold text-white text-xs shadow-[0_8px_18px_rgba(22,163,74,0.25)] hover:bg-green-700">
              Start for free
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
