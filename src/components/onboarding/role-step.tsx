'use client';

import { Plus, Store, Wheat, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { OnboardingStepProps } from './types';

const cropTypeOptions = [
  'Rice',
  'Cassava',
  'Robusta coffee',
  'Black pepper',
  'Durian',
  'Maize',
  'Dragon fruit',
];

function parseCropTags(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((crop) => crop.trim())
    .filter(Boolean);
}

function normalizeCropTag(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

function CropTagsField({
  value,
  invalid,
  emptyLabel,
  onChange,
}: {
  value: string | undefined;
  invalid: boolean;
  emptyLabel: string;
  onChange: (value: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCropTags, setSelectedCropTags] = useState<string[]>(() =>
    parseCropTags(value)
  );

  useEffect(() => {
    const nextCropTags = parseCropTags(value);

    setSelectedCropTags((currentCropTags) => {
      if (
        currentCropTags.length === nextCropTags.length &&
        currentCropTags.every((crop, index) => crop === nextCropTags[index])
      ) {
        return currentCropTags;
      }

      return nextCropTags;
    });
  }, [value]);

  const availableCropOptions = useMemo(
    () =>
      cropTypeOptions.filter(
        (cropType) =>
          !selectedCropTags.some(
            (selectedCrop) =>
              selectedCrop.toLowerCase() === cropType.toLowerCase()
          )
      ),
    [selectedCropTags]
  );

  const normalizedQuery = normalizeCropTag(query);
  const matchingCropOption = availableCropOptions.find(
    (cropType) => cropType.toLowerCase() === normalizedQuery.toLowerCase()
  );
  const canCreateCustomCrop =
    normalizedQuery.length > 0 &&
    !selectedCropTags.some(
      (selectedCrop) =>
        selectedCrop.toLowerCase() === normalizedQuery.toLowerCase()
    ) &&
    !matchingCropOption;

  const updateCropTags = (nextCropTags: string[]) => {
    setSelectedCropTags(nextCropTags);
    onChange(nextCropTags.join(', '));
  };

  const addCropTag = (crop: string) => {
    const normalizedCrop = normalizeCropTag(crop);

    if (
      !normalizedCrop ||
      selectedCropTags.some(
        (selectedCrop) =>
          selectedCrop.toLowerCase() === normalizedCrop.toLowerCase()
      )
    ) {
      return;
    }

    updateCropTags([...selectedCropTags, normalizedCrop]);
    setQuery('');
    setPickerOpen(false);
  };

  const removeCropTag = (cropToRemove: string) => {
    updateCropTags(selectedCropTags.filter((crop) => crop !== cropToRemove));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {selectedCropTags.length > 0 ? (
          selectedCropTags.map((crop) => (
            <Badge key={crop} variant="secondary" className="gap-1 pr-1">
              <span>{crop}</span>
              <button
                type="button"
                className="rounded-full p-0.5 transition-colors hover:bg-background/70"
                onClick={() => removeCropTag(crop)}
                aria-label={`Remove ${crop}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">{emptyLabel}</p>
        )}
      </div>

      <Popover
        open={pickerOpen}
        onOpenChange={(open) => {
          setPickerOpen(open);

          if (!open) {
            setQuery('');
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full justify-center border-dashed! hover:bg-accent/10',
              !selectedCropTags.length && 'text-muted-foreground'
            )}
            aria-invalid={invalid}
          >
            <Plus />
            Add crop type
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search or type a crop..."
              value={query}
              onValueChange={setQuery}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') {
                  return;
                }

                event.preventDefault();

                if (matchingCropOption) {
                  addCropTag(matchingCropOption);
                  return;
                }

                if (canCreateCustomCrop) {
                  addCropTag(normalizedQuery);
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No crop types available.</CommandEmpty>
              <CommandGroup heading="Crop types">
                {availableCropOptions.map((cropType) => (
                  <CommandItem
                    key={cropType}
                    value={cropType}
                    onSelect={() => addCropTag(cropType)}
                  >
                    {cropType}
                  </CommandItem>
                ))}
                {canCreateCustomCrop ? (
                  <CommandItem
                    value={normalizedQuery}
                    onSelect={() => addCropTag(normalizedQuery)}
                  >
                    Add "{normalizedQuery}"
                  </CommandItem>
                ) : null}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function RoleStep({ form }: OnboardingStepProps) {
  const selectedRole = form.watch('role');

  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-4">
            <div>
              <FormLabel>Choose your role</FormLabel>
              <FormDescription>
                We use this to tailor the dashboard language and future
                workflows.
              </FormDescription>
            </div>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4 md:grid-cols-2"
              >
                <label className="cursor-pointer rounded-3xl border border-emerald-200 bg-emerald-50/75 p-5 transition-colors hover:border-emerald-400 has-[button[data-state=checked]]:border-emerald-500 has-[button[data-state=checked]]:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:has-[button[data-state=checked]]:border-emerald-400 dark:has-[button[data-state=checked]]:bg-emerald-500/20 dark:hover:border-emerald-400">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="farmer" className="mt-1" />
                    <div className="flex flex-col gap-2">
                      <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        <Wheat className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-950 dark:text-emerald-50">
                          Farmer
                        </p>
                        <p className="text-emerald-800/80 text-sm dark:text-emerald-100/80">
                          Share your current harvest context and prepare crop
                          availability listings.
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer rounded-3xl border border-amber-200 bg-amber-50/75 p-5 transition-colors hover:border-amber-400 has-[button[data-state=checked]]:border-amber-500 has-[button[data-state=checked]]:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:has-[button[data-state=checked]]:border-amber-400 dark:has-[button[data-state=checked]]:bg-amber-500/20 dark:hover:border-amber-400">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="trader" className="mt-1" />
                    <div className="flex flex-col gap-2">
                      <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                        <Store className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-950 dark:text-amber-50">
                          Trader
                        </p>
                        <p className="text-amber-800/80 text-sm dark:text-amber-100/80">
                          Capture your buying profile and the markets your team
                          serves.
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="bg-border" />

      {selectedRole === 'farmer' ? (
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="farmer_crops"
            render={({ fieldState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Currently harvested crops</FormLabel>
                <FormControl>
                  <CropTagsField
                    value={form.watch('farmer_crops')}
                    invalid={fieldState.invalid}
                    emptyLabel="No crops selected yet."
                    onChange={(value) => {
                      form.setValue('farmer_crops', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmer_area_m2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area (m2)</FormLabel>
                <FormControl>
                  <Input placeholder="12000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmer_estimated_productivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated productivity</FormLabel>
                <FormControl>
                  <Input placeholder="3.8 tons per harvest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="trader_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Belonged company</FormLabel>
                <FormControl>
                  <Input placeholder="AgriTrade Export Co." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trader_weights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weights</FormLabel>
                <FormControl>
                  <Input placeholder="25 tons per month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trader_crop_types"
            render={({ field, fieldState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Crop types to buy</FormLabel>
                <FormControl>
                  <CropTagsField
                    value={field.value}
                    invalid={fieldState.invalid}
                    emptyLabel="No crop types selected yet."
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
