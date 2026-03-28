import { CircleCheckBig } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { OnboardingForm } from './types';

export function CompletionStep({ form }: { form: OnboardingForm }) {
  return (
    <div className="flex h-full min-h-105 flex-col justify-between gap-6">
      <Card className="border-border bg-card text-card-foreground shadow-none">
        <CardHeader>
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CircleCheckBig className="size-7" />
          </div>
          <CardTitle className="text-foreground text-xl">
            Onboarding finished successfully
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We saved your onboarding status in the database and marked your
            account as ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/70 p-4">
            <p className="font-medium text-foreground text-sm">
              Profile summary
            </p>
            <p className="mt-2 text-muted-foreground text-sm">
              {form.getValues('full_name')} will enter as a{' '}
              <span className="font-medium text-foreground capitalize">
                {form.getValues('role')}
              </span>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-accent/70 p-4">
            <p className="font-medium text-foreground text-sm">
              What happens next
            </p>
            <p className="mt-2 text-muted-foreground text-sm">
              You can now enter the dashboard, update settings later, and
              connect deeper role data when those tables are ready.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
