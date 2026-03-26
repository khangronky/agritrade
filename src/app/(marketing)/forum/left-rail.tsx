import Image from 'next/image';
import { forumFeaturedCard, forumPriceInsight } from './mock-data';

export function LeftRail() {
  const isPositiveChange = forumPriceInsight.yoyChangeRate >= 0;

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-emerald-500/20 bg-zinc-950/88 p-3 shadow-sm">
        <p className="font-medium text-emerald-200 text-xs">Featured network</p>

        <article className="mt-2 overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-900/80">
          <Image
            src={forumFeaturedCard.imageSrc}
            alt={forumFeaturedCard.imageAlt}
            width={520}
            height={320}
            className="h-44 w-full object-cover"
          />
          <div className="space-y-2 p-3">
            <p className="font-medium text-sm text-zinc-100 leading-snug">
              {forumFeaturedCard.title}
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {forumFeaturedCard.description}
            </p>
            <div className="border-border border-t pt-2">
              <p className="text-muted-foreground text-xs">
                {forumFeaturedCard.pavilionLabel}
              </p>
              <p className="font-medium text-[#111827] text-sm">
                {forumFeaturedCard.pavilionValue}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded border border-borde p-3">
        <p className="font-medium text-muted-foreground text-xs">
          Recommended price data
        </p>

        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-zinc-900/70 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-primary text-sm">
                {forumPriceInsight.commodity}
              </p>
              <p className="text-muted-foreground text-xs">
                {forumPriceInsight.origin}
              </p>
            </div>
            <span
              className={`rounded px-2 py-0.5 font-semibold text-xs ${
                isPositiveChange
                  ? 'bg-emerald-500/18 text-emerald-200'
                  : 'bg-red-500/18 text-red-300'
              }`}
            >
              {isPositiveChange ? '+' : ''}
              {forumPriceInsight.yoyChangeRate}%
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[11px] text-zinc-400">YoY Change Rate</p>
            <svg
              viewBox="0 0 240 56"
              className="mt-1 h-14 w-full"
              role="img"
              aria-label="YoY change rate sparkline"
            >
              <title>YoY change rate sparkline</title>
              <path
                d={buildSparklinePath(
                  forumPriceInsight.sparklinePoints,
                  240,
                  56,
                  5
                )}
                fill="none"
                stroke="#93c83f"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground">
                Latest Wholesale Price
              </p>
              <p className="font-semibold text-foreground text-lg">
                {forumPriceInsight.latestWholesalePrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-zinc-400">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">
                Previous Wholesale Price
              </p>
              <p className="font-semibold text-foreground text-lg">
                {forumPriceInsight.previousWholesalePrice.toFixed(2)}
              </p>
              <p className="text-[11px] text-zinc-400">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-emerald-500/20 bg-zinc-900/85 px-3 py-2 font-medium text-xs text-zinc-200 hover:border-emerald-400/40 hover:text-emerald-200"
        >
          View all prices
        </button>
      </section>
    </aside>
  );
}

function buildSparklinePath(
  points: number[],
  width: number,
  height: number,
  padding: number
) {
  if (points.length < 2) {
    return '';
  }

  const minPoint = Math.min(...points);
  const maxPoint = Math.max(...points);
  const xSpan = width - padding * 2;
  const ySpan = height - padding * 2;
  const range = maxPoint - minPoint || 1;

  return points
    .map((point, index) => {
      const x = padding + (index / (points.length - 1)) * xSpan;
      const normalizedY = (point - minPoint) / range;
      const y = height - padding - normalizedY * ySpan;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}
