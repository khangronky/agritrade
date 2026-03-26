import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function MarketplaceCtaSection() {
  return (
    <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pb-16 lg:px-8">
      <Card className="mx-auto max-w-7xl rounded-3xl border-green-200 bg-linear-to-r from-green-100 via-emerald-100/80 to-lime-100 py-0 text-slate-900 shadow-green-100/80 shadow-lg">
        <CardContent className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-2xl leading-tight sm:text-3xl">
              Ready to sell crops today?
            </h2>
            <p className="mt-2 max-w-3xl text-slate-700 text-sm leading-relaxed sm:text-base">
              Create an account to update supply, post sell orders, and receive
              buyer requests in one transparent flow.
            </p>
          </div>

          <Button className="h-10 rounded-full bg-green-600 px-6 font-semibold text-white text-xs shadow-[0_8px_18px_rgba(22,163,74,0.25)] hover:bg-green-700">
            Start for free
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
