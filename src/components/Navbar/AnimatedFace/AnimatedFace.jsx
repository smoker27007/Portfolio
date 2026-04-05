import { useEffect, useRef } from "react";
import avatarImg from "../../assets/avatar.png";

const AnimatedFace = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const animFrameRef = useRef(0);
  const readyRef = useRef(false);
  const dimensionsRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensionsRef.current = {
        w, h,
        offsetX: w * 0.55,
        offsetY: h * 0.15,
      };
    };
    resize();
    window.addEventListener("resize", resize);

    const SAMPLE_W = 380;
    const SAMPLE_H = 500;
    const GAP = 2;
    const DOT_RADIUS = 1;
    const MOUSE_RADIUS = 100;
    const PUSH_FORCE = 12;
    const RETURN_SPEED = 0.08;
    const FRICTION = 0.82;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = avatarImg;

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;
      offCanvas.width = SAMPLE_W;
      offCanvas.height = SAMPLE_H;

      const imgAspect = img.width / img.height;
      const canvasAspect = SAMPLE_W / SAMPLE_H;
      let drawW, drawH, drawX, drawY;

      if (imgAspect > canvasAspect) {
        drawH = SAMPLE_H;
        drawW = SAMPLE_H * imgAspect;
        drawX = (SAMPLE_W - drawW) / 2;
        drawY = 0;
      } else {
        drawW = SAMPLE_W;
        drawH = SAMPLE_W / imgAspect;
        drawX = 0;
        drawY = (SAMPLE_H - drawH) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const imageData = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
      const pixels = imageData.data;

      const particles = [];
      const { w: viewW, h: viewH } = dimensionsRef.current;

      for (let y = 0; y < SAMPLE_H; y += GAP) {
        for (let x = 0; x < SAMPLE_W; x += GAP) {
          const i = (y * SAMPLE_W + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          if (a < 30) continue;

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

          const cx = SAMPLE_W / 2;
          const cy = SAMPLE_H * 0.38;
          const dx = (x - cx) / (SAMPLE_W / 2);
          const dy = (y - cy) / (SAMPLE_H / 2);
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);

          if (brightness < 0.06 && distFromCenter > 0.4) continue;
          if (brightness < 0.1 && distFromCenter > 0.75) continue;
          if (brightness < 0.15 && (x < 15 || x > SAMPLE_W - 15 || y < 10)) continue;
          if (brightness < 0.03) continue;

          const { offsetX, offsetY } = dimensionsRef.current;
          const worldX = offsetX + x;
          const worldY = offsetY + y;

          const portraitCX = offsetX + SAMPLE_W / 2;
          const portraitCY = offsetY + SAMPLE_H / 2;
          const angle = Math.atan2(worldY - portraitCY, worldX - portraitCX) + (Math.random() - 0.5) * 1.5;
          const maxDim = Math.max(viewW, viewH);
          const scatterDist = maxDim * 0.5 + Math.random() * maxDim * 0.8;

          particles.push({
            x: worldX,
            y: worldY,
            originX: worldX,
            originY: worldY,
            r,
            g,
            b,
            alpha: 1.0,
            size: DOT_RADIUS,
            baseSize: DOT_RADIUS,
            vx: 0,
            vy: 0,
            scatterAngle: angle,
            scatterDist,
          });
        }
      }

      particlesRef.current = particles;
      readyRef.current = true;
    };

    const handleScroll = () => {
      const heroSection = canvas.closest("section");
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const sectionH = heroSection.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const totalScroll = sectionH - viewH;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      scrollRef.current = progress * progress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      if (!ctx || !canvas) return;
      const { w, h } = dimensionsRef.current;
      ctx.clearRect(0, 0, w, h);

      if (!readyRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const len = particles.length;
      const sp = scrollRef.current;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        const targetX = p.originX + Math.cos(p.scatterAngle) * p.scatterDist * sp;
        const targetY = p.originY + Math.sin(p.scatterAngle) * p.scatterDist * sp;

        if (sp < 0.3) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const distSq = mdx * mdx + mdy * mdy;
          const maxDistSq = MOUSE_RADIUS * MOUSE_RADIUS;

          if (distSq < maxDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / MOUSE_RADIUS) * PUSH_FORCE * (1 - sp * 3);
            const mAngle = Math.atan2(mdy, mdx);
            p.vx -= Math.cos(mAngle) * force;
            p.vy -= Math.sin(mAngle) * force;
            p.size = p.baseSize + (1 - dist / MOUSE_RADIUS) * 2.5;
          } else {
            p.size += (p.baseSize - p.size) * 0.12;
          }
        } else {
          p.size += (p.baseSize - p.size) * 0.12;
        }

        p.vx += (targetX - p.x) * RETURN_SPEED;
        p.vy += (targetY - p.y) * RETURN_SPEED;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        const fadeAlpha = p.alpha * (1 - sp * 0.85);
        if (fadeAlpha < 0.005) continue;
        const drawSize = p.size * (1 - sp * 0.4);

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${fadeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, drawSize), 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default AnimatedFace;