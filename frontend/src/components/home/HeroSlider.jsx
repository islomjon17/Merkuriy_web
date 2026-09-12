import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Maximize2, Wallet, Sparkles } from 'lucide-react';
import { getImageUrl, PLACEHOLDER_IMAGES } from '../../api/client';

export default function HeroSlider({ slides = [] }) {
  // Reliable default fallback slides
  const defaultSlides = [
    {
      id: 1,
      title: "Yunusobod City Zamonaviy Turar-joy Majmuasi",
      short_description: "12 qavatli shinam va barcha qulayliklarga ega premium klassdagi turar-joy majmuasi.",
      hero_image: null,
      status: "in_progress",
      status_display: "Qurilishi davom etmoqda",
      volume: "18,500 kv.m",
      location: "Toshkent sh., Yunusobod tumani",
      budget_formatted: "28 500 000 000 so'm",
    },
    {
      id: 2,
      title: "Merkuriy Business Tower",
      short_description: "A-klassdagi 8 qavatli zamonaviy biznes markazi va savdo maydonlari.",
      hero_image: null,
      status: "completed",
      status_display: "Tugallangan",
      volume: "6,200 kv.m",
      location: "Toshkent sh., Mirobod tumani",
      budget_formatted: "15 000 000 000 so'm",
    },
  ];

  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto rotation: advance every 5 seconds, pause on hover
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeSlides.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const statusLabel =
    currentSlide.status_display ||
    (currentSlide.status === 'in_progress' ? "Qurilishi davom etmoqda" : "Tugallangan loyiha");

  const rawDescription =
    currentSlide.short_description ||
    currentSlide.full_description ||
    currentSlide.description ||
    '';

  // Truncate description text to maximum 100 words
  const getTruncatedWords = (text, maxWords = 100) => {
    if (!text) return { displayedText: '', isTruncated: false };
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return { displayedText: text, isTruncated: false };
    }
    return {
      displayedText: words.slice(0, maxWords).join(' '),
      isTruncated: true,
    };
  };

  const { displayedText: descriptionText, isTruncated: isDescTruncated } =
    getTruncatedWords(rawDescription, 100);

  return (
    <section
      className="relative w-full min-h-[660px] sm:min-h-[720px] lg:h-screen lg:max-h-[960px] overflow-hidden bg-brand-dark select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Smooth Crossfade - Fully visible, no black side shadow */}
      {activeSlides.map((slide, idx) => {
        const slideImg = getImageUrl(slide.hero_image, PLACEHOLDER_IMAGES.hero);
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* The photo is completely visible across its full width */}
            <img
              src={slideImg}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            {/* Subtle top & bottom edge shading only for navbar and indicator clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
          </div>
        );
      })}

      {/* Content Container - Generous top padding (pt-28 sm:pt-28 lg:pt-16) to strictly avoid sticking to fixed navbar on mobile */}
      <div className="relative z-20 h-full min-h-[660px] sm:min-h-[720px] lg:min-h-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24 sm:pt-28 pb-20 sm:pb-16 lg:pt-16 lg:pb-8">
        <div className="max-w-3xl rounded-3xl p-5 sm:p-8 lg:p-10 backdrop-blur-md bg-brand-dark/50 dark:bg-black/65 border border-white/20 shadow-2xl space-y-4 sm:space-y-5 animate-slide-up mt-3 sm:mt-0">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-accent/25 border border-brand-accent/60 text-brand-accent text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            {statusLabel}
          </div>

          {/* Project Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] drop-shadow-md">
            {currentSlide.title}
          </h1>

          {/* Short Description (Capped at 100 words with 'ko'proq ko'rish' link) */}
          <div className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-2xl font-normal drop-shadow">
            <span>{descriptionText}</span>
            {isDescTruncated && (
              <>
                <span>... </span>
                <Link
                  to={`/projects/${currentSlide.id}`}
                  className="inline-flex items-center gap-1 font-bold text-brand-accent hover:text-amber-300 underline underline-offset-4 transition-colors cursor-pointer ml-1"
                >
                  ko'proq ko'rish
                  <ArrowRight className="w-3.5 h-3.5 inline-block" />
                </Link>
              </>
            )}
          </div>

          {/* Specs Mini Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-200 pt-1">
            {currentSlide.volume && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/15">
                <Maximize2 className="w-3.5 h-3.5 text-brand-accent" />
                <span>{currentSlide.volume}</span>
              </div>
            )}
            {currentSlide.location && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                <span>{currentSlide.location}</span>
              </div>
            )}
            {currentSlide.budget_formatted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 text-amber-300 font-bold">
                <Wallet className="w-3.5 h-3.5 text-brand-accent" />
                <span>{currentSlide.budget_formatted}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={`/projects/${currentSlide.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 group cursor-pointer"
            >
              <span>Batafsil ma'lumot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Barcha loyihalar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {!isPaused && activeSlides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            key={currentIndex}
            className="h-full bg-brand-accent transition-all duration-5000 ease-linear"
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Arrow Navigation Controls */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 right-6 sm:right-12 z-30 flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-xl bg-brand-primary/80 hover:bg-brand-accent hover:text-brand-dark text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Oldingi slayd"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-xl bg-brand-primary/80 hover:bg-brand-accent hover:text-brand-dark text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Keyingi slayd"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Dot Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-10 left-6 sm:left-12 z-30 flex items-center gap-2.5">
          {activeSlides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-brand-accent'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slayd ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
