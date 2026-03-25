import {
  ClipboardList,
  Handshake,
  type LucideIcon,
  SearchCheck,
  WalletCards,
} from 'lucide-react';
import Image from 'next/image';

type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const workflowSteps: WorkflowStep[] = [
  {
    title: 'Step 1: List or publish demand',
    description:
      'Farmers post available yield while buyers and partners publish demand signals.',
    icon: ClipboardList,
  },
  {
    title: 'Step 2: Compare real market offers',
    description:
      'Participants view transparent price ranges and available counterparties before committing.',
    icon: SearchCheck,
  },
  {
    title: 'Step 3: Confirm route and terms',
    description:
      'Choose direct buyer execution or middleman-assisted delivery based on real constraints.',
    icon: Handshake,
  },
  {
    title: 'Step 4: Close and settle',
    description:
      'Complete deal fulfillment with clearer expectations on quantity, timing, and payment.',
    icon: WalletCards,
  },
];

export function StepToStepSection() {
  return (
    <section id="step-to-step" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="group relative aspect-video overflow-hidden rounded-3xl border border-green-200/80 bg-green-100 shadow-sm">
            <Image
              src="/farm.jpg"
              alt="Step-to-step AgriTrade workflow preview"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-green-950/55 via-green-900/10 to-transparent" />
            <div className="absolute right-4 bottom-4 rounded-xl border border-lime-200/40 bg-green-950/75 px-3 py-2 text-lime-100 text-xs tracking-wide sm:text-sm">
              Step by step workflow
            </div>
          </div>

          <div>
            <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.18em]">
              Step to Step
            </p>
            <h2 className="mt-3 font-semibold text-3xl text-green-950 sm:text-4xl">
              How it works in four practical actions
            </h2>

            <div className="mt-6 space-y-3">
              {workflowSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="rounded-2xl border border-green-200/80 bg-white/90 px-4 py-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-lime-100 p-2 text-green-800">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-950 text-sm sm:text-base">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-green-900/80 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
