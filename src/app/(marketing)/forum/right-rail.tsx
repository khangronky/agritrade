import { ChevronRight, ClipboardList } from 'lucide-react';
import { forumOverviewItems, forumRfq } from './mock-data';

export function RightRail() {
  return (
    <aside className="space-y-4">
      <section className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <p className="font-medium text-sm">Me</p>
        <p className="mt-2 text-xs leading-relaxed">
          Sign in or join AgriTrade to personalize your feed. Interested in what
          we offer? Click here to find out.
        </p>
        <button
          type="button"
          className="mt-2 font-semibold text-lime-700 text-xs hover:text-primary"
        >
          Sign in
        </button>
      </section>

      <section className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <p className="font-medium text-sm">Market Overviews</p>
        <p className="mt-2 text-xs leading-relaxed">
          Discover market overviews with key data and insights on products you
          may be interested in.
        </p>

        <ul className="mt-3 space-y-2">
          {forumOverviewItems.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-transparent px-1 py-1 text-sm text-lime-700 hover:border-lime-200 hover:bg-lime-50"
              >
                <span className="flex items-center gap-2">
                  <item.icon className="size-4 text-lime-700" />
                  {item.name}
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <p className="font-medium text-muted-foreground text-sm">
          {forumRfq.title}
        </p>
        <p className="mt-2 text-xs leading-relaxed">{forumRfq.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            className="font-semibold text-lime-700 text-xs hover:text-primary"
          >
            {forumRfq.actionLabel}
          </button>
          <ClipboardList className="size-5 text-muted-foreground" />
        </div>
      </section>
    </aside>
  );
}
