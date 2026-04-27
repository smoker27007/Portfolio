import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe } from 'lucide-react';
import { WorkspaceContext } from '../../components/Workspace/WorkspaceContext';
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
  const pinWrapRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const progressRef = useRef(null);
  const headerRef = useRef(null);
  const countRef = useRef(null);
  const imageRefs = useRef([]);
  const cardsRef = useRef([]);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!wrap || !pinWrap || !track || !scroller || !isReady) return;

    const refreshOnImageLoad = () => ScrollTrigger.refresh();
    const attachedImages = imageRefs.current.filter(Boolean);
    attachedImages.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', refreshOnImageLoad, { once: true });
      }
    });

    const ctx = gsap.context(() => {
      const getTotalScroll = () => Math.max(0, track.scrollWidth - scroller.clientWidth);
      const setProgressScale = progressRef.current
        ? gsap.quickSetter(progressRef.current, 'scaleX')
        : null;
      let lastCount = -1;

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
            scroller,
            start: 'top 85%'
          }
        }
      );

      const hScroll = gsap.to(track, {
        x: () => -getTotalScroll(),
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: pinWrap,
          start: 'top top',
          end: () => `+=${Math.max(getTotalScroll(), scroller.clientWidth * 0.9)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.25,
          anticipatePin: 1,
          fastScrollEnd: true,
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (setProgressScale) {
              setProgressScale(self.progress);
            }
            if (countRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * projects.length),
                projects.length - 1
              );
              if (idx !== lastCount) {
                lastCount = idx;
                countRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
              }
            }
          }
        }
      });

      // Card Parallax & Entrance
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(card.querySelector('.pj-img'),
          { scale: 1.2, x: -50 },
          {
            scale: 1, x: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              scroller,
              containerAnimation: hScroll,
              start: 'left right',
              end: 'right left',
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          }
        );

        gsap.from(card.querySelector('.pj-body'), {
          y: 40, opacity: 0, duration: 0.8,
          scrollTrigger: {
            trigger: card,
            scroller,
            containerAnimation: hScroll,
            start: 'left 80%'
          }
        });
      });

      ScrollTrigger.refresh();
    }, wrap);

    return () => {
      attachedImages.forEach((img) => {
        img.removeEventListener('load', refreshOnImageLoad);
      });
      ctx.revert();
    };
  }, [scrollerRef, isReady]);

  return (
    <section ref={wrapRef} className="proj-section">
      <div className="proj-cursor" ref={cursorRef} />
      
      <div className="proj-header" ref={headerRef}>
        <div className="proj-header-line-wrap">
          <h2 className="proj-header-line">SELECTED</h2>
        </div>
        <div className="proj-header-line-wrap">
          <h2 className="proj-header-line">WORKS</h2>
        </div>
      </div>

      <div className="proj-pin-wrap" ref={pinWrapRef}>
        <div className="proj-track" ref={trackRef}>
          {projects.map((project, i) => (
            <div 
              key={project.id} 
              className="pj-card"
              ref={el => cardsRef.current[i] = el}
            >
              <div className="pj-visual">
                <img
                  src={project.image}
                  alt={project.title}
                  className="pj-img"
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                />
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
      </div>
    </section>
  );
};

export default Projects;