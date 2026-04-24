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

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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
        { label: 'Time Tracking', value: '-20%' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'User Rating', value: '4.8/5' }
      ],
      accentColor: '#d77a5f',
      link: '#',
      github: '#'
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
        { label: 'Crash Rate', value: '0.1%' }
      ],
      accentColor: '#b48957',
      link: '#',
      github: '#'
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
        { label: 'Sales Increase', value: '35%' },
        { label: 'Bounce Rate', value: '-15%' },
    {label:'Productz',value:'500+'}
      ],
      accentColor:'#bf9360',
      link:'#',
    github:'#'
    },
    {
      id:4,
      title:'Booking Flow Studio',
      category:'SaaS Product',
      description:'A conversion-focused booking experience with multi-step journeys, user reminders, and dynamic pricing visualization.',
      image:dashboardImg,
      tags:['React','Supabase','GSAP','zod'],
      role:'UI Engineer',
      year:'2024',
      status:'Beta',
      metrices:[
       {label:'Form Completion',value:'82%'},
       {label:'Session Time',value:'+36%'},
       {label:'Drop-off',value:'-28%'}
      ],
      accentColor:'#c17d61',
      link:'#',
      github:'#'
    },
    {
      id:5,
      title:'Healthcare Portal',
      category:'Enterprise Platform',
      description:'A secure patient communication portal with appointment tracking,notification automation, and role-based dashboards.',
      image:mobileImg,
      tags:['TypeScript','React','Node.js','Prisma'],
      role:'Frontend Architect',
      year:'2024',
      status:'private',
      metrices:[
        {label:'Response Time',value:'<900ms'},
        {label:'Ticket Load',value:'-31%'},
        {label:'Adoption',value:'91%'}
      ],
      accentColor:'#9c7f52',
      link:'#',
      github:'#'
    },

  return (
    <section id="projects" className="projects-depth" ref={sectionRef}>
      <div className="projects-depth-noise"></div>

      <header className="projects-depth-header" ref={titleRef}>
        <p className="projects-depth-kicker">WORK</p>
        <h2 className="projects-depth-title">
          <span className="projects-depth-word">Projects</span>
          <span className="projects-depth-word">Depth Gallery</span>
        </h2>
        <p className="projects-depth-subtitle">
          Six featured builds presented as an interactive 3D gallery that reacts to cursor movement and scroll depth.
        </p>
      </header>

      <div className="projects-depth-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-depth-card"
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            style={{
              '--project-accent': project.accentColor,
              '--base-tilt': index % 2 === 0 ? '-3deg' : '3deg'
            }}
          >
            <div className="project-depth-inner">
              <div className="project-depth-aura"></div>
              <div className="project-depth-panel project-depth-panel-back"></div>
              <div className="project-depth-panel project-depth-panel-front"></div>
              <div className="project-depth-ribbon">
                <span>{project.year}</span>
                <span>{project.status}</span>
              </div>

              <div className="project-depth-content">
                <span className="project-depth-number">0{project.id}</span>
                <p className="project-depth-category">{project.category}</p>
                <h3 className="project-depth-title-item">{project.title}</h3>
                <p className="project-depth-description">{project.description}</p>

                <div className="project-depth-meta">
                  <div>
                    <span className="project-meta-label">ROLE</span>
                    <p className="project-meta-value">{project.role}</p>
                  </div>
                  <div>
                    <span className="project-meta-label">STACK</span>
                    <p className="project-meta-value">{project.tags.join(' · ')}</p>
                  </div>
                </div>

                <div className="project-depth-metrics">
                  {project.metrics.map((metric) => (
                    <div className="project-depth-metric" key={`${project.id}-${metric.label}`}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="project-depth-actions">
                  <a href={project.link} className="project-depth-btn project-depth-btn-primary">
                    View Project <ExternalLink size={16} />
                  </a>
                  <a href={project.github} className="project-depth-btn project-depth-btn-ghost" aria-label={`Open ${project.title} source`}>
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <div className="project-depth-visual">
                <div className="project-depth-image-shell">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                </div>
                <div className="project-depth-floaters">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={`${project.id}-${tag}`} className="project-depth-chip">{tag}</span>
                  ))}
                </div>
                <span className="project-depth-orbit orbit-a"></span>
                <span className="project-depth-orbit orbit-b"></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;