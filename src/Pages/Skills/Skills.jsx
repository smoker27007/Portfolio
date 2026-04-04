import React from 'react';
import { 
  Code2, 
  Layers, 
  Terminal, 
  Cpu, 
  Globe, 
  Database,
  Smartphone,
  Cloud
} from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skills = [
    { name: 'Frontend Dev', icon: <Code2 />, tech: 'React, Next.js, Vue, TypeScript', color: 'var(--primary)' },
    { name: 'Backend Dev', icon: <Terminal />, tech: 'Node.js, Python, Go, PHP', color: 'var(--accent)' },
    { name: 'Database', icon: <Database />, tech: 'PostgreSQL, MongoDB, Redis', color: 'var(--secondary)' },
    { name: 'Mobile apps', icon: <Smartphone />, tech: 'React Native, Flutter, Swift', color: 'var(--primary)' },
    { name: 'UI/UX Design', icon: <Layers />, tech: 'Figma, Adobe XD, Framer', color: 'var(--accent)' },
    { name: 'DevOps', icon: <Cloud />, tech: 'Docker, AWS, Vercel, CI/CD', color: 'var(--secondary)' },
  ];

  return (
    <section id="skills" className="skills section-padding">
      <div className="section-header">
        <h2 className="section-title">My <span className="text-gradient">Expertise</span></h2>
        <p className="section-subtitle">A collection of technologies I use to bring ideas to life.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card glass">
            <div className="skill-icon-wrapper" style={{ '--skill-color': skill.color }}>
              {skill.icon}
            </div>
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-tech">{skill.tech}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;