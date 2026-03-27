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
    <div className="relative overflow-hidden bg-[#f5f8ef] text-[#1d3706]">
      <AboutUsHeroSection />
      <AboutUsMissionSection />
      <AboutUsChallengesSection />
      <AboutUsSolutionSection />
      <AboutUsFutureVisionSection />
    </div>
  );
}
