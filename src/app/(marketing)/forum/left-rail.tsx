import Image from 'next/image';
import { forumFeaturedCard, forumPriceInsight } from './mock-data';

export function LeftRail() {
  const isPositiveChange = forumPriceInsight.yoyChangeRate >= 0;

  return (
    <aside className="space-y-4">
      <section className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <p className="font-medium text-lime-700 text-xs">Featured network</p>

        <article className="mt-2 overflow-hidden rounded-lg border border-lime-200 bg-lime-50">
          <Image
            src={forumFeaturedCard.imageSrc}
            alt={forumFeaturedCard.imageAlt}
            width={520}
            height={320}
            className="h-44 w-full object-cover"
          />
          <div className="space-y-2 p-3">
            <p className="font-medium text-sm text-lime-950 leading-snug">
              {forumFeaturedCard.title}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {forumFeaturedCard.description}
            </p>
            <div className="border-lime-200 border-t pt-2">
              <p className="text-muted-foreground text-xs">
                {forumFeaturedCard.pavilionLabel}
              </p>
              <p className="font-medium text-lime-950 text-sm">
                {forumFeaturedCard.pavilionValue}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-lime-200 bg-white p-3 shadow-sm">
        <p className="font-medium text-muted-foreground text-xs">
          Recommended price data
        </p>

        <div className="mt-3 rounded-lg border border-lime-200 bg-lime-50 p-3">
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
                  ? 'bg-lime-100 text-lime-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {isPositiveChange ? '+' : ''}
              {forumPriceInsight.yoyChangeRate}%
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[11px] text-muted-foreground">YoY Change Rate</p>
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
              <p className="text-[11px] text-muted-foreground">
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
              <p className="text-[11px] text-muted-foreground">
                {forumPriceInsight.currency}/{forumPriceInsight.unit}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-md border border-lime-200 bg-lime-50 px-3 py-2 font-medium text-xs text-lime-700 hover:border-lime-300 hover:text-primary"
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
