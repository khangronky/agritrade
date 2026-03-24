import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeLiveUpdatesPanel } from './home-live-updates-panel';
import { LivePriceBoard } from './live-price-board';
import { LiveUserCount } from './live-user-count';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-350 px-4 pt-14 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(460px,520px)] xl:items-start">
          <div className="max-w-3xl lg:pt-4 lg:pl-8 xl:pt-6 xl:pl-14">
            <h1 className="font-semibold text-5xl text-slate-900 leading-none sm:text-6xl lg:text-7xl">
              <LiveUserCount className="text-amber-500" />
              <br />
              USERS
              <br />
              TRUST US
            </h1>

            <p className="mt-6 text-2xl text-slate-800 sm:text-3xl">
              The first organization in ASEAN to do this
            </p>

            <div className="mt-7 flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <LaurelMetric label="Customer Assets" />
              <LaurelMetric label="Trading Volume" />
            </div>

            <div className="mt-7 flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Email/Phone number"
                className="h-9 flex-1 rounded-lg border border-emerald-300/70 bg-white/90 px-3 text-slate-800 text-xs placeholder:text-slate-500/90 focus:border-amber-400/70 focus:outline-hidden"
              />
              <Button
                asChild
                size="lg"
                className="h-9 min-w-32 rounded-lg bg-amber-400 font-semibold text-base text-slate-950 transition-colors hover:bg-amber-300 sm:min-w-30"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 flex w-full max-w-130 flex-col gap-3 xl:mt-0">
            <LivePriceBoard compact />
            <HomeLiveUpdatesPanel compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function LaurelMetric({ label }: { label: string }) {
  return (
    <div className="group flex min-w-0 flex-1 items-center justify-center gap-2 sm:gap-3">
      <Laurel />
      <div className="text-center">
        <p className="font-semibold text-amber-500 text-xl leading-none transition-all duration-300 group-hover:text-amber-600 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.35)] sm:text-2xl">
          No.1
        </p>
        <p className="mt-0.5 font-medium text-amber-500 text-xs transition-colors duration-300 group-hover:text-amber-600 sm:text-sm">
          {label}
        </p>
      </div>
      <Laurel reverse />
    </div>
  );
}

function Laurel({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-0.5 text-amber-500/90 transition-colors duration-300 group-hover:text-amber-600 ${reverse ? '-scale-x-100' : ''}`}
    >
      <Leaf className="size-3 -rotate-45 transition-transform duration-300 group-hover:-rotate-52 group-hover:scale-110 sm:size-4" />
      <Leaf className="size-3 -rotate-12 transition-transform duration-300 group-hover:-rotate-18 group-hover:scale-110 sm:size-4" />
      <Leaf className="size-3 rotate-12 transition-transform duration-300 group-hover:rotate-18 group-hover:scale-110 sm:size-4" />
    </div>
  );
}
