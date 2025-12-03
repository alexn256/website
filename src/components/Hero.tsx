import { CodeWindow } from './CodeWindow';

export function Hero() {
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
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="status-dot"></span>
          Available for opportunities
        </div>
        <h1 className="hero-title">
          Hello, I'm <span className="highlight">Alexander Naumov</span>
        </h1>
        <p className="hero-subtitle">
          Software Developer from Ukraine, passionate about backend development
        </p>
        <p className="hero-description">
          Crafting robust and scalable solutions with modern technologies.
          Specialized in Java ecosystem and database architecture.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#contact')}>
            Get in touch
            <span className="btn-arrow">→</span>
          </a>
          <a href="https://github.com/alexn256" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View work
            <span className="btn-icon">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <CodeWindow />
      </div>
    </section>
  );
}
