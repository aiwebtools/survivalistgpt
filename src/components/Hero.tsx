
import { useEffect, useState, useRef } from 'react';
import ThreeDElement from './ThreeDElement';
import { cn } from '@/lib/utils';
import { Shield, Target, Map, Play } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const thumbnailUrl = "https://img.youtube.com/vi/C_-odrCtJxs/maxresdefault.jpg";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to load the actual video when clicked
  const loadVideo = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.src = "https://www.youtube.com/embed/C_-odrCtJxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&vq=hd1080";
    }
  };

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-survival-dark"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-survival-accent to-transparent"></div>
        <div className="bg-noise-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={cn(
            "flex flex-col space-y-6 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div>
              <div className="chip mb-4">
                <Shield className="w-3 h-3 mr-1" />
                <span>Advanced Battlefield & Survival Guidance</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text shadow-survival-accent text-glow">Survivalist GPT</span>
                <span className="block mt-2 text-white">Your AI Survival Expert</span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-xl">
                Comprehensive survival and battlefield guidance to ensure your absolute survival, 
                equipped with image processing and web search capabilities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                USE SURVIVALIST GPT NOW
              </a>
              <a
                href="https://www.aiwebtools.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                MORE AI TOOLS
              </a>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2 glass-panel px-4 py-2 rounded-full">
                <Target className="w-4 h-4 text-survival-brightAccent" />
                <span className="text-sm text-gray-300">Tactical Guidance</span>
              </div>
              <div className="flex items-center space-x-2 glass-panel px-4 py-2 rounded-full">
                <Map className="w-4 h-4 text-survival-brightAccent" />
                <span className="text-sm text-gray-300">Survival Techniques</span>
              </div>
              <div className="flex items-center space-x-2 glass-panel px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-survival-brightAccent" />
                <span className="text-sm text-gray-300">Safety Protocols</span>
              </div>
            </div>
          </div>

          {/* Video Element Side - With Optimized Loading */}
          <div className={cn(
            "transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-survival-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-survival-brightAccent/5 rounded-full blur-2xl"></div>
              
              {/* Main video element with thumbnail placeholder */}
              <div className="relative z-10 mx-auto">
                <div className="glass-panel p-2 rounded-xl shadow-2xl border border-survival-accent/30">
                  <div className="rounded-lg overflow-hidden aspect-video">
                    {!videoLoaded ? (
                      <div 
                        className="relative cursor-pointer w-full h-full" 
                        onClick={loadVideo}
                      >
                        <img 
                          src={thumbnailUrl} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover rounded-lg"
                          loading="eager"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-survival-accent/70 rounded-full p-5 backdrop-blur-sm hover:bg-survival-brightAccent transition-colors">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        ref={videoRef}
                        title="Survivalist GPT Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg w-full h-full"
                        loading="lazy"
                      ></iframe>
                    )}
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm md:text-base text-survival-brightAccent font-semibold">
                    The Survivalist GPT Anthem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#1B5E20" 
            fillOpacity="0.2" 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
