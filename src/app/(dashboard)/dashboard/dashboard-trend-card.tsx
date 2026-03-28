'use client';

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import { aseanCurrencies } from '@/app/(marketing)/market/data';
import type {
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  ListingCard,
  MarketTrendPoint,
} from '@/app/(marketing)/market/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const dashboardTrendChartConfig = {
  historicalPrice: {
    label: 'Historical price',
    color: 'var(--chart-1)',
  },
  forecastPrice: {
    label: 'AI forecast',
    color: 'var(--chart-2)',
  },
  volume: {
    label: 'Activity volume',
    color: 'var(--chart-4)',
  },
} as const;

type DashboardTrendCardProps = {
  activeListing: ListingCard | null;
  activeCurrency: CurrencyOption;
  commodityOptions: CommodityOption[];
  selectedCommodity: string;
  selectedCurrency: CurrencyCode;
  trendTimelineData: MarketTrendPoint[];
  onCommodityChange: (value: string) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
};

export default function DashboardTrendCard({
  activeListing,
  activeCurrency,
  commodityOptions,
  selectedCommodity,
  selectedCurrency,
  trendTimelineData,
  onCommodityChange,
  onCurrencyChange,
}: DashboardTrendCardProps) {
  const observedSeries = trendTimelineData.filter((point) => !point.isForecast);
  const selectedSeries = [
    ...observedSeries.slice(-8),
    ...trendTimelineData.filter((point) => point.isForecast),
  ];
  const latestPoint = observedSeries.at(-1) ?? selectedSeries.at(-1) ?? null;
  const previousPoint = observedSeries.at(-2) ?? latestPoint;
  const absoluteChange =
    latestPoint && previousPoint ? latestPoint.price - previousPoint.price : 0;
  const percentChange =
    previousPoint && previousPoint.price !== 0
      ? (absoluteChange / previousPoint.price) * 100
      : 0;
  const projectedPoint =
    trendTimelineData.find((point) => point.isForecast) ?? null;

  const metricItems = [
    {
      label: 'Current price',
      value: latestPoint
        ? `${formatPriceValue(latestPoint.price, activeCurrency)} ${
            activeCurrency.code
          }`
        : '--',
    },
    {
      label: 'Projected move',
      value: `${formatSignedPercentValue(percentChange)}`,
      tone: percentChange >= 0 ? 'positive' : 'negative',
    },
    {
      label: 'Forecast point',
      value: projectedPoint
        ? `${formatPriceValue(projectedPoint.price, activeCurrency)} ${
            activeCurrency.code
          }`
        : '--',
    },
    {
      label: 'Latest activity',
      value: latestPoint ? formatVolume(latestPoint.activityVolume) : '--',
    },
  ];

  return (
    <Card className="gap-0 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Market trend</CardTitle>
        <CardAction>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <NativeSelect
              value={selectedCommodity}
              onChange={(event) => onCommodityChange(event.target.value)}
              className="min-w-44"
            >
              <NativeSelectOption value="auto">Auto</NativeSelectOption>
              {commodityOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="min-w-24"
            >
              {aseanCurrencies.map((currency) => (
                <NativeSelectOption key={currency.code} value={currency.code}>
                  {currency.code}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 py-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {activeListing?.name ?? 'No crop selected'}
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <p className="font-semibold text-3xl sm:text-4xl">
                {latestPoint
                  ? formatPriceValue(latestPoint.price, activeCurrency)
                  : '--'}
              </p>
              <Badge
                variant={absoluteChange >= 0 ? 'secondary' : 'destructive'}
              >
                {formatSignedPriceValue(absoluteChange, activeCurrency)} (
                {formatSignedPercentValue(percentChange)})
              </Badge>
            </div>
          </div>

          <Badge variant="outline">
            Forecast horizon{' '}
            {trendTimelineData.filter((point) => point.isForecast).length}{' '}
            periods
          </Badge>
        </div>

        <ChartContainer
          config={dashboardTrendChartConfig}
          className="h-72 w-full"
        >
          <ComposedChart
            accessibilityLayer
            data={selectedSeries}
            margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              minTickGap={20}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              tickLine={false}
              axisLine={false}
              width={84}
              tickFormatter={(value) =>
                formatPriceValue(Number(value), activeCurrency)
              }
            />
            <YAxis yAxisId="volume" hide />
            <ChartTooltip
              cursor={{ strokeDasharray: '4 4' }}
              content={
                <DashboardTrendTooltip activeCurrency={activeCurrency} />
              }
            />
            <Bar
              yAxisId="volume"
              dataKey="activityVolume"
              fill="var(--color-volume)"
              opacity={0.26}
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="historicalPrice"
              stroke="var(--color-historicalPrice)"
              fill="var(--color-historicalPrice)"
              fillOpacity={0.14}
              strokeWidth={2.2}
              dot={false}
              activeDot={{ r: 3 }}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="forecastPrice"
              stroke="var(--color-forecastPrice)"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              connectNulls
            />
            {latestPoint ? (
              <ReferenceLine
                yAxisId="price"
                y={latestPoint.price}
                stroke="var(--border)"
                strokeDasharray="5 5"
              />
            ) : null}
          </ComposedChart>
        </ChartContainer>

        <Separator />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metricItems.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border bg-background px-3 py-3"
            >
              <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                {metric.label}
              </p>
              <p
                className={cn(
                  'mt-2 font-semibold text-sm sm:text-base',
                  metric.tone === 'positive' && 'text-primary',
                  metric.tone === 'negative' && 'text-destructive'
                )}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardTrendTooltip({
  active,
  payload,
  activeCurrency,
}: {
  active?: boolean;
  payload?: Array<{ payload: MarketTrendPoint }>;
  activeCurrency: CurrencyOption;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;
  if (!point) {
    return null;
  }

  return (
    <div className="min-w-44 rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
      <p className="text-muted-foreground">{formatPointDate(point.date)}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-muted-foreground">Price</span>
        <span className="font-semibold">
          {formatPriceValue(point.price, activeCurrency)} {activeCurrency.code}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-muted-foreground">Activity</span>
        <span className="font-semibold">
          {formatVolume(point.activityVolume)}
        </span>
      </div>
    </div>
  );
}

function formatPriceValue(value: number, currency: CurrencyOption) {
  const fractionDigits = currency.maxFractionDigits === 0 ? 0 : 2;
  return value.toLocaleString(currency.locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatSignedPriceValue(value: number, currency: CurrencyOption) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${formatPriceValue(Math.abs(value), currency)}`;
}

function formatSignedPercentValue(value: number) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

function formatPointDate(dateValue?: string) {
  if (!dateValue) {
    return '--';
  }

  return new Date(dateValue).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function formatVolume(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}
