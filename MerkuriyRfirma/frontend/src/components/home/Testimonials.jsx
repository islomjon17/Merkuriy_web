import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { getImageUrl, PLACEHOLDER_IMAGES } from '../../api/client';

export default function Testimonials({ testimonials = [] }) {
  const defaultTestimonials = [
    {
      id: 1,
      client_name: "Aziz Rahimov",
      client_title: "Tadbirkor, 'Orient Group'",
      quote: "Merkuriy-R jamoasi bizning yangi ofis binosi qurilishini belgilangan muddatdan 2 hafta oldin sifatli topshirdi. Ularning professional yondashuviga qoyil qoldik.",
      rating: 5,
    },
    {
      id: 2,
      client_name: "Nilufar Karimova",
      client_title: "Xususiy xonadon egasi",
      quote: "Yunusoboddagi kottejimizni to'liq ta'mirlash ishlarini Merkuriy-R ga topshirdik. Barcha pardozlash materiallari sifati a'lo darajada.",
      rating: 5,
    },
    {
      id: 3,
      client_name: "Jamshid Usmonov",
      client_title: "Restoranlar tarmog'i asoschisi",
      quote: "Tijoriy obyektimiz dizayni va seysmik mustahkamligi barcha talablarga javob beradi. Ishonchli hamkor!",
      rating: 5,
    },
  ];

  const reviews = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 bg-brand-surfaceAlt dark:bg-brand-dark/95 border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 dark:bg-white/10 text-brand-secondary dark:text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
            Mijozlarimiz fikri
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ishonch va sifatga berilgan baho
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Biz bilan hamkorlik qilgan mijozlarimizning samimiy fikrlari va tavsiyalari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((item) => {
            const avatarUrl = getImageUrl(item.avatar, PLACEHOLDER_IMAGES.avatar);
            const initials = item.client_name
              ? item.client_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'MR';

            return (
              <div
                key={item.id}
                className="relative bg-white dark:bg-brand-primary/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed relative">
                    "{item.quote}"
                  </p>
                </div>

                {/* Client info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                  {item.avatar ? (
                    <img
                      src={avatarUrl}
                      alt={item.client_name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-white/20"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand-primary/10 dark:bg-white/10 text-brand-secondary dark:text-brand-accent font-bold text-sm flex items-center justify-center border border-slate-200 dark:border-white/10">
                      {initials}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.client_name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.client_title || "Hurmatli buyurtmachi"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
