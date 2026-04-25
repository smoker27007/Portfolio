import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Cpu, Diamond, Gauge, Zap } from "lucide-react";
import { WorkspaceContext } from "../Workspace/Workspace";
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
  const resizeTimerRef = useRef(0);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scrollerRef.current || !isReady) return;
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
    const onResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

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
      gr.addColorStop(0, `rgba(43,37,34,0.8)`);
      gr.addColorStop(0.2, `rgba(${r},${g},${b},0.8)`);
      gr.addColorStop(0.6, `rgba(${r},${g},${b},0.2)`);
      gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      gc.fillStyle = gr;
      gc.fill();
      return c;
    };

    const sprBlueLarge = makeGlow(176, 130, 87, true);   
    const sprBlueSmall = makeGlow(176, 130, 87, false);
    const sprGoldLarge = makeGlow(201, 122, 83, true);   
    const sprGoldSmall = makeGlow(201, 122, 83, false);
    const sprWhiteSmall = makeGlow(120, 107, 99, false); 

    const renderables = [];
    const requiredHeight = ch + (ch * 0.5) + 600; 
    const stepSize = 10;  
    const totalNodes = Math.ceil(requiredHeight / stepSize); 
    const radius = 150; 
    const totalHeight = totalNodes * stepSize;
    const startY = -totalHeight / 2;

    const dustCount = Math.floor((requiredHeight / 1000) * 60);
    for (let i = 0; i < dustCount; i++) {
        renderables.push({
            type: 'dust', x: (Math.random() - 0.5) * 1200, y: (Math.random() - 0.5) * totalHeight, z: (Math.random() - 0.5) * 1200,
            baseScale: Math.random() * 2 + 1, sprite: sprWhiteSmall, speed: Math.random() * 0.02 + 0.01, phase: Math.random() * Math.PI * 2
        });
    }

    for (let i = 0; i < totalNodes; i++) {
        let y = startY + i * stepSize;
        let angle = i * 0.035; 
        let px1 = Math.cos(angle) * radius;
        let pz1 = Math.sin(angle) * radius;
        let px2 = Math.cos(angle + Math.PI) * radius;
        let pz2 = Math.sin(angle + Math.PI) * radius;
        renderables.push({ type: 'node', x: px1, y: y, z: pz1, baseScale: 5, sprite: sprBlueSmall });
        renderables.push({ type: 'node', x: px2, y: y, z: pz2, baseScale: 5, sprite: sprGoldSmall });
        if (i % 7 === 0) {
            renderables.push({ type: 'node', x: px1, y: y, z: pz1, baseScale: 14, sprite: sprBlueLarge });
            renderables.push({ type: 'node', x: px2, y: y, z: pz2, baseScale: 14, sprite: sprGoldLarge });
            renderables.push({ type: 'line', x1: px1, y1: y, z1: pz1, x2: px2, y2: y, z2: pz2, colorCore: "rgba(43,37,34,", colorGlow: "rgba(176,130,87," });
            renderables.push({ type: 'base', x: px1 + (px2 - px1) * 0.33, y: y, z: pz1 + (pz2 - pz1) * 0.33, baseScale: 6, sprite: sprBlueSmall, tOffset: 0 });
            renderables.push({ type: 'base', x: px1 + (px2 - px1) * 0.66, y: y, z: pz1 + (pz2 - pz1) * 0.66, baseScale: 6, sprite: sprGoldSmall, tOffset: 0 });
        }
    }

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
                if (item.type === 'base') size *= (1 + 0.3 * Math.sin(time * 5 + item.tOffset));
                projected.push({ type: 'sprite', sprite: item.sprite, px: pos.px, py: pos.py, pz: pos.pz, scale: size, alpha: alpha });
            } else if (item.type === 'dust') {
                let dy = item.y - time * item.speed * 1000;
                const hRange = totalHeight * 1.5;
                dy = ((dy % hRange) + hRange) % hRange - hRange / 2 + panY;
                const pos = transform(item.x, dy, item.z);
                if (pos.pz < 10) continue;
                const alpha = Math.min(0.5, Math.max(0, 1 - (pos.pz - 300) / 800)) * item.baseScale / 3;
                const size = item.baseScale * pos.scale;
                projected.push({ type: 'sprite', sprite: item.sprite, px: pos.px, py: pos.py, pz: pos.pz, scale: size, alpha: alpha });
            } else if (item.type === 'line') {
                const p1 = transform(item.x1, item.y1, item.z1);
                const p2 = transform(item.x2, item.y2, item.z2);
                if (p1.pz < 10 || p2.pz < 10) continue;
                const centerZ = (p1.pz + p2.pz) / 2;
                const alpha = Math.min(0.6, Math.max(0.02, 1 - (centerZ - 400) / 1000));
                projected.push({ type: 'line', item: item, x1: p1.px, y1: p1.py, x2: p2.px, y2: p2.py, pz: centerZ, alpha: alpha, scale: (p1.scale + p2.scale) / 2 });
            }
        }

        const trackY = startY + (prog * totalHeight);
        const trackAngle = ((trackY - startY) / stepSize) * 0.035;
        const t1X = Math.cos(trackAngle) * radius;
        const t1Z = Math.sin(trackAngle) * radius;
        const p1 = transform(t1X, trackY, t1Z);
        if (p1.pz > 10) {
            projected.push({ type: 'sprite', sprite: sprBlueLarge, px: p1.px, py: p1.py, pz: p1.pz, scale: 120 * p1.scale, alpha: 1 });
            projected.push({ type: 'sprite', sprite: sprWhiteSmall, px: p1.px, py: p1.py, pz: p1.pz, scale: 40 * p1.scale, alpha: 1 });
        }
        const t2X = Math.cos(trackAngle + Math.PI) * radius;
        const t2Z = Math.sin(trackAngle + Math.PI) * radius;
        const p2 = transform(t2X, trackY, t2Z);
        if (p2.pz > 10) {
            projected.push({ type: 'sprite', sprite: sprGoldLarge, px: p2.px, py: p2.py, pz: p2.pz, scale: 120 * p2.scale, alpha: 1 });
            projected.push({ type: 'sprite', sprite: sprWhiteSmall, px: p2.px, py: p2.py, pz: p2.pz, scale: 40 * p2.scale, alpha: 1 });
        }
        projected.sort((a, b) => b.pz - a.pz);
        ctx.globalCompositeOperation = "source-over";
        for (let j = 0; j < projected.length; j++) {
            const p = projected[j];
            ctx.globalAlpha = p.alpha;
            if (p.type === 'sprite') {
                const s = p.scale;
                ctx.drawImage(p.sprite, p.px - s/2, p.py - s/2, s, s);
            } else if (p.type === 'line') {
                ctx.lineWidth = 1 * p.scale;
                ctx.strokeStyle = p.item.colorCore + (p.alpha * 0.8) + ")";
                ctx.beginPath(); ctx.moveTo(p.x1, p.y1); ctx.lineTo(p.x2, p.y2); ctx.stroke();
            }
        }
        ctx.globalAlpha = 1;
    };

    const section = canvas.closest(".about-section");
    const st = section ? ScrollTrigger.create({
      trigger: section,
      scroller: scrollerRef.current,
      start: "top 100%",
      end: "bottom 0%",
      onEnter: () => { inViewRef.current = true; },
      onLeave: () => { inViewRef.current = false; },
      onEnterBack: () => { inViewRef.current = true; },
      onLeaveBack: () => { inViewRef.current = false; },
      onUpdate: (self) => { progressRef.current = self.progress; }
    }) : null;

    if (section) {
        gsap.fromTo(canvas, 
            { opacity: 0 }, 
            { opacity: 1, duration: 2, ease: "power2.inOut", scrollTrigger: { trigger: section, scroller: scrollerRef.current, start: "top 70%" } }
        );
    }

    if (st) inViewRef.current = st.isActive;
    const tick = () => { if (inViewRef.current) draw(); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimerRef.current);
      window.removeEventListener("resize", onResize);
      if (st) st.kill();
    };
  }, []);

  return (
    <div className="dna-canvas-wrapper">
      <canvas ref={canvasRef} className="dna-canvas" />
    </div>
  );
};


