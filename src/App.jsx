import { useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./Pages/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import HorizontalScroll from "./components/HorizontalScroll/HorizontalScroll";
import ProjectSection from "./components/ProjectSection/ProjectSection";
import ContactSection from "./components/ContactSection/ContactSection";

const PROJECTS = [
  {
    number: "01",
    total: "04",
    title: "TIDAL\nMUSIC",
    category: "Marketing UX & Design System",
    role: "Design Direction",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    accentColor: "#7B61FF",
  },
  {
    number: "02",
    total: "04",
    title: "FIRST\nMET",
    category: "UX Redesign & Optimization",
    role: "Lead UI/UX",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    accentColor: "#FF6B4A",
  },
  {
    number: "03",
    total: "04",
    title: "FIN\nSYNC",
    category: "Fintech Dashboard & Analytics",
    role: "Full-Stack Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    accentColor: "#00D4AA",
  },
  {
    number: "04",
    total: "04",
    title: "LUXE\nCOMMERCE",
    category: "E-Commerce Platform Redesign",
    role: "Creative Direction",
    image: "https://images.unsplash.com/photo-1517694712202-14dd93e9e02a?auto=format&fit=crop&w=800&q=80",
    accentColor: "#FFB84D",
  },
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const handleProgress = useCallback((p) => setScrollProgress(p), []);

  
useEffect(() => {
    const cursor = document.querySelector(".global-cursor");
    const innerCircle = document.querySelector(".global-cursor-inner");
    
    if (!cursor) return;

    // Position cursor at center on load
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    gsap.set(cursor, { left: `${centerX}px`, top: `${centerY}px`, opacity: 1 });

    // Animate the inner dot
    gsap.to(innerCircle, {
      boxShadow: "0 0 20px rgba(74, 158, 255, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.5)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(cursor, {
        left: `${x}px`,
        top: `${y}px`,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", (e) => e.preventDefault());
    };
  }, []);
  return (
    <>
      {/* Global custom cursor */}
      <div className="global-cursor">
        <div className="global-cursor-inner"></div>
        <div className="global-cursor-glow"></div>
      </div>
      
      <main>

      <Navbar />

      <Hero />

      <AboutSection />

      <HorizontalScroll onProgressUpdate={handleProgress}>
        {PROJECTS.map((project) => (
          <ProjectSection key={project.number} {...project} />
        ))}
      </HorizontalScroll>

      <ContactSection />
    </main>
    </>
  );
}

export default App;