import React, { useState, useRef, useId } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Truck,
  Warehouse,
  Search,
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingDown,
  Layers,
  MapPin,
  Users,
  HardHat,
  Boxes,
  Building,
  Radio,
  Star,
  Compass,
  Check,
  ChevronRight,
  PhoneCall,
  Clock,
  Briefcase
} from 'lucide-react';
import { createLead } from '../api/client';

// =============================================================================
// STYLIZED 2D CHARACTER AVATAR 1: KASKA KIYGAN QURUVCHI / FIRMA RAHBARI
// =============================================================================
export function BuilderAvatar2D({ className = "w-16 h-16 sm:w-20 sm:h-20", size }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const helmetGrad = `bldHelmet_${uid}`;
  const skinGrad = `bldSkin_${uid}`;
  const vestGrad = `bldVest_${uid}`;
  const jacketGrad = `bldJacket_${uid}`;

  const styleObj = size ? { width: size, height: size } : { minWidth: '40px', minHeight: '40px' };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={styleObj}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={helmetGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={skinGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        <linearGradient id={vestGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={jacketGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      {/* Background circle badge */}
      <circle cx="50" cy="50" r="48" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
      {/* Body & Jacket */}
      <path d="M 20 96 C 20 74 34 68 50 68 C 66 68 80 74 80 96 Z" fill={`url(#${jacketGrad})`} />
      {/* Safety Vest */}
      <path d="M 32 70 L 68 70 L 74 96 L 26 96 Z" fill={`url(#${vestGrad})`} />
      {/* Reflective silver stripes */}
      <rect x="29" y="77" width="42" height="4" fill="#E2E8F0" rx="1" />
      <rect x="27" y="87" width="46" height="4" fill="#E2E8F0" rx="1" />
      {/* Shirt Collar & Neck */}
      <rect x="44" y="58" width="12" height="14" fill={`url(#${skinGrad})`} rx="3" />
      <polygon points="50,68 44,60 56,60" fill="#FFFFFF" />
      {/* Face */}
      <ellipse cx="50" cy="46" rx="16" ry="17" fill={`url(#${skinGrad})`} />
      {/* Ears */}
      <circle cx="34" cy="46" r="4" fill="#FED7AA" />
      <circle cx="66" cy="46" r="4" fill="#FED7AA" />
      {/* Eyes & Eyebrows */}
      <ellipse cx="44" cy="44" rx="2" ry="2.5" fill="#0F172A" />
      <ellipse cx="56" cy="44" rx="2" ry="2.5" fill="#0F172A" />
      <path d="M 41 39 Q 44 37 47 39" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 53 39 Q 56 37 59 39" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Friendly Smile & Nose */}
      <path d="M 50 46 L 49 50 L 52 50" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 45 54 Q 50 58 55 54" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Hair Under Helmet */}
      <path d="M 34 38 Q 36 34 50 34 Q 64 34 66 38 Z" fill="#451A03" />
      {/* Construction Safety Helmet (Kaska) */}
      <path d="M 28 36 C 28 17 72 17 72 36 L 76 39 L 24 39 Z" fill={`url(#${helmetGrad})`} stroke="#B45309" strokeWidth="1.5" />
      {/* Helmet Brim & Ridges */}
      <rect x="22" y="36" width="56" height="5" rx="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <path d="M 46 19 L 46 36 L 54 36 L 54 19 Z" fill="#FDE68A" fillOpacity="0.7" />
      <circle cx="50" cy="28" r="3" fill="#D97706" />
    </svg>
  );
}

// =============================================================================
// STYLIZED 2D CHARACTER AVATAR 2: YUK MASHINASI HAYDOVCHISI
// =============================================================================
export function TruckDriverAvatar2D({ className = "w-16 h-16 sm:w-20 sm:h-20", size }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const capGrad = `drvCap_${uid}`;
  const skinGrad = `drvSkin_${uid}`;
  const jacketGrad = `drvJacket_${uid}`;

  const styleObj = size ? { width: size, height: size } : { minWidth: '40px', minHeight: '40px' };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={styleObj}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={capGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={skinGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        <linearGradient id={jacketGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* Background circle badge */}
      <circle cx="50" cy="50" r="48" fill="#0F172A" stroke="#3B82F6" strokeWidth="2.5" />
      {/* Driver Jacket / Vest */}
      <path d="M 20 96 C 20 74 34 68 50 68 C 66 68 80 74 80 96 Z" fill={`url(#${jacketGrad})`} />
      {/* Inner T-shirt */}
      <path d="M 40 70 L 60 70 L 50 88 Z" fill="#FFFFFF" />
      {/* Neck */}
      <rect x="44" y="58" width="12" height="14" fill={`url(#${skinGrad})`} rx="3" />
      {/* Face */}
      <ellipse cx="50" cy="46" rx="16" ry="17" fill={`url(#${skinGrad})`} />
      {/* Ears */}
      <circle cx="34" cy="47" r="4" fill="#FED7AA" />
      <circle cx="66" cy="47" r="4" fill="#FED7AA" />
      {/* Driver Bluetooth Headset on Ear */}
      <rect x="31" y="44" width="3" height="7" rx="1.5" fill="#38BDF8" />
      <line x1="33" y1="48" x2="38" y2="52" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Eyes / Confident expression */}
      <ellipse cx="44" cy="45" rx="2" ry="2.5" fill="#0F172A" />
      <ellipse cx="56" cy="45" rx="2" ry="2.5" fill="#0F172A" />
      <path d="M 41 40 Q 44 38 47 40" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 53 40 Q 56 38 59 40" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile & Chin */}
      <path d="M 50 48 L 49 51 L 52 51" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 44 55 Q 50 59 56 55" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Trucker Cap */}
      <path d="M 32 38 C 32 22 68 22 68 38 Z" fill={`url(#${capGrad})`} stroke="#1E40AF" strokeWidth="1.5" />
      {/* Cap Visor */}
      <path d="M 30 38 Q 50 32 76 36 L 76 41 Q 50 36 28 41 Z" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1" />
      {/* Cap Emblem */}
      <circle cx="50" cy="29" r="4" fill="#F59E0B" />
      <text x="50" y="32" fill="#0F172A" fontSize="5" fontWeight="black" textAnchor="middle">M</text>
    </svg>
  );
}

// =============================================================================
// STYLIZED 2D CHARACTER AVATAR 3: OMBORCHI / TA'MINOTCHI MUDIRI
// =============================================================================
export function WarehouseMasterAvatar2D({ className = "w-16 h-16 sm:w-20 sm:h-20", size }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const helmetGrad = `whsHelmet_${uid}`;
  const skinGrad = `whsSkin_${uid}`;
  const vestGrad = `whsVest_${uid}`;

  const styleObj = size ? { width: size, height: size } : { minWidth: '40px', minHeight: '40px' };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={styleObj}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={helmetGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id={skinGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        <linearGradient id={vestGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Background circle badge */}
      <circle cx="50" cy="50" r="48" fill="#1E293B" stroke="#10B981" strokeWidth="2.5" />
      {/* Work Shirt */}
      <path d="M 20 96 C 20 74 34 68 50 68 C 66 68 80 74 80 96 Z" fill="#334155" />
      {/* Green Logistics Vest */}
      <path d="M 32 70 L 68 70 L 74 96 L 26 96 Z" fill={`url(#${vestGrad})`} />
      <rect x="29" y="78" width="42" height="4" fill="#E2E8F0" rx="1" />
      <rect x="27" y="88" width="46" height="4" fill="#E2E8F0" rx="1" />
      {/* ID Badge on chest */}
      <rect x="36" y="80" width="8" height="11" rx="1.5" fill="#FFFFFF" stroke="#047857" strokeWidth="1" />
      <line x1="38" y1="84" x2="42" y2="84" stroke="#047857" strokeWidth="1" />
      <line x1="38" y1="87" x2="42" y2="87" stroke="#047857" strokeWidth="1" />
      {/* Neck */}
      <rect x="44" y="58" width="12" height="14" fill={`url(#${skinGrad})`} rx="3" />
      {/* Face with Glasses */}
      <ellipse cx="50" cy="46" rx="16" ry="17" fill={`url(#${skinGrad})`} />
      <circle cx="34" cy="46" r="4" fill="#FED7AA" />
      <circle cx="66" cy="46" r="4" fill="#FED7AA" />
      {/* Glasses Frames */}
      <rect x="39" y="42" width="9" height="7" rx="2" fill="#E0F2FE" fillOpacity="0.4" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="52" y="42" width="9" height="7" rx="2" fill="#E0F2FE" fillOpacity="0.4" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="48" y1="45" x2="52" y2="45" stroke="#0F172A" strokeWidth="1.5" />
      {/* Eyes inside glasses */}
      <circle cx="43.5" cy="45.5" r="1.5" fill="#0F172A" />
      <circle cx="56.5" cy="45.5" r="1.5" fill="#0F172A" />
      {/* Smile */}
      <path d="M 45 54 Q 50 58 55 54" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* White Safety Hardhat */}
      <path d="M 28 36 C 28 17 72 17 72 36 L 76 39 L 24 39 Z" fill={`url(#${helmetGrad})`} stroke="#64748B" strokeWidth="1.5" />
      <rect x="22" y="36" width="56" height="5" rx="2.5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="50" cy="28" r="3" fill="#10B981" />
    </svg>
  );
}

// =============================================================================
// 2D STANDING CHARACTER FIGURE: KASKA KIYGAN QURUVCHI FIRMA RAHBARI
// =============================================================================
export function BuilderFigure2D({ className = "w-28 h-48 sm:w-36 sm:h-60" }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`bFigHelmet_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`bFigVest_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* Shadow under feet */}
      <ellipse cx="60" cy="192" rx="35" ry="6" fill="#000000" fillOpacity="0.4" />

      {/* Legs & Safety Boots */}
      <path d="M 44 130 L 44 180 L 36 182 L 36 190 L 52 190 L 52 130 Z" fill="#0F172A" />
      <path d="M 68 130 L 68 180 L 60 182 L 60 190 L 76 190 L 76 130 Z" fill="#0F172A" />
      <rect x="36" y="185" width="16" height="5" rx="2" fill="#D97706" />
      <rect x="60" y="185" width="16" height="5" rx="2" fill="#D97706" />

      {/* Body & Hi-vis Vest */}
      <path d="M 38 65 L 82 65 L 86 132 L 34 132 Z" fill={`url(#bFigVest_${uid})`} />
      <rect x="36" y="82" width="48" height="6" fill="#E2E8F0" rx="1" />
      <rect x="35" y="105" width="50" height="6" fill="#E2E8F0" rx="1" />
      <line x1="60" y1="65" x2="60" y2="132" stroke="#475569" strokeWidth="2" />

      {/* Left Arm holding tablet/blueprints */}
      <path d="M 38 70 L 22 105 L 30 115 L 42 85 Z" fill="#1E3A8A" />
      <rect x="15" y="102" width="22" height="30" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="18" y="105" width="16" height="22" rx="1" fill="#0284C7" />
      <line x1="20" y1="110" x2="32" y2="110" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="20" y1="115" x2="30" y2="115" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="26" cy="122" r="2.5" fill="#FBBF24" />

      {/* Right Arm waving */}
      <path d="M 82 70 L 98 100 L 90 108 L 78 82 Z" fill="#1E3A8A" />
      <circle cx="95" cy="106" r="6" fill="#FED7AA" />

      {/* Neck */}
      <rect x="54" y="52" width="12" height="15" fill="#FED7AA" rx="2" />
      <polygon points="60,65 52,56 68,56" fill="#FFFFFF" />

      {/* Head / Face */}
      <ellipse cx="60" cy="42" rx="16" ry="17" fill="#FED7AA" />
      <circle cx="44" cy="42" r="3.5" fill="#FED7AA" />
      <circle cx="76" cy="42" r="3.5" fill="#FED7AA" />
      <ellipse cx="54" cy="40" rx="2" ry="2.5" fill="#0F172A" />
      <ellipse cx="66" cy="40" rx="2" ry="2.5" fill="#0F172A" />
      <path d="M 51 36 Q 54 34 57 36" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 63 36 Q 66 34 69 36" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 42 L 59 45 L 62 45" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 55 49 Q 60 53 65 49" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Yellow Safety Hardhat (Kaska) */}
      <path d="M 40 33 C 40 14 80 14 80 33 L 84 36 L 36 36 Z" fill={`url(#bFigHelmet_${uid})`} stroke="#B45309" strokeWidth="1.5" />
      <rect x="34" y="33" width="52" height="5" rx="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <path d="M 56 16 L 56 33 L 64 33 L 64 16 Z" fill="#FEF08A" fillOpacity="0.8" />
      <circle cx="60" cy="25" r="3" fill="#D97706" />
    </svg>
  );
}

// =============================================================================
// 2D STANDING CHARACTER FIGURE: KASKA KIYGAN OMBOR VA TA'MINOT MUDIRI
// =============================================================================
export function WarehouseMasterFigure2D({ className = "w-28 h-48 sm:w-36 sm:h-60" }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`wFigHelmet_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id={`wFigVest_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Shadow under feet */}
      <ellipse cx="60" cy="192" rx="35" ry="6" fill="#000000" fillOpacity="0.4" />

      {/* Legs & Safety Boots */}
      <path d="M 44 130 L 44 180 L 36 182 L 36 190 L 52 190 L 52 130 Z" fill="#1E293B" />
      <path d="M 68 130 L 68 180 L 60 182 L 60 190 L 76 190 L 76 130 Z" fill="#1E293B" />
      <rect x="36" y="185" width="16" height="5" rx="2" fill="#475569" />
      <rect x="60" y="185" width="16" height="5" rx="2" fill="#475569" />

      {/* Body & Logistics Vest */}
      <path d="M 38 65 L 82 65 L 86 132 L 34 132 Z" fill={`url(#wFigVest_${uid})`} />
      <rect x="36" y="82" width="48" height="6" fill="#E2E8F0" rx="1" />
      <rect x="35" y="105" width="50" height="6" fill="#E2E8F0" rx="1" />
      <rect x="42" y="78" width="9" height="13" rx="1.5" fill="#FFFFFF" stroke="#047857" strokeWidth="1" />
      <line x1="44" y1="83" x2="49" y2="83" stroke="#047857" strokeWidth="1" />
      <line x1="44" y1="86" x2="49" y2="86" stroke="#047857" strokeWidth="1" />

      {/* Left Arm holding barcode scanner */}
      <path d="M 38 70 L 24 98 L 32 106 L 42 82 Z" fill="#334155" />
      <rect x="18" y="96" width="14" height="18" rx="2" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <line x1="16" y1="104" x2="8" y2="104" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />

      {/* Right Arm holding Clipboard Manifest */}
      <path d="M 82 70 L 96 102 L 86 112 L 76 82 Z" fill="#334155" />
      <rect x="85" y="98" width="20" height="28" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />
      <rect x="87" y="102" width="16" height="22" rx="1" fill="#FFFFFF" />
      <line x1="90" y1="107" x2="100" y2="107" stroke="#1E293B" strokeWidth="1.5" />
      <line x1="90" y1="112" x2="98" y2="112" stroke="#1E293B" strokeWidth="1.5" />
      <line x1="90" y1="117" x2="96" y2="117" stroke="#10B981" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="54" y="52" width="12" height="15" fill="#FED7AA" rx="2" />

      {/* Head / Face with Glasses */}
      <ellipse cx="60" cy="42" rx="16" ry="17" fill="#FED7AA" />
      <circle cx="44" cy="42" r="3.5" fill="#FED7AA" />
      <circle cx="76" cy="42" r="3.5" fill="#FED7AA" />
      <rect x="49" y="38" width="9" height="7" rx="2" fill="#E0F2FE" fillOpacity="0.4" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="62" y="38" width="9" height="7" rx="2" fill="#E0F2FE" fillOpacity="0.4" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="58" y1="41" x2="62" y2="41" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="53.5" cy="41.5" r="1.5" fill="#0F172A" />
      <circle cx="66.5" cy="41.5" r="1.5" fill="#0F172A" />
      <path d="M 55 49 Q 60 53 65 49" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* White Safety Hardhat (Kaska) */}
      <path d="M 40 33 C 40 14 80 14 80 33 L 84 36 L 36 36 Z" fill={`url(#wFigHelmet_${uid})`} stroke="#64748B" strokeWidth="1.5" />
      <rect x="34" y="33" width="52" height="5" rx="2.5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="60" cy="25" r="3" fill="#10B981" />
    </svg>
  );
}

