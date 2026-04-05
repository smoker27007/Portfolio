import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScroll.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ children, onProgressUpdate }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const triggerEl = triggerRef.current;
    if (!sectionEl || !triggerEl) return;

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

    let lastReportedProgress = 0;
    const tween = gsap.fromTo(
      sectionEl,
      { x: 0 },
      {
        x: () => -(sectionEl.scrollWidth - window.innerWidth),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: () => `+=${sectionEl.scrollWidth - window.innerWidth}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
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
        className="h-screen flex flex-col items-center justify-center relative"
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
        </div>
      </div>

      <section className="scroll-section-outer">
        <div ref={triggerRef}>
          <div ref={sectionRef} className="scroll-section-inner h-screen">
            {children}
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