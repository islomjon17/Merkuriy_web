import React, { useState, useEffect } from 'react';
import { Phone, User, Briefcase, Send, Loader2, CheckCircle2, ShieldCheck, Clock, Award, Hammer } from 'lucide-react';
import { getHome, createLead } from '../api/client';
import HeroSlider from '../components/home/HeroSlider';
// import PromoBanner from '../components/home/PromoBanner';
import StatsSection from '../components/home/StatsSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';

export default function HomePage({ onOpenLeadModal, showToast }) {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inline Quick Consultation Lead Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('+998 ');
  const [formService, setFormService] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    getHome()
      .then((data) => {
        setHomeData(data);
      })
      .catch((err) => {
        console.error("Home API fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleQuickLeadSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim() || formName.trim().length < 2) {
      setFormError("Iltimos, ismingizni to'liq kiriting.");
      return;
    }

    const digitsOnly = formPhone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setFormError("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    try {
      setFormLoading(true);
      await createLead({
        name: formName.trim(),
        phone_number: formPhone.trim(),
        project_type: formService || "Bosh sahifadagi bepul konsultatsiya",
      });
      showToast("Arizangiz qabul qilindi, mutaxassisimiz tez orada siz bilan bog'lanadi!");
      setFormName('');
      setFormPhone('+998 ');
      setFormService('');
    } catch (err) {
      setFormError("Ariza yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setFormLoading(false);
    }
  };

  const promoData = homeData?.promo || homeData?.promo_banner;
  const statsData = homeData?.stats;
  const heroSlides = homeData?.hero_slides || [];
  const featuredProjects = homeData?.featured_projects || [];
  const testimonials = homeData?.testimonials || [];

  return (
    <div className="w-full">
      {/* 1. Hero Slider Component */}
      <HeroSlider slides={heroSlides} />

      {/* 2. Promo Banner */}
      {/* <PromoBanner promo={promoData} onOpenLeadModal={onOpenLeadModal} /> */}

      {/* 3. Stats Section */}
      <StatsSection stats={statsData} />

      {/* 4. Featured Projects Showcase */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Why Choose Us - Corporate Value Highlights */}
      <section className="py-20 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              Nega aynan Merkuriy-R?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ishonchli qurilish kafolati
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Har bir loyihada arxitektura va mustahkamlik mezonlarini birlashtiramiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sifat va Litsenziya</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Barcha qurilish va montaj ishlari shaharsozlik normalari (QMQ) hamda davlat litsenziyasi asosida to'liq kafolatlanadi.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Aniq Muddat va Reja</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Shartnomada belgilangan jadvalga qat'iy rioya qilamiz. Har bir bosqich bo'yicha buyurtmachiga muntazam hisobot taqdim etiladi.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold mb-5">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Birinchi Qo'l Materiallar</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To'g'ridan-to'g'ri ishlab chiqaruvchilar bilan ishlaymiz, bu esa smeta xarajatlarini 15-20% gacha tejash imkonini beradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quick Consultation Lead Form Section */}
      <section id="quick-lead-form" className="py-20 bg-white dark:bg-brand-dark transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary p-8 sm:p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                Bepul hisoblash
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Loyihangiz bo'yicha bepul konsultatsiya oling
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                Ma'lumotlaringizni qoldiring. Bosh muhandisimiz joyiga chiqib o'lchov olish va smeta tuzish bo'yicha bepul maslahat beradi.
              </p>
            </div>

            <form onSubmit={handleQuickLeadSubmit} className="max-w-2xl mx-auto space-y-4">
              {formError && (
                <div className="p-3 text-xs font-medium text-red-200 bg-red-900/50 border border-red-500/50 rounded-xl text-center">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={formPhone}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith('+998')) val = '+998 ';
                      setFormPhone(val);
                    }}
                    className="w-full py-3 pl-10 pr-4 text-sm font-medium bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <Briefcase className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-sm bg-brand-primary/80 border border-white/20 rounded-xl text-white focus:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-brand-dark text-slate-300">Qiziqayotgan xizmat turini tanlang...</option>
                  <option value="Turar-joy qurilishi" className="bg-brand-dark text-white">Turar-joy majmuasi qurilishi</option>
                  <option value="Tijoriy va ofis binosi" className="bg-brand-dark text-white">Tijoriy va ofis binosi</option>
                  <option value="Premium kottej / Villa" className="bg-brand-dark text-white">Premium kottej yoki villa qurilishi</option>
                  <option value="Mukammal ta'mirlash" className="bg-brand-dark text-white">Mukammal kapital ta'mirlash</option>
                  <option value="Smeta va loyihalash" className="bg-brand-dark text-white">Smeta va arxitektura loyihasi</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-sm rounded-xl text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 disabled:opacity-60 cursor-pointer"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Bepul smeta hisoblatish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
