
import { AlertTriangle, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create divine floating orbs
    const createFloatingOrb = () => {
      if (!heroRef.current) return;
      
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      
      const size = Math.random() * 20 + 10;
      const hue = Math.random() * 360;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 10 + 10;
      
      orb.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: 100%;
        background: radial-gradient(circle, hsla(${hue}, 80%, 70%, 0.6), transparent);
        box-shadow: 0 0 ${size}px hsla(${hue}, 80%, 70%, 0.4);
        animation-duration: ${animationDuration}s;
        animation-delay: ${Math.random() * 5}s;
      `;
      
      heroRef.current.appendChild(orb);
      
      setTimeout(() => {
        if (orb.parentNode) {
          orb.parentNode.removeChild(orb);
        }
      }, animationDuration * 1000);
    };

    // Create orbs periodically
    const interval = setInterval(createFloatingOrb, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 section-padding"
    >
      {/* Divine background elements */}
      <div className="absolute inset-0 bg-noise-overlay"></div>
      
      {/* Enhanced floating particles with divine trails */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsla(${i * 30}, 80%, 70%, 0.8), transparent)`,
              boxShadow: `0 0 ${10 + i}px hsla(${i * 30}, 80%, 70%, 0.6)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Divine Hero Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-panel mb-12 animate-fade-in transform hover:scale-105 transition-all duration-500">
            <AlertTriangle className="w-5 h-5 text-cyan-400 mr-3 animate-pulse" />
            <span className="text-cyan-300 text-lg font-semibold tracking-wide">
              Advanced Battlefield & Survival Guidance
            </span>
          </div>

          {/* DIVINE Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 animate-fade-in-up transition-delay-200">
            <span className="text-white block mb-4 text-glow">Survivalist GPT</span>
            <span className="gradient-text text-glow">Your AI Survival Expert</span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in-up transition-delay-400 font-light">
            Comprehensive survival and battlefield guidance to ensure your absolute survival, 
            equipped with <span className="text-cyan-400 font-semibold">image processing</span> and <span className="text-purple-400 font-semibold">web search</span> capabilities.
          </p>

          {/* DIVINE CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-up transition-delay-600">
            <a
              href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-full shadow-2xl hover:shadow-3xl hover:shadow-red-500/40 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 ease-out group w-full lg:w-auto overflow-hidden border-2 border-yellow-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 tracking-wider">USE SURVIVALIST GPT NOW</span>
              <AlertTriangle className="ml-4 w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/40 to-red-400/40 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 rounded-full shadow-2xl hover:shadow-3xl hover:shadow-yellow-500/40 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out group w-full lg:w-auto overflow-hidden border-2 border-yellow-400/40"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Star className="w-6 h-6 mr-4 relative z-10 text-yellow-200 group-hover:text-white transition-colors animate-pulse-soft" />
              <span className="relative z-10 tracking-wide">DOWNLOAD OPEN SOURCE PROMPT</span>
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <a
              href="https://www.aiwebtools.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-600 rounded-full border-2 border-cyan-400/40 shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out group w-full lg:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 tracking-wide">MORE AI TOOLS</span>
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>

          {/* Divine stats or features showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up transition-delay-800">
            {[
              { title: "Image Analysis", desc: "Advanced visual processing", icon: "🔍" },
              { title: "Web Research", desc: "Real-time information gathering", icon: "🌐" },
              { title: "Survival Expertise", desc: "Comprehensive guidance system", icon: "🛡️" }
            ].map((feature, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-950 via-purple-950/80 to-transparent"></div>
    </section>
  );
};

export default Hero;
