
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const thumbnailUrl = "https://img.youtube.com/vi/C_-odrCtJxs/maxresdefault.jpg";

  // Function to load the actual video when clicked
  const loadVideo = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.src = "https://www.youtube.com/embed/C_-odrCtJxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&vq=hd1080";
    }
  };

  return (
    <section className="section-padding relative bg-survival-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="glass-panel p-4 rounded-xl shadow-2xl border border-survival-accent/30">
            <div className="rounded-lg overflow-hidden video-container">
              {!videoLoaded ? (
                <div 
                  className="absolute inset-0 cursor-pointer" 
                  onClick={loadVideo}
                >
                  <img 
                    src={thumbnailUrl} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
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
                  className="rounded-lg"
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              Watch how Survivalist GPT can help you navigate challenging scenarios with expert guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
