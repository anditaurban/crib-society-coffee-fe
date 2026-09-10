import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { BrandStorySection } from '../components/landing/BrandStorySection';
import { FeaturedMenuSection } from '../components/landing/FeaturedMenuSection';
import { ExperienceSection } from '../components/landing/ExperienceSection';
import { LocationSection } from '../components/landing/LocationSection';
import { CtaSection } from '../components/landing/CtaSection';
import { ChevronUp } from 'lucide-react';

export function LandingPage() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle path-based and hash-based auto scroll
  useEffect(() => {
    let targetId = null;
    if (location.hash) {
      targetId = location.hash.replace('#', '');
    } else if (location.pathname === '/menu') {
      targetId = 'menu';
    } else if (location.pathname === '/story') {
      targetId = 'story';
    } else if (location.pathname === '/location') {
      targetId = 'location';
    }

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection onExploreMenu={scrollToMenu} />

      {/* 2. Brand Story & Culture Section */}
      <BrandStorySection />

      {/* 3. Featured Menu & Products Section */}
      <FeaturedMenuSection />

      {/* 4. Experience & Space Value Proposition */}
      <ExperienceSection />

      {/* 5. Senopati Flagship Location & Hours */}
      <LocationSection />

      {/* 6. Closing Editorial Call to Action */}
      <CtaSection onExploreMenu={scrollToMenu} />

      {/* Floating Back-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-crib-charcoal border border-crib-border text-crib-cream hover:text-white hover:border-crib-red shadow-xl backdrop-blur-md transition-all duration-200 group"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
