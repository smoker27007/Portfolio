import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe } from 'lucide-react';
import { WorkspaceContext } from '../../components/Workspace/Workspace';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "EcoSphere",
    category: "Full Stack Development",
    year: "2024",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
    description: "A comprehensive environmental monitoring dashboard with real-time data visualization.",
    tech: ["React", "Node.js", "Three.js", "GSAP"]
  },
  {
    id: 2,
    title: "Nova UI",
    category: "Design Systems",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600",
    description: "A high-performance design system component library focused on accessibility and motion.",
    tech: ["TypeScript", "Tailwind", "Framer Motion"]
  },
  {
    id: 3,
    title: "Aura Health",
    category: "Mobile Application",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&q=80&w=1600",
    description: "Holistic wellness app with biometric integration and AI-powered health insights.",
    tech: ["React Native", "Firebase", "D3.js"]
  },
  {
    id: 4,
    title: "Nexus NFT",
    category: "Blockchain Platform",
    year: "2022",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600",
    description: "A premium NFT marketplace with advanced minting and secondary trading features.",
    tech: ["Solidity", "Next.js", "Web3.js"]
  }
];

const Projects = () => {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const progressRef = useRef(null);
  const headerRef = useRef(null);
  const countRef = useRef(null);
  const cardsRef = useRef([]);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !scrollerRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.proj-header-line'),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            scroller: scrollerRef.current,
            start: 'top 85%'
          }
        }
      );

      const containerWidth = scrollerRef.current.clientWidth;
      const totalScroll = track.scrollWidth - containerWidth;

      const hScroll = gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          scroller: scrollerRef.current,
          trigger: wrap,
          start: 'top top',
          end: () => `+=${totalScroll + containerWidth * 0.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
            if (countRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * projects.length),
                projects.length - 1
              );
              countRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
            }
          }
        }
      });

      // Card Parallax & Entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(card.querySelector('.pj-img'),
          { scale: 1.2, x: -50 },
          {
            scale: 1, x: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              scroller: scrollerRef.current,
              containerAnimation: hScroll,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        );

        gsap.from(card.querySelector('.pj-body'), {
          y: 40, opacity: 0, duration: 0.8,
          scrollTrigger: {
            trigger: card,
            scroller: scrollerRef.current,
            containerAnimation: hScroll,
            start: 'left 80%'
          }
        });
      });
    }, wrap);

    return () => ctx.revert();
  }, [scrollerRef, isReady]);

  return (
    <section ref={wrapRef} className="proj-section" id="projects">
      <div className="proj-cursor" ref={cursorRef} />
      
      <div className="proj-header" ref={headerRef}>
        <div className="proj-header-line-wrap">
          <h2 className="proj-header-line">SELECTED</h2>
        </div>
        <div className="proj-header-line-wrap">
          <h2 className="proj-header-line">WORKS</h2>
        </div>
      </div>

      <div className="proj-track" ref={trackRef}>
        {projects.map((project, i) => (
          <div 
            key={project.id} 
            className="pj-card"
            ref={el => cardsRef.current[i] = el}
          >
            <div className="pj-visual">
              <img src={project.image} alt={project.title} className="pj-img" />
              <div className="pj-img-overlay" />
              <div className="pj-badge">{String(project.id).padStart(2, '0')}</div>
            </div>
            
            <div className="pj-body">
              <div className="pj-top-row">
                <span className="pj-category">{project.category}</span>
                <span className="pj-status">{project.year}</span>
              </div>
              <h3 className="pj-title">{project.title}</h3>
              <p className="pj-desc">{project.description}</p>
              
              <div className="pj-chips">
                {project.tech.map(t => <span key={t} className="pj-chip">{t}</span>)}
              </div>
              
              <div className="pj-actions">
                <button className="pj-btn pj-btn-primary">
                  VIEW CASE STUDY <ArrowUpRight size={16} />
                </button>
                <a href="#" className="pj-btn pj-btn-ghost"><Globe size={20} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="proj-progress-rail">
        <div className="proj-progress-bar" ref={progressRef} />
      </div>
      <div className="proj-count" ref={countRef}>01 / 04</div>
    </section>
  );
};

export default Projects;