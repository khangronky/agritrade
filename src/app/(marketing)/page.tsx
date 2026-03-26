import type { Metadata } from 'next';
import { AboutSection } from './about-section';
import { ContactInfoSection } from './contact-info-section';
import { HeroSection } from './hero-section';
import { SolutionsSection } from './solutions-section';
import { StepToStepSection } from './step-to-step-section';
import { VideoGuideSection } from './video-guide-section';

export const metadata: Metadata = {
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketingPage() {
  return (
    <div className="relative isolate overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-zinc-900/70 via-zinc-900/35 to-zinc-900/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(16,185,129,0.18),transparent_36%),radial-gradient(circle_at_72%_20%,rgba(132,204,22,0.16),transparent_32%),radial-gradient(circle_at_60%_72%,rgba(234,179,8,0.12),transparent_36%)]" />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <StepToStepSection />
        <VideoGuideSection />
        <ContactInfoSection />
      </div>
    </div>
  );
}

