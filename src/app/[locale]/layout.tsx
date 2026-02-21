import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Cairo } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  return {
    title: isArabic ? 'براقة - غسيل السيارات المتنقل' : 'Barraqh - Mobile Car Wash',
    description: isArabic ? 'خدمة غسيل السيارات المتنقلة الفاخرة التي تأتي إليك' : 'Premium mobile car wash service that comes to you',
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const isArabic = locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  
  // Decide which primary font to use based on locale
  const fontClass = isArabic ? cairo.variable : inter.variable;

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.variable} ${cairo.variable} ${fontClass} font-sans antialiased flex flex-col min-h-screen text-slate-900 bg-slate-50`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
