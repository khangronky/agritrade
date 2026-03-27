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
    <section className="relative border-lime-200 border-b pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(184,221,134,0.25),transparent_40%),radial-gradient(circle_at_86%_14%,rgba(155,203,74,0.2),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-center lg:px-8">
        <div>
          <Badge className="border-lime-200 bg-lime-50 text-muted-foreground">
            About Us
          </Badge>
          <h1 className="mt-5 max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
            AgriTrade: Unleashing the Power of Agricultural Data
          </h1>
          <p className="mt-6 max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            AgriTrade is founded on a profound belief: every farmer deserves
            transparency and fairness. We are a pioneering AgriTech team
            committed to ending the information asymmetry that has held back
            millions of small and medium-scale farmers for years.
          </p>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed">
            We are not building hype. We are building trust so each harvest can
            realize its true value.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="border border-lime-200 bg-lime-100 font-semibold text-lime-700 hover:bg-lime-100"
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
