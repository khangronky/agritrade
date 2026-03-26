import { Sprout } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
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
                Farmers and Traders
                <br />
                Trusted market information
              </p>

              <div className="mt-7 inline-flex rounded-full bg-[#89d70f] px-7 py-3 font-semibold text-[#2f4909] text-sm uppercase tracking-[0.08em] sm:text-base">
                Before plant, grow, and sell.
              </div>

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
          <div className="mt-6 space-y-3 pl-1 font-semibold text-[#1c3200] text-base uppercase leading-tight sm:mt-7 sm:pl-28 sm:text-[2rem]">
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
              AgriTrade helps agriculture communities make better selling
              decisions before each season starts. We bring pricing signals,
              demand updates, and practical market standards into one trusted
              place.
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
          <h2 className="font-extrabold text-5xl text-[#64ad06] uppercase leading-[0.92] sm:text-7xl">
            Business
            <br />
            Model
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[28px] border border-[#cce4a8] bg-white p-5 text-[#4f6640] shadow-[0_12px_24px_rgba(131,188,40,0.14)]">
              <p className="font-semibold text-base leading-relaxed">
                Farmers list available yield and receive demand directly from
                traders, cooperatives, and buyers in the same workflow.
              </p>
            </article>

            <div className="relative aspect-16/11 overflow-hidden rounded-[28px] border border-[#cee5ad]">
              <Image
                src="/farm.jpg"
                alt="Farmer harvesting crops in a green field"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <article className="rounded-[28px] border border-[#cce4a8] bg-white p-5 text-[#4f6640] shadow-[0_12px_24px_rgba(131,188,40,0.14)]">
              <p className="font-semibold text-base leading-relaxed">
                Price and quality information is updated continuously so every
                participant can compare alternatives before committing.
              </p>
            </article>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-4xl bg-[#f0de00] p-6 font-semibold text-[#4c5207] text-base leading-relaxed">
              AgriTrade supports multiple execution paths: direct buyer
              transactions, middleman-supported logistics, and phased delivery
              models adapted to real farm conditions.
            </article>

            <div className="relative aspect-16/11 overflow-hidden rounded-[28px] border border-[#cee5ad]">
              <Image
                src="/about-us/slide-7.jpg"
                alt="Farmers inspecting crop quality before market delivery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 28vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="step-to-step" className="scroll-mt-20 py-14">
        <div className="mx-auto max-w-1140px px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-extrabold text-4xl text-[#68b308] uppercase sm:text-5xl">
            Explore Platform
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
            <article className="flex h-full w-full items-center rounded-[28px] bg-[#87d80d] p-5 text-[#2d4d03] shadow-[0_12px_20px_rgba(122,182,30,0.18)] sm:p-6">
              <p className="font-semibold text-lg leading-relaxed sm:text-xl">
                Explore live boards, compare price movement across commodities,
                and track field-level updates from farmers in real time.
              </p>
            </article>

            <div className="w-full min-w-0">
              <ExplorePlatformSlideshow />
            </div>
          </div>
        </div>

        <div className="mt-14 bg-[#8de007] py-16">
          <div className="mx-auto -mt-8 max-w-[920px] px-4 sm:px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[42px] border-4 border-[#f5f8ef] shadow-[0_18px_34px_rgba(84,137,18,0.25)]">
              <Image
                src="/about-us/slide-8.jpg"
                alt="Two farmers harvesting together on a tea plantation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 76vw"
              />
            </div>
            <p className="mt-8 text-center text-[#eaf7d5] text-lg leading-relaxed">
              The platform is designed for practical action: discover demand,
              verify pricing, align quality expectations, and close deals with
              fewer surprises for every side.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
