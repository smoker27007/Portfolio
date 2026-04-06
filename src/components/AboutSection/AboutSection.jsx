import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-label", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-heading-char", {
        y: 80,
        opacity: 0,
        stagger: 0.025,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-stat", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = section.querySelectorAll(".about-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -20 - i * 10,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const splitText = (text) =>
    text.split("").map((c, i) => (
      <span
        key={i}
        className="about-heading-char"
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
        }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  const aboutCards = [
    {
      title: "Design-Driven\nDevelopment",
      desc: "I craft pixel-perfect interfaces that merge functionality with high-end aesthetics. Every component is built with meticulous care — from route planning to production deployment.",
    },
    {
      title: "Performance\n& Precision",
      desc: "Specialized in modern web architectures, GSAP animations, and Three.js experiences. I prioritize smooth 60fps interactions and lighthouse-optimized builds across all devices.",
    },
    {
      title: "Full-Stack\nCapability",
      desc: "From React & Next.js frontends to Node.js & database architectures — I handle the complete pipeline. APIs, authentication, deployment — all under one roof.",
    },
    {
      title: "Global Reach,\nLocal Touch",
      desc: "I've worked with clients across industries — building scalable SaaS platforms, e-commerce solutions, and interactive portfolios that communicate globally.",
    },
  ];

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-bg-gradient" />

      <div className="about-container">
        <div className="about-header">
          <span className="about-label">ABOUT</span>
          <h2 className="about-heading">
            {splitText("Elevating digital")}
            <br />
            {splitText("experiences beyond")}
            <br />
            {splitText("boundaries.")}
          </h2>
        </div>

        <div className="about-grid">
          {aboutCards.map((card, i) => (
            <div key={i} className="about-card">
              <div className="about-card-divider" />
              <h3 className="about-card-title">{card.title}</h3>
              <p className="about-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-number">3+</span>
            <span className="about-stat-label">Years Experience</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-number">25+</span>
            <span className="about-stat-label">Projects Delivered</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-number">15+</span>
            <span className="about-stat-label">Happy Clients</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-number">∞</span>
            <span className="about-stat-label">Lines of Code</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;