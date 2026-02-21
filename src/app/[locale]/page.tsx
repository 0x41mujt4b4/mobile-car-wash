import { Navbar } from '@/app/_components/layout/Navbar';
import { Hero } from '@/app/_landing/Hero';
import { Features } from '@/app/_landing/Features';
import { BookingFlow } from '@/app/_booking/BookingFlow';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <BookingFlow />
      </main>
    </>
  );
}
