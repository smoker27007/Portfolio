import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import avatarImg from "../../assets/avatar.png";
import { WorkspaceContext } from "../Workspace/Workspace";

gsap.registerPlugin(ScrollTrigger);

const AnimatedFace = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const animFrameRef = useRef(0);
  const readyRef = useRef(false);
  const inViewRef = useRef(true);
  const entryProgressRef = useRef(0);
  const dimensionsRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scrollerRef.current || !isReady) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const section = canvas.closest("section");
      const w = section ? section.clientWidth : window.innerWidth;
      const h = section ? section.clientHeight : window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const avatarScale = Math.min(1, w / 1400);
      const sampleW = Math.round(420 * avatarScale);
      const sampleH = Math.round(560 * avatarScale);
      const rightPadding = Math.max(24, w * 0.08);
      dimensionsRef.current = {
        w, h,
        offsetX: w - sampleW - rightPadding,
        offsetY: (h - sampleH) / 2,
        sampleW,
        sampleH,
      };
    };
    resize();
    // Also listen to the scroller resize, not just window resize
    window.addEventListener("resize", resize);
    scrollerRef.current?.addEventListener("resize", resize);

    const GAP = 5;
    const DOT_RADIUS = 3.5;
    const MOUSE_RADIUS = 120;
    const PUSH_FORCE = 18;
    const RETURN_SPEED = 0.14;
    const FRICTION = 0.85;

    // Precompute a set of shard "crack centers" — used to assign each particle
    // a glass-shard burst direction instead of pure random
    const SHARD_COUNT = 18;
    const shardCenters = Array.from({ length: SHARD_COUNT }, (_, i) => {
      const a = (i / SHARD_COUNT) * Math.PI * 2;
      const r = 0.25 + Math.random() * 0.45;
      return { nx: Math.cos(a) * r, ny: Math.sin(a) * r };
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = avatarImg;

    img.onload = () => {
      const { sampleW: SAMPLE_W, sampleH: SAMPLE_H, w: viewW, h: viewH } = dimensionsRef.current;

      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;
      offCanvas.width = SAMPLE_W;
      offCanvas.height = SAMPLE_H;

      const imgAspect = img.width / img.height;
      const canvasAspect = SAMPLE_W / SAMPLE_H;
      let drawW, drawH, drawX, drawY;
      if (imgAspect > canvasAspect) {
        drawH = SAMPLE_H; drawW = SAMPLE_H * imgAspect;
        drawX = (SAMPLE_W - drawW) / 2; drawY = 0;
      } else {
        drawW = SAMPLE_W; drawH = SAMPLE_W / imgAspect;
        drawX = 0; drawY = (SAMPLE_H - drawH) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const imageData = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
      const pixels = imageData.data;

      const particles = [];
      const portraitCXnorm = 0.5;
      const portraitCYnorm = 0.38;

      for (let y = 0; y < SAMPLE_H; y += GAP) {
        for (let x = 0; x < SAMPLE_W; x += GAP) {
          const i = (y * SAMPLE_W + x) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2], a = pixels[i + 3];
          if (a < 30) continue;

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const nx = (x / SAMPLE_W - portraitCXnorm);
          const ny = (y / SAMPLE_H - portraitCYnorm);
          const distFromCenter = Math.sqrt(nx * nx + ny * ny);

          if (brightness < 0.04 && distFromCenter > 0.55) continue;
          if (brightness < 0.08 && distFromCenter > 0.85) continue;
          if (brightness < 0.12 && (x < 10 || x > SAMPLE_W - 10 || y < 8)) continue;
          if (brightness < 0.02) continue;

          const { offsetX, offsetY } = dimensionsRef.current;
          const worldX = offsetX + x;
          const worldY = offsetY + y;

          // Assign this particle to the nearest shard center for burst direction
          let bestDist = Infinity, bestShard = shardCenters[0];
          for (const sc of shardCenters) {
            const d = (nx - sc.nx) ** 2 + (ny - sc.ny) ** 2;
            if (d < bestDist) { bestDist = d; bestShard = sc; }
          }

          // Glass burst: primary direction from shard center outward,
          // with slight angular jitter for a shattered look
          const baseAngle = Math.atan2(bestShard.ny, bestShard.nx);
          const jitter = (Math.random() - 0.5) * 0.8;
          const burstAngle = baseAngle + jitter;
          // Distance varies: shards at the edges fly further
          const edgeFactor = 0.4 + distFromCenter * 1.6;
          const maxDim = Math.max(viewW, viewH);
          const scatterDist = maxDim * (0.6 + edgeFactor * 0.8) + Math.random() * maxDim * 0.4;

          // Entry animation: converge from a nearby scatter
          const entryAngle = Math.random() * Math.PI * 2;
          const entryDist = 150 + Math.random() * 250;

          particles.push({
            x: worldX + Math.cos(entryAngle) * entryDist,
            y: worldY + Math.sin(entryAngle) * entryDist,
            originX: worldX,
            originY: worldY,
            startX: worldX + Math.cos(entryAngle) * entryDist,
            startY: worldY + Math.sin(entryAngle) * entryDist,
            r, g, b,
            alpha: 1.0,
            size: DOT_RADIUS,
            baseSize: DOT_RADIUS,
            vx: 0, vy: 0,
            burstAngle,
            scatterDist,
            // slight spiral: each particle spins a little as it bursts out
            spiralOffset: (Math.random() - 0.5) * 0.4,
            floatPhase: Math.random() * Math.PI * 2,
            floatAmpX: 0.3 + Math.random() * 0.8,
            floatAmpY: 0.3 + Math.random() * 0.8,
            floatSpeedX: 0.0003 + Math.random() * 0.0006,
            floatSpeedY: 0.0004 + Math.random() * 0.0005,
          });
        }
      }

      particlesRef.current = particles;
      readyRef.current = true;

      const entryAnim = { progress: 0 };
      gsap.to(entryAnim, {
        progress: 1, duration: 1.5, delay: 0.4, ease: "power3.out",
        onUpdate: () => { entryProgressRef.current = entryAnim.progress; },
      });
    };

    const heroSection = canvas.closest("section");
    let st;
    let observer;
    if (heroSection) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting;
        },
        { root: scrollerRef.current, threshold: 0 }
      );
      observer.observe(heroSection);

      st = ScrollTrigger.create({
        trigger: heroSection,
        scroller: scrollerRef.current,
        start: "top top",
        end: "+=150%",
        onUpdate: (self) => {
          // Ease the scroll progress so the burst feels snappier early
          const raw = self.progress;
          scrollRef.current = raw < 0.5
            ? raw * raw * 2               // fast ease-in
            : 1 - (1 - raw) * (1 - raw) * 2; // ease out at the end
        }
      });
    }

    const startTime = performance.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      if (!readyRef.current || !inViewRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const { w, h } = dimensionsRef.current;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const len = particles.length;
      const sp = scrollRef.current;
      const ep = entryProgressRef.current;
      const now = performance.now();
      const elapsed = now - startTime;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Glass-shard burst: angle rotates slightly as sp increases (spiral feel)
        const spiralAngle = p.burstAngle + p.spiralOffset * sp * Math.PI;
        const assembledX = p.originX + Math.cos(spiralAngle) * p.scatterDist * sp;
        const assembledY = p.originY + Math.sin(spiralAngle) * p.scatterDist * sp;

        const floatX = Math.sin(elapsed * p.floatSpeedX + p.floatPhase) * p.floatAmpX * ep * (1 - sp);
        const floatY = Math.cos(elapsed * p.floatSpeedY + p.floatPhase) * p.floatAmpY * ep * (1 - sp);

        if (ep < 0.99) {
          const easedEp = ep * ep * (3 - 2 * ep);
          p.x = p.startX + (assembledX - p.startX) * easedEp + floatX;
          p.y = p.startY + (assembledY - p.startY) * easedEp + floatY;
          p.vx = 0; p.vy = 0;
          p.size += (p.baseSize - p.size) * 0.12;
        } else {
          const targetX = assembledX + floatX;
          const targetY = assembledY + floatY;

          if (sp < 0.3) {
            const mdx = mouse.x - p.x, mdy = mouse.y - p.y;
            const distSq = mdx * mdx + mdy * mdy;
            if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / MOUSE_RADIUS) * PUSH_FORCE * (1 - sp * 3);
              const mAngle = Math.atan2(mdy, mdx);
              p.vx -= Math.cos(mAngle) * force;
              p.vy -= Math.sin(mAngle) * force;
              p.size = p.baseSize + (1 - dist / MOUSE_RADIUS) * 3;
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
        }

        // Fade out more aggressively during burst (glass shattering fades fast)
        const burstFade = sp > 0.15 ? Math.max(0, 1 - (sp - 0.15) * 2.2) : 1;
        const fadeAlpha = p.alpha * Math.min(1, ep * 1.5) * burstFade;
        if (fadeAlpha < 0.005) continue;

        // Particles grow slightly as they burst out (like shards catching light)
        const burstGrow = 1 + sp * 1.8;
        const drawSize = p.size * burstGrow;

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${fadeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, drawSize), 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      // Convert browser-viewport mouse coords to section-local coords
      const section = canvas.closest("section");
      if (section) {
        const rect = section.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (st) st.kill();
      if (observer) observer.disconnect();
      window.removeEventListener("resize", resize);
      scrollerRef.current?.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "auto",
        zIndex: 1,
      }}
    />
  );
};

export default AnimatedFace;