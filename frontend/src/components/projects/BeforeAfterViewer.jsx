import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import { getImageUrl } from '../../api/client';

export default function BeforeAfterViewer({ beforeImage, afterImage }) {
  if (!beforeImage || !afterImage) return null;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeUrl = getImageUrl(beforeImage);
  const afterUrl = getImageUrl(afterImage);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="bg-white dark:bg-brand-primary/50 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-accent/20 text-brand-dark flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-brand-accentHover" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ta'mirdan oldingi va keyingi natija
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Slayderni o'ngga yoki chapga surib o'zgarishlarni ko'ring
            </p>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-80 sm:h-[480px] rounded-xl overflow-hidden select-none cursor-ew-resize bg-slate-900"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Full width background) */}
        <img
          src={afterUrl}
          alt="Ta'mirdan keyin"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white font-bold text-xs rounded-lg shadow">
          Ta'mirdan keyin (After)
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeUrl}
            alt="Ta'mirdan oldin"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-primary/90 backdrop-blur-md text-white font-bold text-xs rounded-lg shadow">
            Ta'mirdan oldin (Before)
          </div>
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-brand-accent text-brand-dark rounded-full shadow-xl flex items-center justify-center border-2 border-white">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
