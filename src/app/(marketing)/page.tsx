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
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f8ef] pt-16 text-[#1d3706]">
      <div className="w-full">
        <div className="overflow-hidden border border-[#d9e8c6] bg-[#f5f8ef]">
          <section id="main" className="scroll-mt-20 px-4 py-7 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-305">
              <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-none border border-[#c8dda8] bg-[#fbfdf8] px-6 py-7 shadow-[0_10px_28px_rgba(120,170,36,0.1)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(120,170,36,0.14)] sm:px-8 sm:py-9">
                  <p className="font-medium text-[#64ad06] text-[11px] uppercase tracking-[0.24em]">
                    [Home]
                  </p>
                  <p className="mt-3 font-bold text-4xl text-[#6db40e] leading-none tracking-tight sm:text-6xl">
                    <LiveUserCount className="text-[#6db40e]" />
                  </p>
                  <p className="mt-4 max-w-md font-semibold text-[#2f480b] text-xl sm:text-3xl">
                    farmers and traders trust our data
                  </p>

                  <div className="mt-7 inline-flex rounded-none border border-[#b8da84] bg-[#edf6dc] px-6 py-2.5 font-semibold text-[#3f620a] text-xs uppercase tracking-[0.1em] sm:text-sm">
                    Before plant, grow, and sell
                  </div>

                  <p className="mt-5 max-w-md text-[#4f6640] text-sm leading-relaxed sm:text-base">
                    A data platform bringing real-time agricultural market
                    insights across ASEAN.
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

          <section className="border-[#d7e7c2] border-t px-4 py-7 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-305">
              <p className="font-semibold text-[#64ad06] text-[11px] uppercase tracking-[0.22em]">
                * Farmer Outcomes
              </p>
              <h2 className="mt-3 flex items-center gap-3 font-black text-4xl text-[#64ad06] uppercase leading-none tracking-[0.06em] sm:text-6xl">
                <Sprout className="size-10 text-[#7cc313] sm:size-14" />
                We Help Farmers
              </h2>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.32fr_0.68fr]">
                <p className="max-w-sm text-[#4f6640] text-sm leading-relaxed sm:text-base">
                  Practical intelligence for each crop cycle, from planning to
                  pricing.
                </p>
                <div className="grid gap-3">
                  {helpPoints.map((point) => (
                    <p
                      key={point}
                      className="border border-[#d0e6af] bg-white px-4 py-2 font-medium text-[#2f480b] text-sm leading-snug transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#b8da84] hover:bg-[#f8ffe8] hover:shadow-[0_8px_18px_rgba(127,181,44,0.12)] sm:text-[1.35rem]"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about-us" className="scroll-mt-20 border-[#d7e7c2] border-t px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-305 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="relative aspect-video overflow-hidden border border-[#d0e6af] bg-white shadow-[0_10px_24px_rgba(127,181,44,0.14)]">
                <Image
                  src="/about-us/slide-3.jpg"
                  alt="Vietnamese tea farmers harvesting in highland fields"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <div className="relative">
                <p className="font-semibold text-[#64ad06] text-[11px] uppercase tracking-[0.22em]">
                  * About us
                </p>
                <h2 className="mt-2 font-extrabold text-5xl text-[#67b306] sm:text-6xl">
                  ABOUT US
                </h2>
                <p className="mt-4 text-[#546a39] text-lg leading-relaxed">
                  AgriTrade is an AI-driven platform that provides real-time
                  market prices, demand insights, and direct connections between
                  farmers and buyers. By making market information transparent
                  and accessible, we help all participants within ASEAN-China
                  make better decisions.
                </p>
              </div>
            </div>
          </section>

          <section id="business-model" className="scroll-mt-20 border-[#d7e7c2] border-t px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-305">
              <p className="font-semibold text-[#64ad06] text-[11px] uppercase tracking-[0.22em]">
                * Business Model
              </p>
              <h2 className="mt-2 font-extrabold text-5xl text-[#64ad06] uppercase leading-[0.92] sm:text-7xl">
                Business
                <br />
                Model
              </h2>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-0">
                <div className="relative h-60 overflow-hidden border border-[#cee5ad] bg-white sm:h-72 lg:h-[290px]">
                  <Image
                    src="/business-model-insights.jpg"
                    alt="Aerial farmland with market and analytics overlays"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <article className="border border-[#cee5ad] bg-white px-4 py-4 text-[#4f6640] sm:px-6">
                  <span className="mb-3 block h-0.5 w-14 bg-[#9dcf4f]" />
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
                <article className="border border-[#cee5ad] bg-white px-4 py-4 text-[#4c5207] sm:px-6">
                  <span className="mb-3 block h-0.5 w-16 bg-[#d3be0a]" />
                  <h3 className="font-semibold text-base leading-snug sm:text-[1.08rem]">
                    Share with All Market Participants
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed sm:text-base">
                    Farmers, traders, and businesses access the same
                    information, enabling fairer and more efficient
                    transactions.
                  </p>
                </article>

                <div className="relative h-60 overflow-hidden border border-[#cee5ad] bg-white sm:h-72 lg:h-[290px]">
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

          <section id="step-to-step" className="scroll-mt-20 border-[#d7e7c2] border-t px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-1140px">
              <p className="text-center font-semibold text-[#64ad06] text-[11px] uppercase tracking-[0.22em]">
                * Platform Walkthrough
              </p>
              <h2 className="mt-2 text-center font-extrabold text-4xl text-[#68b308] uppercase sm:text-5xl">
                Explore our Platform
              </h2>

              <div className="mt-7">
                <div className="mx-auto w-full min-w-0 max-w-5xl">
                  <ExplorePlatformSlideshow />
                </div>
              </div>
            </div>

            <div className="mt-12 border-[#d7e7c2] border-t pt-10">
              <div className="mx-auto max-w-230 px-4 sm:px-6">
                <div className="mx-auto max-w-3xl text-center">
                  <h3 className="font-extrabold text-3xl text-[#68b308] sm:text-4xl">
                    See How It Works in Action
                  </h3>
                  <p className="mt-4 text-[#4f6640] text-lg leading-relaxed">
                    A quick walkthrough of how farmers and traders use AgriTrade
                    to make better decisions.
                  </p>
                </div>

                <div className="relative mt-8 aspect-video overflow-hidden border border-[#d0e6af] bg-white shadow-[0_16px_30px_rgba(84,137,18,0.2)]">
                  <video
                    controls
                    preload="metadata"
                    poster="/about-us/slide-8.jpg"
                    className="h-full w-full object-cover"
                  >
                    <source src="/about-us/how-it-works.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="mt-8 flex justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center rounded-full border border-[#b8da84] bg-[#ecf9d8] px-5 py-2.5 font-semibold text-[#3f620a] text-base"
                  >
                    Start using AgriTrade today -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
