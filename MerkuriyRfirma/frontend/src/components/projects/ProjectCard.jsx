import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2, CheckCircle, Clock, Wallet } from 'lucide-react';
import { getImageUrl, PLACEHOLDER_IMAGES } from '../../api/client';

export default function ProjectCard({ project }) {
  if (!project) return null;

  const thumbnail = getImageUrl(
    project.main_thumbnail || project.hero_image,
    PLACEHOLDER_IMAGES.project
  );

  const isCompleted = project.status === 'completed';
  const categoryName = project.category?.name || 'Qurilish';

  return (
    <div className="flex flex-col bg-white dark:bg-brand-primary/50 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all duration-300 group">
      {/* Thumbnail with overlay & badges */}
      <div className="relative w-full h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={thumbnail}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category Tag */}
          <span className="px-3 py-1 text-[11px] font-bold rounded-lg bg-brand-primary/80 backdrop-blur-md text-white border border-white/10">
            {categoryName}
          </span>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1.5 backdrop-blur-md border ${
              isCompleted
                ? 'bg-emerald-600/90 text-white border-emerald-400/40'
                : 'bg-amber-500/90 text-brand-dark border-amber-300/40'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Tugallangan
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                Jarayonda
              </>
            )}
          </span>
        </div>

        {/* Bottom meta over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
          {project.location ? (
            <span className="flex items-center gap-1 drop-shadow">
              <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
              <span className="truncate">{project.location}</span>
            </span>
          ) : <span />}

          {/* Budget chip over image */}
          {project.budget_formatted && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-amber-300 font-bold text-[10px]">
              <Wallet className="w-3 h-3 text-brand-accent shrink-0" />
              <span>{project.budget_formatted}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-accent transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.short_description || "Loyihaning to'liq tavsifi va bajarilgan ishlar ko'lami."}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Maximize2 className="w-3.5 h-3.5 text-brand-accent" />
            <span>{project.volume || "Ko'rsatilmagan"}</span>
          </div>

          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary dark:text-brand-accent group-hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <span>Batafsil</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
