import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScroll.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ children, onProgressUpdate }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const triggerEl = triggerRef.current;
    const containerEl = containerRef.current;
    
    if (!sectionEl || !triggerEl || !containerEl) return;

    // Animation context
    const ctx = gsap.context(() => {
      // Title entrance animation
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll(".works-char"), {
          y: 100,
          opacity: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Main horizontal scroll animation
      let lastReportedProgress = 0;
      const tween = gsap.fromTo(
        containerEl,
        { x: 0 },
        {
          x: () => -(containerEl.scrollWidth - window.innerWidth),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: () => `+=${containerEl.scrollWidth - window.innerWidth}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              setCurrentProgress(self.progress);
              if (Math.abs(self.progress - lastReportedProgress) > 0.01) {
                lastReportedProgress = self.progress;
                onProgressUpdate?.(self.progress);
              }
            },
          },
        }
      );

      return () => {
        tween.kill();
      };
    });

    return () => {
      ctx.revert();
    };
  }, [onProgressUpdate]);

  const splitTitle = (text) =>
    text.split("").map((c, i) => (
      <span key={i} className="works-char inline-block">
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <>
      <div
        ref={titleRef}
        className="h-screen flex flex-col items-center justify-center relative portfolio-title-section"
      >
        <span className="works-char text-[20vw] font-bold absolute opacity-[0.04] select-none pointer-events-none section-number">
          02
        </span>

        <div className="relative z-10 text-center">
          <p className="works-char text-xs font-mono uppercase tracking-[0.4em] mb-8 section-label">
            Portfolio
          </p>
          <h2 className="text-[14vw] md:text-[10vw] font-bold leading-[0.9] tracking-tight">
            {splitTitle("SELECTED")}
          </h2>
          <h2 className="text-[14vw] md:text-[10vw] font-bold leading-[0.9] tracking-tight">
            {splitTitle("WORKS")}
            <span className="works-char inline-block accent-dot">.</span>
          </h2>
          <div className="works-char mx-auto mt-10 h-[1px] w-24 divider-line" />
          
          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <p className="text-xs uppercase tracking-widest opacity-50 font-mono">Scroll to explore</p>
            <div className="scroll-hint-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="scroll-section-outer">
        <div ref={triggerRef}>
          <div ref={sectionRef} className="scroll-section-inner h-screen">
            <div ref={containerRef} className="scroll-container-wrapper">
              {children}
            </div>
          </div>
        </div>
        <div
          ref={progressRef}
          className="scroll-progress"
          style={{ width: "100%", transform: "scaleX(0)" }}
        />
      </section>
    </>
  );
};

export default HorizontalScroll;