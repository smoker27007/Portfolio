import React, { useContext, useLayoutEffect, useRef  } from 'react';
import gsap from 'gsap';
import { scrollTrigger } from 'gsap/ScrollTrigger';
import codicon from '../../utils/codicon';
import { WorkspaceContext } from '../../components/WorkspaceContext';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'fromted Dev',
    icon: 'filecode',
    tech: 'React, Next.js, Vue, TypeScript',
    summary: 'Building interactive, fast UIs with clean component architecture.',
    proficiency: 95,
    tags: ['React', 'TypeScript', 'Animation'],
    color: 'var(--accent)',
  },
  {
    name: 'Backend Dev',
    icon: 'database',
    tech: 'Node.js, Python, Go, PHP',
    summary: 'Desinging scalable APIs and production-ready server logic.',
    proficiency: 85,
    tags:['Node.js', 'Express', 'API Design'],
    color: 'var(--accent-warm)',
  }
  {
    name: 'Database',
    icon: 'database',
    tach: 'PostgreSQL, MongoDB, Redis',
    summary: 'Modeling data for speed, consistency, and long-term growth.',
    proficiency: 88,
    tags: ['PostgreSQL, 'MongoDB', 'Redis' ],
    color: 'var(--accent-gold)',
  },
  {
    name: 'Mobile Apps',
    icon: 'smartphone',
    tech: 'React Native, Flutter, Swift',
    summary: 'creating smooth mobile experiences with native-like performance.',
    proficiency: 80,
    tags: ['React Native', 'Flutter', 'Cross Platform'],
    color: 'var(--accent)',
  },
  {
    name: 'UI/UX Design',
    icon: 'layers',
    tech: 'Figma, Adobe XD, Framer',
    summary: 'Crafting inntuitive interfaces with a strong visual system.',
    proficiency: 82,
    tags: ['Design Systems', 'Prototyping', 'Interaction'],
    color: 'var(--accent-warm)',
  }

]