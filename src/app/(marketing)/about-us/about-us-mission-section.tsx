import { Sprout } from 'lucide-react';

const missionPillars = [
  'What crops to plant.',
  'When to sell.',
  'The fair price at which to negotiate.',
];

export function AboutUsMissionSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-lime-200 bg-lime-50 p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:p-8">
          <div>
            <p className="font-semibold text-lime-700 text-sm uppercase tracking-[0.18em]">
              Our Mission
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Deliver accurate, timely, and actionable market intelligence that
              empowers every participant in the agricultural supply chain to
              make smarter decisions.
            </p>
          </div>

          <div className="space-y-3">
            {missionPillars.map((pillar) => (
              <div
                key={pillar}
                className="flex items-start gap-3 rounded-xl border border-lime-200 bg-lime-50 px-4 py-3"
              >
                <Sprout className="mt-0.5 size-4 shrink-0 text-lime-700" />
                <p className="font-medium text-lime-700 text-sm sm:text-base">
                  {pillar}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
