"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Leaf, ShieldCheck } from 'lucide-react';

export function Features() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-brand-600" />,
      title: t('f1_title'),
      desc: t('f1_desc'),
      delay: 0.1
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: t('f2_title'),
      desc: t('f2_desc'),
      delay: 0.2
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-500" />,
      title: t('f3_title'),
      desc: t('f3_desc'),
      delay: 0.3
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            {t('heading')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
