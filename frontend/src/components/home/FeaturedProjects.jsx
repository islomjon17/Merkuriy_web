import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';
import ProjectCard from '../projects/ProjectCard';

export default function FeaturedProjects({ projects = [] }) {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-20 bg-white dark:bg-brand-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 text-brand-dark dark:text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-brand-accentHover dark:text-brand-accent" />
              Bizning portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tanlangan asosiy obyektlar
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Qurilish va me'moriy loyihalashdagi sifat, xavfsizlik va zamonaviy yechimlarimiz namunasi.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary dark:text-brand-accent hover:text-brand-accentHover transition-colors shrink-0 group cursor-pointer"
          >
            <span>Barcha obyektlarni ko'rish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">
              Hozirda tanlangan loyihalar ro'yxati yangilanmoqda.
            </p>
            <Link
              to="/projects"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-brand-dark bg-brand-accent rounded-xl hover:bg-brand-accentHover"
            >
              Loyihalar katalogiga o'tish
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
