import { AboutSection } from './about-section';
import { HeroSection } from './hero-section';
import { SolutionsSection } from './solutions-section';

export default function MarketingPage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
    </div>
  );
}
