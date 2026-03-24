import { AboutUsChallengesSection } from './about-us-challenges-section';
import { AboutUsFutureVisionSection } from './about-us-future-vision-section';
import { AboutUsHeroSection } from './about-us-hero-section';
import { AboutUsMissionSection } from './about-us-mission-section';
import { AboutUsSolutionSection } from './about-us-solution-section';

export default function AboutUsPage() {
  return (
    <div className="overflow-hidden bg-linear-to-b from-emerald-50 via-green-50 to-lime-50 text-green-950">
      <AboutUsHeroSection />
      <AboutUsMissionSection />
      <AboutUsChallengesSection />
      <AboutUsSolutionSection />
      <AboutUsFutureVisionSection />
    </div>
  );
}
