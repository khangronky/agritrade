'use client';

import {
  FilterIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type MarketplaceAvailability,
  type MarketplaceListing,
  marketplaceListings,
} from './data';
import { MarketplaceDetailDialog } from './marketplace-detail-dialog';
import { MarketplaceFilters } from './marketplace-filters';
import { MarketplaceListingCard } from './marketplace-listing-card';

const availabilityOptions: Array<'All availability' | MarketplaceAvailability> =
  ['All availability', 'Available now', 'Pre-harvest'];

const sortOptions = [
  { value: 'recent', label: 'Most recent' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'quantity-desc', label: 'Quantity: High to low' },
] as const;

export default function MarketplaceClient() {
  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All crops');
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedAvailability, setSelectedAvailability] =
    useState<(typeof availabilityOptions)[number]>('All availability');
  const [sortBy, setSortBy] =
    useState<(typeof sortOptions)[number]['value']>('recent');
  const [selectedListing, setSelectedListing] =
    useState<MarketplaceListing | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredListings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const nextListings = marketplaceListings.filter((listing) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [listing.crop, listing.variety, listing.seller, listing.location]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCrop =
        selectedCrop === 'All crops' || listing.crop === selectedCrop;
      const matchesLocation =
        selectedLocation === 'All locations' ||
        listing.location === selectedLocation;
      const matchesAvailability =
        selectedAvailability === 'All availability' ||
        listing.availability === selectedAvailability;

      return (
        matchesSearch && matchesCrop && matchesLocation && matchesAvailability
      );
    });

    return nextListings.sort((left, right) => {
      if (sortBy === 'price-asc') return left.askingPrice - right.askingPrice;
      if (sortBy === 'price-desc') return right.askingPrice - left.askingPrice;
      if (sortBy === 'quantity-desc') return right.quantity - left.quantity;
      return 0;
    });
  }, [search, selectedCrop, selectedLocation, selectedAvailability, sortBy]);

  const stats = useMemo(
    () => [
      {
        label: 'Active listings',
        value: marketplaceListings.length.toString(),
      },
      {
        label: 'Pre-harvest lots',
        value: marketplaceListings
          .filter((listing) => listing.availability === 'Pre-harvest')
          .length.toString(),
      },
      {
        label: 'Locations covered',
        value: new Set(
          marketplaceListings.map((listing) => listing.location)
        ).size.toString(),
      },
    ],
    []
  );

  const handleInquire = (listing: MarketplaceListing) => {
    toast.success(
      `Inquiry draft opened for ${listing.crop} from ${listing.seller}.`
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl text-foreground">
            Marketplace
          </h1>
          <p className="text-muted-foreground text-sm">
            Browse active public crop listings from verified sellers.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 sm:w-72">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search crop, seller, location"
              className="pl-9"
            />
          </div>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as typeof sortBy)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort listings" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <FilterIcon data-icon="inline-start" />
            Filters
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="hidden h-fit lg:flex">
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
            <CardDescription>
              Refine active public product listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MarketplaceFilters
              selectedCrop={selectedCrop}
              selectedLocation={selectedLocation}
              selectedAvailability={selectedAvailability}
              onCropChange={setSelectedCrop}
              onLocationChange={setSelectedLocation}
              onAvailabilityChange={setSelectedAvailability}
            />
          </CardContent>
        </Card>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-base text-foreground">
                Public listings
              </h2>
              <p className="text-muted-foreground text-sm">
                {filteredListings.length} listing
                {filteredListings.length === 1 ? '' : 's'} match the current
                view.
              </p>
            </div>
            <Button asChild>
              <Link href="/products" className="flex items-center">
                <PlusIcon data-icon="inline-start" />
                Publish crops
              </Link>
            </Button>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {filteredListings.map((listing) => (
                <MarketplaceListingCard
                  key={listing.id}
                  listing={listing}
                  onOpen={setSelectedListing}
                  onInquire={handleInquire}
                />
              ))}
            </div>
          ) : (
            <div className="py-10">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SlidersHorizontalIcon />
                  </EmptyMedia>
                  <EmptyTitle>No listings found</EmptyTitle>
                  <EmptyDescription>
                    Try clearing one or more filters to see more public
                    products.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </section>
      </div>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-md">
          <DialogHeader className="shrink-0 border-b px-6 pt-6 pb-4">
            <DialogTitle>Marketplace filters</DialogTitle>
            <DialogDescription>
              Narrow the listing board without leaving the page.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <MarketplaceFilters
              selectedCrop={selectedCrop}
              selectedLocation={selectedLocation}
              selectedAvailability={selectedAvailability}
              onCropChange={setSelectedCrop}
              onLocationChange={setSelectedLocation}
              onAvailabilityChange={setSelectedAvailability}
            />
          </div>
          <DialogFooter className="shrink-0 border-t px-6 py-4">
            <Button onClick={() => setFiltersOpen(false)}>Apply filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MarketplaceDetailDialog
        listing={selectedListing}
        open={selectedListing !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedListing(null);
          }
        }}
        onInquire={handleInquire}
      />
    </div>
  );
}
