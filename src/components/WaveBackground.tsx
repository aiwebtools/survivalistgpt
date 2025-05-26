
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

    // Wave parameters
    let time = 0;
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.02, phase: 0, color: 'rgba(76, 175, 80, 0.1)' },
      { amplitude: 40, frequency: 0.015, speed: 0.03, phase: Math.PI / 2, color: 'rgba(118, 255, 3, 0.08)' },
      { amplitude: 25, frequency: 0.025, speed: 0.025, phase: Math.PI, color: 'rgba(76, 175, 80, 0.12)' },
      { amplitude: 35, frequency: 0.018, speed: 0.035, phase: 3 * Math.PI / 2, color: 'rgba(96, 125, 139, 0.06)' }
    ];

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        0,
        canvas.width * mouseRef.current.x,
        canvas.height * mouseRef.current.y,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(76, 175, 80, 0.02)');
      gradient.addColorStop(1, 'rgba(18, 22, 25, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.fillStyle = wave.color;
        ctx.lineWidth = 2;

        // Create wave path
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= canvas.width; x += 2) {
          const normalizedX = x / canvas.width;
          const mouseInfluence = Math.sin(mouseRef.current.x * Math.PI * 2) * 20;
          const y = canvas.height * 0.5 + 
                   Math.sin(normalizedX * wave.frequency * canvas.width + time * wave.speed + wave.phase) * wave.amplitude +
                   Math.sin(normalizedX * wave.frequency * canvas.width * 2 + time * wave.speed * 1.5) * (wave.amplitude * 0.3) +
                   mouseInfluence * (1 - Math.abs(normalizedX - mouseRef.current.x));
          points.push({ x, y });
        }

        // Draw the wave line
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Fill the wave area
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Add floating particles
        if (index === 0) {
          for (let i = 0; i < 15; i++) {
            const particleX = (time * 50 + i * 100) % (canvas.width + 100);
            const particleY = canvas.height * 0.3 + 
                             Math.sin(particleX * 0.01 + time * 0.02) * 30 +
                             Math.sin(mouseRef.current.x * Math.PI) * 20;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2 + Math.sin(time * 0.05 + i) * 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(118, 255, 3, ${0.3 + Math.sin(time * 0.03 + i) * 0.2})`;
            ctx.fill();
          }
        }
      });

      time += 1;
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
