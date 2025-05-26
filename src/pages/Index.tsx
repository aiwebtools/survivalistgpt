
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import Footer from '@/components/Footer';
import ConsentPopup from '@/components/ConsentPopup';
import WaveBackground from '@/components/WaveBackground';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section when clicking on anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin + anchor.pathname === window.location.origin + window.location.pathname) {
        e.preventDefault();
        const targetId = anchor.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for header
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-survival-dark text-white overflow-hidden relative">
      <WaveBackground />
      <Navbar />
      <main className="pt-20 relative z-10">
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <LegalDisclaimer />
      </main>
      <Footer />
      <ConsentPopup />
    </div>
  );
};

export default Index;
