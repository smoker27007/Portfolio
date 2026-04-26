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
        
        <div className="ide-title-bar">
          <div className="ide-left-controls">
            <div className="ide-logo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#007ACC">
                <path d="M23.5 15.4l-3.8-3.8 3.8-3.8c.4-.4.4-1 0-1.4l-1.5-1.5c-.4-.4-1-.4-1.4 0L12 13.6V2.4c0-.6-.4-1-1-1H9.5c-.6 0-1 .4-1 1v11.2L1.1 4.9c-.4-.4-1-.4-1.4 0L.1 6.4c-.4.4-.4 1 0 1.4L6.4 12 .1 17.6c-.4.4-.4 1 0 1.4l1.5 1.5c.4.4 1 .4 1.4 0L12 10.4v11.2c0 .6.4 1 1 1h1.5c.6 0 1-.4 1-1V10.4l8.6 8.6c.4.4 1 .4 1.4 0l1.5-1.5c.4-.4.4-1.1 0-1.5z"/>
              </svg>
            </div>
            <div className="ide-menu">
              <span>File</span>
              <span>Edit</span>
              <span>Selection</span>
              <span>View</span>
              <span>Go</span>
              <span>Run</span>
              <span>Terminal</span>
              <span>Help</span>
            </div>
          </div>
          <div className="ide-title-text">
            portfolio — {activeTab}
          </div>
          <div className="ide-window-controls">
            <span className="window-icon minify"></span>
            <span className="window-icon expand"></span>
            <span className="window-icon close"></span>
          </div>
        </div>

        <div className="ide-main">
          {/* ── Activity Bar ── */}
          <div className="ide-activity-bar">
            <div className="activity-top">
              <div className={`activity-icon ${isExplorerOpen ? 'active' : ''}`} onClick={() => setIsExplorerOpen(!isExplorerOpen)}>
                <Files size={24} />
              </div>
              <div className="activity-icon"><Search size={24} /></div>
              <div className="activity-icon"><GitBranch size={24} /></div>
              <div className="activity-icon"><Play size={24} /></div>
              <div className="activity-icon"><Blocks size={24} /></div>
            </div>
            <div className="activity-bottom">
              <div className="activity-icon"><User size={24} /></div>
              <div className="activity-icon"><Settings size={24} /></div>
            </div>
          </div>

          {/* ── Sidebar (Explorer) ── */}
          <AnimatePresence>
            {isExplorerOpen && (
              <motion.div 
                className="ide-sidebar"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                <div className="sidebar-header">
                  <span>EXPLORER</span>
                  <MoreHorizontal size={14} className="header-more" />
                </div>
                
                {/* Section: Open Editors */}
                <div className="sidebar-section">
                  <div className="section-title" onClick={() => toggleFolder('openEditors')}>
                    {openFolders.openEditors ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>OPEN EDITORS</span>
                  </div>
                  {openFolders.openEditors && (
                    <div className="file-tree">
                      {tabs.map(tab => (
                        <div key={tab.id} className={`tree-file ${activeTab === tab.id ? 'active' : ''}`} onClick={() => handleFileClick(tab.id, tab.sectionId)}>
                          {tab.icon}
                          <span>{tab.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section: Portfolio Project */}
                <div className="sidebar-section">
                  <div className="section-title" onClick={() => toggleFolder('root')}>
                    {openFolders.root ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>PORTFOLIO</span>
                  </div>
                  
                  {openFolders.root && (
                    <div className="file-tree">
                      {/* .next */}
                      <div className="tree-folder" onClick={() => toggleFolder('next')}>
                        {openFolders.next ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <Folder size={14} className="folder-icon next" />
                        <span>.next</span>
                      </div>

                      {/* node_modules */}
                      <div className="tree-folder" onClick={() => toggleFolder('nodeModules')}>
                        {openFolders.nodeModules ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <Folder size={14} className="folder-icon modules" />
                        <span>node_modules</span>
                      </div>

                      {/* public */}
                      <div className="tree-folder" onClick={() => toggleFolder('public')}>
                        {openFolders.public ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <FolderOpen size={14} className="folder-icon public" />
                        <span>public</span>
                      </div>
                      
                      {openFolders.public && (
                        <div className="tree-sub-items">
                          <div className={`tree-file highlighted ${activeTab === 'about_me.ts' ? 'active' : ''}`} onClick={() => handleFileClick('about_me.ts', 'about')}>
                            <Star size={14} className="file-icon star" />
                            <span>about_me.ts</span>
                          </div>
                          
                          {/* Inner Symbols for about_me.ts */}
                          <div className="tree-symbols">
                            <div className="tree-symbol" onClick={() => scrollToSection('about')}>
                              <UserCircle size={14} className="symbol-icon" />
                              <span>About Me</span>
                            </div>
                            <div className="tree-symbol" onClick={() => scrollToSection('about')}>
                              <Briefcase size={14} className="symbol-icon" />
                              <span>Work Experience</span>
                            </div>
                            <div className="tree-symbol" onClick={() => scrollToSection('about')}>
                              <Wrench size={14} className="symbol-icon" />
                              <span>Skills</span>
                            </div>
                            <div className="tree-symbol" onClick={() => scrollToSection('projects')}>
                              <Layers size={14} className="symbol-icon mywork" />
                              <span>My Work</span>
                            </div>
                            <div className="tree-symbol" onClick={() => scrollToSection('about')}>
                              <Trophy size={14} className="symbol-icon" />
                              <span>Achievements</span>
                            </div>
                            <div className="tree-symbol" onClick={() => scrollToSection('contact')}>
                              <Mail size={14} className="symbol-icon" />
                              <span>Contact Me</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* src */}
                      <div className="tree-folder" onClick={() => toggleFolder('src')}>
                        {openFolders.src ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <FolderOpen size={14} className="folder-icon src" />
                        <span>src</span>
                      </div>

                      {openFolders.src && (
                        <div className="tree-sub-items">
                          <div className="tree-file" onClick={() => handleFileClick('hero.tsx', 'hero')}>
                            <Code2 size={14} className="file-icon tsx" />
                            <span>personal-info.tsx</span>
                          </div>
                          
                          <div className="tree-folder" onClick={() => toggleFolder('myWork')}>
                            {openFolders.myWork ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <FolderOpen size={14} className="folder-icon mywork" />
                            <span>my work</span>
                          </div>

                          {openFolders.myWork && (
                            <div className="tree-sub-items projects-sub">
                              {['eqrev', 'Recovery', 'DevRank', 'Evapro', 'StudySnap', 'GlobalXport'].map(proj => (
                                <div key={proj} className="tree-symbol" onClick={() => scrollToSection('projects')}>
                                  <div className="symbol-bullet" />
                                  <span>{proj}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="sidebar-section collapsed">
                  <div className="section-title">
                    <ChevronRight size={14} />
                    <span>OUTLINE</span>
                  </div>
                </div>
                <div className="sidebar-section collapsed">
                  <div className="section-title">
                    <ChevronRight size={14} />
                    <span>TIMELINE</span>
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

           <div className="editor-content-scroll" ref={scrollerRef}>
            <div className="editor-real-content">
              {React.Children.map(children, (child, index) => (
                <div key={index} id={tabs[index]?.sectionId} className="editor-section-wrap">
                  {child}
                </div>
              ))}
            </div>
           </div>
          </div> 
        </div>

        <div className="ide-status-bar">
          <div className="status-left">
            <div className="status-items branch"><GitBranch size={12} /> <span>main*</span></div>
            <div className="status-items"><X size={12} className="error-icon" /><span>0</span></div>
            <div className="status-items"><ChevronRight size={12} className="warning-icon" /><span>0</span></div>
            </div>
            <div className="status-right">
            <div className="status-item">Ln 1, col 1</div>
            <div className="status-item">spaces: 2</div>
            <div className="status-item">UTF-8</div>
            <div className="status-item">TypeScript JSX</div>
            <div className="status-item live"><Globe size={12} /> <span>Go Live</span></div>
            <div className="status-item time">{time}</div>
          </div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
};      

export default Workspace;