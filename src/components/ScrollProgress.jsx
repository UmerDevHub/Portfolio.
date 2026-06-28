import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — a thin violet bar fixed at the very top of the viewport
 * that fills left-to-right as the user scrolls down the page.
 * Uses a raw scroll listener + RAF for maximum performance (no Framer Motion overhead).
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let rafId;

    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set initial state

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      {/* Full-width track (faint) */}
      <div className="absolute inset-0 bg-accent-violet/15" />
      {/* Animated fill bar */}
      <div
        ref={barRef}
        className="absolute inset-0 bg-gradient-to-r from-accent-violet via-accent-hover to-accent-violet origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
