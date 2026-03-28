'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ProductRecord } from './data';

export function ProductsTable({
  products,
  onEdit,
  onTogglePublish,
  onArchive,
}: {
  products: ProductRecord[];
  onEdit: (product: ProductRecord) => void;
  onTogglePublish: (product: ProductRecord) => void;
  onArchive: (product: ProductRecord) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Harvest</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="overflow-hidden rounded-md border">
                  <Image
                    src={product.imageSrc}
                    alt={product.crop}
                    width={64}
                    height={64}
                    className="size-12 object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-medium text-foreground">{product.crop}</p>
                  <p className="truncate text-muted-foreground text-sm">
                    {product.variety} - {product.grade}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.location}</TableCell>
            <TableCell>
              {product.quantity.toLocaleString('vi-VN')} {product.unit}
            </TableCell>
            <TableCell>{product.expectedHarvest}</TableCell>
            <TableCell>
              {product.askingPrice
                ? `${product.askingPrice.toLocaleString('vi-VN')} VND`
                : 'Not set'}
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <Badge variant="secondary">{product.status}</Badge>
                <span className="text-muted-foreground text-xs">
                  {product.isPublished
                    ? 'Visible in marketplace'
                    : 'Internal only'}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </Button>
                {product.status !== 'Archived' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTogglePublish(product)}
                  >
                    {product.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                ) : null}
                {product.status !== 'Archived' ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onArchive(product)}
                  >
                    Archive
                  </Button>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
