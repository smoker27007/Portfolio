import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedFace from "../../components/AnimatedFace/AnimatedFace";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const entryTL = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-char", { opacity: 0, y: 100, scale: 0.6 });
      gsap.set(".hero-badge", { opacity: 0, y: -40, scale: 0.8 });
      gsap.set(".hero-divider-line", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".hero-sub, .hero-role-tag", { opacity: 0, y: 50 });
      gsap.set(".hero-glow", { opacity: 0 });

      entryTL.to(".hero-glow", { opacity: 1, duration: 2.5, stagger: 0.3, ease: "power2.out" }, 0)
        .to(".hero-badge", { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 0.2)
        .to(".hero-char", { opacity: 1, y: 0, scale: 1, stagger: { amount: 1, from: "start" }, duration: 2, ease: "power3.out" }, 0.4)
        .to(".hero-divider-line", { scaleX: 1, duration: 1.8, ease: "power4.inOut" }, 1)
        .to(".hero-role-tag", { opacity: 1, y: 0, stagger: 0.12, duration: 1.2, ease: "back.out(1.8)" }, 1.2)
        .to(".hero-sub", { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }, 1.4);

      const chars = section.querySelectorAll(".hero-char");
      chars.forEach((char) => {
        char.addEventListener("mouseenter", () => {
          gsap.to(char, { color: "var(--accent)", duration: 0.2, overwrite: "auto" });
        });
        char.addEventListener("mouseleave", () => {
          gsap.to(char, { clearProps: "color", duration: 0.4, overwrite: "auto" });
        });
      });

      const xToInner = gsap.quickTo(".hero-content-inner", "x", { duration: 0.8, ease: "power3" });
      const yToInner = gsap.quickTo(".hero-content-inner", "y", { duration: 0.8, ease: "power3" });
      const xToLine1 = gsap.quickTo(".hero-title-line:nth-child(1)", "x", { duration: 1.2, ease: "power3" });
      const xToLine2 = gsap.quickTo(".hero-title-line:nth-child(2)", "x", { duration: 1.2, ease: "power3" });

      const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5);
        const yPos = (e.clientY / window.innerHeight - 0.5);

        xToInner(xPos * 20);
        yToInner(yPos * 20);
        xToLine1(xPos * 40);
        xToLine2(xPos * -30);
      };
      
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        },
      });

      chars.forEach((char) => {
        const endX = (Math.random() - 0.5) * 1600;
        const endY = (Math.random() - 0.5) * 1200;
        const endScale = Math.random() * 2 + 1; 
        const endRot = (Math.random() - 0.5) * 360;

        scrollTL.fromTo(char,
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
          { x: endX, y: endY, scale: endScale, rotation: endRot, opacity: 0, duration: 1.5, ease: "power2.inOut", immediateRender: false },
          0
        );
      });

      scrollTL.fromTo(".hero-badge", 
        { y: 0, x: 0, rotation: 0, opacity: 1, scale: 1 },
        { y: -200, x: -100, rotation: -20, opacity: 0, scale: 0.5, duration: 1, ease: "power2.inOut", immediateRender: false }, 0);
        
      scrollTL.fromTo(".hero-divider-line", 
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, duration: 0.8, ease: "power2.inOut", immediateRender: false }, 0);
      
      const roleTags = section.querySelectorAll(".hero-role-tag");
      roleTags.forEach((tag, i) => {
        const endY = 100 + Math.random() * 100;
        const endX = (i - 1) * 300;
        const endRotZ = (Math.random() - 0.5) * 90;
        scrollTL.fromTo(tag,
          { y: 0, x: 0, rotation: 0, opacity: 1, scale: 1 },
          { y: endY, x: endX, rotation: endRotZ, opacity: 0, scale: 0.3, duration: 1.2, ease: "power3.in", immediateRender: false }, 0);
      });

      const subItems = section.querySelectorAll(".hero-sub");
      subItems.forEach((sub, i) => {
        scrollTL.fromTo(sub,
          { y: 0, opacity: 1, scale: 1 },
          { y: 150, opacity: 0, scale: 0.8, duration: 1, ease: "power2.in", immediateRender: false }, (i * 0.1));
      });
      
      const glows = section.querySelectorAll(".hero-glow");
      glows.forEach((glow) => {
        scrollTL.fromTo(glow,
           { opacity: 1 },
           { opacity: 0, duration: 1.5, ease: "power2.inOut", immediateRender: false }, 0);
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const splitLine = (text) =>
    text.split("").map((c, i) => (
      <span
        key={i}
        className="hero-char"
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      id="home"
    >
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
                Available for Projects &mdash; 2024
              </span>
            </div>

            <div className="hero-title-wrapper">
              <div className="hero-title-line">
                <h1 className="hero-title">
                  {splitLine("CREATIVE")}
                </h1>
              </div>
              <div className="hero-title-line">
                <h1 className="hero-title">
                  {splitLine("DEVELOPER")}
                  <span
                    className="hero-char accent-period"
                  >
                    .
                  </span>
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
                Crafting digital experiences that merge functionality with high-end aesthetics. Specialized in modern web architectures &amp; immersive animations.
              </p>
              <div className="hero-sub hero-scroll-cta">
                <span className="hero-scroll-text">
                  Scroll
                </span>
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