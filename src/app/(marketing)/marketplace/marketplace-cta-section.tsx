import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function MarketplaceCtaSection() {
  return (
    <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pb-16 lg:px-8">
      <Card className="mx-auto max-w-7xl rounded-3xl border-[#d3e9b4] bg-white py-0 text-[#1f3800] shadow-[0_16px_32px_rgba(127,181,44,0.16)]">
        <CardContent className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-2xl leading-tight sm:text-3xl">
              Ready to sell crops today?
            </h2>
            <p className="mt-2 max-w-3xl text-[#546a39] text-sm leading-relaxed sm:text-base">
              Create an account to update supply, post sell orders, and receive
              buyer requests in one transparent flow.
            </p>
          </div>

          <Button className="h-10 rounded-full bg-brand-lime px-6 font-semibold text-[#1d3706] text-xs shadow-[0_8px_16px_rgba(118,177,30,0.28)] hover:bg-brand-lime/90">
            Start for free
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
