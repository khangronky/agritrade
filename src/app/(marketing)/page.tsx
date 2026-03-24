import { AboutSection } from './about-section';
import { HeroSection } from './hero-section';
import { SolutionsSection } from './solutions-section';

export default function MarketingPage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-green-50 to-amber-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-100/70 via-green-50/35 to-amber-100/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(16,185,129,0.18),transparent_36%),radial-gradient(circle_at_72%_20%,rgba(132,204,22,0.16),transparent_32%),radial-gradient(circle_at_60%_72%,rgba(234,179,8,0.12),transparent_36%)]" />

      <div className="relative">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
      </div>
    </div>
  );
}
