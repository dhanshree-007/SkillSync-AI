import React, { useEffect, useRef } from 'react';

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Subtle Sage & Lime Particle Colors
    const colors = [
      'rgba(114, 147, 106, ',
      'rgba(155, 199, 68, ',
      'rgba(240, 196, 101, '
    ];

    // 60 Micro Ambient Particles
    const particleCount = 60;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.6,
        speedY: Math.random() * 0.2 + 0.08,
        speedX: Math.random() * 0.15 - 0.075,
        swaySpeed: Math.random() * 0.01 + 0.003,
        swayAngle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.35 + 0.15,
        colorBase: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * 0.2 + p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height + 5) {
          p.y = -5;
          p.x = Math.random() * canvas.width;
        }

        if (p.x > canvas.width + 5) p.x = -5;
        if (p.x < -5) p.x = canvas.width + 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#ECEEEA]">
      
      {/* Layer 1: Ambient Sage & Cream Lighting */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(circle at 12% 15%, rgba(114, 147, 106, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 88% 85%, rgba(155, 199, 68, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 50% 40%, rgba(240, 196, 101, 0.1) 0%, transparent 60%),
            linear-gradient(180deg, #ECEEEA 0%, #F5F7F3 50%, #ECEEEA 100%)
          `
        }}
      />

      {/* Layer 2: Drifting Ambient Sage/Lime Orbs */}
      <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-[#72936A]/15 blur-[140px] animate-blob-drift-1" />
      <div className="absolute top-1/3 -right-32 w-[42rem] h-[42rem] rounded-full bg-[#9BC744]/15 blur-[150px] animate-blob-drift-2" />

      {/* Layer 3: Ultra-Subtle Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60"
      />

      {/* Layer 4: Tactile Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-multiply z-20">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

    </div>
  );
}
