import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero section-padding">
      <div className="hero-content fade-in">
        <div className="badge glass">
          <Sparkles size={14} className="badge-icon" />
          <span>Available for Projects</span>
        </div>
        
        <h1 className="hero-title">
          Crafting Digital <span className="text-gradient">Experiences</span> 
          <br /> That Matter.
        </h1>
        
        <p className="hero-subtitle">
          I'm a Full Stack Developer & Designer focused on building high-performance, 
          visually stunning web applications with modern technologies.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            View My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn btn-outline">
            Let's Talk
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-orb main-orb"></div>
        <div className="glow-orb accent-orb"></div>
        <div className="glass-card hero-stats glass">
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Exp</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Review Score</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;