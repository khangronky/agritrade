import { CirclePlay, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function VideoGuideSection() {
  return (
    <section id="video-guide" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-emerald-500/20 bg-zinc-950/85 p-5 shadow-sm sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-emerald-500/20">
            <Image
              src="/farm.jpg"
              alt="Video guide preview for AgriTrade onboarding"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 56vw"
            />
            <div className="absolute inset-0 bg-zinc-950/55" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CirclePlay className="size-16 text-zinc-100 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] sm:size-20" />
            </div>
          </div>

          <div>
            <p className="font-semibold text-emerald-200 text-sm uppercase tracking-[0.18em]">
              Video Guide
            </p>
            <h2 className="mt-3 font-semibold text-3xl text-zinc-100 sm:text-4xl">
              Watch the quick onboarding walkthrough
            </h2>
            <p className="mt-4 text-zinc-300/90 leading-relaxed">
              This guide explains how to set up listings, compare market
              signals, and complete your first transaction flow in AgriTrade.
            </p>
            <div className="mt-6">
              <Button
                asChild
                className="border border-emerald-500/30 bg-emerald-500/15 font-semibold text-emerald-200 hover:bg-emerald-500/22"
              >
                <Link href="/about-us">
                  Open guide
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

