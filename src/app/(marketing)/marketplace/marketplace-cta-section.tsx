import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function MarketplaceCtaSection() {
  return (
    <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pb-16 lg:px-8">
      <Card className="mx-auto max-w-7xl rounded-3xl border-emerald-500/25 bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-800 py-0 text-zinc-100 shadow-[0_24px_48px_rgba(16,185,129,0.2)]">
        <CardContent className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-2xl leading-tight sm:text-3xl">
              Ready to sell crops today?
            </h2>
            <p className="mt-2 max-w-3xl text-zinc-300 text-sm leading-relaxed sm:text-base">
              Create an account to update supply, post sell orders, and receive
              buyer requests in one transparent flow.
            </p>
          </div>

          <Button className="h-10 rounded-full bg-brand-lime px-6 font-semibold text-zinc-950 text-xs shadow-[0_8px_18px_rgba(161,224,16,0.28)] hover:bg-brand-lime/85">
            Start for free
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

