import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Phone,
  User,
  Image as ImageIcon
} from 'lucide-react';
import { getProjectDetail, getImageUrl, createLead, PLACEHOLDER_IMAGES } from '../api/client';
import BeforeAfterViewer from '../components/projects/BeforeAfterViewer';
import SatelliteSection from '../components/projects/SatelliteSection';

export default function ProjectDetailPage({ showToast }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lightbox modal state
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Bottom lead form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('+998 ');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProjectDetail(id)
      .then((data) => {
        setProject(data);
      })
      .catch((err) => {
        console.error("Error fetching project detail:", err);
        setError("Loyiha ma'lumotlarini yuklashda xatolik yuz berdi yoki loyiha topilmadi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleBottomLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadError('');

    if (!leadName.trim() || leadName.trim().length < 2) {
      setLeadError("Iltimos, ismingizni to'liq kiriting.");
      return;
    }

    const digitsOnly = leadPhone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setLeadError("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    try {
      setLeadSubmitting(true);
      await createLead({
        name: leadName.trim(),
        phone_number: leadPhone.trim(),
        project_type: `Loyiha bo'yicha so'rov: ${project?.title || id}`,
      });
      showToast("Arizangiz qabul qilindi, mutaxassisimiz tez orada siz bilan bog'lanadi!");
      setLeadName('');
      setLeadPhone('+998 ');
    } catch (err) {
      setLeadError("Ariza yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-brand-dark">
        <Loader2 className="w-10 h-10 animate-spin text-brand-accent" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loyiha tafsilotlari yuklanmoqda...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-brand-dark text-center px-4">
        <p className="text-base text-red-600 dark:text-red-400 font-semibold">{error || "Loyiha topilmadi"}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary dark:bg-brand-accent dark:text-brand-dark text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Loyihalar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const isCompleted = project.status === 'completed';
  const heroImage = getImageUrl(project.hero_image || project.main_thumbnail, PLACEHOLDER_IMAGES.hero);
  const gallery = project.gallery || [];

  return (
    <div className="w-full bg-slate-50 dark:bg-brand-dark min-h-screen pb-24 transition-colors">
      {/* Top Banner with Background Image & Breadcrumbs */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-brand-dark overflow-hidden">
        <img
          src={heroImage}
          alt={project.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-28 pb-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-brand-accent transition-colors self-start px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Barcha loyihalarga qaytish
          </Link>

          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              {project.category && (
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-white/20 text-white backdrop-blur-md">
                  {project.category.name}
                </span>
              )}
              <span
                className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 backdrop-blur-md ${
                  isCompleted ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-brand-dark'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {project.status_display || (isCompleted ? "Tugallangan" : "Jarayonda")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-200 font-medium">
              {project.volume && (
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-brand-accent" />
                  <span>{project.volume}</span>
                </div>
              )}
              {project.budget_formatted && (
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Wallet className="w-4 h-4 text-brand-accent" />
                  <span>Byudjet: {project.budget_formatted}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.created_at && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>{project.created_at.slice(0, 10)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Technical Description Card */}
        <div className="bg-white dark:bg-brand-primary/50 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Loyiha haqida va texnik xususiyatlar
          </h2>
          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {project.full_description || project.short_description}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        {gallery.length > 0 && (
          <div className="bg-white dark:bg-brand-primary/50 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 dark:bg-white/10 text-brand-secondary dark:text-brand-accent flex items-center justify-center font-bold">
                <ImageIcon className="w-4 h-4 text-brand-secondary dark:text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Obyekt fotogalereyasi ({gallery.length} ta surat)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kattalashtirib ko'rish uchun surat ustiga bosing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item, idx) => {
                const imgUrl = getImageUrl(item.image);
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative h-56 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 cursor-pointer group"
                  >
                    <img
                      src={imgUrl}
                      alt={item.caption || `Galereya rasmi ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white font-medium drop-shadow">
                        {item.caption || "Rasmni kattalashtirish"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Before / After Interactive Comparison Section */}
        {(project.before_image && project.after_image) && (
          <BeforeAfterViewer
            beforeImage={project.before_image}
            afterImage={project.after_image}
          />
        )}

        {/* Satellite Map & Boundaries Section */}
        {(project.satellite_image || project.satellite_link) && (
          <SatelliteSection
            satelliteImage={project.satellite_image}
            satelliteLink={project.satellite_link}
            locationName={project.location}
          />
        )}

        {/* Bottom Action Form: "Shu kabi loyihani hisoblatishni xohlaysizmi?" */}
        <div className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary p-8 sm:p-12 rounded-3xl text-white shadow-xl space-y-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
              Individual hisob-kitob
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Shu kabi loyihani hisoblatishni xohlaysizmi?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mutaxassislarimiz {project.title} obyektiga o'xshash loyihangiz uchun individual smeta va grafik rejasini bepul ishlab chiqishadi.
            </p>
          </div>

          <form onSubmit={handleBottomLeadSubmit} className="max-w-xl space-y-4">
            {leadError && (
              <div className="p-3 text-xs font-medium text-red-200 bg-red-900/50 border border-red-500/50 rounded-xl">
                {leadError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ismingiz"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                />
              </div>

              <div className="relative">
                <Phone className="absolute w-4 h-4 text-slate-400 left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={leadPhone}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!val.startsWith('+998')) val = '+998 ';
                    setLeadPhone(val);
                  }}
                  className="w-full py-3 pl-10 pr-4 text-sm font-medium bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={leadSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 font-bold text-sm rounded-xl text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 disabled:opacity-60 cursor-pointer"
            >
              {leadSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Hisoblatish uchun so'rov yuborish
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next controls */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
                }}
                className="absolute left-6 p-3 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Oldingi"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % gallery.length);
                }}
                className="absolute right-6 p-3 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Keyingi"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(gallery[lightboxIndex].image)}
              alt="Kattalashtirilgan surat"
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            {gallery[lightboxIndex].caption && (
              <p className="mt-4 text-sm text-slate-300 text-center font-medium">
                {gallery[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
