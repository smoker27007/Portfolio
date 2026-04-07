import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const DNACanvas = () => {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = 0, ch = 0, lastProg = -1;
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
      lastProg = -1;
    };
    resize();
    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); };
    window.addEventListener("resize", onResize);

    const SP = 64;
    const makeGlow = (r, g, b) => {
      const c = document.createElement("canvas");
      c.width = SP; c.height = SP;
      const gc = c.getContext("2d");
      const h = SP / 2;
      const gr = gc.createRadialGradient(h, h, 0, h, h, h);
      gr.addColorStop(0, "rgba(" + r + "," + g + "," + b + ",1)");
      gr.addColorStop(0.1, "rgba(" + r + "," + g + "," + b + ",0.85)");
      gr.addColorStop(0.3, "rgba(" + r + "," + g + "," + b + ",0.3)");
      gr.addColorStop(0.55, "rgba(" + r + "," + g + "," + b + ",0.08)");
      gr.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
      gc.fillStyle = gr;
      gc.fillRect(0, 0, SP, SP);
      return c;
    };
    const sprBlue = makeGlow(74, 158, 255);
    const sprGold = makeGlow(201, 169, 110);

    const N = 40, DRIFT = 0.18, CYCLES = 2.5, RAD = 0.04, TWISTS = 12, MY = 0.03;

    const AMB = [];
    for (let ai = 0; ai < 45; ai++) {
      AMB.push({ x: Math.random(), y: Math.random(), s: 0.4 + Math.random() * 1.2, a: 0.03 + Math.random() * 0.08, ph: Math.random() * Math.PI * 2 });
    }

    const draw = () => {
      if (!cw || !ch) return;
      ctx.clearRect(0, 0, cw, ch);
      const prog = progressRef.current;
      const vis = Math.max(2, Math.floor(N * prog));
      const dp = DRIFT * cw, rp = RAD * cw, cx = cw / 2;
      const sy = ch * MY, th = ch * (1 - MY * 2);

      const sA = [], sB = [];
      for (let i = 0; i < vis; i++) {
        const t = i / N, y = sy + t * th;
        const dr = cx + Math.sin(t * Math.PI * 2 * CYCLES) * dp;
        const ph = t * Math.PI * 2 * TWISTS;
        const dA = (Math.sin(ph) + 1) / 2, dB = (Math.sin(ph + Math.PI) + 1) / 2;
        sA.push({ x: dr + Math.cos(ph) * rp, y, d: dA, sz: 2 + dA * 4, i });
        sB.push({ x: dr + Math.cos(ph + Math.PI) * rp, y, d: dB, sz: 2 + dB * 4, i });
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.lineWidth = 0.8;
      if (sA.length >= 2) {
        ctx.beginPath(); ctx.moveTo(sA[0].x, sA[0].y);
        for (let k = 1; k < sA.length; k++) ctx.lineTo(sA[k].x, sA[k].y);
        ctx.strokeStyle = "rgba(74,158,255,0.2)"; ctx.stroke();
      }
      if (sB.length >= 2) {
        ctx.beginPath(); ctx.moveTo(sB[0].x, sB[0].y);
        for (let k = 1; k < sB.length; k++) ctx.lineTo(sB[k].x, sB[k].y);
        ctx.strokeStyle = "rgba(201,169,110,0.15)"; ctx.stroke();
      }

      ctx.lineWidth = 0.5; ctx.setLineDash([2, 3]);
      for (let ri = 0; ri < vis; ri += 3) {
        const ra = sA[ri], rb = sB[ri];
        if (!ra || !rb) continue;
        ctx.strokeStyle = "rgba(255,255,255," + (0.03 + Math.min(ra.d, rb.d) * 0.06) + ")";
        ctx.beginPath(); ctx.moveTo(ra.x, ra.y); ctx.lineTo(rb.x, rb.y); ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.lineWidth = 0.4;
      const allN = [];
      for (let ni = 0; ni < sA.length; ni++) allN.push({ x: sA[ni].x, y: sA[ni].y, d: sA[ni].d, s: 0, idx: ni });
      for (let nj = 0; nj < sB.length; nj++) allN.push({ x: sB[nj].x, y: sB[nj].y, d: sB[nj].d, s: 1, idx: nj });
      const maxCD = 55 + cw * 0.04;
      for (let ci = 0; ci < allN.length; ci++) {
        const ca = allN[ci];
        for (let cj = ci + 1; cj < Math.min(ci + 8, allN.length); cj++) {
          const cb = allN[cj];
          if (ca.s === cb.s && Math.abs(ca.idx - cb.idx) <= 1) continue;
          const cdx = ca.x - cb.x, cdy = ca.y - cb.y, cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < maxCD) {
            ctx.strokeStyle = "rgba(74,158,255," + ((1 - cdist / maxCD) * 0.1 * Math.min(ca.d, cb.d)) + ")";
            ctx.beginPath(); ctx.moveTo(ca.x, ca.y); ctx.lineTo(cb.x, cb.y); ctx.stroke();
          }
        }
      }

      ctx.globalCompositeOperation = "lighter";
      const maxDrawY = sy + (vis / N) * th;
      for (let pi = 0; pi < AMB.length; pi++) {
        const p = AMB[pi], py = p.y * ch;
        if (py > maxDrawY) continue;
        const px = p.x * cw + Math.sin(prog * Math.PI * 3 + p.ph) * 12;
        ctx.globalAlpha = p.a * Math.min(1, prog * 3);
        ctx.drawImage(sprBlue, px - 5, py - 5, 10, 10);
      }

      const sorted = [];
      for (let si = 0; si < sA.length; si++) sorted.push({ x: sA[si].x, y: sA[si].y, d: sA[si].d, sz: sA[si].sz, isBlue: true });
      for (let sj = 0; sj < sB.length; sj++) sorted.push({ x: sB[sj].x, y: sB[sj].y, d: sB[sj].d, sz: sB[sj].sz, isBlue: false });
      sorted.sort((a, b) => a.d - b.d);

      for (let gi = 0; gi < sorted.length; gi++) {
        const gn = sorted[gi], gs = gn.sz * 5.5;
        ctx.globalAlpha = (0.1 + gn.d * 0.55) * 0.65;
        ctx.drawImage(gn.isBlue ? sprBlue : sprGold, gn.x - gs / 2, gn.y - gs / 2, gs, gs);
      }

      ctx.globalCompositeOperation = "source-over";
      for (let fi = 0; fi < sorted.length; fi++) {
        const fn = sorted[fi], cr = fn.sz * 0.35;
        ctx.globalAlpha = 0.15 + fn.d * 0.75;
        ctx.fillStyle = fn.isBlue ? "rgba(140,200,255,1)" : "rgba(230,210,170,1)";
        ctx.beginPath(); ctx.arc(fn.x, fn.y, cr, 0, Math.PI * 2); ctx.fill();
        if (fn.d > 0.45) {
          ctx.globalAlpha = (fn.d - 0.45) * 0.9;
          ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(fn.x, fn.y, cr * 0.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const section = canvas.closest(".about-section");
    const st = section ? ScrollTrigger.create({
      trigger: section, start: "top 70%", end: "bottom 20%",
      onUpdate: (self) => { progressRef.current = self.progress; },
    }) : null;

    const tick = () => {
      if (progressRef.current !== lastProg) { lastProg = progressRef.current; draw(); }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (st) st.kill();
    };
  }, []);

  return <canvas ref={canvasRef} className="dna-canvas" />;
};

const BLOCKS = [
  { align: "left", icon: "\u25C8", accent: "#4A9EFF", title: "Design-Driven\nDevelopment", desc: "Pixel-perfect interfaces merging functionality with high-end aesthetics.", tags: ["UI/UX", "Figma", "Motion Design"] },
  { align: "right", icon: "\u26A1", accent: "#C9A96E", title: "Performance\n& Precision", desc: "GSAP animations, Three.js experiences, and lighthouse-optimized builds. Smooth 60fps.", tags: ["GSAP", "Three.js", "Lighthouse"] },
  { align: "left", icon: "\u221E", accent: "#E8724A", title: "Full-Stack\nCapability", desc: "React & Next.js frontends to Node.js APIs and databases \u2014 complete pipeline.", tags: ["React", "Node.js", "MongoDB"] },
  { align: "right", icon: "\u25CE", accent: "#10B981", title: "Creative\nProblem Solving", desc: "Scalable SaaS, interactive portfolios, and e-commerce \u2014 bespoke approach.", tags: ["SaaS", "E-commerce", "Strategy"] },
];

const AskMeBubble = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const [active, setActive] = useState(0);
  const qna = [
    { q: "How do you approach animation?", a: "Animation as storytelling \u2014 every motion carries intent." },
    { q: "What is your design philosophy?", a: "Design-driven development: great software is both beautiful and functional." },
    { q: "Which tech stack do you prefer?", a: "React + Vite front-end, Node/Express back-end, GSAP/Three.js for visuals." },
    { q: "Are you open to freelance?", a: "Absolutely! Selective projects for real impact." },
    { q: "How do you handle performance?", a: "60fps animations, lazy loading, lighthouse > 90." },
  ];
  useEffect(() => {
    if (open && panelRef.current) gsap.fromTo(panelRef.current, { opacity: 0, y: 16, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
  }, [open]);
  const pickQ = (i) => { setActive(i); const el = document.querySelector(".ask-answer-text"); if (el) gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }); };
  return (
    <div className="ask-me-wrapper">
      <button className={"ask-me-btn " + (open ? "open" : "")} onClick={() => setOpen((p) => !p)} aria-label="Ask me anything">
        <span className="ask-ring ask-ring-1" /><span className="ask-ring ask-ring-2" />
        <span className="ask-inner"><span className="ask-icon">{open ? "\u2715" : "?"}</span><span className="ask-label-text">Ask Me</span></span>
      </button>
      {open && (
        <div ref={panelRef} className="ask-panel">
          <p className="ask-panel-heading">Curious? Ask away.</p>
          <div className="ask-q-list">{qna.map((item, i) => (<button key={i} className={"ask-q-btn " + (active === i ? "active" : "")} onClick={() => pickQ(i)}>{item.q}</button>))}</div>
          <div className="ask-a-box"><span className="ask-a-quote">&ldquo;</span><p className="ask-answer-text">{qna[active].a}</p></div>
        </div>
      )}
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const s = sectionRef.current; if (!s) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-label", { y: 20, opacity: 0, duration: 0.7, scrollTrigger: { trigger: s, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".about-heading-char", { y: 60, opacity: 0, stagger: 0.015, duration: 0.8, scrollTrigger: { trigger: ".about-heading", start: "top 78%", toggleActions: "play none none reverse" } });
      gsap.from(".about-sub", { y: 20, opacity: 0, duration: 0.7, scrollTrigger: { trigger: ".about-sub", start: "top 85%", toggleActions: "play none none reverse" } });
      s.querySelectorAll(".about-block").forEach((b) => {
        const left = b.classList.contains("about-block--left");
        gsap.from(b, { x: left ? -60 : 60, opacity: 0, duration: 0.8, scrollTrigger: { trigger: b, start: "top 82%", toggleActions: "play none none reverse" } });
      });
      gsap.from(".about-stat", { y: 30, opacity: 0, stagger: 0.08, duration: 0.6, scrollTrigger: { trigger: ".about-stats-row", start: "top 88%", toggleActions: "play none none reverse" } });
    }, s);
    return () => ctx.revert();
  }, []);
  const split = (text) => text.split("").map((c, i) => (<span key={i} className="about-heading-char">{c === " " ? "\u00A0" : c}</span>));
  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-glow about-glow-1" /><div className="about-glow about-glow-2" />
      <DNACanvas />
      <div className="about-content-layer">
        <header className="about-header">
          <span className="about-label">ABOUT</span>
          <h2 className="about-heading">{split("Elevating digital")}<br />{split("experiences beyond")}<br />{split("boundaries.")}</h2>
          <p className="about-sub">A creative developer obsessed with building beautiful, fast, and thoughtful digital products.</p>
        </header>
        <div className="about-blocks">{BLOCKS.map((b, i) => (
          <div key={i} className={"about-block about-block--" + b.align}>
            <div className="about-block-inner" style={{ "--block-accent": b.accent }}>
              <div className="about-block-icon-wrap"><span className="about-block-icon">{b.icon}</span><span className="about-block-num">{"0" + (i + 1)}</span></div>
              <h3 className="about-block-title">{b.title}</h3><p className="about-block-desc">{b.desc}</p>
              <div className="about-block-tags">{b.tags.map((tag) => (<span key={tag} className="about-block-tag">{tag}</span>))}</div>
              <div className="about-block-accent-bar" />
            </div>
          </div>
        ))}</div>
        <div className="about-ask-row"><AskMeBubble /></div>
        <div className="about-stats-row">{[{ n: "3+", l: "Years Experience" }, { n: "25+", l: "Projects Delivered" }, { n: "15+", l: "Happy Clients" }, { n: "\u221E", l: "Lines of Code" }].map((s, i) => (
          <div key={i} className="about-stat"><span className="about-stat-num">{s.n}</span><span className="about-stat-label">{s.l}</span></div>
        ))}</div>
      </div>
    </section>
  );
};

export default AboutSection;