import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type LivePrice = {
  product: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
};

const livePrices: LivePrice[] = [
  { product: 'ST25 Rice', price: '15.5k', change: '+0.8%', trend: 'up' },
  { product: 'Cat Mango', price: '34k', change: '+2.1%', trend: 'up' },
  { product: 'Mustard Greens', price: '71k', change: '-0.5%', trend: 'down' },
  { product: 'Pangasius', price: '28k', change: '+1.9%', trend: 'up' },
];

function trendClass(trend: LivePrice['trend']) {
  if (trend === 'up') {
    return 'text-emerald-300';
  }

  if (trend === 'down') {
    return 'text-amber-300';
  }

  return 'text-green-100';
}

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-green-950">
      <div className="relative">
        <Image
          src="/farm.jpg"
          alt="Agricultural field with machinery at sunrise"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-green-950/95 via-green-900/75 to-lime-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(163,230,53,0.3),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(450px,560px)] lg:items-start">
            <div>
              <h1 className="mt-6 max-w-2xl font-semibold text-3xl text-white leading-tight sm:text-4xl lg:text-5xl">
                Farmers should not lose value before their crops reach the
                market.
              </h1>

              <p className="mt-6 max-w-2xl text-base text-green-100/95 sm:text-lg">
                Many small farmers still earn less because middleman dependency,
                weak bargaining power, and pre-agreed pricing reduce their
                market options. AgriTrade introduces transparent offers and
                keeps delivery pathways flexible without disrupting existing
                relationships.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-lime font-semibold text-green-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-lime-200/60 bg-green-950/30 text-lime-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-100/15 hover:text-lime-50"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>

              <div className="mt-10 max-w-3xl rounded-2xl border border-lime-200/30 bg-green-950/55 p-4 text-green-100 backdrop-blur-sm sm:p-5">
                <p className="font-semibold text-lime-100 text-sm uppercase tracking-[0.2em]">
                  Why this matters
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1px_auto_1px_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-white text-xl">
                      225% lower profits
                    </p>
                    <p className="text-green-100/90 text-sm">
                      observed for many middleman-dependent farmers
                    </p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="hidden h-12 bg-lime-200/40 sm:block"
                  />
                  <div>
                    <p className="font-semibold text-white text-xl">
                      Longer value chains
                    </p>
                    <p className="text-green-100/90 text-sm">
                      reduce farmer share of final market margin
                    </p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="hidden h-12 bg-lime-200/40 sm:block"
                  />
                  <div>
                    <p className="font-semibold text-white text-xl">
                      AgriTrade model
                    </p>
                    <p className="text-green-100/90 text-sm">
                      Farmer -&gt; Platform -&gt; Buyer (middleman optional)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 lg:-mr-6 lg:pl-6">
              <div className="rounded-3xl border border-lime-100/20 bg-linear-to-br from-green-950/94 via-green-900/70 to-green-950/94 p-5 shadow-[0_20px_50px_rgba(5,30,20,0.45)] backdrop-blur-xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-2xl text-white">
                    Live Price Board
                  </h3>
                  <p className="mt-1 text-green-100/85 text-sm">
                    Updated every 60s
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {livePrices.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center justify-between rounded-xl bg-linear-to-r from-green-900/60 via-green-900/40 to-green-900/60 px-4 py-3"
                    >
                      <span className="font-medium text-green-50">
                        {item.product}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-50">
                          {item.price}
                        </span>
                        <span
                          className={`font-semibold ${trendClass(item.trend)}`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <p className="text-green-100/72">Reference prices</p>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <span className="inline-block size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent via-amber-50/12 to-amber-50/55" />
      </div>
    </section>
  );
}
