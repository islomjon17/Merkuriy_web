import React, { useState, useEffect } from 'react';
import { Building2, Filter, Loader2, Layers, Clock, CheckCircle2 } from 'lucide-react';
import { getCategories, getProjects } from '../api/client';
import ProjectCard from '../components/projects/ProjectCard';

export default function ProjectsPage({ onOpenLeadModal }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from dedicated API
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch projects filtered by category
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (selectedCategory) {
      params.category = selectedCategory;
    }

    getProjects(params)
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const ongoingProjects = projects.filter((p) => p.status === 'in_progress');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : "Barcha toifalar";

  return (
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-brand-dark min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 dark:bg-white/10 text-brand-primary dark:text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-brand-accent" />
            Merkuriy-R Portfoliosi
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bizning Obyektlar va Ishlar
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Kategoriyalar bo'yicha saralangan barcha faol qurilayotgan va to'liq topshirilgan loyihalarimiz katalogi.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === ''
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 dark:bg-brand-accent dark:text-brand-dark'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            Barchasi
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 dark:bg-brand-accent dark:text-brand-dark'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat.name}
                {cat.projects_count !== undefined && (
                  <span className={`ml-2 text-xs py-0.5 px-1.5 rounded-md ${
                    isSelected
                      ? 'bg-white/20 dark:bg-brand-dark/20 text-white dark:text-brand-dark'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}>
                    {cat.projects_count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Indicator Banner */}
        {selectedCategory && (
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-brand-primary/5 dark:bg-white/5 border border-brand-primary/10 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
            <span>
              Saralangan kategoriya: <strong>{activeCategoryName}</strong> ({projects.length} ta loyiha)
            </span>
            <button
              onClick={() => setSelectedCategory('')}
              className="text-brand-accent hover:underline font-semibold"
            >
              Filtrni tozalash
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
            <p className="text-xs font-medium">Obyektlar yuklanmoqda...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Section 1: Active / Ongoing Projects */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    Ayni Paytda Qurilishi Davom Etayotgan Obyektlar
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      {ongoingProjects.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Faol montaj, pardozlash va muhandislik bosqichidagi obyektlarimiz
                  </p>
                </div>
              </div>

              {ongoingProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ongoingProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                  <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    "{activeCategoryName}" kategoriyasida ayni paytda qurilayotgan faol obyektlar mavjud emas.
                  </p>
                </div>
              )}
            </div>

            {/* Section 2: Completed Portfolio Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    Shu Kungacha Bajarilgan Loyihalar
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      {completedProjects.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Foydalanishga to'liq topshirilgan va sifat sinovidan o'tgan binolar
                  </p>
                </div>
              </div>

              {completedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    "{activeCategoryName}" kategoriyasida tugallangan loyihalar hozircha mavjud emas.
                  </p>
                </div>
              )}
            </div>

            {/* Total Empty State */}
            {projects.length === 0 && (
              <div className="py-16 text-center bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-8">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Obyekt topilmadi</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Tanlangan toifada hech qanday loyiha topilmadi.
                </p>
                <button
                  onClick={() => setSelectedCategory('')}
                  className="mt-4 px-5 py-2 text-xs font-bold text-brand-dark bg-brand-accent rounded-xl hover:bg-brand-accentHover"
                >
                  Barcha loyihalarni ko'rish
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-16 bg-white dark:bg-brand-primary/60 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              O'zingizning shaxsiy obyekt loyihangiz bormi?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              Loyihani noldan loyihalash, poydevordan kalitgacha qurish yoki kapital ta'mirlash bo'yicha eng ma'qul narx va sifat taklifini tayyorlab beramiz.
            </p>
          </div>
          <button
            onClick={() => onOpenLeadModal("Loyihalar sahifasidan murojaat")}
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-brand-accent hover:bg-brand-accentHover text-brand-dark shadow-lg shadow-brand-accent/20 shrink-0 cursor-pointer"
          >
            Loyiha narxini hisoblatish
          </button>
        </div>
      </div>
    </div>
  );
}
