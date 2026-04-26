import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Play, 
  Blocks, 
  User, 
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  Code2,
  Terminal,
  Cpu,
  Monitor,
  Layout,
  Globe,
  Database,
  Folder,
  FolderOpen,
  Star,
  UserCircle,
  Briefcase,
  Wrench,
  Layers,
  Trophy,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Workspace.css';

gsap.registerPlugin(ScrollTrigger);

export const WorkspaceContext = createContext(null);

const Workspace = ({ children }) => {
  const [activeTab, setActiveTab] = useState('about_me.ts');
  const [activeSection, setActiveSection] = useState('about');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState({
    root: true,
    public: true,
    src: true,
    myWork: true
  });
  
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isReady, setIsReady] = useState(false);
  const scrollerRef = useRef(null);

  // Map sectionId → tab id for reverse lookup
  const sectionToTab = {
    hero: 'hero.tsx',
    about: 'about_me.ts',
    projects: 'projects.tsx',
    contact: 'contact.json',
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      ScrollTrigger.defaults({ scroller });
      setIsReady(true);
      ScrollTrigger.refresh();
    }

    // Sync active tab with scroll position
    const handleScroll = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const scrollTop = scroller.scrollTop;
      const viewMid = scrollTop + scroller.clientHeight / 2;

      const sectionIds = ['hero', 'about', 'projects', 'contact'];
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const elTop = el.offsetTop;
          if (viewMid >= elTop) current = id;
        }
      }
      setActiveSection(current);
      setActiveTab(sectionToTab[current] || 'hero.tsx');
    };

    const scroller2 = scrollerRef.current;
    if (scroller2) scroller2.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timer);
      if (scroller2) scroller2.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const scrollToSection = (id) => {
    const scroller = scrollerRef.current;
    const element = document.getElementById(id);
    if (scroller && element) {
      const scrollerRect = scroller.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const top = elementRect.top - scrollerRect.top + scroller.scrollTop;
      scroller.scrollTo({
        top: top,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handleFileClick = (id, sectionId) => {
    setActiveTab(id);
    scrollToSection(sectionId);
  };

  const tabs = [
    { id: 'hero.tsx', name: 'hero.tsx', icon: <Code2 size={14} className="file-icon tsx" />, sectionId: 'hero' },
    { id: 'about_me.ts', name: 'about_me.ts', icon: <Star size={14} className="file-icon star" />, sectionId: 'about' },
    { id: 'projects.tsx', name: 'projects.tsx', icon: <Code2 size={14} className="file-icon tsx" />, sectionId: 'projects' },
    { id: 'contact.json', name: 'contact.json', icon: <Database size={14} className="file-icon json" />, sectionId: 'contact' },
  ];

  return (
    <WorkspaceContext.Provider value={{ scrollerRef, isReady }}>
      <div className="portfolio-ide-container">
        {/* ── IDE Title Bar ── */}
        <div className="ide-title-bar">
          <div className="ide-left-controls">
            <div className="ide-logo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#007ACC">
                <path d="M23.5 15.4l-3.8-3.8 3.8-3.8c.4-.4.4-1 0-1.4l-1.5-1.5c-.4-.4-1-.4-1.4 0L12 13.6V2.4c0-.6-.4-1-1-1H9.5c-.6 0-<<,>TIMELINE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Editor Area ── */}
          <div className="ide-editor">
            <div className="editor-tabs">
              {tabs.map(tab => (
                <div 
                  key={tab.id} 
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleFileClick(tab.id, tab.sectionId)}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  <X size={12} className="tab-close" />
                </div>
              ))}
            </div>

           