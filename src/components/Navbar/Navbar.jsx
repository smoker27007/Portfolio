import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`nav-main ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-left">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link-item">
              {link.name}
            </a>
          ))}
        </div>

        <a href="#home" className="nav-center">
          <span className="nav-logo">Gowtham C D</span>
        </a>

        <div className="nav-right">
          <a href="mailto:hello@gowtham.dev" className="nav-contact">
            hello@gowtham.dev
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-contact"
          >
            GitHub
          </a>
        </div>

        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`nav-mobile-menu ${isOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a href="mailto:hello@gowtham.dev" className="nav-mobile-link">
          hello@gowtham.dev
        </a>
      </div>
    </nav>
  );
};

export default Navbar;