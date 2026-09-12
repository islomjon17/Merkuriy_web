import React from 'react';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

export default function PromoBanner({ promo, onOpenLeadModal }) {
  if (!promo || !promo.promo_active) {
    return null;
  }

  const title = promo.promo_title || "Yangi mavsum maxsus aksiyasi";
  const description =
    promo.promo_description ||
    "Hozir shartnoma imzolang va o'lchov olish, 3D vizualizatsiya hamda to'liq smeta tuzish xizmatiga ega bo'ling!";

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-3.5 px-4 text-brand-dark shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-dark/15 flex items-center justify-center text-brand-dark shrink-0">
            <Sparkles className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm tracking-tight flex items-center gap-2 justify-center sm:justify-start">
              <span>{title}</span>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-brand-dark text-white">
                Chegirma
              </span>
            </div>
            <p className="text-xs font-medium text-brand-dark/85 mt-0.5 line-clamp-1 sm:line-clamp-none">
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenLeadModal("Aksiya bo'yicha murojaat")}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-dark hover:bg-slate-900 text-white shadow transition-transform active:scale-95 shrink-0 cursor-pointer"
        >
          <span>Foydalanish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
