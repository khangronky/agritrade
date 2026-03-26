import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Marketplace', href: '/marketplace' },
];

const supportLinks = [
  { label: 'Farmer Support', href: '/' },
  { label: 'Contact Team', href: '/' },
  { label: 'Privacy Policy', href: '/' },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border border-emerald-500/25 bg-zinc-950/45 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/branding.png"
                alt="AgriTrade"
                width={156}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-md text-zinc-400 text-sm leading-relaxed">
              AgriTrade helps farmers access transparent pricing, faster
              matching, and more flexible selling pathways.
            </p>
          </div>

          <div>
            <p className="font-semibold text-zinc-100 text-sm uppercase tracking-[0.18em]">
              Quick Links
            </p>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm transition-colors hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-100 text-sm uppercase tracking-[0.18em]">
              Support
            </p>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm transition-colors hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-emerald-500/25 border-t pt-4 text-zinc-400 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>(c) {currentYear} AgriTrade. All rights reserved.</p>
          <p>Built for transparent and practical agricultural trading.</p>
        </div>
      </div>
    </footer>
  );
}


