import Image from 'next/image';

export type StaticImageFrame = {
  src: string;
  alt: string;
};

export default function StaticImageSlot({
  image,
}: {
  image: StaticImageFrame;
}) {
  return (
    <div className="group relative h-64 overflow-hidden rounded-2xl border border-lime-200 bg-lime-50 shadow-sm sm:h-72">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-center opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 45vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-lime-950/35 via-primary/10 to-transparent" />
    </div>
  );
}
