import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CurrencyOption, ListingCard } from './types';
import { formatPricePerKg } from './utils';

type TradingBoardSectionProps = {
  listings: ListingCard[];
  activeCurrency: CurrencyOption;
};

export function TradingBoardSection({
  listings,
  activeCurrency,
}: TradingBoardSectionProps) {
  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border border-[#d0e6af] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-2xl sm:text-3xl">
                Agriculture trading board
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <ListingCardItem
                  key={`${listing.name}-${listing.region}-${listing.country}`}
                  listing={listing}
                  activeCurrency={activeCurrency}
                />
              ))
            ) : (
              <Card className="gap-0 rounded-xl border-[#c6dfa0] bg-[#f5f8ef] py-0 text-[#1f3800] shadow-sm sm:col-span-2 xl:col-span-4">
                <CardContent className="px-5 py-8 text-center text-[#6e7f5a]">
                  No marketplace listings available right now.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ListingCardItem({
  listing,
  activeCurrency,
}: {
  listing: ListingCard;
  activeCurrency: CurrencyOption;
}) {
  return (
    <Card className="group gap-0 overflow-hidden rounded-xl border-[#d0e6af] bg-white py-0 text-[#1f3800] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d98e] hover:shadow-md">
      <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-[11px] text-[#3d670d] uppercase tracking-[0.16em]">
              {listing.category}
            </p>
            <p className="mt-1 font-semibold text-base leading-tight sm:text-lg">
              {listing.name}
            </p>
            <p className="mt-1 text-[#6e7f5a] text-xs sm:text-sm">
              {listing.region}, {listing.country}
            </p>
          </div>
          <Badge className="border-[#cfe5ad] bg-[#e6f5cf] text-[11px] text-[#4e820f]">
            {listing.status}
          </Badge>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <p className="font-semibold text-2xl text-[#3d670d] sm:text-3xl">
            {listing.volume}
          </p>
          <p className="text-right text-[#6e7f5a] text-xs sm:text-sm">
            {formatPricePerKg(listing.pricePerKgVnd, activeCurrency)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-[#d3e9b4] border-t pt-3">
          <p className="text-[11px] text-[#6e7f5a] uppercase tracking-[0.14em]">
            24h move
          </p>
          <span
            className={cn(
              'font-semibold text-lg sm:text-xl',
              listing.positive ? 'text-[#5ca508]' : 'text-amber-300'
            )}
          >
            {listing.trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
