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
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const AnimatedMetric = ({ label, value }) => {
  const valueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = valueRef.current;
      if (!el) return;

      gsap.from(el, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="metric-box">
      <span className="metric-label">{label}</span>
      <div className="metric-value-big" ref={valueRef}>{value}</div>
    </div>
  );
};

const Projects = () => {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleText = titleRef.current?.querySelectorAll('.title-char');
      if (titleText && titleText.length > 0) {
        gsap.set(titleText, { opacity: 0, y: 60, rotateX: -90, scale: 0.8 });
        gsap.to(titleText, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'back.out(1.5)',
          delay: 0.3
        });
      }

      gsap.set('.projects-subtitle', { opacity: 0, y: 40, filter: 'blur(10px)' });
      gsap.to('.projects-subtitle', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.6
      });

      const showcases = projectsRef.current?.querySelectorAll('.project-showcase') ?? [];

      showcases.forEach((showcase, index) => {
        // Set animation initial states
        gsap.set(showcase, { visibility: 'visible', opacity: 0, y: 80, rotateX: 10 });
        const detailsSection = showcase.querySelector('.project-details-section');
        gsap.set(detailsSection, { opacity: 0, x: -120, skewX: 10 });
        const imageSection = showcase.querySelector('.project-image-section');
        gsap.set(imageSection, { opacity: 0, x: 120, skewX: -10, scale: 0.8 });

        ScrollTrigger.create({
          trigger: showcase,
          start: 'top 80%',
          onEnter: () => {
            const projectTl = gsap.timeline();

            projectTl.to(showcase, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: 'back.out(1.2)'
            }, 0);

            projectTl.to(detailsSection, {
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: 0.9,
              ease: 'power3.out'
            }, 0.1);

            projectTl.to(imageSection, {
              opacity: 1,
              x: 0,
              skewX: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out'
            }, 0.15);

            const projectNumber = showcase.querySelector('.project-number');
            if (projectNumber) {
              gsap.set(projectNumber, { opacity: 0, y: 80, rotateZ: -45, scale: 0.5 });
              projectTl.to(projectNumber, {
                opacity: 1,
                y: 0,
                rotateZ: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.4)'
              }, 0.05);
            }

            const projectTitle = showcase.querySelector('.project-showcase-title');
            if (projectTitle) {
              gsap.set(projectTitle, { opacity: 0, y: 50 });
              projectTl.to(projectTitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
              }, 0.12);
            }

            const metaItems = showcase.querySelectorAll('.meta-item');
            metaItems.forEach((item, i) => {
              gsap.set(item, { opacity: 0, y: 30, rotateX: -90, scale: 0.8 });
              projectTl.to(item, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.2)'
              }, 0.18 + i * 0.08);
            });

            const description = showcase.querySelector('.project-showcase-desc');
            if (description) {
              gsap.set(description, { opacity: 0, y: 20 });
              projectTl.to(description, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
              }, 0.3);
            }

            const metricBoxes = showcase.querySelectorAll('.metric-box');
            metricBoxes.forEach((box, i) => {
              gsap.set(box, { opacity: 0, y: 60, scale: 0.6, rotateZ: -15 });
              projectTl.to(box, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: 0,
                duration: 0.7,
                ease: 'back.out(1.4)'
              }, 0.35 + i * 0.12);
            });

            const techTags = showcase.querySelectorAll('.tech-tag');
            techTags.forEach((tag, i) => {
              gsap.set(tag, { opacity: 0, y: 40, rotateZ: 20, scale: 0.7 });
              projectTl.to(tag, {
                opacity: 1,
                y: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.3)'
              }, 0.5 + i * 0.08);
            });

            const ctaButtons = showcase.querySelectorAll('.project-cta a');
            ctaButtons.forEach((btn, i) => {
              gsap.set(btn, { opacity: 0, y: 40, scale: 0.8, rotateY: -90 });
              projectTl.to(btn, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.7,
                ease: 'back.out(1.3)'
              }, 0.65 + i * 0.12);
            });

            const projectImage = showcase.querySelector('.project-showcase-image');
            const imageWrapper = showcase.querySelector('.project-image-wrapper');
            
            if (projectImage && imageWrapper) {
              gsap.set(projectImage, { opacity: 0, scale: 0.8, rotateZ: -10 });
              projectTl.to(projectImage, {
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
              }, 0.1);

              gsap.to(projectImage, {
                y: -60,
                duration: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: showcase,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1
                }
              });

              gsap.to(projectImage, {
                scale: 1.15,
                duration: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: showcase,
                  start: 'top center',
                  end: 'bottom center',
                  scrub: 1
                }
              });
            }

            const imageGlow = showcase.querySelector('.image-glow');
            if (imageGlow) {
              gsap.to(imageGlow, { opacity: 0.8, scale: 1.1, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
              gsap.to(imageGlow, { filter: 'blur(30px) brightness(1.2)', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
            }
          },
          once: true
        });
      });
    }, projectsRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Finance Dashboard',
      category: 'Web Application',
      description: 'A responsive dashboard built with React and D3.js. Features include user authentication, real-time data filtering, and dark mode support.',
      image: dashboardImg,
      tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      role: 'Full-Stack Developer',
      metrics: [
        { label: 'Time tracking', value: '-20%' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'User Rating', value: '4.8/5' },
        { label: 'Load Time', value: '< 1s' }
      ],
      accentColor: '#E27D60',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Task Manager App',
      category: 'Productivity Tool',
      description: 'A robust task management tool featuring drag-and-drop boards, collaborative workspaces, and real-time synchronization.',
      image: mobileImg,
      tags: ['Next.js', 'Firebase', 'Redux', 'Tailwind'],
      role: 'Frontend Lead',
      metrics: [
        { label: 'Active Users', value: '2k+' },
        { label: 'Daily Tasks', value: '15k+' },
        { label: 'Crash Rate', value: '0.1%' },
        { label: 'Test Coverage', value: '94%' }
      ],
      accentColor: '#E8A87C',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Local E-Commerce',
      category: 'E-Commerce Platform',
      description: 'A modern storefront for a local boutique. Features include a custom cart solution, Stripe integration, and an intuitive admin dashboard.',
      image: ecommerceImg,
      tags: ['React', 'Stripe', 'MongoDB', 'AWS S3'],
      role: 'Sole Developer',
      metrics: [
        { label: 'Sales Increase', value: '35%' },
        { label: 'Bounce Rate', value: '-15%' },
        { label: 'Products', value: '500+' },
        { label: 'Happy Clients', value: '100+' }
      ],
      accentColor: '#C38D9E',
      link: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects-header">
        <h2 className="projects-title" ref={titleRef}>
          {['F', 'e', 'a', 't', 'u', 'r', 'e', 'd'].map((char, i) => (
            <span key={`f-${i}`} className="title-char">{char}</span>
          ))}
          {' '}
          <span className="text-gradient">
            {['P', 'r', 'o', 'j', 'e', 'c', 't', 's'].map((char, i) => (
              <span key={`p-${i}`} className="title-char">{char}</span>
            ))}
          </span>
        </h2>
        <p className="projects-subtitle">Scroll to explore detailed project showcases</p>
      </div>

      <div className="projects-content">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-showcase"
            style={{ '--accent-color': project.accentColor }}
          >
            <div className="project-details-section">
              <div className="project-number">0{project.id}</div>
              <h3 className="project-showcase-title">{project.title}</h3>
              
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">CATEGORY</span>
                  <p className="meta-value">{project.category}</p>
                </div>
                <div className="meta-item">
                  <span className="meta-label">MY ROLE</span>
                  <p className="meta-value">{project.role}</p>
                </div>
              </div>

              <p className="project-showcase-desc">{project.description}</p>

              <div className="metrics-grid">
                {project.metrics.map((metric, i) => (
                  <AnimatedMetric key={i} label={metric.label} value={metric.value} />
                ))}
              </div>

              <div className="tech-stack">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div className="project-cta">
                <a href={project.link} className="btn-explore">
                  EXPLORE PROJECT →
                </a>
                <a href={project.github} className="btn-github glass-btn">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div className="project-image-section">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-showcase-image" loading="lazy" decoding="async" />
                <div className="image-glow"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;