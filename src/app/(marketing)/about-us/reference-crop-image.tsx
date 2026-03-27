import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type ReferenceCropImageProps = {
  src: string;
  alt: string;
  position?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  scale?: number;
  hoverScale?: number;
  sizes?: string;
};

export function ReferenceCropImage({
  src,
  alt,
  position,
  className,
  imageClassName,
  priority = false,
  scale = 1,
  hoverScale = scale,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ReferenceCropImageProps) {
  const imageStyle = {
    objectPosition: position ?? 'center',
    '--base-scale': scale,
    '--hover-scale': hoverScale,
  } as CSSProperties;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'scale-[var(--base-scale)] object-cover transition-[transform,filter,opacity] duration-700 ease-out will-change-transform group-hover:scale-[var(--hover-scale)]',
          imageClassName
        )}
        style={imageStyle}
      />
    </div>
  );
}
