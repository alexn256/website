import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Footer() {
  const [visitCount, setVisitCount] = useLocalStorage('visitCount', 0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Increment visit count
    setVisitCount(visitCount + 1);
  }, []);

  useEffect(() => {
    // Animate counter
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(visitCount * easeOutQuart);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visitCount]);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Alexander Naumov. Built with passion.</p>
        <div className="visit-counter">
          <span id="visitCount">{displayCount.toLocaleString()}</span> visits
        </div>
      </div>
    </footer>
  );
}
