import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MarketplaceListing } from './data';

export function MarketplaceDetailDialog({
  listing,
  open,
  onOpenChange,
  onInquire,
}: {
  listing: MarketplaceListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInquire: (listing: MarketplaceListing) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-3xl">
        {listing ? (
          <>
            <DialogHeader className="shrink-0 border-b px-6 pt-6 pb-4">
              <DialogTitle>{listing.crop}</DialogTitle>
              <DialogDescription>
                {listing.variety} - {listing.seller}
              </DialogDescription>
            </DialogHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-5">
                <div className="overflow-hidden rounded-lg border">
                  <Image
                    src={listing.imageSrc}
                    alt={listing.crop}
                    width={1200}
                    height={800}
                    className="h-48 w-full object-cover"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailStat label="Seller" value={listing.seller} />
                  <DetailStat label="Location" value={listing.location} />
                  <DetailStat
                    label="Quantity"
                    value={`${listing.quantity} ${listing.unit}`}
                  />
                  <DetailStat
                    label="Asking price"
                    value={`${listing.askingPrice.toLocaleString('vi-VN')} ${listing.currency}`}
                  />
                  <DetailStat
                    label="Availability"
                    value={listing.availability}
                  />
                  <DetailStat
                    label="Minimum order"
                    value={`${listing.minimumOrder} ${listing.unit}`}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Listing details</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 text-muted-foreground text-sm">
                    <DetailBlock
                      label="Grade"
                      value={`${listing.grade} / ${listing.variety}`}
                    />
                    <DetailBlock
                      label="Expected harvest"
                      value={listing.expectedHarvest}
                    />
                    <DetailBlock
                      label="Delivery area"
                      value={listing.deliveryArea}
                    />
                    <DetailBlock
                      label="Quality notes"
                      value={listing.qualityNotes}
                    />
                    <div className="flex flex-wrap gap-2">
                      {listing.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="shrink-0 border-t px-6 py-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => onInquire(listing)}>Inquire</Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-foreground text-sm">{label}</p>
      <p>{value}</p>
    </div>
  );
}
