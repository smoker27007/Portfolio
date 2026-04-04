import React from 'react';
import { Send, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
      <div className="section-header">
        <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
        <p className="section-subtitle">Interested in working together? Drop me a message.</p>
      </div>

      <div className="contact-container glass">
        <div className="contact-info">
          <h3 className="contact-info-title">Contact Information</h3>
          <p className="contact-info-desc">Fill out the form and I'll get back to you within 24 hours.</p>

          <div className="contact-details">
            <div className="contact-item">
              <Mail size={20} className="icon" />
              <span>hello@example.com</span>
            </div>
            <div className="contact-item">
              <Phone size={20} className="icon" />
              <span>+1 (555) 000-0000</span>
            </div>
            <div className="contact-item">
              <MapPin size={20} className="icon" />
              <span>San Francisco, California</span>
            </div>
          </div>

          <div className="contact-social">
            <a href="#" className="social-icon glass"><ExternalLink size={18} /></a>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group grid-2">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" className="glass" />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" className="glass" />
            </div>
          </div>
          
          <div className="input-group">
            <label>Subject</label>
            <input type="text" placeholder="Project Inquiry" className="glass" />
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea placeholder="Tell me about your project..." rows="5" className="glass"></textarea>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;