import { useScrollEffect } from '../hooks/useScrollEffect';

export function BackgroundEffects() {
  const scrollY = useScrollEffect();

  return (
    <>
      <div className="bg-grid"></div>
      <div
        className="bg-gradient"
        style={{
          transform: `translateY(${scrollY * -0.5}px)`
        }}
      ></div>
    </>
  );
}
