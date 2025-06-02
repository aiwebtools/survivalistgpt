
import { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // DIVINE wave parameters for absolutely EPIC movement
    let time = 0;
    const waves = [
      { amplitude: 120, frequency: 0.05, speed: 0.15, phase: 0, color: 'rgba(139, 92, 246, 0.25)' },
      { amplitude: 180, frequency: 0.04, speed: 0.20, phase: Math.PI / 2, color: 'rgba(6, 182, 212, 0.20)' },
      { amplitude: 90, frequency: 0.06, speed: 0.18, phase: Math.PI, color: 'rgba(16, 185, 129, 0.22)' },
      { amplitude: 150, frequency: 0.045, speed: 0.25, phase: 3 * Math.PI / 2, color: 'rgba(168, 85, 247, 0.18)' },
      { amplitude: 200, frequency: 0.035, speed: 0.12, phase: Math.PI / 4, color: 'rgba(59, 130, 246, 0.15)' },
      { amplitude: 110, frequency: 0.055, speed: 0.30, phase: 5 * Math.PI / 4, color: 'rgba(236, 72, 153, 0.20)' },
      { amplitude: 160, frequency: 0.038, speed: 0.22, phase: 7 * Math.PI / 4, color: 'rgba(245, 158, 11, 0.18)' }
    ];

    // Mouse interaction with divine responsiveness
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ABSOLUTELY DIVINE animation function
    const animate = () => {
      // Create dynamic background gradient that responds to time
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.01) * 0.3),
        canvas.height * (0.5 + Math.cos(time * 0.01) * 0.3),
        0,
        canvas.width * (0.5 + Math.sin(time * 0.01) * 0.3),
        canvas.height * (0.5 + Math.cos(time * 0.01) * 0.3),
        canvas.width * 1.5
      );
      
      // Divine color transitions
      const hue1 = (time * 0.2) % 360;
      const hue2 = (time * 0.3 + 120) % 360;
      const hue3 = (time * 0.25 + 240) % 360;
      
      gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.1)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 80%, 70%, 0.05)`);
      gradient.addColorStop(1, `hsla(${hue3}, 60%, 50%, 0.08)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw DIVINE waves with absolutely EPIC movement
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.fillStyle = wave.color;
        ctx.lineWidth = 4 + Math.sin(time * 0.03) * 2;

        // Create absolutely DIVINE wave path with multiple harmonics and god-tier effects
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= canvas.width; x += 0.5) {
          const normalizedX = x / canvas.width;
          
          // DIVINE mouse influence with epic responsiveness
          const mouseInfluence = Math.sin(mouseRef.current.x * Math.PI * 6) * 100 + 
                                Math.cos(mouseRef.current.y * Math.PI * 4) * 80 +
                                Math.sin(mouseRef.current.x * mouseRef.current.y * Math.PI * 8) * 60;
          
          // ABSOLUTELY EPIC wave calculation with DIVINE layers
          const baseWave = Math.sin(normalizedX * wave.frequency * canvas.width + time * wave.speed + wave.phase) * wave.amplitude;
          const harmonic1 = Math.sin(normalizedX * wave.frequency * canvas.width * 3 + time * wave.speed * 2.5) * (wave.amplitude * 0.5);
          const harmonic2 = Math.sin(normalizedX * wave.frequency * canvas.width * 5 + time * wave.speed * 4) * (wave.amplitude * 0.3);
          const harmonic3 = Math.sin(normalizedX * wave.frequency * canvas.width * 7 + time * wave.speed * 6) * (wave.amplitude * 0.2);
          const turbulence = Math.sin(normalizedX * wave.frequency * canvas.width * 12 + time * wave.speed * 8) * (wave.amplitude * 0.15);
          const chaos = Math.sin(normalizedX * wave.frequency * canvas.width * 20 + time * wave.speed * 12) * (wave.amplitude * 0.1);
          
          // Divine time variations with multiple frequencies
          const timeVariation1 = Math.sin(time * 0.04 + index * Math.PI / 3) * wave.amplitude * 0.4;
          const timeVariation2 = Math.cos(time * 0.06 + index * Math.PI / 5) * wave.amplitude * 0.3;
          const timeVariation3 = Math.sin(time * 0.08 + index * Math.PI / 7) * wave.amplitude * 0.2;
          
          // Epic cross-wave interactions
          const crossWaveInfluence = Math.sin(time * 0.05 + normalizedX * 10) * 50;
          
          const y = canvas.height * (0.3 + index * 0.1) + 
                   baseWave + harmonic1 + harmonic2 + harmonic3 + turbulence + chaos +
                   mouseInfluence * (1 - Math.abs(normalizedX - mouseRef.current.x)) +
                   timeVariation1 + timeVariation2 + timeVariation3 + crossWaveInfluence +
                   Math.sin(time * 0.07 + index * Math.PI / 4) * 40;
          
          points.push({ x, y });
        }

        // Draw the DIVINE wave line with enhanced thickness variation
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          // Add thickness variation for more divine effect
          ctx.lineWidth = 3 + Math.sin(time * 0.05 + i * 0.1) * 3;
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Fill the wave area with divine opacity variation
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Add divine gradient fill
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        waveGradient.addColorStop(0, wave.color);
        waveGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = waveGradient;
        ctx.fill();

        // DIVINE floating particles with absolutely EPIC movement and trails
        if (index <= 2) {
          for (let i = 0; i < 40; i++) {
            const particleSpeed = 120 + Math.sin(time * 0.02 + i) * 60;
            const particleX = (time * particleSpeed + i * 200) % (canvas.width + 300);
            
            // Multi-layered vertical oscillations for divine movement
            const verticalOscillation1 = Math.sin(particleX * 0.01 + time * 0.06) * 120;
            const verticalOscillation2 = Math.cos(particleX * 0.015 + time * 0.08) * 80;
            const mouseOscillation = Math.sin(mouseRef.current.x * Math.PI * 3 + time * 0.05) * 80;
            const divineMovement = Math.sin(time * 0.09 + i * 0.7) * 100;
            const chaosMovement = Math.cos(time * 0.12 + i * 0.3) * 60;
            
            const particleY = canvas.height * (0.2 + index * 0.15) + 
                             verticalOscillation1 + verticalOscillation2 + mouseOscillation + 
                             divineMovement + chaosMovement +
                             Math.sin(time * 0.1 + i) * 70;
            
            const size = 4 + Math.sin(time * 0.1 + i) * 3;
            const opacity = 0.6 + Math.sin(time * 0.07 + i) * 0.4;
            const hue = (time * 2 + i * 10) % 360;
            
            // Main particle with divine glow
            ctx.beginPath();
            ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity})`;
            ctx.fill();
            
            // Divine particle aura - multiple layers
            for (let j = 1; j <= 4; j++) {
              ctx.beginPath();
              ctx.arc(particleX, particleY, size * (j + 1), 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.3 / j})`;
              ctx.fill();
            }
            
            // Particle trail effect
            for (let t = 1; t <= 8; t++) {
              const trailX = particleX - t * 15;
              const trailY = particleY + Math.sin(time * 0.08 + i + t) * 20;
              const trailSize = size * (1 - t * 0.1);
              const trailOpacity = opacity * (1 - t * 0.12);
              
              if (trailSize > 0 && trailOpacity > 0) {
                ctx.beginPath();
                ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${trailOpacity})`;
                ctx.fill();
              }
            }
          }
        }

        // DIVINE energy bolts and lightning effects for MAXIMUM epicness
        if ((index === 1 || index === 3) && Math.sin(time * 0.15) > 0.7) {
          ctx.strokeStyle = `hsla(${(time * 3) % 360}, 100%, 80%, ${0.8 + Math.sin(time * 0.3) * 0.2})`;
          ctx.lineWidth = 3 + Math.sin(time * 0.4) * 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = ctx.strokeStyle;
          
          const startX = mouseRef.current.x * canvas.width + Math.sin(time * 0.1) * 100;
          const startY = mouseRef.current.y * canvas.height + Math.cos(time * 0.1) * 100;
          const endX = startX + (Math.random() - 0.5) * 400;
          const endY = startY + (Math.random() - 0.5) * 400;
          
          // Divine jagged lightning path with multiple branches
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          for (let j = 0; j < 12; j++) {
            const progress = j / 11;
            const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 60;
            const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 60;
            ctx.lineTo(x, y);
            
            // Branch lightning
            if (j % 3 === 0 && Math.random() > 0.7) {
              const branchX = x + (Math.random() - 0.5) * 100;
              const branchY = y + (Math.random() - 0.5) * 100;
              ctx.moveTo(x, y);
              ctx.lineTo(branchX, branchY);
              ctx.moveTo(x, y);
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // DIVINE cosmic spirals for ultimate visual appeal
        if (index === 0 && Math.sin(time * 0.1) > 0.8) {
          const spiralCenterX = canvas.width * 0.5 + Math.sin(time * 0.05) * 200;
          const spiralCenterY = canvas.height * 0.5 + Math.cos(time * 0.05) * 200;
          
          ctx.strokeStyle = `hsla(${(time * 2) % 360}, 90%, 70%, 0.6)`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = ctx.strokeStyle;
          
          ctx.beginPath();
          for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
            const radius = angle * 3 + Math.sin(time * 0.1 + angle) * 20;
            const x = spiralCenterX + Math.cos(angle + time * 0.05) * radius;
            const y = spiralCenterY + Math.sin(angle + time * 0.05) * radius;
            
            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      time += 3; // Even faster time increment for MAXIMUM divine epicness
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ background: 'transparent' }}
    />
  );
};

export default WaveBackground;
