"use client";

import { useTranslations } from 'next-intl';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/app/_components/ui/Button';
import { Input } from '@/app/_components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  email: z.string().email('Valid email is required')
});

type UserFormValues = z.infer<typeof userSchema>;

export function BookingFlow() {
  const t = useTranslations('Booking');
  const { step, serviceType, location, userParams, setStep, setServiceType, setLocation, setUserParams, reset } = useBookingStore();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: userParams
  });

  const onUserSubmit = (data: UserFormValues) => {
    setUserParams(data);
    handleNext();
  };

  const onConfirm = () => {
    // API logic will go here
    alert(t('bookingConfirmed'));
    reset();
  };

  const services = [
    { id: 'basic', name: t('basicWash'), price: '$30', time: t('basicTime') },
    { id: 'premium', name: t('premiumWash'), price: '$60', time: t('premiumTime') },
    { id: 'interior', name: t('interiorDetail'), price: '$100', time: t('interiorTime') }
  ];

  return (
    <section id="book" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{t('stepTracker', { step })}</span>
              <span className="text-xs font-medium text-slate-500">
                {step === 1 && t('step1')}
                {step === 2 && t('step2')}
                {step === 3 && t('step3')}
                {step === 4 && t('step4')}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-600"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* STEP 1: Service */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('step1')}</h3>
                  <div className="grid gap-4">
                    {services.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setServiceType(s.name)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-start ${serviceType === s.name ? 'border-brand-600 bg-brand-50' : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50'}`}
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900">{s.name}</h4>
                          <p className="text-sm text-gray-500">{s.time}</p>
                        </div>
                        <span className="font-bold text-brand-600">{s.price}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button onClick={handleNext} disabled={!serviceType}>{t('next')}</Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('step2')}</h3>
                  <Input
                    label={t('reviewLocation')}
                    placeholder={t('locPlaceholder')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={handleBack}>{t('back')}</Button>
                    <Button onClick={handleNext} disabled={!location.trim()}>{t('next')}</Button>
                  </div>
                </div>
              )}

              {/* STEP 3: User Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit(onUserSubmit)} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('step3')}</h3>
                  
                  <Input
                    label={t('nameLabel')}
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label={t('phoneLabel')}
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <Input
                    label={t('emailLabel')}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  
                  <div className="mt-8 flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>{t('back')}</Button>
                    <Button type="submit">{t('next')}</Button>
                  </div>
                </form>
              )}

              {/* STEP 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('step4')}</h3>
                  
                  <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-100">
                    <div className="flex justify-between border-b border-slate-200 pb-4">
                      <span className="text-slate-500">{t('reviewService')}</span>
                      <span className="font-semibold text-slate-900">{serviceType}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-4">
                      <span className="text-slate-500">{t('reviewLocation')}</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[60%]">{location}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-4">
                      <span className="text-slate-500">{t('reviewName')}</span>
                      <span className="font-semibold text-slate-900">{userParams.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-4">
                      <span className="text-slate-500">{t('reviewPhone')}</span>
                      <span className="font-semibold text-slate-900">{userParams.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t('reviewEmail')}</span>
                      <span className="font-semibold text-slate-900">{userParams.email}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={handleBack}>{t('back')}</Button>
                    <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700 hover:text-white border-transparent text-white shadow-md">{t('submit')}</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
