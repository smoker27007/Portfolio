import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cpu, Diamond, Gauge, Zap } from "lucide-react";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   ULTRA-REALISTIC 3D DNA HELIX — Canvas2D Engine
   ═══════════════════════════════════════════════════════ */

const DNACanvas = () => {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const inViewRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let cw = 0, ch = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    // ── Realistic Glow Sprites ──
    const makeGlow = (r, g, b, isLarge) => {
      const size = isLarge ? 64 : 32;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const gc = c.getContext("2d");
      const h = size / 2;
      
      gc.beginPath();
      gc.arc(h, h, h - 2, 0, Math.PI * 2);
      const gr = gc.createRadialGradient(h * 0.8, h * 0.8, 0, h, h, h);
      
      gr.addColorStop(0, `rgba(255,255,255,1)`);
      gr.addColorStop(0.2, `rgba(${r},${g},${b},0.8)`);
      gr.addColorStop(0.6, `rgba(${r},${g},${b},0.2)`);
      gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      
      gc.fillStyle = gr;
      gc.fill();
      return c;
    };

    const sprBlueLarge = makeGlow(74, 158, 255, true);
    const sprBlueSmall = makeGlow(74, 158, 255, false);
    const sprGoldLarge = makeGlow(201, 169, 110, true);
    const sprGoldSmall = makeGlow(201, 169, 110, false);
    const sprWhiteSmall = makeGlow(255, 255, 255, false);

    // ── Build 3D Geometry dynamically based on section height ──
    const renderables = [];
    
    // Evaluate geometry over the necessary scroll span
    const requiredHeight = ch + (ch * 0.5) + 600; 
    const stepSize = 6;  // Dense vertical steps for perfect curve smoothness
    const totalNodes = Math.ceil(requiredHeight / stepSize); 
    const radius = 150; 
    
    const totalHeight = totalNodes * stepSize;
    const startY = -totalHeight / 2;

    // Ambient dust (stars) 
    const dustCount = Math.floor((requiredHeight / 1000) * 120);
    for (let i = 0; i < dustCount; i++) {
        renderables.push({
            type: 'dust', x: (Math.random() - 0.5) * 1200, y: (Math.random() - 0.5) * totalHeight, z: (Math.random() - 0.5) * 1200,
            baseScale: Math.random() * 2 + 1, sprite: sprWhiteSmall, speed: Math.random() * 0.02 + 0.01, phase: Math.random() * Math.PI * 2
        });
    }

    // Generating a geometrically perfect, smooth double helix via parametric evaluation
    for (let i = 0; i < totalNodes; i++) {
        let y = startY + i * stepSize;
        let angle = i * 0.035; // Frequency of the twist
        
        let px1 = Math.cos(angle) * radius;
        let pz1 = Math.sin(angle) * radius;
        let px2 = Math.cos(angle + Math.PI) * radius;
        let pz2 = Math.sin(angle + Math.PI) * radius;
        
        // Continuous backbone trails
        renderables.push({ type: 'node', x: px1, y: y, z: pz1, baseScale: 5, sprite: sprBlueSmall });
        renderables.push({ type: 'node', x: px2, y: y, z: pz2, baseScale: 5, sprite: sprGoldSmall });
        
        // Major structural node and rung pair every 7th step (42px intervals)
        if (i % 7 === 0) {
            renderables.push({ type: 'node', x: px1, y: y, z: pz1, baseScale: 14, sprite: sprBlueLarge });
            renderables.push({ type: 'node', x: px2, y: y, z: pz2, baseScale: 14, sprite: sprGoldLarge });
            
            // The rigid connecting rung
            renderables.push({
                type: 'line', x1: px1, y1: y, z1: pz1, x2: px2, y2: y, z2: pz2, colorCore: "rgba(255,255,255,", colorGlow: "rgba(74,158,255,"
            });
            
            // Internal static base-pairs sitting securely on the rung
            renderables.push({ type: 'base', x: px1 + (px2 - px1) * 0.33, y: y, z: pz1 + (pz2 - pz1) * 0.33, baseScale: 6, sprite: sprBlueSmall, tOffset: 0 });
            renderables.push({ type: 'base', x: px1 + (px2 - px1) * 0.66, y: y, z: pz1 + (pz2 - pz1) * 0.66, baseScale: 6, sprite: sprGoldSmall, tOffset: 0 });
        }
    }

    // ── Draw Loop ──
    const draw = () => {
        if (!cw || !ch) return;
        ctx.clearRect(0, 0, cw, ch);
        
        const prog = progressRef.current; 
        const time = Date.now() * 0.0005;

        const fov = 600;
        const cameraZ = 550 + Math.sin(time * 0.5) * 50; 

        const rotX = -0.15 + (prog * 0.3); 
        const rotY = time * 0.2 + (prog * Math.PI * 1.2); 
        const rotZ = 0.05 * Math.sin(time * 0.8);
        const panY = (prog - 0.5) * (ch * 0.5);

        const sinX = Math.sin(rotX), cosX = Math.cos(rotX);
        const sinY = Math.sin(rotY), cosY = Math.cos(rotY);
        const sinZ = Math.sin(rotZ), cosZ = Math.cos(rotZ);

        const transform = (x, y, z) => {
            // Evaluated explicitly as purely rigid 3D geometric coordinates.
            // Eliminated artificial distorting sine waves for physical accuracy.
            const x1 = x * cosY - z * sinY;
            const z1 = x * sinY + z * cosY;
            const y1 = y - panY;

            const y2 = y1 * cosX - z1 * sinX;
            const z2 = y1 * sinX + z1 * cosX;
            const x2 = x1;

            const x3 = x2 * cosZ - y2 * sinZ;
            const y3 = x2 * sinZ + y2 * cosZ;
            const z3 = z2;

            const finalZ = z3 + cameraZ;
            const scale = fov / Math.max(1, finalZ);
            return { px: cw / 2 + x3 * scale, py: ch / 2 + y3 * scale, scale: scale, pz: finalZ };
        };

        const projected = [];

        for (let i = 0; i < renderables.length; i++) {
            const item = renderables[i];
            
            if (item.type === 'node' || item.type === 'base') {
                const pos = transform(item.x, item.y, item.z);
                if (pos.pz < 10) continue;

                const alpha = Math.min(1, Math.max(0.02, 1 - (pos.pz - 400) / 1000));
                let size = item.baseScale * pos.scale;
                if (size < 0.5) continue;
                
                if (item.type === 'base') { size *= (1 + 0.3 * Math.sin(time * 5 + item.tOffset)); }

                projected.push({ type: 'sprite', sprite: item.sprite, px: pos.px, py: pos.py, pz: pos.pz, scale: size, alpha: alpha });

            } 
      </div>
    </section>
  );
};

export default AboutSection;