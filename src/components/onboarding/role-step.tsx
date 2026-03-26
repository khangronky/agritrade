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
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="space-y-4">
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
                <label className="cursor-pointer rounded-3xl border border-emerald-200 bg-white p-5 transition-colors hover:border-emerald-300 has-[button[data-state=checked]]:border-emerald-500 has-[button[data-state=checked]]:bg-emerald-50/70">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="farmer" className="mt-1" />
                    <div className="space-y-2">
                      <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Wheat className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-950">Farmer</p>
                        <p className="text-slate-600 text-sm">
                          Share your current harvest context and prepare crop
                          availability listings.
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 has-[button[data-state=checked]]:border-slate-950 has-[button[data-state=checked]]:bg-slate-950 has-[button[data-state=checked]]:text-white">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value="trader"
                      className="mt-1 border-current text-current"
                    />
                    <div className="space-y-2">
                      <div className="flex size-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        <Store className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium">Trader</p>
                        <p className="text-inherit/75 text-sm">
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

      <Separator className="bg-emerald-100" />

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
                    className="min-h-24 border-emerald-200 bg-white"
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
                  <Input
                    placeholder="12000"
                    className="border-emerald-200 bg-white"
                    {...field}
                  />
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
                  <Input
                    placeholder="3.8 tons per harvest"
                    className="border-emerald-200 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <p className="mb-3 font-medium text-slate-950 text-sm">
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
                      <Input
                        placeholder="Day"
                        className="border-emerald-200 bg-white"
                        {...field}
                      />
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
                      <Input
                        placeholder="Month"
                        className="border-emerald-200 bg-white"
                        {...field}
                      />
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
                      <Input
                        placeholder="Year"
                        className="border-emerald-200 bg-white"
                        {...field}
                      />
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
                  <Input
                    placeholder="AgriTrade Export Co."
                    className="border-slate-200 bg-white"
                    {...field}
                  />
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
                  <Input
                    placeholder="25 tons per month"
                    className="border-slate-200 bg-white"
                    {...field}
                  />
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
                    className="min-h-24 border-slate-200 bg-white"
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
                    className="min-h-24 border-slate-200 bg-white"
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
