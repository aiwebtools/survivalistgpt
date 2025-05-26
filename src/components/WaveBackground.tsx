
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

    // Enhanced wave parameters for epic movement
    let time = 0;
    const waves = [
      { amplitude: 80, frequency: 0.04, speed: 0.08, phase: 0, color: 'rgba(76, 175, 80, 0.15)' },
      { amplitude: 120, frequency: 0.03, speed: 0.12, phase: Math.PI / 2, color: 'rgba(118, 255, 3, 0.12)' },
      { amplitude: 60, frequency: 0.05, speed: 0.1, phase: Math.PI, color: 'rgba(76, 175, 80, 0.18)' },
      { amplitude: 100, frequency: 0.035, speed: 0.15, phase: 3 * Math.PI / 2, color: 'rgba(96, 125, 139, 0.1)' },
      { amplitude: 140, frequency: 0.025, speed: 0.06, phase: Math.PI / 4, color: 'rgba(118, 255, 3, 0.08)' }
    ];

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Epic animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced gradient background with more dynamic colors
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        0,
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        canvas.width * 1.2
      );
      gradient.addColorStop(0, 'rgba(76, 175, 80, 0.05)');
      gradient.addColorStop(0.5, 'rgba(118, 255, 3, 0.03)');
      gradient.addColorStop(1, 'rgba(18, 22, 25, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw epic waves with enhanced movement
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.fillStyle = wave.color;
        ctx.lineWidth = 3 + Math.sin(time * 0.02) * 1;

        // Create epic wave path with multiple harmonics
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= canvas.width; x += 1) {
          const normalizedX = x / canvas.width;
          const mouseInfluence = Math.sin(mouseRef.current.x * Math.PI * 4) * 60 + 
                                Math.cos(mouseRef.current.y * Math.PI * 3) * 40;
          
          // Epic wave calculation with multiple layers and time-based variations
          const baseWave = Math.sin(normalizedX * wave.frequency * canvas.width + time * wave.speed + wave.phase) * wave.amplitude;
          const harmonic1 = Math.sin(normalizedX * wave.frequency * canvas.width * 2.5 + time * wave.speed * 2) * (wave.amplitude * 0.4);
          const harmonic2 = Math.sin(normalizedX * wave.frequency * canvas.width * 4 + time * wave.speed * 3) * (wave.amplitude * 0.2);
          const turbulence = Math.sin(normalizedX * wave.frequency * canvas.width * 8 + time * wave.speed * 4) * (wave.amplitude * 0.1);
          const timeVariation = Math.sin(time * 0.03) * wave.amplitude * 0.3;
          
          const y = canvas.height * 0.5 + 
                   baseWave + harmonic1 + harmonic2 + turbulence + timeVariation +
                   mouseInfluence * (1 - Math.abs(normalizedX - mouseRef.current.x)) +
                   Math.sin(time * 0.05 + index * Math.PI / 3) * 30;
          
          points.push({ x, y });
        }

        // Draw the epic wave line
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Fill the wave area with enhanced opacity variation
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Enhanced floating particles with epic movement
        if (index === 0) {
          for (let i = 0; i < 25; i++) {
            const particleSpeed = 80 + Math.sin(time * 0.01 + i) * 40;
            const particleX = (time * particleSpeed + i * 150) % (canvas.width + 200);
            const verticalOscillation = Math.sin(particleX * 0.008 + time * 0.04) * 80;
            const mouseOscillation = Math.sin(mouseRef.current.x * Math.PI * 2 + time * 0.03) * 50;
            const epicMovement = Math.sin(time * 0.06 + i * 0.5) * 60;
            
            const particleY = canvas.height * 0.25 + 
                             verticalOscillation + mouseOscillation + epicMovement +
                             Math.sin(time * 0.08 + i) * 40;
            
            const size = 3 + Math.sin(time * 0.08 + i) * 2;
            const opacity = 0.4 + Math.sin(time * 0.05 + i) * 0.3;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(118, 255, 3, ${opacity})`;
            ctx.fill();
            
            // Add particle glow effect
            ctx.beginPath();
            ctx.arc(particleX, particleY, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(118, 255, 3, ${opacity * 0.2})`;
            ctx.fill();
          }
        }

        // Add energy bolts/lightning effects for extra epicness
        if (index === 2 && Math.sin(time * 0.1) > 0.8) {
          ctx.strokeStyle = `rgba(118, 255, 3, ${0.6 + Math.sin(time * 0.2) * 0.4})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          const startX = mouseRef.current.x * canvas.width;
          const startY = mouseRef.current.y * canvas.height;
          const endX = startX + (Math.random() - 0.5) * 200;
          const endY = startY + (Math.random() - 0.5) * 200;
          
          // Jagged lightning path
          ctx.moveTo(startX, startY);
          for (let j = 0; j < 5; j++) {
            const progress = j / 4;
            const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 30;
            const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 30;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });

      time += 2; // Increased time increment for faster movement
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
