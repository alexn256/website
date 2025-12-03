import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  icon: string;
  name: string;
  description: string;
  level: number;
}

const skills: Skill[] = [
  {
    id: 'java',
    icon: '☕',
    name: 'Java',
    description: 'Enterprise applications & microservices',
    level: 90,
  },
  {
    id: 'kotlin',
    icon: '🎯',
    name: 'Kotlin',
    description: 'Modern JVM development',
    level: 85,
  },
  {
    id: 'spring',
    icon: '🌱',
    name: 'Spring',
    description: 'Framework ecosystem',
    level: 88,
  },
  {
    id: 'database',
    icon: '🗄️',
    name: 'Databases',
    description: 'SQL & NoSQL solutions',
    level: 82,
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isIntersecting) {
      setTimeout(() => {
        setWidth(skill.level);
      }, 300);
    }
  }, [isIntersecting, skill.level]);

  return (
    <div
      ref={ref}
      className={`skill-card ${isIntersecting ? 'animate-in' : ''}`}
      data-skill={skill.id}
    >
      <div className="skill-icon">{skill.icon}</div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-description">{skill.description}</p>
      <div className="skill-level">
        <div
          className="skill-bar"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-header">
        <h2 className="section-title">Core Technologies</h2>
        <p className="section-subtitle">Technologies I work with daily</p>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
