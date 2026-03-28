'use client';

import {
  Activity,
  Clock3,
  Droplets,
  Leaf,
  Sprout,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { parseTrendPercent } from '@/app/(marketing)/market/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { clamp } from '@/utils/percentage-helper';
import type { CropMetric } from './data';

export default function CropMetricCard({ metric }: { metric: CropMetric }) {
  const priceTrendPositive = parseTrendPercent(metric.priceTrend) >= 0;
  const complianceTone = getComplianceTone(metric.complianceRate);
  const metricRows = [
    {
      label: 'Health',
      value: `${metric.healthScore}/100`,
      tone: 'positive' as const,
    },
    {
      label: 'NDVI / Vigor',
      value: metric.ndvi.toFixed(2),
      tone: 'positive' as const,
    },
    {
      label: 'Estimated yield',
      value: metric.estimatedYield,
      tone: 'default' as const,
    },
    {
      label: 'Moisture',
      value: metric.moisture,
      tone: 'default' as const,
    },
    {
      label: 'Harvest window',
      value: metric.harvestWindow,
      tone: 'default' as const,
    },
    {
      label: 'Price momentum',
      value: metric.priceTrend,
      tone: priceTrendPositive ? ('positive' as const) : ('negative' as const),
    },
  ];

  return (
    <Card className="gap-0 overflow-hidden">
      <CardHeader className="gap-0">
        <CardTitle className="text-base sm:text-lg">
          {metric.listing.name}
        </CardTitle>
        <CardDescription>
          {metric.listing.region}, {metric.listing.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 py-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-md text-muted-foreground uppercase">
            Compliance Rate
          </p>
          <ComplianceRing
            value={metric.complianceRate}
            size={124}
            strokeWidth={12}
          />
          <p
            className={cn(
              'font-semibold text-sm uppercase tracking-[0.18em]',
              complianceTone.textClassName
            )}
          >
            {complianceTone.caption}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full rounded-full">
              View metrics
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{metric.listing.name}</DialogTitle>
              <DialogDescription>
                {metric.listing.region}, {metric.listing.country}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col rounded-lg border px-4 py-1">
                {metricRows.map((metric, index) => (
                  <MetricRow
                    key={metric.label}
                    icon={getMetricIcon(metric.label, priceTrendPositive)}
                    label={metric.label}
                    value={metric.value}
                    tone={metric.tone}
                    withSeparator={index < metricRows.length - 1}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function ComplianceRing({
  value,
  size,
  strokeWidth,
}: {
  value: number;
  size: number;
  strokeWidth: number;
}) {
  const normalizedValue = clamp(value, 0, 100);
  const tone = getComplianceTone(normalizedValue);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - normalizedValue / 100);
  const center = size / 2;

  return (
    <div className="relative isolate flex items-center justify-center">
      <div
        className={cn(
          'absolute inset-0 rounded-full opacity-55 blur-xl',
          tone.glowClassName
        )}
        style={{ transform: 'scale(0.78)' }}
      />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative overflow-visible"
        aria-label={`${normalizedValue} percent`}
        role="img"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={cn(tone.trackClassName, 'opacity-75')}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn(
            tone.strokeClassName,
            'drop-shadow-[0_0_10px_rgba(148,163,184,0.12)] transition-all duration-500 ease-out'
          )}
          style={{
            transform: `rotate(180deg)`,
            transformOrigin: `${center}px ${center}px`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'font-semibold text-2xl tracking-tight',
            tone.textClassName
          )}
        >
          {normalizedValue}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.28em]">
          percent
        </span>
      </div>
    </div>
  );
}

function MetricRow({
  icon: Icon,
  label,
  value,
  tone = 'default',
  withSeparator,
}: {
  icon: typeof Leaf;
  label: string;
  value: string;
  tone?: 'default' | 'positive' | 'negative';
  withSeparator: boolean;
}) {
  return (
    <div
      className={cn('flex flex-col gap-3 py-3', withSeparator && 'border-b')}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground text-sm">
          <Icon className="size-3.5 shrink-0" />
          <span>{label}</span>
        </div>
        <p
          className={cn(
            'text-right font-semibold text-sm sm:text-base',
            tone === 'positive' && 'text-primary',
            tone === 'negative' && 'text-destructive'
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function getMetricIcon(label: string, priceTrendPositive: boolean) {
  if (label === 'Health') {
    return Leaf;
  }

  if (label === 'NDVI / Vigor') {
    return Sprout;
  }

  if (label === 'Estimated yield') {
    return Activity;
  }

  if (label === 'Moisture') {
    return Droplets;
  }

  if (label === 'Harvest window') {
    return Clock3;
  }

  return priceTrendPositive ? TrendingUp : TrendingDown;
}

function getComplianceTone(value: number) {
  if (value >= 85) {
    return {
      caption: 'Stable',
      textClassName: 'text-lime-700',
      strokeClassName: 'text-lime-600',
      trackClassName: 'text-lime-200',
      glowClassName: 'bg-lime-200/80',
    };
  }

  if (value >= 65) {
    return {
      caption: 'Watchlist',
      textClassName: 'text-amber-700',
      strokeClassName: 'text-amber-500',
      trackClassName: 'text-amber-200',
      glowClassName: 'bg-amber-200/80',
    };
  }

  return {
    caption: 'Fragile',
    textClassName: 'text-rose-700',
    strokeClassName: 'text-rose-500',
    trackClassName: 'text-rose-200',
    glowClassName: 'bg-rose-200/80',
  };
}
