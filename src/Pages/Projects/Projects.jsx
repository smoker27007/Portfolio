import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import dashboardImg from '../../assets/dashboard.png';
import mobileImg from '../../assets/mobile.png';
import ecommerceImg from '../../assets/ecommerce.png';

gsap.registerPlugin(ScrollTrigger);

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: 'Finance Dashboard',
    category: 'Web Application',
    description: 'A responsive dashboard built with React and D3.js featuring secure auth, dynamic analytics, and a polished data-rich interface.',
    image: dashboardImg,
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    year: '2026',
    status: 'Live',
    metrics: [
      { label: 'Time Saved', value: '−20%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Rating', value: '4.8/5' },
    ],
    accentColor: '#C97A53',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Task Manager App',
    category: 'Productivity Tool',
    description: 'A collaborative task environment with drag-and-drop boards, real-time updates, and a workflow-first interface for teams.',
    image: mobileImg,
    tags: ['Next.js', 'Firebase', 'Redux', 'Tailwind'],
    role: 'Frontend Lead',
    year: '2025',
    status: 'Scale',
    metrics: [
      { label: 'Active Users', value: '2k+' },
      { label: 'Daily Tasks', value: '15k+' },
      { label: 'Crash Rate', value: '0.1%' },
    ],
    accentColor: '#B08257',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Local E-Commerce',
    category: 'E-Commerce Platform',
    description: 'A modern storefront with seamless checkout, custom cart logic, and an admin panel built for fast campaign updates.',
    image: ecommerceImg,
    tags: ['React', 'Stripe', 'MongoDB', 'AWS S3'],
    role: 'Sole Developer',
    year: '2025',
    status: 'Growth',
    metrics: [
      { label: 'Sales', value: '+35%' },
      { label: 'Bounce', value: '−15%' },
      { label: 'Products', value: '500+' },
    ],
    accentColor: '#BF9360',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Booking Flow Studio',
    category: 'SaaS Product',
    description: 'A conversion-focused booking experience with multi-step journeys, user reminders, and dynamic pricing visualization.',
    image: dashboardImg,
    tags: ['React', 'Supabase', 'GSAP', 'Zod'],
    role: 'UI Engineer',
    year: '2024',
    status: 'Beta',
    metrics: [
      { label: 'Completion', value: '82%' },
      { label: 'Session', value: '+36%' },
      { label: 'Drop-off', value: '−28%' },
    ],
    accentColor: '#C17D61',
    link: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'Healthcare Portal',
    category: 'Enterprise Platform',
    description: 'A secure patient communication portal with appointment tracking, notification automation, and role-based dashboards.',
    image: mobileImg,
    tags: ['TypeScript', 'React', 'Node.js', 'Prisma'],
    role: 'Frontend Architect',
    year: '2024',
    status: 'Private',
    metrics: [
      { label: 'Response', value: '<900ms' },
      { label: 'Tickets', value: '−31%' },
      { label: 'Adoption', value: '91%' },
    ],
    accentColor: '#9C7F52',
    link: '#',
    github: '#',
  },
];

const Projects = () => {
  const sectionRef    = useRef(null);
  const wrapRef       = useRef(null);
  const trackRef      = useRef(null);
  const cursorRef     = useRef(null);
  const progressRef   = useRef(null);
  const headerRef     = useRef(null);
  const countRef      = useRef(null);
  const cardsRef      = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.proj-header-line'),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

      const hScroll = gsap.to(trackRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerWidth * 0.5}`,
          pin: true,
          scrub: 1.4,
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
          },
        },
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img   = card.querySelector('.pj-img');
        const title = card.querySelector('.pj-title');
        const meta  = card.querySelector('.pj-meta-row');

        gsap.fromTo(
          img,
          { xPercent: 8 },
          {
            xPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: hScroll,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          [title, meta],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: hScroll,
              start: 'left 90%',
            },
          }
        );
      });

    }, sectionRef);

    const onMove = (e) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: 'power3.out',
      });
    };
    const onEnterTrack = () => gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    const onLeaveTrack = () => gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });

    const track = trackRef.current;
    track.addEventListener('mousemove', onMove);
    track.addEventListener('mouseenter', onEnterTrack);
    track.addEventListener('mouseleave', onLeaveTrack);

    const btns = sectionRef.current.querySelectorAll('.pj-btn');
    const magneticCleanup = [];
    btns.forEach((btn) => {
      const onBtnMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: 'power2.out' });
      };
      const onBtnLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
      magneticCleanup.push(() => {
        btn.removeEventListener('mousemove', onBtnMove);
        btn.removeEventListener('mouseleave', onBtnLeave);
      });
    });

    return () => {
      track.removeEventListener('mousemove', onMove);
      track.removeEventListener('mouseenter', onEnterTrack);
      track.removeEventListener('mouseleave', onLeaveTrack);
      magneticCleanup.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>

      <div className="proj-orb proj-orb-1" aria-hidden="true" />
      <div className="proj-orb proj-orb-2" aria-hidden="true" />
      <div className="proj-grid-overlay" aria-hidden="true" />

      <header className="proj-header" ref={headerRef}>
        <div className="proj-header-eyebrow">
          <span className="proj-header-line">SELECTED WORK</span>
        </div>
        <h2 className="proj-header-title">
          <span className="proj-header-line">Projects</span>
          <span className="proj-header-line proj-header-line--accent">Gallery</span>
        </h2>
        <p className="proj-header-line proj-header-sub">
          Five featured builds — scroll to explore.
        </p>
      </header>

      <div className="proj-pin-wrap" ref={wrapRef}>

        <div className="proj-cursor" ref={cursorRef} aria-hidden="true">
          <span>DRAG</span>
        </div>

        <div className="proj-progress-rail" aria-hidden="true">
          <div className="proj-progress-bar" ref={progressRef} />
        </div>

        <div className="proj-count" ref={countRef} aria-live="polite">01 / 05</ div>

        <div className="proj-track" ref={trackRef}>

          {projects.map((project, index) => (
            <article
              key={project.id}
              className="pj-card"
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="pj-visual">
                <img
                  src={project.image}
                  alt={project.title}
                  className="pj-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pj-img-overlay" />

                <div className="pj-chips">
                  {project.tags.slice(0, 3).map((t) => (
                    <span key={t} className="pj-chip">{t}</span>
                  ))}
                </div>

                <span className="pj-badge">{project.year}</span>
              </div>

             
                  

                <div className="pj-meta-row">
                  <div className="pj-meta-item">
                    <span className="pj-meta-label">ROLE</span>
                    <span className="pj-meta-val">{project.role}</span>
                  </div>
                  <div className="pj-meta-item">
                    <span className="pj-meta-label">STACK</span>
                    <span className="pj-meta-val">{project.tags.join(' · ')}</span>
                  </div>
                </div>

                <div className="pj-metrics">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="pj-metric">
                      <strong style={{ color: 'var(--accent)' }}>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pj-actions">
                  <a href={project.link} className="pj-btn pj-btn-primary">
                    View Project <ExternalLink size={15} />
                  </a>
                  <a href={project.github} className="pj-btn pj-btn-ghost" aria-label="Source">
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <div className="pj-corner-glow" aria-hidden="true" />
            </article>
          ))}

          <div className="proj-track-end" aria-hidden="true">
            <p>That's a wrap.</p>
            <span>↑ Scroll back</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;