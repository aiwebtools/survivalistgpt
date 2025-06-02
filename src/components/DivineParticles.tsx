
import { useEffect, useRef } from 'react';

const DivineParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'divine-particle';
      
      const size = Math.random() * 4 + 1;
      const hue = Math.random() * 60 + 240; // Purple to blue range
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 8 + 12;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: radial-gradient(circle, hsla(${hue}, 80%, 70%, 0.9), transparent);
        box-shadow: 0 0 ${size * 3}px hsla(${hue}, 80%, 70%, 0.6);
        animation-duration: ${animationDuration}s;
        animation-delay: ${delay}s;
      `;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, (animationDuration + delay) * 1000);
    };

    // Create particles at intervals
    const interval = setInterval(createParticle, 200);
    
    // Create initial burst
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100);
    }
    
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="divine-particles" />;
};

export default DivineParticles;
