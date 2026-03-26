import type { Metadata } from 'next';
import { AboutUsChallengesSection } from './about-us-challenges-section';
import { AboutUsFutureVisionSection } from './about-us-future-vision-section';
import { AboutUsHeroSection } from './about-us-hero-section';
import { AboutUsMissionSection } from './about-us-mission-section';
import { AboutUsSolutionSection } from './about-us-solution-section';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function AboutUsPage() {
  return (
    <div className="overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-100">
      <AboutUsHeroSection />
      <AboutUsMissionSection />
      <AboutUsChallengesSection />
      <AboutUsSolutionSection />
      <AboutUsFutureVisionSection />
    </div>
  );
}

