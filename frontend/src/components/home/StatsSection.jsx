import React from 'react';
import { Award, CheckCircle, Users, HardHat, TrendingUp } from 'lucide-react';

export default function StatsSection({ stats }) {
  const statItems = [
    {
      label: "Yillik tajriba",
      value: `${stats?.years_experience || 10}+`,
      subtext: "Qurilish va ta'mirlash sohasida uzluksiz muvaffaqiyatli faoliyat",
      icon: Award,
    },
    {
      label: "Tugallangan loyihalar",
      value: `${stats?.completed_projects || 150}+`,
      subtext: "Turar-joy majmualari, biznes markazlari va hashamatli kottejlar",
      icon: CheckCircle,
    },
    {
      label: "Mutaxassis ustalar",
      value: `${stats?.master_workers || 45}+`,
      subtext: "Malakali muhandislar, arxitektorlar va oliy toifali mutaxassislar",
      icon: HardHat,
    },
  ];

  return (
    <section className="py-16 bg-brand-surfaceAlt dark:bg-brand-dark/95 border-b border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 dark:bg-white/10 text-brand-secondary dark:text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-brand-accent" />
            Bizning yutuqlarimiz
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Raqamlar va sifat ishonchimiz mezoni
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Har bir obyektga mas'uliyat va yuqori darajadagi muhandislik nazorati bilan yondashamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-white dark:bg-brand-primary/50 p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-brand-accent/40 dark:hover:border-brand-accent/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 dark:bg-white/10 text-brand-secondary dark:text-brand-accent flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-white tracking-tight font-mono">
                    {item.value}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.subtext}
                </p>
                {/* Accent bar */}
                <div className="mt-4 h-1 w-12 bg-brand-accent rounded-full group-hover:w-full transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
