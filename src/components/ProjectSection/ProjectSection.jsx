import {useEffect,useRef} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectSection.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({
  number,
  total,
  title,
  category,
  role,
  image,
  accentColor,
  year,
  badge,
  onExplore,
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const buttonRef = useRef(null);
  const isFirstRef = useRef(number === "01");
  const isLastRef = useRef(number === total);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Simple, clean entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });
      // Staggered entrance for all elements
      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          contentRef.current?.querySelectorAll(".project-title"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12 },
          0.1
        )
        .fromTo(
          contentRef.current?.querySelectorAll(".project-meta"),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.7 },
          0.3
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9 },
          0.2
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.5
        );

        

      // Subtle mouse parallax on hover
      const handleMouseMove = (e) => {
        if (!sectionRef.current || !imageRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(imageRef.current, {
          x: x * 15,
          y: y * 15,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      sectionRef.current.addEventListener("mousemove", handleMouseMove);
      sectionRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
        sectionRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [number]);


  return(
    <div
      ref={sectionRef}
      className="project-section"
      style={{
        "--accent-color": accentColor,
      }}
    >
      {/* Background gradient */}
      <div
        className="project-section-bg"
        style={{
          background: `linear-gradient(135deg, rgba(12, 24, 33, 0.95), rgba(19, 35, 48, 0.95)), radial-gradient(circle at 80% 50%, ${accentColor}08, transparent 50%)`,
        }}
      />

      {/* Project number */}
      <div ref={numberRef} className="project-number">
        <span style={{ color: accentColor }}>
          {number}
          <span className="project-total"> / {total}</span>
        </span>
      </div>

      {/* Main content container */}
      <div className="project-content-wrapper">
        {/* Left content section */}
        <div ref={contentRef} className="project-content">
          <div className="project-title-group">
            <h3 className="project-title">{title.split("\n")[0]}</h3>
              {badge && (
                <div ref={badgeRef} className="project-badge">
                  <span className="project-badge-dot"></span>
                  {badge.toUpperCase()}
                  </div>
              )}
              {title.includes("\n") && (
                <h3 className="project-title">{title.split("\n")[1]}</h3>)}
          </div>

          {/* Meta information */}
          <div className="project-meta-group">
            <div className="project-meta">
              <p className="meta-label">CATEGORY</p>
              <p className="meta-value">{category}</p>
            </div>
            <div className="project-meta">
              <p className="meta-label">MY ROLE</p>
              <p className="meta-value">{role}</p>
            </div>
          </div>

          {/* CTA Button */}
          <button ref={buttonRef} className="project-cta-button">
            <span className="button-text">EXPLORE PROJECT</span>
            <span className="button-arrow">→</span>
            <div className="button-background" style={{ background: accentColor }} />
          </button>
          <button ref={buttonRef} className="project-cta-button"></button>
          <button ref={buttonRef} className="project-cta-button"></button>
        </div>

        {/* Right image section */}
        <div className="project-image-section">
          <div
            className="project-divider"
            style={{ borderLeftColor: `${accentColor}40` }}
          />

          <div className="project-image-container">
            <div
              className="project-image-frame"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
                borderColor: `${accentColor}50`,
              }}
            >
              {image && (
                <>
                  <img
                    ref={imageRef}
                    src={image}
                    alt={title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div
                    className="image-overlay"
                    style={{ background: `radial-gradient(circle at center, transparent 0%, ${accentColor}10 100%)` }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Accent indicator */}
          <div
            className="project-accent-dot"
            style={{ background: accentColor }}
          />
        </div>
      </div>

      {/* Scroll indicator (optional) */}
      <div className="project-scroll-indicator">
        <span style={{ color: accentColor }}>SCROLL</span>
      </div>
    </div>
  );
};

export default ProjectSection;