// =============================================================================
// REALISTIC 2D VECTOR TRUCK 1: HEAVY DUMP TRUCK (HOWO / KAMAZ STYLE)
// =============================================================================
function RealisticDumpTruckVector() {
  return (
    <svg viewBox="0 0 460 180" className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
      <defs>
        <linearGradient id="cabinGradBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="60%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="tipperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="metalChrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="headlightBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Headlight beam */}
      <polygon points="40,118 -80,90 -80,150 40,132" fill="url(#headlightBeam)" opacity="0.4" />

      {/* Heavy Steel Tipper Body (Cargo Box) */}
      <polygon points="175,35 440,35 445,120 175,120" fill="url(#tipperGrad)" stroke="#64748B" strokeWidth="2.5" />
      {/* Tipper reinforcement vertical ribs */}
      <line x1="225" y1="35" x2="225" y2="120" stroke="#0F172A" strokeWidth="4" />
      <line x1="275" y1="35" x2="275" y2="120" stroke="#0F172A" strokeWidth="4" />
      <line x1="325" y1="35" x2="325" y2="120" stroke="#0F172A" strokeWidth="4" />
      <line x1="375" y1="35" x2="375" y2="120" stroke="#0F172A" strokeWidth="4" />
      <line x1="420" y1="35" x2="420" y2="120" stroke="#0F172A" strokeWidth="4" />
      {/* Tipper Top Rail & Reflective Warning Tape */}
      <rect x="175" y="32" width="265" height="6" fill="#F59E0B" />
      <line x1="175" y1="116" x2="440" y2="116" stroke="#EF4444" strokeWidth="3" strokeDasharray="8 6" />

      {/* Heavy Chassis Frame */}
      <rect x="70" y="120" width="370" height="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      {/* Diesel Fuel Tank & Air Reservoirs */}
      <rect x="190" y="126" width="60" height="16" rx="4" fill="url(#metalChrome)" stroke="#475569" strokeWidth="1" />
      <rect x="260" y="128" width="40" height="14" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />

      {/* Truck Cabin (Facing Left) */}
      <path
        d="M 50 120 L 50 82 Q 52 70 65 60 L 98 42 Q 106 38 120 38 L 170 38 L 170 120 Z"
        fill="url(#cabinGradBlue)"
        stroke="#60A5FA"
        strokeWidth="2.5"
      />
      {/* Aerodynamic Roof Deflector & Sun Visor */}
      <path d="M 90 40 L 172 32 L 172 40 L 90 44 Z" fill="#1E3A8A" />
      <path d="M 60 58 L 98 42 L 102 46 L 62 62 Z" fill="#0F172A" />

      {/* Large Tinted Windshield & Side Window */}
      <path d="M 68 76 L 98 48 L 126 48 L 126 76 Z" fill="#93C5FD" fillOpacity="0.6" stroke="#3B82F6" strokeWidth="1.5" />
      <rect x="132" y="48" width="32" height="28" rx="2" fill="#60A5FA" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1.5" />
      {/* Driver Silhouette Inside Cabin */}
      <circle cx="145" cy="58" r="6" fill="#0F172A" />
      <path d="M 137 72 Q 145 66 153 72 Z" fill="#F59E0B" />

      {/* Front Radiator Grille & Bumper */}
      <rect x="42" y="86" width="16" height="34" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
      <line x1="44" y1="92" x2="56" y2="92" stroke="#64748B" strokeWidth="1.5" />
      <line x1="44" y1="98" x2="56" y2="98" stroke="#64748B" strokeWidth="1.5" />
      <line x1="44" y1="104" x2="56" y2="104" stroke="#64748B" strokeWidth="1.5" />
      <line x1="44" y1="110" x2="56" y2="110" stroke="#64748B" strokeWidth="1.5" />

      {/* Heavy Front Bumper & Dual Fog/Headlights */}
      <rect x="36" y="112" width="22" height="18" rx="3" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
      <rect x="38" y="116" width="8" height="6" rx="1" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
      <rect x="38" y="123" width="6" height="4" rx="1" fill="#F59E0B" />

      {/* Side Mirror & Door Handle */}
      <rect x="52" y="60" width="5" height="14" rx="1" fill="#0F172A" />
      <line x1="57" y1="64" x2="68" y2="68" stroke="#0F172A" strokeWidth="2" />
      <rect x="145" y="82" width="8" height="3" rx="1" fill="url(#metalChrome)" />

      {/* 3 Heavy Axles (Front + Dual Rear Bogeys) */}
      <g transform="translate(100, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="url(#metalChrome)" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#475569" />
      </g>
      <g transform="translate(345, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="url(#metalChrome)" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#475569" />
      </g>
      <g transform="translate(400, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="url(#metalChrome)" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#475569" />
      </g>
    </svg>
  );
}

// =============================================================================
// REALISTIC 2D VECTOR TRUCK 2: CONCRETE MIXER VEHICLE
// =============================================================================
function RealisticMixerTruckVector() {
  return (
    <svg viewBox="0 0 460 180" className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
      <defs>
        <linearGradient id="cabinGradAmber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="mixerDrumGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="30%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Rotating Concrete Mixer Drum */}
      <g transform="translate(180, 20)">
        <path
          d="M 20 65 L 140 20 Q 200 45 220 70 Q 200 95 140 100 L 20 75 Z"
          fill="url(#mixerDrumGrad)"
          stroke="#475569"
          strokeWidth="3"
        />
        <path d="M 60 55 Q 120 70 160 40" stroke="#F59E0B" strokeWidth="4" fill="none" opacity="0.9" />
        <path d="M 80 75 Q 140 85 180 65" stroke="#2563EB" strokeWidth="4" fill="none" opacity="0.9" />
        <polygon points="10,40 25,40 20,85 5,85" fill="#334155" stroke="#64748B" strokeWidth="2" />
        <polygon points="215,60 240,45 245,75 220,78" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      </g>

      {/* Chassis Frame */}
      <rect x="20" y="120" width="370" height="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      <rect x="145" y="65" width="25" height="50" rx="4" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
      <rect x="180" y="125" width="55" height="18" rx="3" fill="#334155" />

      {/* Cabin (Facing Right) */}
      <path
        d="M 410 120 L 410 82 Q 408 70 395 60 L 362 42 Q 354 38 340 38 L 290 38 L 290 120 Z"
        fill="url(#cabinGradAmber)"
        stroke="#FDE68A"
        strokeWidth="2.5"
      />
      <path d="M 370 40 L 288 32 L 288 40 L 370 44 Z" fill="#92400E" />
      <path d="M 400 58 L 362 42 L 358 46 L 398 62 Z" fill="#0F172A" />

      {/* Windshield & Windows */}
      <path d="M 392 76 L 362 48 L 334 48 L 334 76 Z" fill="#93C5FD" fillOpacity="0.7" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="296" y="48" width="34" height="28" rx="2" fill="#60A5FA" fillOpacity="0.5" stroke="#0284C7" strokeWidth="1.5" />
      {/* Driver in helmet */}
      <circle cx="315" cy="58" r="6" fill="#0F172A" />
      <path d="M 307 72 Q 315 66 323 72 Z" fill="#2563EB" />

      {/* Bumper & Headlights (Right side) */}
      <rect x="402" y="86" width="16" height="34" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
      <rect x="402" y="112" width="22" height="18" rx="3" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
      <rect x="414" y="116" width="8" height="6" rx="1" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />

      {/* Axles & Wheels */}
      <g transform="translate(60, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#F59E0B" />
      </g>
      <g transform="translate(115, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#F59E0B" />
      </g>
      <g transform="translate(360, 134)">
        <circle cx="0" cy="0" r="24" fill="#090D16" stroke="#475569" strokeWidth="3" />
        <circle cx="0" cy="0" r="16" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#F59E0B" />
      </g>
    </svg>
  );
}

// =============================================================================
// REALISTIC 2D TOWER CRANE VECTOR (BACKGROUND PARALLAX)
// =============================================================================
function RealisticTowerCraneVector({ craneRotate = 0, hookY = 0 }) {
  return (
    <div className="relative w-80 sm:w-96 aspect-square select-none pointer-events-none">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        <rect x="165" y="375" width="70" height="20" rx="4" fill="#334155" stroke="#64748B" strokeWidth="2" />
        <polygon points="175,375 185,350 215,350 225,375" fill="#1E293B" />

        {/* Vertical Mast (Lattice Steel Trusses) */}
        <g stroke="#F59E0B" strokeWidth="2.5">
          <line x1="188" y1="70" x2="188" y2="350" />
          <line x1="212" y1="70" x2="212" y2="350" />
          {Array.from({ length: 14 }).map((_, i) => {
            const y1 = 70 + i * 20;
            const y2 = 90 + i * 20;
            return (
              <React.Fragment key={i}>
                <line x1="188" y1={y1} x2="212" y2={y2} strokeWidth="1.5" />
                <line x1="212" y1={y1} x2="188" y2={y2} strokeWidth="1.5" />
              </React.Fragment>
            );
          })}
        </g>

        {/* Slewing Unit & Operator Cabin */}
        <rect x="180" y="55" width="40" height="15" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="2" />
        <rect x="215" y="52" width="22" height="22" rx="3" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
        <rect x="220" y="56" width="14" height="14" rx="2" fill="#E0F2FE" fillOpacity="0.8" />

        {/* Apex */}
        <polygon points="200,8 185,55 215,55" fill="#D97706" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="200" cy="6" r="3" fill="#EF4444" className="animate-pulse" />

        {/* Rotating Jib & Hook */}
        <motion.g style={{ transformOrigin: '200px 55px', rotate: craneRotate }}>
          <line x1="200" y1="52" x2="390" y2="52" stroke="#F59E0B" strokeWidth="4" />
          <line x1="200" y1="8" x2="310" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="200" y1="8" x2="380" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Counter Jib */}
          <line x1="200" y1="52" x2="70" y2="52" stroke="#F59E0B" strokeWidth="4" />
          <line x1="200" y1="8" x2="80" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="75" y="44" width="30" height="20" rx="3" fill="#64748B" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="110" y="46" width="25" height="16" rx="2" fill="#475569" stroke="#64748B" strokeWidth="1" />

          <rect x="315" y="50" width="16" height="8" rx="2" fill="#0F172A" />

          <motion.g style={{ y: hookY }}>
            <line x1="323" y1="58" x2="323" y2="150" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="316" y="150" width="14" height="12" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            <path d="M 323 162 C 323 175 332 175 332 168" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <g transform="translate(305, 175)">
              <rect x="0" y="0" width="36" height="24" rx="3" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" />
              <text x="18" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">CARGO</text>
            </g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

// =============================================================================
// REALISTIC 2D MODERN CITY & SKYSCRAPERS (4-BO'LIM)
// =============================================================================
function RealisticModernCityVector() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="glassFacade1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="glassFacade2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>

      {/* Distant Skyline */}
      <rect x="20" y="110" width="70" height="170" fill="#1E293B" />
      <rect x="120" y="80" width="80" height="200" fill="#0F172A" />
      <rect x="230" y="130" width="65" height="150" fill="#1E293B" />
      <rect x="390" y="90" width="75" height="190" fill="#0F172A" />
      <rect x="490" y="120" width="80" height="160" fill="#1E293B" />

      {/* Building 1: Curved Glass Tower */}
      <path d="M 60 280 L 60 70 Q 110 30 150 70 L 150 280 Z" fill="url(#glassFacade1)" stroke="#7DD3FC" strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`fl1-${i}`} x1="62" y1={90 + i * 20} x2="148" y2={90 + i * 20} stroke="#E0F2FE" strokeWidth="1.2" strokeOpacity="0.6" />
      ))}

      {/* Building 2: Skyscraper with Spire */}
      <polygon points="210,280 210,45 285,45 285,280" fill="url(#glassFacade2)" stroke="#93C5FD" strokeWidth="2.5" />
      <line x1="247" y1="45" x2="247" y2="10" stroke="#E2E8F0" strokeWidth="3" />
      <circle cx="247" cy="10" r="3" fill="#EF4444" className="animate-ping" />
      {Array.from({ length: 11 }).map((_, r) => (
        <line key={`mat-${r}`} x1="214" y1={60 + r * 19} x2="281" y2={60 + r * 19} stroke="#BAE6FD" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}

      {/* Building 3: Under-Construction Tower with Scaffolding */}
      <rect x="320" y="75" width="95" height="205" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
      <rect x="324" y="90" width="87" height="60" fill="#059669" fillOpacity="0.55" />
      <rect x="324" y="170" width="87" height="50" fill="#059669" fillOpacity="0.4" />
      <g stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.8">
        <line x1="320" y1="75" x2="415" y2="140" />
        <line x1="415" y1="75" x2="320" y2="140" />
        <line x1="320" y1="140" x2="415" y2="210" />
        <line x1="415" y1="140" x2="320" y2="210" />
      </g>
      <line x1="335" y1="75" x2="335" y2="55" stroke="#94A3B8" strokeWidth="3" />
      <line x1="355" y1="75" x2="355" y2="55" stroke="#94A3B8" strokeWidth="3" />
      <line x1="380" y1="75" x2="380" y2="55" stroke="#94A3B8" strokeWidth="3" />
      <line x1="400" y1="75" x2="400" y2="55" stroke="#94A3B8" strokeWidth="3" />

      {/* Building 4: Logistics Warehouse */}
      <polygon points="460,280 460,140 575,140 575,280" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <rect x="475" y="210" width="35" height="50" rx="3" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
      <rect x="525" y="210" width="35" height="50" rx="3" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" />

      {/* Ground Line */}
      <rect x="0" y="260" width="600" height="20" fill="#090D16" />
      <line x1="0" y1="262" x2="600" y2="262" stroke="#F59E0B" strokeWidth="2" strokeDasharray="14 8" />
    </svg>
  );
}

