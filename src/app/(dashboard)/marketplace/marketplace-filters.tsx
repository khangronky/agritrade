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
  marketplaceCropOptions,
  marketplaceLocationOptions,
} from './data';

const availabilityOptions: Array<'All availability' | MarketplaceAvailability> =
  ['All availability', 'Available now', 'Pre-harvest'];

export function MarketplaceFilters({
  selectedCrop,
  selectedLocation,
  selectedAvailability,
  onCropChange,
  onLocationChange,
  onAvailabilityChange,
}: {
  selectedCrop: string;
  selectedLocation: string;
  selectedAvailability: 'All availability' | MarketplaceAvailability;
  onCropChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onAvailabilityChange: (
    value: 'All availability' | MarketplaceAvailability
  ) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <FilterSelect
        label="Crop type"
        value={selectedCrop}
        options={marketplaceCropOptions}
        onChange={onCropChange}
      />
      <FilterSelect
        label="Location"
        value={selectedLocation}
        options={marketplaceLocationOptions}
        onChange={onLocationChange}
      />
      <FilterSelect
        label="Availability"
        value={selectedAvailability}
        options={availabilityOptions}
        onChange={(value) =>
          onAvailabilityChange(
            value as 'All availability' | MarketplaceAvailability
          )
        }
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-foreground text-sm">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
