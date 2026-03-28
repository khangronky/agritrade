import { Store, Wheat } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import type { OnboardingStepProps } from './types';

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
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Currently harvested crops</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Rice, cassava, robusta coffee..."
                    className="min-h-24"
                    {...field}
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
          <div className="md:col-span-2">
            <p className="mb-3 font-medium text-foreground text-sm">
              Harvested time (optional)
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="farmer_harvest_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Input placeholder="Day" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="farmer_harvest_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input placeholder="Month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="farmer_harvest_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Crop types to buy</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Rice, pepper, durian..."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trader_export_markets"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Exported markets</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Japan, EU, UAE..."
                    className="min-h-24"
                    {...field}
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