// =============================================================================
// MAIN COMPONENT: MERKURIY APP LANDING PAGE
// =============================================================================
export default function MerkuriyAppPage({ showToast }) {
  const [phone, setPhone] = useState('+998 ');
  const [role, setRole] = useState('Ombor / Do\'kon egasi');
  const [selectedMapRegion, setSelectedMapRegion] = useState('tashkent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Scroll Target Refs for Real Parallax Triggers
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const section2Ref = useRef(null);
  const section4Ref = useRef(null);
  const finalSectionRef = useRef(null);

  // 1-Bo'lim Scroll Progress (Sliding Warehouse Doors & Walking Directors)
  const { scrollYProgress: scrollY1 } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start']
  });
  const doorLeftX = useTransform(scrollY1, [0, 0.6], ['0%', '-55%']);
  const doorRightX = useTransform(scrollY1, [0, 0.6], ['0%', '55%']);
  const directorWalkX = useTransform(scrollY1, [0, 0.6], ['0%', '32%']);
  const engineerWalkX = useTransform(scrollY1, [0, 0.6], ['0%', '-32%']);
  const directorBobY = useTransform(scrollY1, [0, 0.15, 0.3, 0.45, 0.6], [0, -8, 0, -8, 0]);
  const engineerBobY = useTransform(scrollY1, [0, 0.15, 0.3, 0.45, 0.6], [0, -8, 0, -8, 0]);

  // 2-Bo'lim Scroll Progress (Cross-Traffic Trucks & Tower Crane)
  const { scrollYProgress: scrollY2 } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start']
  });
  const truck1X = useTransform(scrollY2, [0, 1], ['55%', '-60%']);
  const truck2X = useTransform(scrollY2, [0, 1], ['-60%', '55%']);
  const craneRotation = useTransform(scrollY2, [0, 1], [-12, 14]);
  const craneHookY = useTransform(scrollY2, [0, 1], [0, 45]);

  // 4-Bo'lim Scroll Progress (City Buildings Parallax)
  const { scrollYProgress: scrollY4 } = useScroll({
    target: section4Ref,
    offset: ['start end', 'end start']
  });
  const cityBgParallax = useTransform(scrollY4, [0, 1], ['-8%', '8%']);
  const cityFgParallax = useTransform(scrollY4, [0, 1], ['12%', '-12%']);

  // 6-Bo'lim Scroll Progress (Final Gathering Convergence)
  const { scrollYProgress: scrollY6 } = useScroll({
    target: finalSectionRef,
    offset: ['start end', 'center center']
  });
  const convergeLeftX = useTransform(scrollY6, [0.1, 0.85], ['-20%', '0%']);
  const convergeRightX = useTransform(scrollY6, [0.1, 0.85], ['20%', '0%']);
  const convergeScale = useTransform(scrollY6, [0.1, 0.85], [0.85, 1]);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setError("Iltimos, to'g'ri telefon raqamingizni kiriting.");
      return;
    }

    try {
      setLoading(true);
      await createLead({
        name: `Merkuriy-App Ro'yxat (${role})`,
        phone_number: phone.trim(),
        project_type: `Merkuriy-App Ekotizimiga ariza: ${role}`,
      });
      showToast("Rahmat! Merkuriy-App tizimiga muvaffaqiyatli yozildingiz. Mutaxassisimiz tez orada bog'lanadi.");
      setPhone('+998 ');
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const regionsData = [
    { id: 'tashkent', name: 'Toshkent sh. va viloyati', warehouses: 148, trucks: 410, builders: 110 },
    { id: 'samarkand', name: 'Samarqand viloyati', warehouses: 89, trucks: 220, builders: 72 },
    { id: 'fergana', name: "Farg'ona vodiysi", warehouses: 125, trucks: 310, builders: 94 },
    { id: 'bukhara', name: 'Buxoro va Navoiy', warehouses: 62, trucks: 155, builders: 48 },
    { id: 'south', name: 'Qashqadaryo va Surxondaryo', warehouses: 70, trucks: 180, builders: 56 },
  ];

  const currentRegion = regionsData.find((r) => r.id === selectedMapRegion) || regionsData[0];

  return (
    <div ref={containerRef} className="w-full pt-24 pb-24 bg-brand-dark text-white min-h-screen relative overflow-hidden select-none">
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-brand-accent/15 via-brand-secondary/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-40">

        {/* ===================================================================
            1-BO'LIM: HERO / BIRINCHI SCROLL (Firma rahbarlari & Ombor eshiklari)
            =================================================================== */}
        <section ref={heroSectionRef} className="pt-6 sm:pt-12 space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scroll orqali jonlanuvchi 2D Ekotizim</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14]">
              Merkuriy App — Qurilish va Ta'minotning{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-300 to-yellow-500">
                Yagona Raqamli Maydoni
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Pastga scroll qiling: Qurilish firmalari, omborchilar va og'ir texnika haydovchilari yagona intellektual tarmoqda qanday birlashishini ko'ring.
            </p>

            {/* Sahifa ochilganda yuqorida turuvchi 2D Kaskali Quruvchi va Ombor Mudiri avatarlari */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-amber-400/60 shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 shrink-0 drop-shadow-md">
                  <BuilderAvatar2D className="w-full h-full" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 block tracking-wider">Firma Rahbari (Kaskali)</span>
                  <h4 className="text-xs sm:text-sm font-black text-white">Akmal Rahimov</h4>
                  <span className="text-[10px] text-slate-300">Online e'lon va buyurtma</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-emerald-400/60 shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 shrink-0 drop-shadow-md">
                  <WarehouseMasterAvatar2D className="w-full h-full" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 block tracking-wider">Ombor Mudiri (Kaskali)</span>
                  <h4 className="text-xs sm:text-sm font-black text-white">Sardor Aliyev</h4>
                  <span className="text-[10px] text-slate-300">1-qo'l dilerlik narxlari</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 1-Bo'lim 2D Sahna: Ombor & 2D Kaskali Avatarlar va Qahramonlar */}
          <div className="relative w-full max-w-4xl mx-auto min-h-[440px] sm:min-h-[480px] bg-slate-900/95 dark:bg-black/95 rounded-3xl border-2 border-amber-500/30 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Background Storage Racks inside */}
            <div className="absolute inset-x-8 top-10 bottom-24 bg-slate-950/90 rounded-2xl border border-white/10 p-4 flex justify-between items-center z-0">
              <div className="space-y-3 opacity-60">
                <div className="w-28 h-6 rounded bg-amber-500/40 border border-amber-400/50" />
                <div className="w-36 h-6 rounded bg-blue-500/40 border border-blue-400/50" />
                <div className="w-24 h-6 rounded bg-emerald-500/40 border border-emerald-400/50" />
              </div>
              <div className="space-y-3 opacity-60">
                <div className="w-36 h-6 rounded bg-blue-500/40 border border-blue-400/50" />
                <div className="w-28 h-6 rounded bg-amber-500/40 border border-amber-400/50" />
                <div className="w-28 h-6 rounded bg-emerald-500/40 border border-emerald-400/50" />
              </div>
            </div>

            {/* Sliding Warehouse Doors linked to scroll */}
            <motion.div
              style={{ x: doorLeftX }}
              className="absolute left-4 top-8 bottom-20 w-[48%] bg-gradient-to-r from-slate-800 to-slate-700 rounded-l-2xl border-2 border-amber-400/70 shadow-2xl flex items-center justify-end pr-3 z-10"
            >
              <div className="w-3 h-24 rounded-full bg-amber-400 shadow-md" />
            </motion.div>

            <motion.div
              style={{ x: doorRightX }}
              className="absolute right-4 top-8 bottom-20 w-[48%] bg-gradient-to-l from-slate-800 to-slate-700 rounded-r-2xl border-2 border-amber-400/70 shadow-2xl flex items-center justify-start pl-3 z-10"
            >
              <div className="w-3 h-24 rounded-full bg-amber-400 shadow-md" />
            </motion.div>

            {/* Outgoing Pallets & Material Boxes (Emerging as doors slide) */}
            <div className="relative z-20 flex items-center justify-center gap-4 sm:gap-6 pt-4">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-brand-dark font-extrabold text-xs shadow-lg flex items-center gap-1.5 animate-bounce">
                <Boxes className="w-4 h-4" />
                <span>M-500 Sement (Omborda)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5 animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Boxes className="w-4 h-4" />
                <span>Bekobod Armatura (Tayyor)</span>
              </div>
            </div>

            {/* 2D STYLIZED FIGURES & AVATARS: KASKA KIYGAN QURUVCHI VA OMBORCHI (Standing & Walking on scroll) */}
            <div className="relative z-20 flex justify-between items-end px-2 sm:px-12 pb-2">
              {/* Left Manager: 2D Kaskali Quruvchi / Firma Rahbari */}
              <motion.div
                style={{ x: directorWalkX, y: directorBobY }}
                className="flex flex-col items-center gap-2"
              >
                <div className="drop-shadow-2xl">
                  <BuilderFigure2D className="w-24 h-40 sm:w-32 sm:h-52" />
                </div>
                <div className="flex items-center gap-2 bg-slate-900/95 border border-amber-400/70 rounded-xl px-3 py-1.5 shadow-2xl backdrop-blur-md">
                  <div className="w-8 h-8 shrink-0">
                    <BuilderAvatar2D className="w-full h-full" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-black text-amber-400 block">Kaskali Rahbar</span>
                    <h4 className="text-xs font-black text-white">Akmal Rahimov</h4>
                  </div>
                </div>
              </motion.div>

              {/* Right Manager: 2D Kaskali Ombor Mudiri */}
              <motion.div
                style={{ x: engineerWalkX, y: engineerBobY }}
                className="flex flex-col items-center gap-2"
              >
                <div className="drop-shadow-2xl">
                  <WarehouseMasterFigure2D className="w-24 h-40 sm:w-32 sm:h-52" />
                </div>
                <div className="flex items-center gap-2 bg-slate-900/95 border border-emerald-400/70 rounded-xl px-3 py-1.5 shadow-2xl backdrop-blur-md">
                  <div className="w-8 h-8 shrink-0">
                    <WarehouseMasterAvatar2D className="w-full h-full" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-black text-emerald-400 block">Ombor Mudiri</span>
                    <h4 className="text-xs font-black text-white">Sardor Aliyev</h4>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 1-Bo'lim Kartochkasi (Fade-in + Slide-up) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/85 dark:bg-black/85 border border-amber-500/40 backdrop-blur-xl shadow-2xl space-y-5 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-brand-accent flex items-center justify-center font-black text-xl border border-amber-500/50 shrink-0">
                1
              </div>
              <div>
                <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block">
                  1-bosqich: Bog'lanish va Ta'minot
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-white">
                  Firma rahbarlari va omborchilar endi bitta platformada bir-birini topadi
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Online e’lon bering va yukni tezda toping. Omborlar o'z mahsulot qoldiqlarini va dilerlik narxlarini joylashtiradi, qurilish firmalari esa o'rtakashlarsiz kerakli materiallarni zudlik bilan arzon narxda sotib oladi.
            </p>

            {/* Profile cards showing both avatars inside Section 1 info card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-amber-400/30">
                <div className="w-12 h-12 shrink-0">
                  <BuilderAvatar2D className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Quruvchi Firma Rahbari</h4>
                  <p className="text-[11px] text-slate-300">Sariq kaskada, doimiy obyektlar uchun materiallar xaridi</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-emerald-400/30">
                <div className="w-12 h-12 shrink-0">
                  <WarehouseMasterAvatar2D className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ombor & Ta'minot Mudiri</h4>
                  <p className="text-[11px] text-slate-300">Oq kaskada, to'g'ridan-to'g'ri birinchi qo'l diler narxlari</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Check className="w-3.5 h-3.5 text-brand-accent" />
                Vositachilarsiz dilerlik narxlari
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Check className="w-3.5 h-3.5 text-brand-accent" />
                Real vaqtdagi qoldiqlar omborda
              </span>
            </div>
          </motion.div>
        </section>

        {/* ===================================================================
            2-BO'LIM: YUK MASHINALARI + KRAN (KROSS-TRAFIK EFFEKTI)
            =================================================================== */}
        <section ref={section2Ref} className="space-y-8 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              2-bosqich: Smart Logistika va Maxsus Texnikalar
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Kross-Trafik: Og'ir yuk mashinalari va aylanuvchi kran
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Scroll tezligingizga qarab yuk mashinalari ikki qarama-qarshi tomonga o'zaro kesib o'tadi:
            </p>
          </div>

          {/* 2-Bo'lim 2D Sahnasi: Highway & Cross-traffic trucks + Tower Crane */}
          <div className="relative w-full max-w-4xl mx-auto min-h-[380px] sm:min-h-[420px] bg-slate-900/90 dark:bg-black/90 rounded-3xl border border-white/15 p-6 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Background Tower Crane rotating with scroll */}
            <div className="absolute right-6 top-2 z-0 opacity-40 sm:opacity-75">
              <RealisticTowerCraneVector craneRotate={craneRotation} hookY={craneHookY} />
            </div>

            {/* Upper Highway Lane: Dump Truck moving RIGHT to LEFT */}
            <div className="relative z-10 w-full h-36 border-b-2 border-dashed border-amber-400/40 flex items-center overflow-hidden">
              <motion.div
                style={{ x: truck1X }}
                className="w-[280px] sm:w-[380px] shrink-0 flex flex-col items-start"
              >
                <div className="mb-1 ml-4 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  HOWO 25t Samosval &rarr; Toshkent (25t yuk)
                </div>
                <RealisticDumpTruckVector />
              </motion.div>
            </div>

            {/* Lower Highway Lane: Concrete Mixer moving LEFT to RIGHT */}
            <div className="relative z-10 w-full h-36 flex items-center overflow-hidden">
              <motion.div
                style={{ x: truck2X }}
                className="w-[280px] sm:w-[380px] shrink-0 flex flex-col items-start"
              >
                <div className="mb-1 ml-4 px-2.5 py-1 rounded-full bg-amber-500 text-brand-dark text-[10px] sm:text-xs font-black shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-brand-dark animate-ping" />
                  10m³ Mikser &rarr; Samarqand (Bo'sh texnika)
                </div>
                <RealisticMixerTruckVector />
              </motion.div>
            </div>
          </div>

          {/* 2-Bo'lim Kartochkasi */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/85 dark:bg-black/85 border border-blue-500/40 backdrop-blur-xl shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xl border border-blue-500/50">
                2
              </div>
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Haydovchilar & Quruvchilar Uchun
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">
                  Yuk mashinalari haydovchilari online ish topadi
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Firmalar esa o‘ziga kerakli texnikani (samosval, kran, mikser, fura) eng yaqin nuqtadan bir platformada oson buyurtma qiladi. Haydovchi yo'l chetida bekor turmaydi, buyurtma uning mobil ilovasiga zudlik bilan tushadi.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                Bo'sh qatnovlarga barham berish
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Check className="w-3.5 h-3.5 text-blue-400" />
                Eng yaqin radiusdan GPS buyurtma
              </span>
            </div>
          </motion.div>
        </section>

        {/* ===================================================================
            3-BO'LIM: O'ZBEKISTON XARITASI VA SMART GEOFILTR
            =================================================================== */}
        <section className="space-y-8 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              3-bosqich: Hududlar va Smart Qidiruv
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              O'zbekiston xaritasi: Avtomatlashtirilgan forma va hududiy zoom
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Viloyatni tanlang yoki scroll orqali yaqinlashib, real vaqtda bazadagi mavjud resurslarni ko'ring:
            </p>
          </div>

          {/* Interactive Uzbekistan Map Container */}
          <div className="relative w-full max-w-2xl mx-auto rounded-3xl bg-slate-900/90 dark:bg-black/90 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {/* Filter Pills Bar */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {regionsData.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedMapRegion(reg.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedMapRegion === reg.id
                      ? 'bg-emerald-500 text-brand-dark shadow-lg shadow-emerald-500/30 scale-105'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {reg.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Stylized Vector Map Graphic */}
            <div className="relative aspect-[16/9] w-full flex items-center justify-center">
              <svg viewBox="0 0 500 280" className="w-full h-full">
                {/* Uzbekistan Map Silhouette */}
                <path
                  d="M 50 140 Q 90 90 140 80 T 220 100 T 300 70 T 360 85 T 460 120 T 430 160 T 360 160 T 300 230 T 240 260 T 210 200 T 140 180 Z"
                  fill="#1E293B"
                  stroke="#475569"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />

                {/* Region boundary dividers */}
                <path d="M 140 80 Q 200 120 220 170 Q 240 220 250 260" stroke="#334155" strokeWidth="2" fill="none" />
                <path d="M 300 70 Q 320 110 330 160" stroke="#334155" strokeWidth="2" fill="none" />
                <path d="M 360 85 Q 390 120 400 150" stroke="#334155" strokeWidth="2" fill="none" />

                {/* Pins and Radar Circles */}
                <g transform="translate(340, 110)">
                  <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="7" fill={selectedMapRegion === 'tashkent' ? '#F59E0B' : '#10B981'} stroke="#FFF" strokeWidth="2" />
                  <text x="0" y="-12" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">Toshkent</text>
                </g>

                <g transform="translate(260, 170)">
                  <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="7" fill={selectedMapRegion === 'samarkand' ? '#F59E0B' : '#10B981'} stroke="#FFF" strokeWidth="2" />
                  <text x="0" y="-12" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">Samarqand</text>
                </g>

                <g transform="translate(420, 130)">
                  <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="7" fill={selectedMapRegion === 'fergana' ? '#F59E0B' : '#10B981'} stroke="#FFF" strokeWidth="2" />
                  <text x="0" y="-12" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">Farg'ona</text>
                </g>

                <g transform="translate(190, 155)">
                  <circle cx="0" cy="0" r="7" fill={selectedMapRegion === 'bukhara' ? '#F59E0B' : '#10B981'} stroke="#FFF" strokeWidth="2" />
                  <text x="0" y="-12" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">Buxoro</text>
                </g>

                <g transform="translate(250, 240)">
                  <circle cx="0" cy="0" r="7" fill={selectedMapRegion === 'south' ? '#F59E0B' : '#10B981'} stroke="#FFF" strokeWidth="2" />
                  <text x="0" y="-12" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">Qashqadaryo</text>
                </g>
              </svg>

              {/* Dynamic Region Statistics Card */}
              <motion.div
                key={currentRegion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto bg-slate-900/95 border border-emerald-400/50 rounded-2xl p-4 shadow-2xl text-left backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                  <Radio className="w-4 h-4 animate-spin" />
                  <span>{currentRegion.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <span className="block text-base font-black text-white">{currentRegion.warehouses}</span>
                    <span className="text-[10px] text-slate-400">Omborlar</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <span className="block text-base font-black text-amber-400">{currentRegion.trucks}</span>
                    <span className="text-[10px] text-slate-400">Texnikalar</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                    <span className="block text-base font-black text-emerald-400">{currentRegion.builders}</span>
                    <span className="text-[10px] text-slate-400">Brigadalar</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/85 dark:bg-black/85 border border-emerald-500/40 backdrop-blur-xl shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl border border-emerald-500/50">
                3
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Lokal va Hududiy Qamrov
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">
                  Tuman va shahar filtrlari orqali aniq manzilga yetkazib berish
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Scroll pastga tushganda yoki hududni o'zgartirganda tizim tanlangan hudud bo'yicha eng arzon va eng yaqin variantlarni saralaydi. Masofa qisqarishi hisobiga yoqilg'i va logistika xarajatlari sezilarli darajada tejaladi.
            </p>
          </motion.div>
        </section>

        {/* ===================================================================
            4-BO'LIM: SHAHAR BINOLARI VA PARALLAX OBYEKTLAR
            =================================================================== */}
        <section ref={section4Ref} className="space-y-8 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              4-bosqich: Resurslar Radar Tahlili & Binolar
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Shahar binolari: O'ngdan chapga va chapdan o'ngga parallax
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Qurilish obyektlari fonida eng yaqin material, texnika va ishchi kuchini bir tugma bilan aniqlang:
            </p>
          </div>

          {/* 4-Bo'lim 2D Sahnasi: Realistic City Skyline with Parallax */}
          <div className="relative w-full max-w-4xl mx-auto min-h-[360px] sm:min-h-[400px] bg-slate-900/90 dark:bg-black/90 rounded-3xl border border-white/15 p-6 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Background 2D City Skyline Parallax Layer */}
            <motion.div style={{ x: cityBgParallax }} className="relative z-10 w-full h-48 sm:h-60 mt-auto">
              <RealisticModernCityVector />
            </motion.div>

            {/* Foreground Parallax Floating Chips */}
            <motion.div style={{ x: cityFgParallax }} className="relative z-20 flex flex-wrap gap-3 justify-center pt-2">
              <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border border-amber-400/60 shadow-xl flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-white">Sement M-500: 850 metr (10 daqiqa)</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border border-blue-400/60 shadow-xl flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-extrabold text-white">50t Avtokran: 1.2 km (Bo'sh)</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-900/95 border border-emerald-400/60 shadow-xl flex items-center gap-2">
                <HardHat className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold text-white">Karkas Ustalar: 900 metr</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/85 dark:bg-black/85 border border-white/20 backdrop-blur-xl shadow-2xl text-left space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-black text-xl border border-white/20">
                4
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                Material, texnika va ishchi kuchi — barchasi qo'l ostingizda
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Ilova har bir foydalanuvchiga qurilish jarayonida to'siqsiz harakatlanish imkonini beradi. Endi poydevor qo'yishdan tortib pardozlashgacha kerak bo'ladigan barcha bo'g'inlar yagona ekotizimda mujassam.
            </p>
          </motion.div>
        </section>

        {/* ===================================================================
            5-BO'LIM: ASOSIY TA'SIRLI XABAR (MANIFESTO)
            =================================================================== */}
        <section className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-slate-900 via-slate-950 to-brand-dark border-2 border-brand-accent/40 shadow-2xl overflow-hidden text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Asosiy Maqsad va Yechim</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25]">
              “Har kim o‘ziga mos e’lon beradi va mijozlarni topadi.”
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                  Endi hech kim ko‘chaga chiqib mijoz qidirib <strong className="text-amber-400">pitakda turmaydi</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                  Bozordan-bozorga yurib <strong className="text-amber-400">“kimda narx qancha, qancha tovar bor”</strong> deb sarson bo‘lmaydi.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                  Online platforma orqali <strong className="text-emerald-400">hamma narsa tez, oson va qulay</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            6-BO'LIM: YAKUNIY (2D AVATARLAR BIRLASHUVI & CTA)
            =================================================================== */}
        <section ref={finalSectionRef} id="waitlist" className="space-y-10 text-center max-w-3xl mx-auto">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block">
              6-bosqich: Muvaffaqiyatli Hamkorlik
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Barcha ishtirokchilar bitta joyda jamlanadi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Quruvchilar, yuk mashinalari haydovchilari va omborchilar bir-biriga qarab muvaffaqiyatli hamkorlikni nishonlaydi:
            </p>
          </div>

          {/* 6-Bo'lim 2D Sahna: 2D Avatarlar (Quruvchi, Haydovchi, Omborchi) markazda birlashishi */}
          <div className="relative w-full max-w-xl mx-auto min-h-[220px] bg-slate-900/90 dark:bg-black/90 rounded-3xl border border-brand-accent/50 p-6 backdrop-blur-xl shadow-2xl flex items-center justify-around overflow-hidden">
            {/* 2D Kaska kiygan quruvchi (Converges from Left) */}
            <motion.div style={{ x: convergeLeftX }} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xl shrink-0">
                <BuilderAvatar2D className="w-full h-full" />
              </div>
              <span className="text-xs font-bold text-amber-400">Kaskali Quruvchi</span>
            </motion.div>

            {/* Center: 2D Haydovchi & 100% Hamkorlik nishoni (Scales up) */}
            <motion.div style={{ scale: convergeScale }} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl shrink-0">
                <TruckDriverAvatar2D className="w-full h-full" />
              </div>
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Yuk Haydovchisi</span>
            </motion.div>

            {/* 2D Kaskali Omborchi (Converges from Right) */}
            <motion.div style={{ x: convergeRightX }} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xl shrink-0">
                <WarehouseMasterAvatar2D className="w-full h-full" />
              </div>
              <span className="text-xs font-bold text-emerald-400">Ombor Mudiri</span>
            </motion.div>
          </div>

          {/* Interactive Pre-Registration Form */}
          {/* <div className="relative rounded-3xl p-6 sm:p-10 bg-slate-900/90 dark:bg-black/90 border border-brand-accent/40 shadow-2xl text-left space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Hozir ro'yxatdan o'ting
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dastlabki ro'yxatdan o'tganlar uchun 3 oylik bepul tarif va maxsus imtiyozlar!
                </p>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-brand-accent" />
                VIP Kirish
              </div>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs font-medium text-red-300 bg-red-900/60 border border-red-500/50 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Faoliyat yo'nalishingizni tanlang:
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold bg-white/10 border border-white/20 rounded-xl text-white focus:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Ombor / Do'kon egasi" className="bg-brand-dark text-white">🏬 Men Ombor / Do'kon egasiman</option>
                  <option value="Yuk mashinasi / Texnika haydovchisi" className="bg-brand-dark text-white">🚛 Men Yuk mashinasi / Maxsus texnika haydovchisiman</option>
                  <option value="Qurilish firmasi / Pudratchi" className="bg-brand-dark text-white">🏢 Men Qurilish firmasi / Pudratchi / Usta man</option>
                  <option value="Xususiy buyurtmachi" className="bg-brand-dark text-white">🏠 Men Xususiy buyurtmachiman (Ta'mirlash / Qurilish)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Telefon raqamingiz:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!val.startsWith('+998')) val = '+998 ';
                    setPhone(val);
                  }}
                  className="w-full py-3.5 px-4 text-sm font-medium tracking-wide bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 font-bold text-sm sm:text-base rounded-xl text-brand-dark bg-brand-accent hover:bg-brand-accentHover transition-all shadow-xl shadow-brand-accent/30 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Ro'yxatga olinmoqda...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Hozir ro‘yxatdan o‘ting / E’lon berishni boshlang
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                  Xavfsiz va maxfiy
                </span>
                <span>Spamsiz SMS bildirishnoma</span>
              </div>
            </form>
          </div> */}
        </section>

      </div>
    </div>
  );
}
