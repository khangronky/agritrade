import Image from 'next/image';

const aboutImages = [
  {
    alt: 'Farm rows at sunrise representing resilient production',
    objectPosition: 'object-[center_40%]',
  },
  {
    alt: 'Green field landscape symbolizing steady supply',
    objectPosition: 'object-[center_55%]',
  },
  {
    alt: 'Cultivated farmland showing harvest readiness',
    objectPosition: 'object-[center_35%]',
  },
  {
    alt: 'Agriculture field highlighting crop quality and care',
    objectPosition: 'object-[center_60%]',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 lg:-translate-y-8">
              {aboutImages.slice(0, 2).map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-green-200/70 bg-green-100 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-green-300/80 hover:shadow-lg"
                >
                  <Image
                    src="/farm.jpg"
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${image.objectPosition}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 22vw"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {aboutImages.slice(2).map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-green-200/70 bg-green-100 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-green-300/80 hover:shadow-lg"
                >
                  <Image
                    src="/farm.jpg"
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${image.objectPosition}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 22vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-xl">
            <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.2em]">
              Who we are
            </p>
            <h2 className="mt-3 font-semibold text-3xl text-green-950 sm:text-4xl">
              About AgriTrade
            </h2>
            <p className="mt-5 text-base text-green-900/85 leading-relaxed sm:text-lg">
              AgriTrade is a practical marketplace layer built for farming
              communities that need fairer pricing without extra complexity. We
              help farmers see real buyer demand, compare offers with clarity,
              and make better selling decisions at the right time.
            </p>
            <p className="mt-4 text-base text-green-900/80 leading-relaxed">
              Our approach keeps existing market relationships intact by making
              middlemen optional, not excluded. The result is a more transparent
              and competitive flow where farmers, buyers, and service partners
              can all participate with clearer information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