/* ═══════════════════════════════════════════════════════
   CONTENT BLOCKS (ALTERNATING LAYOUT)
   ═══════════════════════════════════════════════════════ */

const BLOCKS = [
  { align: "left", icon: <Layers size={20} strokeWidth={1.5} />, accent: "#E27D60", title: "Frontend\nEngineering",
    desc: "I build rich, interactive client-side applications using React, Next.js, and modern CSS to create highly engaging user experiences.",
    tags: ["React", "JavaScript", "Animations"] },
  { align: "right", icon: <Cpu size={20} strokeWidth={1.5} />, accent: "#E8A87C", title: "Backend\nSystems",
    desc: "Building resilient front-to-back technical foundations. Tailored API systems and server infrastructure designed securely for scale.",
    tags: ["Node.js", "Express", "PostgreSQL"] },
  { align: "left", icon: <Diamond size={20} strokeWidth={1.5} />, accent: "#C38D9E", title: "Product\nDesign",
    desc: "Translating mockups into flawlessly executed code. A strong focus on accessibility, whitespace, and structural visual integrity.",
    tags: ["UI/UX", "Tailwind", "Responsive"] },
  { align: "right", icon: <Gauge size={20} strokeWidth={1.5} />, accent: "#A8A29E", title: "Web\nPerformance",
    desc: "Strict frame budgeting and optimization. Deep commitment to perfect web vitals and ensuring pristine load times across all devices.",
    tags: ["Optimization", "Web Vitals", "Lighthouse"] },
];


/* ═══════════════════════════════════════════════════════
   ASK ME BUBBLE
   ═══════════════════════════════════════════════════════ */

