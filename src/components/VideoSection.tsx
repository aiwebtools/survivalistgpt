
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

const VideoSection = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

  useEffect(() => {
    // Set video quality and autoplay when component mounts
    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.src = "https://www.youtube.com/embed/C_-odrCtJxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&vq=hd1080";
    }
  }, []);

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
              <iframe
                ref={videoRef}
                title="Survivalist GPT Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg w-full h-full"
              ></iframe>
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
