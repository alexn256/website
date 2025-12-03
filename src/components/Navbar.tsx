import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useScrollEffect } from '../hooks/useScrollEffect';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const scrollY = useScrollEffect();
  const [navBackground, setNavBackground] = useState('rgba(255, 255, 255, 0.8)');

  useEffect(() => {
    const scrolled = scrollY > 50;
    if (theme === 'dark') {
      setNavBackground(scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)');
    } else {
      setNavBackground(scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)');
    }
  }, [scrollY, theme]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="nav" style={{ background: navBackground }}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">AN</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>
            About
          </a>
          <a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, '#skills')}>
            Skills
          </a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>
            Contact
          </a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
        </button>
      </div>
    </nav>
  );
}
