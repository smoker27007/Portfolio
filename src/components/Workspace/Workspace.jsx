import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Codicon from '../../utils/Codicon';
import { WorkspaceContext } from './WorkspaceContext';
import './Workspace.css';

gsap.registerPlugin(ScrollTrigger);

const Workspace = ({ children }) => {
  const [tabsList, setTabsList] = useState([
    { id: 'about_me.ts', name: 'About Me', icon: <Codicon icon="star" size={14} style={{color: '#cca700'}} />, sectionId: 'hero' }
  ]);

  const [activeTab, setActiveTab] = useState('about_me.ts');
  const [activeSection, setActiveSection] = useState('hero');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState({
    root: true,
    openEditors: true,
    public: true,
    src: true,
    myWork: true,
  });

  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isReady, setIsReady] = useState(false);
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);

  const setScrollerNode = useCallback((node) => {
    scrollerRef.current = node;
    if (node) {
      ScrollTrigger.defaults({ scroller: node });
      setIsReady(true);
      ScrollTrigger.refresh();
    } else {
      setIsReady(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const realContent = scroller.querySelector('.editor-real-content');
      if (realContent && window.getComputedStyle(realContent).display === 'none') return;

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
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    const scroller2 = scrollerRef.current;
    if (scroller2) scroller2.addEventListener('scroll', onScroll, { passive: true });

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timer);
      if (scroller2) scroller2.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const scrollToSection = (id) => {
    setTimeout(() => {
      const scroller = scrollerRef.current;
      const element = document.getElementById(id);
      if (scroller && element) {
        const scrollerRect = scroller.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const top = elementRect.top - scrollerRect.top + scroller.scrollTop;
        scroller.scrollTo({ top, behavior: 'smooth' });
        setActiveSection(id);
      }
    }, 50);
  };

  const handleFileClick = (id, sectionId) => {
    setActiveTab(id);
    if (sectionId) scrollToSection(sectionId);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const newTabs = tabsList.filter(t => t.id !== id);
    setTabsList(newTabs);
    if (activeTab === id) {
      if (newTabs.length > 0) {
        handleFileClick(newTabs[0].id, newTabs[0].sectionId);
      } else {
        setActiveTab('');
      }
    }
  };

  // Sidebar symbol sections matching the screenshot
  const sidebarSymbols = [
    { id: 'hero',     label: 'About Me',        icon: 'account',    color: '#c586c0' },
    { id: 'about',    label: 'Work Experience',  icon: 'briefcase',  color: '#519aba' },
    { id: 'skills',   label: 'Skills',           icon: 'symbol-misc', color: '#d16969' },
    { id: 'mywork',   label: 'My Work',          icon: 'lightbulb',  color: '#cca700' },
    { id: 'achievements', label: 'Achievements', icon: 'pass',       color: '#4fc08d' },
    { id: 'contact',  label: 'Contact Me',       icon: 'mail',       color: '#519aba' },
  ];

  // Projects listed under "my work" folder
  const projects = [
    { id: 'eqrev',      label: 'eqrev',      iconType: 'N',   color: '#89d185' },
    { id: 'recovery',   label: 'Recovery',   iconType: 'R',   color: '#519aba' },
    { id: 'devrank',    label: 'DevRank',    iconType: 'N',   color: '#89d185' },
    { id: 'evapro',     label: 'Evapro',     iconType: 'E',   color: '#519aba' },
    { id: 'studysnap',  label: 'StudySnap',  iconType: 'S',   color: '#519aba' },
    { id: 'globalxport',label: 'GlobalXport',iconType: 'G',   color: '#519aba' },
  ];

  return (
    <WorkspaceContext.Provider value={{ scrollerRef, isReady }}>
      <div className="portfolio-ide-container">

        {/* ── Title Bar ── */}
        <div className="ide-title-bar">
          <div className="ide-left-controls">
            <div className="ide-logo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#007ACC">
                <path d="M23.5 15.4l-3.8-3.8 3.8-3.8c.4-.4.4-1 0-1.4l-1.5-1.5c-.4-.4-1-.4-1.4 0L12 13.6V2.4c0-.6-.4-1-1-1H9.5c-.6 0-1 .4-1 1v11.2L1.1 4.9c-.4-.4-1-.4-1.4 0L.1 6.4c-.4.4-.4 1 0 1.4L6.4 12 .1 17.6c-.4.4-.4 1 0 1.4l1.5 1.5c.4.4 1 .4 1.4 0L12 10.4v11.2c0 .6.4 1 1 1h1.5c.6 0 1-.4 1-1V10.4l8.6 8.6c.4.4 1 .4 1.4 0l1.5-1.5c.4-.4.4-1.1 0-1.5z"/>
              </svg>
            </div>
            <div className="ide-menu">
              <span>File</span><span>Edit</span><span>Selection</span>
              <span>View</span><span>Go</span><span>Run</span>
              <span>Terminal</span><span>Help</span>
            </div>
          </div>
          <div className="ide-title-center">
            <div className="ide-favicon">
              <span className="favicon-g">G</span>
            </div>
            <span className="ide-title-text">Girish Gaikwad — Portfolio</span>
          </div>
          <div className="ide-window-controls">
            <div className="ide-header-icons">
              <Codicon icon="layoutSidebarRight" size={16} />
              <Codicon icon="layoutPanel" size={16} />
              <Codicon icon="layoutSidebarLeft" size={16} />
            </div>
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
                <Codicon icon="files" size={24} />
              </div>
              <div className="activity-icon"><Codicon icon="search" size={24} /></div>
              <div className="activity-icon"><Codicon icon="scm" size={24} /></div>
              <div className="activity-icon"><Codicon icon="play" size={24} /></div>
              <div className="activity-icon"><Codicon icon="extensions" size={24} /></div>
            </div>
            <div className="activity-bottom">
              <div className="activity-icon"><Codicon icon="account" size={24} /></div>
              <div className="activity-icon"><Codicon icon="settings" size={24} /></div>
            </div>
          </div>

          {/* ── Sidebar (Explorer) ── */}
          <AnimatePresence>
            {isExplorerOpen && (
              <div className="ide-sidebar">
                <div className="sidebar-header">
                  <span>EXPLORER</span>
                  <div className="sidebar-header-actions">
                    <Codicon icon="newFile" size={14} className="sidebar-action-icon" title="New File" />
                    <Codicon icon="newFolder" size={14} className="sidebar-action-icon" title="New Folder" />
                    <Codicon icon="refresh" size={14} className="sidebar-action-icon" title="Refresh" />
                    <Codicon icon="collapseAll" size={14} className="sidebar-action-icon" title="Collapse All" />
                    <Codicon icon="moreHorizontal" size={14} className="sidebar-action-icon header-more" />
                  </div>
                </div>

                {/* ── OPEN EDITORS ── */}
                <div className="sidebar-section">
                  <div className="section-title" onClick={() => toggleFolder('openEditors')}>
                    {openFolders.openEditors
                      ? <Codicon icon="chevronDown" size={14} />
                      : <Codicon icon="chevronRight" size={14} />}
                    <span>OPEN EDITORS</span>
                  </div>
                  {openFolders.openEditors && (
                    <div className="file-tree">
                      {tabsList.map(tab => (
                        <div
                          key={tab.id}
                          className={`tree-file open-editor-file ${activeTab === tab.id ? 'highlighted' : ''}`}
                          onClick={() => handleFileClick(tab.id, tab.sectionId)}
                        >
                          {tab.icon}
                          <span style={{ color: activeTab === tab.id ? '#ffffff' : '#cccccc' }}>{tab.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── PORTFOLIO ── */}
                <div className="sidebar-section">
                  <div className="section-title portfolio-section-title" onClick={() => toggleFolder('root')}>
                    {openFolders.root
                      ? <Codicon icon="chevronDown" size={14} />
                      : <Codicon icon="chevronRight" size={14} />}
                    <span>PORTFOLIO</span>
                    <div className="portfolio-title-actions">
                      <Codicon icon="newFile" size={12} className="sidebar-action-icon" />
                      <Codicon icon="newFolder" size={12} className="sidebar-action-icon" />
                      <Codicon icon="refresh" size={12} className="sidebar-action-icon" />
                      <Codicon icon="collapseAll" size={12} className="sidebar-action-icon" />
                    </div>
                  </div>

                  {openFolders.root && (
                    <div className="file-tree">

                      {/* .next */}
                      <div className="tree-folder" onClick={() => toggleFolder('next')}>
                        {openFolders.next
                          ? <Codicon icon="chevronDown" size={14} style={{ color: '#cccccc' }} />
                          : <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />}
                        <Codicon icon="folder" size={14} style={{ color: '#858585' }} />
                        <span style={{ color: '#cccccc' }}>.next</span>
                      </div>

                      {/* node_modules */}
                      <div className="tree-folder" onClick={() => toggleFolder('nodeModules')}>
                        {openFolders.nodeModules
                          ? <Codicon icon="chevronDown" size={14} style={{ color: '#cccccc' }} />
                          : <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />}
                        <Codicon icon="folder" size={14} style={{ color: '#89d185' }} />
                        <span style={{ color: '#cccccc' }}>node_modules</span>
                      </div>

                      {/* public */}
                      <div className="tree-folder" onClick={() => toggleFolder('public')}>
                        {openFolders.public
                          ? <Codicon icon="chevronDown" size={14} style={{ color: '#cccccc' }} />
                          : <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />}
                        <Codicon icon="folderOpen" size={14} style={{ color: '#519aba' }} />
                        <span style={{ color: '#cccccc' }}>public</span>
                      </div>

                      {openFolders.public && (
                        <div className="tree-sub-items">
                          {/* about_me.ts file */}
                          <div
                            className={`tree-file ${activeTab === 'about_me.ts' ? 'highlighted' : ''}`}
                            onClick={() => handleFileClick('about_me.ts', 'hero')}
                          >
                            <Codicon icon="star" size={14} style={{ color: '#cca700' }} />
                            <span style={{ color: activeTab === 'about_me.ts' ? '#ffffff' : '#cccccc' }}>about_me.ts</span>
                          </div>

                          {/* Inner symbols under about_me.ts */}
                          <div className="tree-symbols-wrap">
                            {sidebarSymbols.map(sym => (
                              <div
                                key={sym.id}
                                className={`tree-symbol ${activeSection === sym.id ? 'active-symbol' : ''}`}
                                onClick={() => scrollToSection(sym.id)}
                              >
                                <Codicon icon={sym.icon} size={14} style={{ color: sym.color }} />
                                <span>{sym.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* src */}
                      <div className="tree-folder" onClick={() => toggleFolder('src')}>
                        {openFolders.src
                          ? <Codicon icon="chevronDown" size={14} style={{ color: '#cccccc' }} />
                          : <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />}
                        <Codicon icon="folderOpen" size={14} style={{ color: '#4fc08d' }} />
                        <span style={{ color: '#cccccc' }}>src</span>
                      </div>

                      {openFolders.src && (
                        <div className="tree-sub-items">
                          <div className="tree-file" onClick={() => handleFileClick('personal-info.tsx', 'hero')}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c586c0" strokeWidth="1.5">
                              <rect x="2" y="2" width="12" height="12" rx="2" />
                            </svg>
                            <span style={{ color: '#519aba' }}>personal-info.tsx</span>
                          </div>

                          {/* my work folder */}
                          <div className="tree-folder" onClick={() => toggleFolder('myWork')}>
                            {openFolders.myWork
                              ? <Codicon icon="chevronDown" size={14} style={{ color: '#cccccc' }} />
                              : <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />}
                            <Codicon icon="folderOpen" size={14} style={{ color: '#d16969' }} />
                            <span style={{ color: '#cccccc' }}>my work</span>
                          </div>

                          {openFolders.myWork && (
                            <div className="tree-sub-items">
                              {projects.map(proj => (
                                <div key={proj.id} className="tree-file project-file">
                                  <span
                                    className="project-icon-letter"
                                    style={{ background: proj.color === '#89d185' ? '#1a2a1a' : '#1a1e2e', color: proj.color, border: `1px solid ${proj.color}` }}
                                  >
                                    {proj.iconType}
                                  </span>
                                  <span style={{ color: '#cccccc' }}>{proj.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* leetcode folder */}
                          <div className="tree-folder">
                            <Codicon icon="chevronRight" size={14} style={{ color: '#cccccc' }} />
                            <Codicon icon="folder" size={14} style={{ color: '#cca700' }} />
                            <span style={{ color: '#cccccc' }}>leetcode</span>
                          </div>

                          {/* config files */}
                          <div className="tree-file">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#519aba" strokeWidth="1.5"><polygon points="8 2 14 5 14 11 8 14 2 11 2 5 8 2" /></svg>
                            <span style={{ color: '#519aba' }}>.eslintrc.json</span>
                          </div>
                          <div className="tree-file">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#d16969" strokeWidth="1.5"><polygon points="8 1 15 8 8 15 1 8 8 1" /></svg>
                            <span style={{ color: '#d16969' }}>.gitignore</span>
                          </div>
                          <div className="tree-file">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="#cccccc"><text x="3" y="12" fontSize="11" fontFamily="sans-serif" fontWeight="bold">N</text></svg>
                            <span style={{ color: '#cccccc' }}>next.config.js</span>
                          </div>
                          <div className="tree-file">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#4fc08d" strokeWidth="1.5"><polygon points="8 2 14 5 14 11 8 14 2 11 2 5 8 2" fill="#4fc08d" fillOpacity="0.2" /></svg>
                            <span style={{ color: '#4fc08d' }}>package-lock.json</span>
                          </div>
                          <div className="tree-file">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#4fc08d" strokeWidth="1.5"><polygon points="8 2 14 5 14 11 8 14 2 11 2 5 8 2" fill="#4fc08d" fillOpacity="0.2" /></svg>
                            <span style={{ color: '#4fc08d' }}>package.json</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── OUTLINE ── */}
                <div className="sidebar-section collapsed">
                  <div className="section-title">
                    <Codicon icon="chevronRight" size={14} />
                    <span>OUTLINE</span>
                  </div>
                </div>

                {/* ── TIMELINE ── */}
                <div className="sidebar-section collapsed">
                  <div className="section-title">
                    <Codicon icon="chevronRight" size={14} />
                    <span>TIMELINE</span>
                  </div>
                </div>

                {/* ── SCRIPTS ── */}
                <div className="sidebar-section collapsed">
                  <div className="section-title">
                    <Codicon icon="chevronRight" size={14} />
                    <span>SCRIPTS</span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* ── Editor Area ── */}
          <div className="ide-editor">
            {/* Editor top toolbar */}
            <div className="editor-top-bar">
              <div className="editor-tabs">
                {tabsList.map(tab => (
                  <div
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleFileClick(tab.id, tab.sectionId)}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                    <div className="tab-close" onClick={(e) => closeTab(e, tab.id)}>
                      <Codicon icon="close" size={12} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="editor-top-actions">
                <Codicon icon="splitHorizontal" size={16} className="editor-top-icon" title="Split Editor" />
                <Codicon icon="moreHorizontal" size={16} className="editor-top-icon" title="More" />
              </div>
            </div>

            <div className="editor-content-scroll" ref={setScrollerNode}>
              <div className="editor-real-content" style={{ display: !activeTab ? 'none' : 'block' }}>
                {React.Children.map(children, (child, index) => {
                  const secIds = ['hero', 'about', 'projects', 'contact'];
                  return (
                    <div key={index} id={secIds[index]} className="editor-section-wrap">
                      {child}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Status Bar ── */}
        <div className="ide-status-bar">
          <div className="status-left">
            <div className="status-items branch">
              <Codicon icon="scm" size={12} />
              <span>main*</span>
            </div>
            <div className="status-items">
              <Codicon icon="close" size={12} className="error-icon" />
              <span>0</span>
            </div>
            <div className="status-items">
              <Codicon icon="warning" size={12} className="warning-icon" />
              <span>0</span>
            </div>
          </div>
          <div className="status-right">
            <div className="status-item">Spaces: 2</div>
            <div className="status-item">UTF-8</div>
            <div className="status-item">CRLF</div>
            <div className="status-item">{ }TypeScript JSX</div>
            <div className="status-item live">
              <Codicon icon="globe" size={12} />
              <span>Go Live</span>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
};

export default Workspace;