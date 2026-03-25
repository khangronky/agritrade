import {
  BarChart3,
  Handshake,
  type LucideIcon,
  Search,
  Truck,
  Unplug,
} from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SolutionCard = {
  title: string;
  badge: string;
  description: string;
  points: string[];
  imagePosition: string;
  overlayClass: string;
  icon: LucideIcon;
};

const solutionCards: SolutionCard[] = [
  {
    title: 'Market Transparency',
    badge: 'Target 1',
    description: 'Farmers see the real market before accepting a deal.',
    points: ['Real-time regional prices', 'Clear up/down trend indicators'],
    imagePosition: 'object-center',
    overlayClass: 'from-green-950/70 via-green-900/40 to-transparent',
    icon: BarChart3,
  },
  {
    title: 'Lower Search Effort',
    badge: 'Target 2',
    description: 'Buyers and middlemen can push offers directly to farmers.',
    points: [
      'Quick listing with minimal input',
      'Simple notifications for new offers',
    ],
    imagePosition: 'object-[center_35%]',
    overlayClass: 'from-lime-950/70 via-green-800/35 to-transparent',
    icon: Search,
  },
  {
    title: 'Choice and Flexibility',
    badge: 'Target 3',
    description:
      'Farmers compare options in one place without forced behavior change.',
    points: [
      'Direct-to-buyer or via middleman',
      'Compare multiple offers side by side',
    ],
    imagePosition: 'object-[center_45%]',
    overlayClass: 'from-green-950/70 via-emerald-900/35 to-transparent',
    icon: Handshake,
  },
  {
    title: 'Lower Operational Burden',
    badge: 'Target 4',
    description: 'Selling does not have to add logistics and admin complexity.',
    points: [
      'Lean listing flow for busy farmers',
      'External logistics or middleman delivery',
    ],
    imagePosition: 'object-[center_30%]',
    overlayClass: 'from-emerald-950/70 via-lime-900/35 to-transparent',
    icon: Truck,
  },
  {
    title: 'More Competitive Market',
    badge: 'Target 5',
    description:
      'The same supply can reach multiple buyers to improve pricing power.',
    points: [
      'Reduced dependency on single channels',
      'Better price discovery through competition',
    ],
    imagePosition: 'object-[center_55%]',
    overlayClass: 'from-green-950/70 via-green-900/35 to-transparent',
    icon: Unplug,
  },
];

export function SolutionsSection() {
  return (
    <section id="business-model" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="border-green-300 bg-green-100 text-green-800"
        >
          Business Model
        </Badge>

        <h2 className="mt-5 max-w-3xl font-semibold text-3xl text-green-950 sm:text-4xl">
          How AgriTrade creates value across the agricultural market
        </h2>

        <p className="mt-4 max-w-3xl text-base text-green-800/85 sm:text-lg">
          The platform improves transparency, match quality, and execution
          flexibility so farmers, buyers, and middlemen can collaborate with
          better outcomes.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutionCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="overflow-hidden rounded-2xl border border-green-200 bg-green-950 py-0 text-green-50 shadow-md"
              >
                <div className="relative h-40">
                  <Image
                    src="/farm.jpg"
                    alt={`Agriculture scene for ${card.title}`}
                    fill
                    className={`object-cover ${card.imagePosition}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${card.overlayClass}`}
                  />
                  <Badge className="absolute top-4 left-4 border-lime-200/60 bg-lime-300/90 font-semibold text-green-950">
                    {card.badge}
                  </Badge>
                </div>

                <CardHeader className="gap-3 px-5 pt-5">
                  <div className="flex items-center gap-2 text-lime-200">
                    <Icon className="size-4" />
                    <span className="font-medium text-xs uppercase tracking-[0.2em]">
                      AgriTrade
                    </span>
                  </div>
                  <CardTitle className="text-lime-100 text-xl">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-green-100/90">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-5 pb-6">
                  <ul className="space-y-2 text-green-100 text-sm">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-lime-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
