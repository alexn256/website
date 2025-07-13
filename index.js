// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
        this.updateToggleIcon();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }

    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Visit Counter
class VisitCounter {
    constructor() {
        this.init();
    }

    init() {
        let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        visitCount++;
        localStorage.setItem('visitCount', visitCount.toString());
        this.updateDisplay(visitCount);
    }

    updateDisplay(count) {
        const counter = document.getElementById('visitCount');
        if (counter) {
            // Animate the number counting up
            this.animateCount(counter, 0, count, 1000);
        }
    }

    animateCount(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for skill bars
                    if (entry.target.classList.contains('skill-card')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, options);

        // Observe elements
        document.querySelectorAll('.skill-card, .contact-item, .social-link').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateSkillBar(skillCard) {
        const skillBar = skillCard.querySelector('.skill-bar');
        if (skillBar) {
            setTimeout(() => {
                skillBar.style.width = skillBar.style.getPropertyValue('--width') || '0%';
            }, 300);
        }
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.nav');
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            this.navbar.style.background = scrolled 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.8)';
            
            // Update for dark theme
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = scrolled 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(15, 23, 42, 0.8)';
            }
        });
    }
}

// Parallax Effect for Background
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        const bgGradient = document.querySelector('.bg-gradient');
        if (!bgGradient) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            bgGradient.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Typing Effect for Code Window
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
        const codeLines = document.querySelectorAll('.code-line');
        if (codeLines.length === 0) return;

        // Hide all lines initially
        codeLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
        });

        // Animate lines one by one
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transition = 'all 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 200 + 1000); // Start after 1 second, then 200ms between lines
        });
    }
}

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Only add cursor trail on desktop
        if (window.innerWidth < 768) return;

        // Create trail dots
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({
                element: dot,
                x: 0,
                y: 0,
                delay: i * 0.05
            });
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Animate dots
        this.animate();
    }

    animate() {
        this.dots.forEach((dot, index) => {
            const targetX = this.mouse.x - 2;
            const targetY = this.mouse.y - 2;
            
            dot.x += (targetX - dot.x) * (0.3 - index * 0.02);
            dot.y += (targetY - dot.y) * (0.3 - index * 0.02);
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            dot.element.style.opacity = Math.max(0, 1 - index * 0.1);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new VisitCounter();
    new SmoothScroll();
    new AnimationObserver();
    new NavbarScroll();
    new ParallaxEffect();
    new TypingEffect();
    new CursorTrail();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any size-dependent features
    if (window.innerWidth < 768) {
        // Remove cursor trail on mobile
        document.querySelectorAll('.cursor-dot').forEach(dot => {
            dot.remove();
        });
    }
});

// Add some Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        // Easter egg: Add some fun animation
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);