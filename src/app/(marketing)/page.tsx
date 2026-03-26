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
    <div className="relative isolate overflow-hidden bg-black text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(0,0,0,0.82),transparent_36%),radial-gradient(circle_at_72%_20%,rgba(0,0,0,0.74),transparent_32%),radial-gradient(circle_at_60%_72%,rgba(0,0,0,0.68),transparent_36%)]" />

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

