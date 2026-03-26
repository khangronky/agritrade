import { Sprout, UserRound } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { OnboardingStepProps } from './types';

export function BasicInfoStep({ form, onboarding }: OnboardingStepProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-emerald-200 bg-white/85 shadow-none">
        <CardHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <UserRound className="size-5" />
          </div>
          <CardTitle className="text-slate-950 text-xl">
            Tell us who is joining
          </CardTitle>
          <CardDescription>
            This name is used across the dashboard and profile menu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nguyen Van A"
                    className="border-emerald-200 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use the person or business-facing name you want buyers and
                  sellers to recognize.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-950 text-white shadow-none">
        <CardHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-white/10 text-lime-200">
            <Sprout className="size-5" />
          </div>
          <CardTitle className="text-white text-xl">Account identity</CardTitle>
          <CardDescription className="text-white/70">
            This is the email currently attached to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
            <p className="text-white/70 text-xs uppercase tracking-[0.18em]">
              Email
            </p>
            <p className="mt-2 text-sm">{onboarding.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
