import React, { useEffect, useRef } from 'react';
import { Code, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          delay: 0.3,
        });
      }

      gsap.set('.contact-subtitle', { opacity: 0, y: 40, filter: 'blur(10px)' });
      gsap.to('.contact-subtitle', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.6,
      });

      const buttons = contactRef.current?.querySelectorAll('.cta-btn') ?? [];
      buttons.forEach((btn, i) => {
        gsap.set(btn, { opacity: 0, y: 40, scale: 0.8, rotateY: -90 });
        gsap.to(btn, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.7,
          ease: 'back.out(1.3)',
          delay: 0.8 + i * 0.15,
        });

        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      });

      gsap.set('.copyright-text', { opacity: 0, y: 20 });
      gsap.to('.copyright-text', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.5,
      });
    }, contactRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="contact-content">
        <h1 className="contact-title" ref={titleRef}>
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
        </h1>

        <p className="contact-subtitle">
          Whether you need a website redesign, brand strategy, or full digital transformation, I'm here to help bring your vision to life.
        </p>

        <div className="contact-buttons">
          <button className="cta-btn cta-primary">START A PROJECT →</button>
          <button className="cta-btn cta-secondary">SCHEDULE A CALL</button>
        </div>

        <div className="contact-email-section">
          <a href="mailto:hello@gowtham.dev" className="contact-email">
            hello@gowtham.dev
          </a>

          <div className="social-links">
            <a href="#" className="social-link" title="LinkedIn">
              <ExternalLink size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="social-link" title="Twitter">
              <ExternalLink size={20} />
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link" title="GitHub">
              <Code size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="contact-footer">
        <p className="copyright-text">© 2024 GOWTHAM C D. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;