const AskMeBubble = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const [active, setActive] = useState(0);

  const qna = [
    { q: "What drives your passion for coding?", a: "I love the process of turning complex logic into accessible, beautiful interfaces. Solving real problems with elegant code is what got me started." },
    { q: "How do you view the relationship between design & code?", a: "They go hand-in-hand. Great engineering relies on solid aesthetics, and good design needs flawless performance to feel right to the user." },
    { q: "What does your technical stack look like?", a: "I lean into React/Next.js for front-ends, Node/Express for backend APIs, and I enjoy adding subtle animations with GSAP where appropriate." },
    { q: "Are you currently accepting new opportunities?", a: "I'm always open to discussing interesting projects or roles. Let's start a conversation." },
    { q: "How do you guarantee performance?", a: "By sticking to best practices, lazy-loading assets, monitoring Web Vitals, and avoiding unnecessary React re-renders." },
  ];

  useEffect(() => {
    if (open && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 16, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    }
  }, [open]);

  const pickQ = (i) => {
    setActive(i);
    var el = document.querySelector(".ask-answer-text");
    if (el) gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 });
  };

  return (
    <div className="ask-me-wrapper">
      <button className={"ask-me-btn " + (open ? "open" : "")} onClick={() => setOpen(function (p) { return !p; })} aria-label="Ask me anything">
        <span className="ask-ring ask-ring-1" />
        <span className="ask-ring ask-ring-2" />
        <span className="ask-inner">
          <span className="ask-icon">{open ? "\u2715" : "?"}</span>
          <span className="ask-label-text">Ask Me</span>
        </span>
      </button>
      {open && (
        <div ref={panelRef} className="ask-panel">
          <p className="ask-panel-heading">Curious? Ask away.</p>
          <div className="ask-q-list">
            {qna.map(function (item, i) {
              return <button key={i} className={"ask-q-btn " + (active === i ? "active" : "")} onClick={function () { pickQ(i); }}>{item.q}</button>;
            })}
          </div>
          <div className="ask-a-box">
            <span className="ask-a-quote">&ldquo;</span>
            <p className="ask-answer-text">{qna[active].a}</p>
          </div>
        </div>
      )}
    </div>
  );
};


/* ═══════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════ */

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s || !scrollerRef.current || !isReady) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-label", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: s, scroller: scrollerRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".about-heading-char", { y: 60, opacity: 0, stagger: 0.015, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: ".about-heading", scroller: scrollerRef.current, start: "top 78%", toggleActions: "play none none reverse" } });
      gsap.from(".about-sub", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".about-sub", scroller: scrollerRef.current, start: "top 85%", toggleActions: "play none none reverse" } });
      s.querySelectorAll(".about-block").forEach(function (b, index) {
        gsap.from(b, { 
            y: 40, 
            opacity: 0, 
            duration: 0.9, 
            ease: "power3.out", 
            scrollTrigger: { 
                trigger: b, 
                scroller: scrollerRef.current,
                start: "top 85%", 
                toggleActions: "play none none reverse" 
            } 
        });
      });
      gsap.from(".about-stat", { y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".about-stats-row", scroller: scrollerRef.current, start: "top 88%", toggleActions: "play none none reverse" } });
    }, s);
    return () => ctx.revert();
  }, [isReady]);

  const split = (text) =>
    text.split("").map((c, i) => (
      <span key={i} className="about-heading-char">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />

      <DNACanvas />

      <div className="about-content-layer">
        <header className="about-header">
          <span className="about-label">BACKGROUND & EXPERTISE</span>
          <h2 className="about-heading">
            {split("Building robust,")}
            <br />
            {split("user-centric")}
            <br />
            {split("web experiences.")}
          </h2>
          <p className="about-sub">
            I am a software developer who focuses on writing clean, accessible code. Whether I'm building a complex dashboard or a simple landing page, I prioritize performance and usability.
          </p>
        </header>

        <div className="about-blocks">
          {BLOCKS.map(function (b, i) {
            return (
              <div key={i} className={`about-block about-block--${b.align}`}>
                <div className="about-block-inner">
                  <div className="bento-bg-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${b.accent}15 0%, transparent 60%)` }} />
                  
                  <div className="bento-top-row">
                      <span className="bento-icon-wrap" style={{ color: b.accent }}>
                          {b.icon}
                      </span>
                      <span className="bento-num">{"0" + (i + 1)}</span>
                  </div>
                  
                  <div className="bento-content">
                      <h3 className="bento-title">{b.title}</h3>
                      <p className="bento-desc">{b.desc}</p>
                      
                      <div className="bento-tags">
                          {b.tags.map((tag) => (
                              <span key={tag} className="bento-tag">{tag}</span>
                          ))}
                      </div>
                  </div>
                  
                  <div className="about-block-accent-bar" style={{ "--block-accent": b.accent }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="about-ask-row">
          <AskMeBubble />
        </div>

        <div className="about-stats-row">
          {[
            { n: "3+", l: "Years Experience" },
            { n: "25+", l: "Projects Shipped" },
            { n: "10+", l: "Open Source" },
            { n: "100", l: "Lighthouse Score" },
          ].map(function (s, i) {
            return (
              <div key={i} className="about-stat">
                <span className="about-stat-num">{s.n}</span>
                <span className="about-stat-label">{s.l}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
