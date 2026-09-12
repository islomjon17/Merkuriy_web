import React, { useState, useEffect } from 'react';
import { X, Send, Loader2, Phone, User, Briefcase, CheckCircle2 } from 'lucide-react';
import { createLead } from '../../api/client';

export default function LeadModal({ isOpen, onClose, onSuccess, defaultProjectType = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '+998 ',
    project_type: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone_number: '+998 ',
        project_type: defaultProjectType || '',
      });
      setError('');
    }
  }, [isOpen, defaultProjectType]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('+998')) {
      value = '+998 ';
    }
    setFormData((prev) => ({ ...prev, phone_number: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Iltimos, ismingizni to'liq kiriting.");
      return;
    }

    const digitsOnly = formData.phone_number.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setError("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    try {
      setLoading(true);
      await createLead({
        name: formData.name.trim(),
        phone_number: formData.phone_number.trim(),
        project_type: formData.project_type || "Umumiy qurilish bo'yicha maslahat",
      });
      onSuccess("Arizangiz qabul qilindi, mutaxassisimiz tez orada bog'lanadi!");
      onClose();
    } catch (err) {
      const respError = err.response?.data;
      if (respError && typeof respError === 'object') {
        const firstKey = Object.keys(respError)[0];
        const msg = Array.isArray(respError[firstKey]) ? respError[firstKey][0] : respError[firstKey];
        setError(msg || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      } else {
        setError("Internet yoki server bilan aloqa uzildi. Iltimos, keyinroq urinib ko'ring.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-slate-900 border rounded-2xl shadow-2xl border-slate-200 dark:border-slate-800 animate-slide-up transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 text-white bg-gradient-to-r from-brand-primary to-brand-secondary">
          <button
            onClick={onClose}
            className="absolute p-2 text-slate-300 transition-colors rounded-full top-4 right-4 hover:text-white hover:bg-white/10"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-brand-accent/20 text-brand-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Bepul smeta va konsultatsiya
          </div>
          <h3 className="text-xl font-bold tracking-tight">Ariza qoldirish</h3>
          <p className="mt-1 text-xs text-slate-300">
            Loyiha tafsilotlarini qoldiring. Muhandislarimiz 15 daqiqa ichida siz bilan bog'lanadi.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded-xl">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
              Ismingiz <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Masalan: Sardor Aliyev"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-2.5 pl-10 pr-4 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
              Telefon raqamingiz <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={formData.phone_number}
                onChange={handlePhoneChange}
                className="w-full py-2.5 pl-10 pr-4 text-sm font-medium tracking-wide bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
              Qiziqayotgan xizmat turi
            </label>
            <div className="relative">
              <Briefcase className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={formData.project_type}
                onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                className="w-full py-2.5 pl-10 pr-4 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-all appearance-none cursor-pointer"
              >
                <option value="" className="text-slate-900 dark:text-white dark:bg-slate-800">Tanlang yoki yozing...</option>
                <option value="Turar-joy qurilishi" className="text-slate-900 dark:text-white dark:bg-slate-800">Turar-joy majmuasi qurilishi</option>
                <option value="Tijoriy va ofis binosi" className="text-slate-900 dark:text-white dark:bg-slate-800">Tijoriy va ofis binosi</option>
                <option value="Premium kottej / Villa" className="text-slate-900 dark:text-white dark:bg-slate-800">Premium kottej yoki villa qurilishi</option>
                <option value="Mukammal ta'mirlash (Kapital)" className="text-slate-900 dark:text-white dark:bg-slate-800">Mukammal kapital ta'mirlash</option>
                <option value="Fasad va landshaft ishlari" className="text-slate-900 dark:text-white dark:bg-slate-800">Fasad va landshaft ishlari</option>
                <option value="Smeta va loyihalash xizmati" className="text-slate-900 dark:text-white dark:bg-slate-800">Smeta va loyihalash xizmati</option>
              </select>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-semibold text-sm rounded-xl text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-colors shadow-lg shadow-brand-accent/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Arizani yuborish
                </>
              )}
            </button>
            <p className="mt-2 text-[11px] text-center text-slate-500">
              Ma'lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
