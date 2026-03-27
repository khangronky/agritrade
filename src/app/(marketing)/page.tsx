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
    <div className="bg-[#f5f8ef] text-[#1d3706]">
      <section
        id="main"
        className="scroll-mt-20 border-[#d9e8c6] border-b pt-24 pb-14"
      >
        <div className="mx-auto max-w-305 px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative rounded-4xl border border-[#d1e6af] bg-white px-6 py-7 shadow-[0_16px_34px_rgba(127,181,44,0.18)] sm:px-8 sm:py-9">
              <p className="font-bold text-4xl text-[#6db40e] leading-none tracking-tight sm:text-6xl">
                <LiveUserCount className="text-[#6db40e]" />
              </p>
              <p className="mt-4 max-w-md font-semibold text-[#2f480b] text-xl sm:text-3xl">
                farmers and traders trust our data
              </p>

              <div className="mt-7 inline-flex rounded-full bg-[#89d70f] px-7 py-3 font-semibold text-[#2f4909] text-sm uppercase tracking-[0.08em] sm:text-base">
                Before plant, grow, and sell.
              </div>

              <p className="mt-5 max-w-md text-[#516838] text-sm leading-relaxed sm:text-base">
                A data platform bringing real-time agricultural market insights
                across ASEAN
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

      <section className="relative border-[#d7e7c2] border-y bg-[#86da05] pt-14 pb-10 sm:pt-16 sm:pb-11">
        <div className="absolute -top-5 left-0 z-20">
          <div className="inline-flex items-end gap-2 rounded-r-3xl border border-[#d7e7c2] border-l-0 bg-[#f5f8ef] px-4 py-1.5 shadow-[0_4px_0_rgba(88,145,16,0.35)] sm:px-7">
            <Sprout
              className="mb-0.5 size-11 text-[#7cc313] sm:size-16"
              strokeWidth={2.5}
            />
            <h2 className="font-black text-3xl text-[#6db80d] uppercase leading-none tracking-[0.08em] [text-shadow:0_2px_0_rgba(26,48,0,0.45)] sm:text-6xl">
              We Help Farmers
            </h2>
          </div>
        </div>

        <div className="relative mx-auto max-w-305 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 space-y-2.5 pl-1 font-medium text-[#1f3800] text-sm leading-snug tracking-[0.02em] sm:mt-7 sm:pl-28 sm:text-[1.6rem] lg:text-[1.75rem]">
            {helpPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="scroll-mt-20 py-16">
        <div className="mx-auto grid max-w-305 gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-[42px] border border-[#d0e6af] bg-white shadow-[0_14px_28px_rgba(137,196,50,0.16)]">
            <Image
              src="/about-us/slide-3.jpg"
              alt="Vietnamese tea farmers harvesting in highland fields"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="relative">
            <h2 className="font-extrabold text-5xl text-[#67b306] sm:text-6xl">
              ABOUT US
            </h2>
            <p className="mt-4 text-[#546a39] text-lg leading-relaxed">
              AgriTrade is a AI-driven platform that provides real-time market
              prices, demand insights, and direct connections between farmers
              and buyers. By making market information transparent and
              accessible, we help all participants within ASEAN-China make
              better decisions.
            </p>
            <div className="absolute top-1 -right-10 hidden h-[calc(100%-0.25rem)] flex-col items-center lg:flex">
              <Sprout className="size-6 text-[#74c010]" strokeWidth={2.4} />
              <span className="mt-4 flex-1 border-[#84cb21] border-l" />
            </div>
          </div>
        </div>
      </section>

      <section id="business-model" className="scroll-mt-20 pb-14">
        <div className="mx-auto max-w-305 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h2 className="font-extrabold text-5xl text-[#64ad06] uppercase leading-[0.92] sm:text-7xl">
              Business
              <br />
              Model
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-0">
            <div className="relative h-60 overflow-hidden rounded-[28px] border border-[#cee5ad] sm:h-72 lg:h-[290px] lg:rounded-br-none">
              <Image
                src="/business-model-insights.jpg"
                alt="Aerial farmland with market and analytics overlays"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <article className="h-fit px-2 py-1 text-[#4f6640] sm:px-3">
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

          <div className="mt-4 grid gap-4 lg:mt-0 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-0">
            <article className="h-fit px-2 py-2 text-[#4c5207] sm:px-3">
              <span className="mb-3 block h-0.5 w-16 bg-[#d3be0a]" />
              <h3 className="font-semibold text-base leading-snug sm:text-[1.08rem]">
                Share with All Market Participants
              </h3>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">
                Farmers, traders, and businesses access the same information,
                enabling fairer and more efficient transactions.
              </p>
            </article>

            <div className="relative h-60 overflow-hidden rounded-[28px] border border-[#cee5ad] sm:h-72 lg:h-[290px] lg:rounded-tl-none">
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

      <section id="step-to-step" className="scroll-mt-20 py-14">
        <div className="mx-auto max-w-1140px px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-extrabold text-4xl text-[#68b308] uppercase sm:text-5xl">
            Explore our Platform
          </h2>

          <div className="mt-7">
            <div className="mx-auto w-full min-w-0 max-w-5xl">
              <ExplorePlatformSlideshow />
            </div>
          </div>
        </div>

        <div className="mt-14 bg-[#f5f8ef] py-16">
          <div className="mx-auto -mt-8 max-w-230 px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-extrabold text-3xl text-[#68b308] sm:text-4xl">
                See How It Works in Action
              </h3>
              <p className="mt-4 text-[#4f6640] text-lg leading-relaxed">
                A quick walkthrough of how farmers and traders use AgriTrade to
                make better decisions.
              </p>
            </div>

            <div className="relative mt-8 aspect-video overflow-hidden rounded-[42px] border-4 border-[#f5f8ef] shadow-[0_18px_34px_rgba(84,137,18,0.25)]">
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
                Start using AgriTrade today →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
