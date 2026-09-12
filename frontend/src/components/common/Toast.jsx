import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-md">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium ${
          isSuccess
            ? 'bg-brand-primary text-white border-brand-accent/40 shadow-brand-accent/10'
            : 'bg-red-900 text-white border-red-500/40'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        )}
        <span className="leading-snug">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Yopish"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
