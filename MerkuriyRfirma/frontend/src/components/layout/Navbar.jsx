import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight, Sparkles, Sun, Moon } from 'lucide-react';
import { getContact } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenLeadModal }) {
  const [contactInfo, setContactInfo] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getContact()
      .then((data) => setContactInfo(data))
      .catch(() => {
        setContactInfo({ primary_phone: '+998 71 200 44 55' });
      });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Bosh sahifa', path: '/' },
    { name: 'Loyihalar', path: '/projects' },
    { 
      name: 'Merkuriy-App', 
      path: '/merkuriy-app',
      badge: 'Yangi',
      highlight: true 
    },
  ];

  const primaryPhone = contactInfo?.primary_phone || '+998 71 200 44 55';
  const cleanPhone = primaryPhone.replace(/[^\d+]/g, '');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-brand-primary/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-slate-200 dark:border-white/10 py-3'
          : 'bg-white/85 dark:bg-brand-primary/85 backdrop-blur-sm border-b border-slate-200/60 dark:border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accentHover to-brand-accent flex items-center justify-center text-brand-dark font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-accent transition-colors">
                Merkuriy-R
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            </div>
            <p className="text-[11px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-300/80">
              Xususiy qurilish firmasi
            </p>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-slate-950 dark:text-white bg-slate-100 dark:bg-white/10 shadow-inner'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                } ${link.highlight ? 'border border-brand-accent/40 bg-brand-accent/10 text-brand-accentHover dark:text-brand-accent' : ''}`}
              >
                {link.name}
                {link.badge && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-accent text-brand-dark animate-pulse">
                    <Sparkles className="w-2.5 h-2.5" />
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle, Phone & Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 cursor-pointer"
            aria-label={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
            title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-accent transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-accent">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-[10px] text-slate-400 font-normal">Aloqa uchun:</div>
              <span>{primaryPhone}</span>
            </div>
          </a>

          <button
            onClick={() => onOpenLeadModal()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-accent hover:bg-brand-accentHover text-brand-dark shadow-md shadow-brand-accent/20 transition-all hover:shadow-brand-accent/30 cursor-pointer"
          >
            Ariza qoldirish
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
            aria-label="Mavzuni o'zgartirish"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            onClick={() => onOpenLeadModal()}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-accent text-brand-dark cursor-pointer"
          >
            Ariza
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-brand-primary/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 animate-slide-up">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-100 dark:bg-white/15 text-slate-950 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  } ${link.highlight ? 'border border-brand-accent/40 bg-brand-accent/10 text-brand-accentHover dark:text-brand-accent' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-brand-accent text-brand-dark">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>{primaryPhone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-brand-accent text-brand-dark"
              >
                Ariza qoldirish
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
