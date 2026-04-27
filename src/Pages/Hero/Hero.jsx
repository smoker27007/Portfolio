import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedFace from "../../components/AnimatedFace/AnimatedFace";
import "./Hero.css";
import avatar1 from "../../assets/heroBG.png";
import { WorkspaceContext } from "../../components/Workspace/WorkspaceContext";

gsap.registerPlugin(ScrollTrigger);

const CRACK_ORIGINS = Array.from({ length: 12 }, (_, i) => ({
  x: 0.05 + (i % 4) * 0.3 + Math.random() * 0.1,
  y: 0.1 + Math.floor(i / 4) * 0.4 + Math.random() * 0.15,
}));

const Hero = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !scrollerRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      const entryTL = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-char", { opacity: 0, y: 100, scale: 0.6 });
      gsap.set(".hero-badge", { opacity: 0, y: -40, scale: 0.8 });
      gsap.set(".hero-divider-line", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".hero-sub, .hero-role-tag", { opacity: 0, y: 50 });
      gsap.set(".hero-glow", { opacity: 0 });

      entryTL
        .to(".hero-glow", { opacity: 1, duration: 2.5, stagger: 0.3, ease: "power2.out" }, 0)
        .to(".hero-badge", { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 0.2)
        .to(".hero-char", { opacity: 1, y: 0, scale: 1, stagger: { amount: 1, from: "start" }, duration: 2, ease: "power3.out" }, 0.4)
        .to(".hero-divider-line", { scaleX: 1, duration: 1.8, ease: "power4.inOut" }, 1)
        .to(".hero-role-tag", { opacity: 1, y: 0, stagger: 0.12, duration: 1.2, ease: "back.out(1.8)" }, 1.2)
        .to(".hero-sub", { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, 1.4);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canUseHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      let animationFrameId = null;
      let needsMaskUpdate = false;
      let mouseX = section.clientWidth / 2;
      let mouseY = section.clientHeight / 2;
      const spotlightRadius = 130;

      const renderMask = () => {
        animationFrameId = null;
        if (!bgRef.current || !needsMaskUpdate) return;

        const maskGradient = `radial-gradient(circle ${spotlightRadius}px at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)`;
        bgRef.current.style.webkitMaskImage = maskGradient;
        bgRef.current.style.maskImage = maskGradient;
        needsMaskUpdate = false;
      };

      const scheduleMaskUpdate = () => {
        needsMaskUpdate = true;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(renderMask);
        }
      };

      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        scheduleMaskUpdate();
      };

      const handleMouseLeave = () => {
        if (!bgRef.current) return;
        const fullHideMask = "radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)";
        bgRef.current.style.webkitMaskImage = fullHideMask;
        bgRef.current.style.maskImage = fullHideMask;
      };

      if (!prefersReducedMotion && canUseHover) {
        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);
      }

      const chars = section.querySelectorAll(".hero-char");
      const charListeners = [];
      if (canUseHover) {
        chars.forEach((char) => {
          const onEnter = () => gsap.to(char, { color: "var(--accent)", duration: 0.2, overwrite: "auto" });
          const onLeave = () => gsap.to(char, { clearProps: "color", duration: 0.4, overwrite: "auto" });
          char.addEventListener("mouseenter", onEnter);
          char.addEventListener("mouseleave", onLeave);
          charListeners.push({ char, onEnter, onLeave });
        });
      }

      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: scrollerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Compute viewport based on the IDE editor container
      const getViewport = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return { vw: window.innerWidth, vh: window.innerHeight };
        const rect = scroller.getBoundingClientRect();
        return { vw: rect.width, vh: rect.height };
      };

      // Assign each char a glass-shard burst vector based on nearest crack origin
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const { vw, vh } = getViewport();

        // Normalised position of this character on the screen
        const nx = (rect.left + rect.width / 2) / vw;
        const ny = (rect.top + rect.height / 2) / vh;

        let bestDist = Infinity, nearest = CRACK_ORIGINS[0];
        for (const c of CRACK_ORIGINS) {
          const d = (nx - c.x) ** 2 + (ny - c.y) ** 2;
          if (d < bestDist) { bestDist = d; nearest = c; }
        }

        const baseAngle = Math.atan2(ny - nearest.y, nx - nearest.x);
        const jitter = (Math.random() - 0.5) * 0.6;
        const burstAngle = baseAngle + jitter;

        const diagDist = Math.sqrt(vw * vw + vh * vh);
        const flyDist = diagDist * (1.1 + Math.random() * 0.5);

        const endX = Math.cos(burstAngle) * flyDist;
        const endY = Math.sin(burstAngle) * flyDist;

        const endRot = (Math.random() - 0.5) * 720;

        const peakScale = 1.4 + Math.random() * 0.8;

        scrollTL.fromTo(
          char,
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
          {
            x: endX, y: endY,
            scale: peakScale,
            rotation: endRot,
            opacity: 0,
            duration: 1.5,
            ease: "power3.in",  
            immediateRender: false,
          },
          0
        );
      });

      scrollTL.fromTo(".hero-badge",
        { y: 0, x: 0, rotation: 0, opacity: 1, scale: 1 },
        { y: -window.innerHeight * 0.6, x: -window.innerWidth * 0.3,
          rotation: -25, opacity: 0, scale: 0.4,
          duration: 1, ease: "power3.in", immediateRender: false }, 0);

      scrollTL.fromTo(".hero-divider-line",
        { scaleX: 1, opacity: 1 },
        { scaleX: 1.4, opacity: 0, duration: 0.6, ease: "power2.in", immediateRender: false }, 0);

      const roleTags = section.querySelectorAll(".hero-role-tag");
      roleTags.forEach((tag, i) => {
        const { vw, vh } = getViewport();
        const diagDist = Math.sqrt(vw * vw + vh * vh);
        const angle = (Math.PI * 0.3) + i * (Math.PI / (roleTags.length + 1));
        const dist = diagDist * (0.7 + Math.random() * 0.4);
        scrollTL.fromTo(tag,
          { y: 0, x: 0, rotation: 0, opacity: 1, scale: 1 },
          {
            y: Math.sin(angle) * dist,
            x: Math.cos(angle) * dist,
            rotation: (Math.random() - 0.5) * 180,
            opacity: 0, scale: 0.2,
            duration: 1.2, ease: "power3.in", immediateRender: false
          }, 0);
      });

      const subItems = section.querySelectorAll(".hero-sub");
      subItems.forEach((sub, i) => {
        scrollTL.fromTo(sub,
          { y: 0, opacity: 1, scale: 1 },
          { y: window.innerHeight * 0.4, opacity: 0, scale: 0.8,
            duration: 1, ease: "power3.in", immediateRender: false }, i * 0.08);
      });

      const glows = section.querySelectorAll(".hero-glow");
      glows.forEach((glow) => {
        scrollTL.fromTo(glow,
          { opacity: 1 },
          { opacity: 0, duration: 0.8, ease: "power2.in", immediateRender: false }, 0);
      });

      return () => {
        if (!prefersReducedMotion && canUseHover) {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseleave", handleMouseLeave);
          charListeners.forEach(({ char, onEnter, onLeave }) => {
            char.removeEventListener("mouseenter", onEnter);
            char.removeEventListener("mouseleave", onLeave);
          });
        }
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, section);

    return () => ctx.revert();
  }, [isReady, scrollerRef]);

  const splitLine = (text, isOutline = false) =>
    text.split("").map((c, i) => (
      <span key={i} className={`hero-char ${isOutline ? "hero-char-outline" : ""}`}>
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      <div className="hero-grid-base"></div>
      <div 
        ref={bgRef} 
        className="hero-bg"
        style={{ backgroundImage: `url(${avatar1})` }}
      ></div>
      <div className="hero-sticky">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />

        <AnimatedFace />

        <div className="hero-content">
          <div className="hero-content-inner">
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              <span className="hero-badge-text">
                Available for Projects &mdash; 2025
              </span>
            </div>

            <div className="hero-title-wrapper">
              <div className="hero-title-line">
                <h1 className="hero-title">{splitLine("CREATIVE", true)}</h1>
              </div>
              <div className="hero-title-line">
                <h1 className="hero-title">
                  {splitLine("DEVELOPER")}
                  <span className="hero-char accent-period">.</span>
                </h1>
              </div>
            </div>

            <div className="hero-divider-line" />

            <div className="hero-roles">
              <span className="hero-role-tag">UI/UX Design</span>
              <span className="hero-role-tag">Web Development</span>
              <span className="hero-role-tag">GSAP Animation</span>
            </div>

            <div className="hero-bottom">
              <p className="hero-sub hero-description">
                Crafting robust digital experiences that merge strong engineering with 
                clean, accessible design. Specialized in front-end development &amp; 
                modern web architecture.
              </p>
              <div className="hero-sub hero-scroll-cta">
                <span className="hero-scroll-text">Scroll</span>
                <div className="hero-scroll-indicator">
                  <div className="hero-scroll-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;