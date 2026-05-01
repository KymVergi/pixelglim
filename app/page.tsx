'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DexScreenerStats from '@/components/DexScreenerStats';
import GoblinGallery from '@/components/GoblinGallery';
import LiveActivity from '@/components/LiveActivity';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { trackPageView } from '@/lib/supabase';
import styles from './page.module.css';

export default function Home() {
  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <Hero />
        </section>

        {/* DexScreener Stats */}
        <section id="stats" className={styles.stats}>
          <DexScreenerStats />
        </section>

        {/* How It Works */}
        <section id="about" className={styles.howItWorks}>
          <HowItWorks />
        </section>

        {/* Gallery */}
        <section id="gallery" className={styles.gallery}>
          <div className="container">
            <h2 className="text-center text-glow mb-4">
              Recent Apes
            </h2>
            <GoblinGallery />
          </div>
        </section>

        {/* Live Activity */}
        <section className={styles.activity}>
          <LiveActivity />
        </section>
      </main>

      <Footer />
    </div>
  );
}
