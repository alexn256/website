import { useEffect, useState } from 'react';

const codeLines = [
  { content: <><span className="code-keyword">public class</span> <span className="code-class">Developer</span> {'{'}</>, delay: 1000 },
  { content: <><span className="code-indent">private String</span> <span className="code-variable">name</span> = <span className="code-string">"Alexander"</span>;</>, delay: 1200 },
  { content: <><span className="code-indent">private String[]</span> <span className="code-variable">skills</span> = {'{'}</>, delay: 1400 },
  { content: <><span className="code-indent2">"Java"</span>, <span className="code-string">"Spring"</span>, <span className="code-string">"Kotlin"</span></>, delay: 1600 },
  { content: <><span className="code-indent">{'};'}</span></>, delay: 1800 },
  { content: <>{'}'}</>, delay: 2000 },
];

export function CodeWindow() {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(new Array(codeLines.length).fill(false));

  useEffect(() => {
    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, line.delay);
    });
  }, []);

  return (
    <div className="code-window">
      <div className="code-header">
        <div className="code-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="code-title">Developer.java</span>
      </div>
      <div className="code-content">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className="code-line"
            style={{
              opacity: visibleLines[index] ? 1 : 0,
              transform: visibleLines[index] ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.5s ease'
            }}
          >
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
}
