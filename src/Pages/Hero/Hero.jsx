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
      const entryTL = gsap.timeline({ delay: 0.3 });

      entryTL
        .from(".hero-char", {
          y: 120,
          opacity: 0,
          rotateX: 80,
          stagger: 0.025,
          duration: 1,
          ease: "power4.out",
        })
        .from(
          ".hero-sub",
          {
            y: 30,
            opacity: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-divider-line",
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1,
            ease: "expo.inOut",
          },
          "-=0.3"
        );

      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      const chars = section.querySelectorAll(".hero-char");
      chars.forEach((char, i) => {
        const randomX = (Math.random() - 0.5) * 800;
        const randomY = (Math.random() - 0.5) * 600 - 200;
        const randomRot = (Math.random() - 0.5) * 180;
        const randomScale = 0.3 + Math.random() * 0.4;

        scrollTL.to(
          char,
          {
            x: randomX,
            y: randomY,
            rotation: randomRot,
            scale: randomScale,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          i * 0.015
        );
      });

      scrollTL.to(
        ".hero-sub",
        {
          y: -200,
          x: () => (Math.random() - 0.5) * 300,
          opacity: 0,
          rotation: () => (Math.random() - 0.5) * 30,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      );

      scrollTL.to(
        ".hero-divider-line",
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );

      scrollTL.to(
        ".hero-glow",
        {
          scale: 3,
          opacity: 0,
          duration: 0.6,
          ease: "power1.in",
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const splitLine = (text) =>
    text.split("").map((c, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ backfaceVisibility: "hidden", willChange: "transform, opacity" }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-[200vh]"
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          className="hero-glow absolute w-[500px] h-[500px] rounded-full"
        />

        <AnimatedFace />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 w-full max-w-7xl mx-auto">
          <div className="max-w-[55%]">
            <div className="hero-sub flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full badge-dot" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] badge-text">
                Available for Projects &mdash; 2024
              </span>
            </div>

            <div className="mb-3">
              <h1 className="hero-title">
                {splitLine("CREATIVE")}
              </h1>
            </div>
            <div className="mb-8">
              <h1 className="hero-title">
                {splitLine("DEVELOPER")}
                <span
                  className="hero-char inline-block accent-period"
                  style={{ willChange: "transform, opacity" }}
                >
                  .
                </span>
              </h1>
            </div>

            <div className="hero-divider-line h-[1px] w-full mb-8" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="hero-sub text-sm md:text-base font-body leading-relaxed max-w-md hero-description">
                Crafting digital experiences that merge functionality with high-end aesthetics. Specialized in modern web architectures &amp; immersive animations.
              </p>
              <div className="hero-sub flex items-center gap-3 group cursor-pointer flex-shrink-0">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase scroll-text">
                  Scroll
                </span>
                <div className="relative w-8 h-14 border rounded-full flex items-start justify-center pt-2 scroll-indicator">
                  <div className="w-[3px] h-2.5 rounded-full animate-bounce scroll-dot" />
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