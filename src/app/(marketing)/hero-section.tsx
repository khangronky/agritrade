import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const trustSignals = [
  {
    metric: '15% lower price',
    detail:
      'Typical gap when farmers sell through middlemen instead of direct buyers.',
  },
  {
    metric: '97% pre-agreed pricing',
    detail:
      'Most middleman-based sales lock pricing early, limiting upside from better market days.',
  },
  {
    metric: '68% still depend on middlemen',
    detail:
      'AgriTrade keeps middlemen optional while opening direct access and offer comparison.',
  },
];

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
          <Badge className="border-lime-300/60 bg-lime-300/20 text-lime-100 hover:bg-lime-300/20">
            Agriculture Market Reset
          </Badge>

          <h1 className="mt-6 max-w-3xl font-semibold text-4xl text-white leading-tight sm:text-5xl lg:text-6xl">
            Farmers should not lose value before their crops reach the market.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-green-100/95 sm:text-lg">
            Many small farmers still earn less because middleman dependency,
            weak bargaining power, and pre-agreed pricing reduce their market
            options. AgriTrade introduces transparent offers and keeps delivery
            pathways flexible without disrupting existing relationships.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brand-lime font-semibold text-green-950 hover:bg-lime-300"
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
              className="border-lime-200/60 bg-green-950/30 text-lime-100 backdrop-blur-sm hover:bg-lime-100/15 hover:text-lime-50"
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

        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trustSignals.map((signal) => (
            <div
              key={signal.metric}
              className="rounded-xl border border-green-900/15 bg-white/35 p-4 shadow-sm backdrop-blur"
            >
              <p className="font-semibold text-green-300 text-md uppercase">
                {signal.metric}
              </p>
              <p className="mt-1 text-green-950/85 text-sm">{signal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
