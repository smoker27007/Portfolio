import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Twitter, Github, Dribbble } from 'lucide-react';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.08, y: -5, boxShadow: '0 20px 50px rgba(74, 158, 255, 0.3)', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
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
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        link.addEventListener('mouseenter', () => {
          gsap.to(link, { scale: 1.12, y: -5, boxShadow: '0 15px 40px rgba(74, 158, 255, 0.2)', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { scale: 1, y: 0, boxShadow: 'none', duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
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
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

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
          Whether you need a website redesign, brand strategy, or full digital transformation, I'm here to help bring your vision to life.
        </p>

        <div className="contact-buttons">
          <button className="cta-button-dark">START A PROJECT →</button>
          <button className="cta-button-dark">SCHEDULE A CALL</button>
        </div>

        <div className="contact-email-section">
          <a href="mailto:hello@gowtham.dev" className="contact-email">
            hello@gowtham.dev
          </a>

          <div className="social-links">
            <a href="#" className="social-link" title="LinkedIn">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="social-link" title="Twitter">
              <Twitter size={18} />
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link" title="GitHub">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="#" className="social-link" title="Dribbble">
              <Dribbble size={18} />
              <span>Dribbble</span>
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