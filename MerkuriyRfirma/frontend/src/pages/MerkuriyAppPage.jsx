import React, { useState } from 'react';
import {
  Smartphone,
  Truck,
  Warehouse,
  Search,
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import { createLead } from '../api/client';

export default function MerkuriyAppPage({ showToast }) {
  const [phone, setPhone] = useState('+998 ');
  const [role, setRole] = useState('Ombor / Do\'kon egasi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setError("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    try {
      setLoading(true);
      await createLead({
        name: `Merkuriy-App Waitlist (${role})`,
        phone_number: phone.trim(),
        project_type: `Merkuriy-App Ekotizimiga obuna: ${role}`,
      });
      showToast("Rahmat! Merkuriy-App ishga tushganda sizga birinchilardan bo'lib SMS xabarnoma yuboramiz.");
      setPhone('+998 ');
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 bg-brand-dark text-white min-h-screen relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-accent/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[350px] bg-brand-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Yangi Raqamli Mahsulot
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Merkuriy-App — Qurilish va Ta'minotning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-amber-300">
              Yagona Raqamli Ekotizimi
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Qurilish omborlari, do'konlar, maxsus yuk texnikalari haydovchilari va buyurtmachilarni yagona tezkor platformada birlashtiruvchi zamonaviy B2B/B2C ilova.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-xl shadow-brand-accent/20 cursor-pointer"
            >
              <span>Birinchilardan bo'lib ro'yxatdan o'ting</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Three Core Value-Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Qurilish mollari va Omborlar */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-brand-accent/50 transition-all group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/20 text-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Warehouse className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Qurilish mollari va Omborlar (Skladlar)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Qurilish materiallari sotuvchi omborlar va do'konlar internet orqali o'z mahsulotlariga e'lon berishi, to'g'ridan-to'g'ri xaridor topishi va buyurtmalarni onlayn qabul qilishi mumkin.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Onlayn tovarlar vitrinasi va qoldiq nazorati</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Yuzlab qurilish ustalari va firmalariga to'g'ridan-to'g'ri chiqish</span>
              </div>
            </div>
          </div>

          {/* Card 2: Yuk tashuvchilar va Maxsus Texnikalar */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-brand-accent/50 transition-all group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Yuk tashuvchilar va Maxsus Texnikalar (Gruzovoy)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Og'ir yuk mashinalari haydovchilari va qurilish tashkilotlari yagona ilovada muloqot qiladi. Haydovchilar yo'l chetida mijoz kutib turmaydi, ilova orqali real vaqtda buyurtma oladi.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Geolokatsiya orqali eng yaqin buyurtmani qabul qilish</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Kran, samosval va beton qorgichlar uchun doimiy ish hajmi</span>
              </div>
            </div>
          </div>

          {/* Card 3: Kengaytirilgan Qidiruv va 1-Qo'l Narxlar */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-brand-accent/50 transition-all group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Kengaytirilgan Qidiruv va 1-Qo'l Narxlar
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                O'z hududingizdagi eng yaqin yetkazib beruvchilarni topish, to'g'ridan-to'g'ri birinchi qo'l dilerlar bilan bog'lanish va katta hajmdagi xaridlar uchun ulgurji chegirmalarni olish imkoniyati.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>O'rtakashlarsiz to'g'ridan-to'g'ri ishlab chiqaruvchi narxlari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Smetani bir tugma bilan tahlil qilish va eng arzon variantni tanlash</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div
          id="waitlist"
          className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary border border-brand-accent/30 shadow-2xl overflow-hidden text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            Beta sinov bosqichi
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Merkuriy-App ishga tushishi haqida birinchilardan bo'lib xabardor bo'ling
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Dastlabki ro'yxatdan o'tgan ombor egalari va haydovchilar uchun 3 oylik bepul tarif va maxsus imtiyozlar taqdim etiladi.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="mt-8 max-w-md mx-auto space-y-4">
            {error && (
              <div className="p-3 text-xs font-medium text-red-300 bg-red-900/60 border border-red-500/50 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full py-3 px-4 text-xs font-semibold bg-white/10 border border-white/20 rounded-xl text-white focus:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Ombor / Do'kon egasi" className="bg-brand-dark text-white">Men Ombor / Do'kon egasiman</option>
                <option value="Yuk mashinasi / Texnika haydovchisi" className="bg-brand-dark text-white">Men Yuk mashinasi / Maxsus texnika haydovchisiman</option>
                <option value="Qurilish firmasi / Pudratchi" className="bg-brand-dark text-white">Men Qurilish tashkiloti / Usta / Pudratchiman</option>
                <option value="Xususiy buyurtmachi" className="bg-brand-dark text-white">Men Xususiy xonadon egasiman (Xaridor)</option>
              </select>

              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => {
                  let val = e.target.value;
                  if (!val.startsWith('+998')) val = '+998 ';
                  setPhone(val);
                }}
                className="w-full py-3.5 px-4 text-sm font-medium tracking-wide bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-sm rounded-xl text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/30 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yozilmoqda...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Ro'yxatga qo'shilish
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-400">
              Hech qanday spam yo'q. Faqat ilova ishga tushganda 1 marta SMS xabarnoma olasiz.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
