import React from 'react';
import { MapPin, ExternalLink, Globe2 } from 'lucide-react';
import { getImageUrl, PLACEHOLDER_IMAGES } from '../../api/client';

export default function SatelliteSection({ satelliteImage, satelliteLink, locationName }) {
  if (!satelliteImage && !satelliteLink) return null;

  const imageSrc = getImageUrl(satelliteImage, PLACEHOLDER_IMAGES.satellite);

  return (
    <div className="bg-white dark:bg-brand-primary/50 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 dark:bg-white/10 text-brand-secondary dark:text-brand-accent flex items-center justify-center font-bold">
            <Globe2 className="w-4 h-4 text-brand-secondary dark:text-brand-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Sun'iy yo'ldosh xaritasi va obyekt chegaralari
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locationName || "Obyektning aniq hududiy joylashuvi va chegaralari"}
            </p>
          </div>
        </div>

        {satelliteLink && (
          <a
            href={satelliteLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-primary hover:bg-brand-secondary text-white transition-colors shrink-0 shadow-md cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Google / Yandex Xaritada ko'rish</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        )}
      </div>

      {satelliteImage && (
        <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
          <img
            src={imageSrc}
            alt="Sun'iy yo'ldosh ko'rinishi"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-brand-dark/80 backdrop-blur-md rounded-lg text-white text-xs font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Obyekt geolokatsiyasi va maydon chegarasi</span>
          </div>
        </div>
      )}
    </div>
  );
}
