import { Sprout } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExplorePlatformSlideshow } from './explore-platform-slideshow';
import { HomeLiveUpdatesPanel } from './home-live-updates-panel';
import { HomepageSignupCta } from './homepage-signup-cta';
import { LivePriceBoard } from './live-price-board';
import { LiveUserCount } from './live-user-count';

export const metadata: Metadata = {
  description:
    "Explore live market trends, discover demand signals, and trade with confidence on AgriTrade's transparent agriculture marketplace.",
};

const helpPoints = [
  'Know market demand before you plant',
  'Understand export standards before you grow',
  'See real market prices before you sell',
];

export default function MarketingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden pt-16">
      <section id="main" className="scroll-mt-20 px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-305">
          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-none border border-lime-200 bg-lime-50 px-6 py-7 shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-9">
              <p className="font-medium text-[11px] text-primary uppercase tracking-[0.24em]">
                [Home]
              </p>
              <p className="mt-3 font-bold text-4xl text-primary leading-none tracking-tight sm:text-6xl">
                <LiveUserCount className="text-primary" />
              </p>
              <p className="mt-4 max-w-md font-semibold text-lime-950 text-xl sm:text-3xl">
                farmers and traders trust our data
              </p>

              <div className="mt-7 inline-flex rounded-none border border-lime-300 bg-lime-100 px-7 py-3 font-semibold text-lime-700 text-sm uppercase tracking-[0.1em] sm:text-base">
                Before plant, grow, and sell
              </div>

              <p className="mt-5 max-w-md text-muted-foreground text-sm leading-relaxed sm:text-base">
                A data platform bringing real-time agricultural market insights
                across ASEAN.
              </p>

              <HomepageSignupCta />
            </div>

            <div className="space-y-4">
              <LivePriceBoard compact theme="light" />
              <HomeLiveUpdatesPanel compact theme="light" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-lime-200 border-t px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-305">
          <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
            * Farmer Outcomes
          </p>
          <h2 className="mt-3 flex items-center gap-3 font-black text-4xl text-primary uppercase leading-none tracking-[0.06em] sm:text-6xl">
            <Sprout className="size-10 text-primary sm:size-14" />
            We Help Farmers
          </h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.32fr_0.68fr]">
            <p className="max-w-sm text-muted-foreground text-sm leading-relaxed sm:text-base">
              Practical intelligence for each crop cycle, from planning to
              pricing.
            </p>
            <div className="grid gap-3">
              {helpPoints.map((point) => (
                <p
                  key={point}
                  className="border border-lime-200 bg-white px-4 py-2 font-medium text-lime-950 text-sm leading-snug transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-50 hover:shadow-md sm:text-[1.35rem]"
                >
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-us"
        className="scroll-mt-20 border-lime-200 border-t px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-305 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-video overflow-hidden border border-lime-200 bg-white shadow-md">
            <Image
              src="/about-us/vision-mission-8.jpg"
              alt="Aerial farmland with market and analytics overlays"
              fill
              quality={100}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="relative">
            <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
              * About us
            </p>
            <h2 className="mt-2 font-extrabold text-5xl text-primary sm:text-6xl">
              ABOUT US
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              AgriTrade is an AI-driven platform that provides real-time market
              prices, demand insights, and direct connections between farmers
              and buyers. By making market information transparent and
              accessible, we help all participants within ASEAN-China make
              better decisions.
            </p>
            <Link
              href="/about-us"
              className="mt-6 inline-flex items-center rounded-none border border-lime-300 bg-lime-100 px-5 py-2.5 font-semibold text-base text-lime-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-lime-400 hover:bg-lime-200 hover:shadow-md"
            >
              Learn more -&gt;
            </Link>
          </div>
        </div>
      </section>

      <section
        id="business-model"
        className="scroll-mt-20 border-lime-200 border-t px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-305">
          <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
            * Business Model
          </p>
          <h2 className="mt-2 font-extrabold text-5xl text-primary uppercase leading-[0.92] sm:text-7xl">
            Business
            <br />
            Model
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-0">
            <div className="relative h-60 overflow-hidden border border-lime-200 bg-white sm:h-72 lg:h-72.5">
              <Image
                src="/business-model-insights.jpg"
                alt="Aerial farmland with market and analytics overlays"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <article className="border border-lime-200 bg-white px-4 py-4 text-muted-foreground sm:px-6">
              <span className="mb-3 block h-0.5 w-14 bg-primary" />
              <h3 className="font-semibold text-base leading-snug sm:text-[1.04rem]">
                Collect Market Data and turn Data into Insights
              </h3>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">
                We aggregate price data, demand signals, and market activity
                from users and diverse sources to analyze trends, providing
                real-time prices and demand forecasts.
              </p>
            </article>
          </div>

          <div className="mt-4 grid gap-4 lg:mt-0 lg:grid-cols-[1fr_1fr] lg:gap-0">
            <article className="border border-lime-200 bg-white px-4 py-4 text-lime-950 sm:px-6">
              <span className="mb-3 block h-0.5 w-16 bg-brand-yellow" />
              <h3 className="font-semibold text-base leading-snug sm:text-[1.08rem]">
                Share with All Market Participants
              </h3>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">
                Farmers, traders, and businesses access the same information,
                enabling fairer and more efficient transactions.
              </p>
            </article>

            <div className="relative h-60 overflow-hidden border border-lime-200 bg-white sm:h-72 lg:h-72.5">
              <Image
                src="/business-model-sharing.jpg"
                alt="Farm machinery and field statistics overlays"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="step-to-step"
        className="scroll-mt-20 border-lime-200 border-t px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-1140px">
          <p className="text-center font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
            * Platform Walkthrough
          </p>
          <h2 className="mt-2 text-center font-extrabold text-4xl text-primary uppercase sm:text-5xl">
            Explore our Platform
          </h2>

          <div className="mt-7">
            <div className="mx-auto w-full min-w-0 max-w-5xl">
              <ExplorePlatformSlideshow />
            </div>
          </div>
        </div>

        <div className="mt-12 border-lime-200 border-t pt-10">
          <div className="mx-auto max-w-230 px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-extrabold text-3xl text-primary sm:text-4xl">
                See How It Works in Action
              </h3>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                A quick walkthrough of how farmers and traders use AgriTrade to
                make better decisions.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full border border-lime-300 bg-lime-100 px-6 py-3 font-semibold text-lg text-lime-700 sm:text-xl"
              >
                Start now -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
