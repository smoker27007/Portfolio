import React from 'react';
import { ExternalLink } from 'lucide-react';
import './Projects.css';
import dashboardImg from '../../assets/dashboard.png';
import mobileImg from '../../assets/mobile.png';
import ecommerceImg from '../../assets/ecommerce.png';

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const Projects = () => {
  const projects = [
    {
      title: 'NexGen Dashboard',
      description: 'A comprehensive data analytics platform with real-time updates and interactive visualizations.',
      image: dashboardImg,
      tags: ['React', 'D3.js', 'Node.js'],
      link: '#',
      github: '#'
    },
    {
      title: 'Aura Mobile App',
      description: 'Ultra-modern lifestyle app focusing on mindfulness and productivity through elegant UI.',
      image: mobileImg,
      tags: ['React Native', 'Firebase', 'Animation'],
      link: '#',
      github: '#'
    },
    {
      title: 'LuxeCommerce',
      description: 'Premium shopping experience for high-end boutique stores with seamless checkout.',
      image: ecommerceImg,
      tags: ['Next.js', 'Stripe', 'Tailwind'],
      link: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="projects section-padding">
      <div className="section-header">
        <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
        <p className="section-subtitle">Take a look at some of my recent work and digital innovations.</p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card glass">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="project-links">
                  <a href={project.github} className="icon-btn glass"><Github size={20} /></a>
                  <a href={project.link} className="icon-btn glass"><ExternalLink size={20} /></a>
                </div>
              </div>
            </div>
            
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta">
        <a href="https://github.com" className="btn btn-outline">Explore All on GitHub</a>
      </div>
    </section>
  );
};

export default Projects;