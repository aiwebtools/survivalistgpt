
import { useState } from 'react';
import { AlertTriangle, Play, Star } from 'lucide-react';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-survival-dark via-survival-dark to-survival-green/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise-overlay"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-survival-accent/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-survival-accent/20 border border-survival-accent/30 backdrop-blur-sm mb-8 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-survival-accent mr-2" />
            <span className="text-survival-brightAccent text-sm font-medium">
              Advanced Battlefield & Survival Guidance
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up transition-delay-200">
            <span className="text-white block mb-2">Survivalist GPT</span>
            <span className="gradient-text">Your AI Survival Expert</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up transition-delay-400">
            Comprehensive survival and battlefield guidance to ensure your absolute survival, 
            equipped with image processing and web search capabilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up transition-delay-600">
            <a
              href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center group w-full sm:w-auto"
            >
              USE SURVIVALIST GPT NOW
              <AlertTriangle className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center group w-full sm:w-auto relative"
            >
              <Star className="w-5 h-5 mr-2 text-yellow-400 animate-pulse-soft drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
              DOWNLOAD OPEN SOURCE PROMPT
              <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            
            <a
              href="https://www.aiwebtools.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center w-full sm:w-auto"
            >
              MORE AI TOOLS
            </a>
          </div>

          {/* Video Section */}
          <div className="relative max-w-3xl mx-auto animate-fade-in-up transition-delay-700">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-survival-accent/20">
              {!showVideo ? (
                <div className="relative bg-gradient-to-br from-survival-green/20 to-survival-dark aspect-video flex items-center justify-center cursor-pointer group"
                     onClick={() => setShowVideo(true)}>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-survival-accent/20 backdrop-blur-sm border border-survival-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white text-lg font-medium">Watch Survivalist GPT in Action</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Survivalist GPT Demo"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-survival-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
