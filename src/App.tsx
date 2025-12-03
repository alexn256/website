import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './styles/main.css';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add loading animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Konami code easter egg
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let konamiSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence.push(e.code);
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
      }

      if (konamiSequence.join(',') === konamiCode.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 5000);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <BackgroundEffects />
      <Navbar />
      <main className="main">
        <Hero />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
