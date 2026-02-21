"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/app/_components/ui/Button';
import { Droplets, Globe, Menu, ChevronDown } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setIsLangOpen(false);
  };
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg group-hover:bg-brand-600 transition-colors">
            <Droplets size={24} />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            {t('logo')}
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <Link href="/" className="hover:text-brand-600 transition-colors">{t('home')}</Link>
          <a href="#services" className="hover:text-brand-600 transition-colors">{t('services')}</a>
          <a href="#how-it-works" className="hover:text-brand-600 transition-colors">{t('howItWorks')}</a>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors py-2"
            >
              <Globe size={16} />
              <span className="hidden sm:inline-block">{locale === 'en' ? 'English' : 'العربية'}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden z-50"
                >
                  <button 
                    onClick={() => switchLanguage('en')}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${locale === 'en' ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => switchLanguage('ar')}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${locale === 'ar' ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    العربية
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="hidden md:block">
            <Button size="sm">{t('book')}</Button>
          </div>
          <button className="md:hidden p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
