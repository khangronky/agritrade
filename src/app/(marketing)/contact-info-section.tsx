import { Mail, MapPin, Phone } from 'lucide-react';

const contactItems = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@agritrade.vn',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+84 98 765 4321',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'Can Tho, Vietnam',
  },
];

export function ContactInfoSection() {
  return (
    <section id="contact-info" className="scroll-mt-20 pt-4 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-green-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
          <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.18em]">
            Contact Info
          </p>
          <h2 className="mt-3 font-semibold text-3xl text-green-950 sm:text-4xl">
            Connect with AgriTrade team
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-green-200/80 bg-lime-50/55 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-green-800" />
                    <p className="font-semibold text-green-900">{item.title}</p>
                  </div>
                  <p className="mt-2 text-green-900/80 text-sm">{item.value}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
