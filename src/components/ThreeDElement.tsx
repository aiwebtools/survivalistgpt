
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ThreeDElementProps {
  className?: string;
}

const ThreeDElement: React.FC<ThreeDElementProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    
    // Perspective transformation values
    const maxRotation = 10; // max rotation in degrees
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
      
      // Apply the rotation transformation
      const rotateY = mouseX * maxRotation;
      const rotateX = -mouseY * maxRotation;
      
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const onResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative transition-transform duration-200 ease-out select-none',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-survival-accent/20 to-transparent rounded-lg -z-10 blur-xl animate-pulse-soft"></div>
      <div className="glass-panel rounded-lg p-1 shadow-xl">
        <div className="relative z-10 bg-survival-dark/60 rounded-lg p-6 border border-survival-accent/30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-survival-accent/10 to-transparent rounded-lg"></div>
          <div className="relative z-20 flex items-center justify-center">
            <div className="w-16 h-16 bg-survival-accent/90 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-8 h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-white">Survivalist GPT</h3>
            <p className="text-xs text-gray-300 mt-1">Presented by AiWebTools.Ai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDElement;
