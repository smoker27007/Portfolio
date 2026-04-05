import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-char", {
        y: 100,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-link", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const splitText = (text) =>
    text.split("").map((c, i) => (
      <span
        key={i}
        className="contact-char inline-block"
        style={{ willChange: "transform, opacity" }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-6xl md:text-7xl font-display font-bold mb-8 leading-tight">
          {splitText("LET'S WORK")}
          <br />
          {splitText("TOGETHER")}
        </h2>

        <p
          className="text-lg md:text-xl mb-12 leading-relaxed"
          style={{ color: "var(--text-light-secondary)", maxWidth: "600px", margin: "0 auto 48px" }}
        >
          Whether you need a website redesign, brand strategy, or full digital
          transformation, I'm here to help bring your vision to life.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
          <button className="cta-button-dark flex items-center gap-2">
            START A PROJECT
            <span>→</span>
          </button>
          <button className="cta-button-dark border-0 text-center justify-center">
            SCHEDULE A CALL
          </button>
        </div>

        <div className="space-y-6 mb-24">
          <a href="mailto:hello@gowtham.dev" className="contact-link block text-lg">
            hello@gowtham.dev
          </a>
          <div className="flex items-center justify-center gap-8 text-sm">
            <a href="#" className="contact-link">
              LinkedIn
            </a>
            <span style={{ color: "var(--border-light)" }}>•</span>
            <a href="#" className="contact-link">
              Twitter
            </a>
            <span style={{ color: "var(--border-light)" }}>•</span>
            <a href="#" className="contact-link">
              GitHub
            </a>
            <span style={{ color: "var(--border-light)" }}>•</span>
            <a href="#" className="contact-link">
              Dribbble
            </a>
          </div>
        </div>

        <div
          className="pt-12 border-t"
          style={{ borderColor: "var(--border-light)" }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            © 2024 GOWTHAM C D. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;