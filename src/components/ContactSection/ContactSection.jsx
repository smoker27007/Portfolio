import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, ExternalLink, Mail } from 'lucide-react';
import { WorkspaceContext } from "../Workspace/WorkspaceContext";
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollerRef, isReady } = React.useContext(WorkspaceContext);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !scrollerRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      // ════════════════════════════════════════════════════════════
      // TITLE ANIMATION
      // ════════════════════════════════════════════════════════════
      
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
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            scroller: scrollerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Subtitle animation
      gsap.set('.contact-subtitle', { opacity: 0, y: 40, filter: 'blur(10px)' });
      gsap.to('.contact-subtitle', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: section,
          scroller: scrollerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Buttons animation
      const buttons = section.querySelectorAll('.cta-button-dark');
      buttons.forEach((btn, i) => {
        gsap.set(btn, { opacity: 0, y: 40, scale: 0.8, rotateY: -90 });
        gsap.to(btn, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.7,
          ease: 'back.out(1.3)',
          delay: 0.7 + i * 0.15,
          scrollTrigger: {
            trigger: section,
            scroller: scrollerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Email animation
      gsap.set('.contact-email', { opacity: 0, y: 30 });
      gsap.to('.contact-email', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1,
        scrollTrigger: {
          trigger: section,
          scroller: scrollerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Social links animation
      const socialLinks = section.querySelectorAll('.social-link');
      socialLinks.forEach((link, i) => {
        gsap.set(link, { opacity: 0, y: 40, rotateZ: 45, scale: 0.6 });
        gsap.to(link, {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          delay: 1.1 + i * 0.1,
          scrollTrigger: {
            trigger: section,
            scroller: scrollerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Copyright animation
      gsap.set('.copyright-text', { opacity: 0, y: 20 });
      gsap.to('.copyright-text', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.4,
        scrollTrigger: {
          trigger: section,
          scroller: scrollerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isReady, scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="contact-section"
      id="contact"
    >
      <div className="contact-content">
        <h2 className="contact-title" ref={titleRef}>
          {['L', 'E', 'T', "'", 'S'].map((char, i) => (
            <span key={`l-${i}`} className="title-char">{char}</span>
          ))}
          {' '}
          {['W', 'O', 'R', 'K'].map((char, i) => (
            <span key={`w-${i}`} className="title-char">{char}</span>
          ))}
          <br />
          {['T', 'O', 'G', 'E', 'T', 'H', 'E', 'R'].map((char, i) => (
            <span key={`t-${i}`} className="title-char">{char}</span>
          ))}
        </h2>

        <p className="contact-subtitle">
          Whether you have a specific project in mind, need help with a web app, or just want to connect, I'm here to chat. Let's build something great.
        </p>

        <div className="contact-buttons">
          <button className="cta-button-dark">SAY HELLO →</button>
          <button className="cta-button-dark">VIEW RESUME</button>
        </div>

        <div className="contact-email-section">
          <a href="mailto:hello@gowtham.dev" className="contact-email">
            hello@gowtham.dev
          </a>

          <div className="social-links">
            <a href="#" className="social-link" title="LinkedIn">
              <ExternalLink size={18} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="social-link" title="Twitter">
              <ExternalLink size={18} />
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link" title="GitHub">
              <Code size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="contact-footer">
          <p className="copyright-text">© 2024 GOWTHAM C D. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;