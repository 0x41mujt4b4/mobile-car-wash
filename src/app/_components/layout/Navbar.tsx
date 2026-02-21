"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/app/_components/ui/Button';
import { Droplets, Globe, Menu } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  
  const oppositeLocale = locale === 'ar' ? 'en' : 'ar';
  
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
          <Link href={pathname} locale={oppositeLocale} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
            <Globe size={16} />
            <span className="hidden sm:inline-block">{t('switchLang')}</span>
          </Link>
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
