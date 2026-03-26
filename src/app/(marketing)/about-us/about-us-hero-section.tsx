import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { StaticImageFrame } from './static-image-slot';
import StaticImageSlot from './static-image-slot';

const staticImage: StaticImageFrame = {
  src: '/farm.jpg',
  alt: 'Agricultural landscape with farmers working in the field.',
};

export function AboutUsHeroSection() {
  return (
    <section className="relative border-emerald-500/20 border-b pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(0,0,0,0.8),transparent_38%),radial-gradient(circle_at_85%_12%,rgba(0,0,0,0.72),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-center lg:px-8">
        <div>
          <Badge className="border-emerald-400/30 bg-zinc-900/70 text-zinc-300">
            About Us
          </Badge>
          <h1 className="mt-5 max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
            AgriTrade: Unleashing the Power of Agricultural Data
          </h1>
          <p className="mt-6 max-w-3xl text-base text-zinc-300/90 leading-relaxed sm:text-lg">
            AgriTrade is founded on a profound belief: every farmer deserves
            transparency and fairness. We are a pioneering AgriTech team
            committed to ending the information asymmetry that has held back
            millions of small and medium-scale farmers for years.
          </p>
          <p className="mt-4 max-w-3xl text-base text-zinc-300/85 leading-relaxed">
            We are not building hype. We are building trust so each harvest can
            realize its true value.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="border border-emerald-500/30 bg-emerald-500/15 font-semibold text-emerald-200 hover:bg-emerald-500/22"
            >
              <Link href="/register">
                Join AgriTrade
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <StaticImageSlot image={staticImage} />
      </div>
    </section>
  );
}
