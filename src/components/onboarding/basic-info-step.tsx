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
      <Card className="border-emerald-200 bg-emerald-50/70 text-emerald-950 shadow-none dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-50">
        <CardHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <UserRound className="size-5" />
          </div>
          <CardTitle className="text-emerald-950 text-xl dark:text-emerald-50">
            Tell us who is joining
          </CardTitle>
          <CardDescription className="text-emerald-800/80 dark:text-emerald-100/80">
            This name is used across the dashboard and profile menu.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyen Van A" {...field} />
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

      <Card className="border-sky-200 bg-sky-50/70 text-sky-950 shadow-none dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-50">
        <CardHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300">
            <Sprout className="size-5" />
          </div>
          <CardTitle className="text-sky-950 text-xl dark:text-sky-50">
            Account identity
          </CardTitle>
          <CardDescription className="text-sky-800/80 dark:text-sky-100/80">
            This is the email currently attached to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-sky-200 bg-white/80 p-4 dark:border-sky-500/25 dark:bg-sky-950/30">
            <p className="text-sky-700 text-xs uppercase tracking-[0.18em] dark:text-sky-200/80">
              Email
            </p>
            <p className="mt-2 text-sky-950 text-sm dark:text-sky-50">
              {onboarding.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
