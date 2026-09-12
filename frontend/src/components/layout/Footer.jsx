import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { getContact } from '../../api/client';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    getContact()
      .then((data) => setContactInfo(data))
      .catch(() => {
        setContactInfo({
          company_name: 'Merkuriy-R Xususiy qurilish firmasi',
          primary_phone: '+998 71 200 44 55',
          secondary_phone: '+998 90 999 88 77',
          email: 'info@merkuriy-r.uz',
          address: 'Toshkent shahri, Yunusobod tumani, Amir Temur shox ko\'chasi 108-uy',
          working_hours: 'Dushanba - Shanba: 09:00 - 19:00',
        });
      });
  }, []);

  const primaryPhone = contactInfo?.primary_phone || '+998 71 200 44 55';
  const secondaryPhone = contactInfo?.secondary_phone || '+998 90 999 88 77';
  const email = contactInfo?.email || 'info@merkuriy-r.uz';
  const address = contactInfo?.address || 'Toshkent shahri, Yunusobod tumani, Amir Temur shox ko\'chasi 108-uy';
  const workingHours = contactInfo?.working_hours || 'Dushanba - Shanba: 09:00 - 19:00';

  const telegramUrl = contactInfo?.telegram_url || contactInfo?.socials?.telegram_url;
  const instagramUrl = contactInfo?.instagram_url || contactInfo?.socials?.instagram_url;
  const facebookUrl = contactInfo?.facebook_url || contactInfo?.socials?.facebook_url;
  const youtubeUrl = contactInfo?.youtube_url || contactInfo?.socials?.youtube_url;

  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accentHover to-brand-accent flex items-center justify-center text-brand-dark font-black text-xl shadow-md">
                M
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Merkuriy-R
                </span>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Xususiy qurilish firmasi
                </p>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              O'zbekiston bo'ylab 10 yildan ortiq vaqt davomida zamonaviy turar-joylar, kottejlar va biznes markazlarini eng yuqori sifat standartlarida barpo etib kelmoqdamiz.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>Davlat litsenziyasi va sifat kafolati</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Bo'limlar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-accent transition-colors">
                  Barcha loyihalar va ishlar
                </Link>
              </li>
              <li>
                <Link to="/merkuriy-app" className="flex items-center gap-1.5 text-brand-accent hover:text-brand-accentHover transition-colors font-medium">
                  Merkuriy-App (Ekotizim)
                  <span className="px-1.5 py-0.2 bg-brand-accent text-brand-dark rounded text-[9px] font-bold">
                    Yangi
                  </span>
                </Link>
              </li>
              <li>
                <a href="#quick-lead-form" className="hover:text-brand-accent transition-colors">
                  Bepul smeta hisoblatish
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Aloqa ma'lumotlari
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${primaryPhone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors font-medium">
                    {primaryPhone}
                  </a>
                  {secondaryPhone && (
                    <a href={`tel:${secondaryPhone.replace(/[^\d+]/g, '')}`} className="text-slate-400 hover:text-white transition-colors">
                      {secondaryPhone}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Ijtimoiy tarmoqlar
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Jarayondagi qurilish obyektlarimizdan eng so'nggi video va fotosuratlarni kuzatib boring:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {telegramUrl && (
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark flex items-center justify-center text-slate-200 transition-all"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark flex items-center justify-center text-slate-200 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark flex items-center justify-center text-slate-200 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark flex items-center justify-center text-slate-200 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} "Merkuriy-R Xususiy qurilish firmasi". Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Boshqaruv va texnik sifat standarti ISO 9001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
