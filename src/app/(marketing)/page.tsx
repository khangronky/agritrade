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
    <div className="relative overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <StepToStepSection />
      <VideoGuideSection />
      <ContactInfoSection />
    </div>
  );
}
