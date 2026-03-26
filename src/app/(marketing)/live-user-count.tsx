'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type LiveUserCountProps = {
  initialCount?: number;
  minStep?: number;
  maxStep?: number;
  intervalMs?: number;
  className?: string;
};

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function LiveUserCount({
  initialCount = 312_550_130,
  minStep = 3,
  maxStep = 27,
  intervalMs = 2_800,
  className,
}: LiveUserCountProps) {
  const [count, setCount] = useState(initialCount);
  const [latestIncrease, setLatestIncrease] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIncrease = randomInRange(minStep, maxStep);
      setCount((prevCount) => prevCount + nextIncrease);
      setLatestIncrease(nextIncrease);
      setIsAnimating(true);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, minStep, maxStep]);

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 850);

    return () => clearTimeout(timeoutId);
  }, [isAnimating]);

  return (
    <span className={cn('relative inline-flex items-start', className)}>
      <span
        className={cn(
          'tabular-nums transition-all duration-500',
          isAnimating &&
            'scale-[1.02] text-emerald-300 drop-shadow-[0_0_14px_rgba(52,211,153,0.32)]'
        )}
      >
        {formatCount(count)}
      </span>
      <span
        className={cn(
          'pointer-events-none absolute -top-5 right-0 font-semibold text-emerald-400 text-sm transition-all duration-500',
          isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
        )}
      >
        +{latestIncrease}
      </span>
    </span>
  );
}

