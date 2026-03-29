import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MarketplaceListing } from './data';

export function MarketplaceListingCard({
  listing,
  onOpen,
  onInquire,
}: {
  listing: MarketplaceListing;
  onOpen: (listing: MarketplaceListing) => void;
  onInquire: (listing: MarketplaceListing) => void;
}) {
  return (
    <Card className="gap-0 overflow-hidden py-0 transition-transform hover:-translate-y-0.5">
      <button
        type="button"
        onClick={() => onOpen(listing)}
        className="group text-left"
      >
        <div className="relative overflow-hidden border-b">
          <Image
            src={listing.imageSrc}
            alt={listing.crop}
            width={1200}
            height={800}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary">{listing.availability}</Badge>
            <Badge variant="outline">{listing.grade}</Badge>
          </div>
        </div>
      </button>

      <CardHeader className="gap-1 px-5 pt-5 pb-4">
        <CardTitle className="line-clamp-1 text-lg">{listing.crop}</CardTitle>
        <CardDescription className="line-clamp-1">
          {listing.variety}
        </CardDescription>
        <CardAction>
          <div className="text-right">
            <p className="font-semibold text-base text-foreground">
              {listing.askingPrice.toLocaleString('vi-VN')} {listing.currency}
            </p>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5">
        <div className="flex flex-col gap-1 text-xs">
          <p className="font-medium text-foreground">{listing.seller}</p>
          <p className="text-muted-foreground">{listing.location}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CompactMetric
            label="Quantity"
            value={`${listing.quantity.toLocaleString('vi-VN')} ${listing.unit}`}
          />
          <CompactMetric
            label="Minimum order"
            value={`${listing.minimumOrder.toLocaleString('vi-VN')} ${listing.unit}`}
          />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="line-clamp-1 text-muted-foreground">
            {listing.expectedHarvest}
          </p>
          <div className="flex flex-wrap gap-2">
            {listing.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto gap-2 border-t px-5 py-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onOpen(listing)}
        >
          View details
        </Button>
        <Button className="flex-1" onClick={() => onInquire(listing)}>
          Inquire
        </Button>
      </CardFooter>
    </Card>
  );
}

function CompactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-muted/40 p-3">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}
