import React, { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ThreeScene from '../components/ThreeScene';
import AboutSkills from '../components/AboutSkills';
import Footer from '../components/Footer';
import { trackVisit } from '../api';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import Loader from '../components/Loader';
import NoiseOverlay from '../components/NoiseOverlay';

// Lazy loaded components (defer downloading until scrolled/needed)
const Experience = lazy(() => import('../components/Experience'));
const Services = lazy(() => import('../components/Services'));
const Projects = lazy(() => import('../components/Projects'));
const GithubActivity = lazy(() => import('../components/GithubActivity'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Blog = lazy(() => import('../components/Blog'));
const Contact = lazy(() => import('../components/Contact'));

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force premium dark mode everywhere
    document.documentElement.classList.add('dark');
    
    // Silently track visit for analytics
    trackVisit().catch(err => console.error('Analytics tracking failed', err));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-transparent text-foreground font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />
      
      {/* 3D Bubble Background - Renders immediately in background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
        <ThreeScene />
      </div>

      {/* Foreground Content - Fades in after loader */}
      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-1000 delay-500 ${loading ? 'opacity-0' : 'opacity-100 pointer-events-auto'}`}>
        <Navbar />
        <main className="w-full">
          <Hero />
          <AboutSkills />
          <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading section...</div>}>
            <Experience />
            <Services />
            <Projects />
            <GithubActivity />
            <Testimonials />
            <Blog />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Portfolio;
