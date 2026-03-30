'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { productGradeOptions } from './data';

export type ProductFormState = {
  crop: string;
  variety: string;
  grade: string;
  location: string;
  quantity: string;
  unit: 'kg' | 'ton';
  expectedHarvest: string;
  askingPrice: string;
  notes: string;
};

export function ProductFormDialog({
  open,
  editing,
  form,
  onOpenChange,
  onChange,
  onSaveDraft,
  onPublish,
}: {
  open: boolean;
  editing: boolean;
  form: ProductFormState;
  onOpenChange: (open: boolean) => void;
  onChange: <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K]
  ) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="shrink-0 border-b px-6 pt-6 pb-4">
          <DialogTitle>{editing ? 'Edit product' : 'Add product'}</DialogTitle>
          <DialogDescription>
            Keep this flow local for now. No API or backend writes are used.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-lg border">
              <Image
                src="/farm.jpg"
                alt="Farm product preview"
                width={1200}
                height={800}
                className="h-44 w-full object-cover"
              />
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="crop">Crop type</FieldLabel>
                <Input
                  id="crop"
                  value={form.crop}
                  onChange={(event) => onChange('crop', event.target.value)}
                  placeholder="Example: ST25 Rice"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="variety">Variety</FieldLabel>
                <Input
                  id="variety"
                  value={form.variety}
                  onChange={(event) => onChange('variety', event.target.value)}
                  placeholder="Example: Premium fragrant"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="grade">Grade</FieldLabel>
                <Select
                  value={form.grade}
                  onValueChange={(value) => onChange('grade', value)}
                >
                  <SelectTrigger id="grade" className="w-full">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {productGradeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) => onChange('location', event.target.value)}
                  placeholder="Example: Soc Trang"
                />
              </Field>

              <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
                <Field>
                  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(event) =>
                      onChange('quantity', event.target.value)
                    }
                    placeholder="0"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="unit">Unit</FieldLabel>
                  <Select
                    value={form.unit}
                    onValueChange={(value) =>
                      onChange('unit', value as 'kg' | 'ton')
                    }
                  >
                    <SelectTrigger id="unit" className="w-full">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ton">ton</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
                <Field>
                  <FieldLabel htmlFor="expected-harvest">
                    Expected harvest
                  </FieldLabel>
                  <Input
                    id="expected-harvest"
                    type="date"
                    value={form.expectedHarvest}
                    onChange={(event) =>
                      onChange('expectedHarvest', event.target.value)
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="asking-price">Asking price</FieldLabel>
                  <Input
                    id="asking-price"
                    type="number"
                    min="0"
                    value={form.askingPrice}
                    onChange={(event) =>
                      onChange('askingPrice', event.target.value)
                    }
                    placeholder="VND"
                  />
                </Field>
              </FieldGroup>

              <Field>
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(event) => onChange('notes', event.target.value)}
                  placeholder="Packing notes, delivery preference, quality details..."
                />
                <FieldDescription>
                  Notes stay local in this mock flow and help shape future
                  listing details.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t px-6 py-4">
          <Button variant="outline" onClick={onSaveDraft}>
            Save as Draft
          </Button>
          <Button onClick={onPublish}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
