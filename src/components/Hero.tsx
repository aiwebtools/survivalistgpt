
import { AlertTriangle, Star } from 'lucide-react';

const Hero = () => {
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
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-survival-accent to-survival-brightAccent rounded-full shadow-xl hover:shadow-2xl hover:shadow-survival-accent/30 transform hover:scale-105 transition-all duration-300 ease-out group w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-survival-brightAccent to-survival-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">USE SURVIVALIST GPT NOW</span>
              <AlertTriangle className="ml-3 w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            </a>
            
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 transform hover:scale-105 transition-all duration-300 ease-out group w-full sm:w-auto overflow-hidden border border-yellow-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Star className="w-5 h-5 mr-3 relative z-10 text-yellow-200 group-hover:text-white transition-colors animate-pulse-soft" />
              <span className="relative z-10">DOWNLOAD OPEN SOURCE PROMPT</span>
              <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="https://www.aiwebtools.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-survival-metal to-survival-dark rounded-full border border-survival-accent/30 shadow-xl hover:shadow-2xl hover:shadow-survival-accent/20 transform hover:scale-105 transition-all duration-300 ease-out group w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-survival-accent/20 to-survival-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">MORE AI TOOLS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-survival-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
