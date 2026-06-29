import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import projects from '../data/projects';
import ProjectCard from './ProjectCard';

const CARD_WIDTH_APPROX = 320;

// ─── Desktop Infinite Marquee ────────────────────────────────────────────────
function MarqueeRow() {
  const doubled = [...projects, ...projects];
  const trackRef     = useRef(null);
  const containerRef = useRef(null);
  const offsetRef    = useRef(0);
  const rafRef       = useRef(null);
  const pausedRef    = useRef(false);
  const mouseSpeedRef = useRef(0); // px/frame driven by mouse zone

  const [zone, setZone] = useState('center'); // 'left' | 'center' | 'right'
  const [hovered, setHovered] = useState(false);

  // RAF animation loop — runs always, direction driven by pausedRef + mouseSpeedRef
  useEffect(() => {
    const AUTO_SPEED = 1.2; // px per frame auto-scroll

    const tick = () => {
      const track = trackRef.current;
      if (!track) { rafRef.current = requestAnimationFrame(tick); return; }

      const singleWidth = track.scrollWidth / 2;

      if (!pausedRef.current) {
        // Auto-play: slide left
        offsetRef.current -= AUTO_SPEED;
      } else {
        // Mouse-driven: mouseSpeedRef set by zone
        offsetRef.current += mouseSpeedRef.current;
      }

      // Seamless loop clamp
      if (offsetRef.current <= -singleWidth) offsetRef.current += singleWidth;
      if (offsetRef.current > 0)             offsetRef.current -= singleWidth;

      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true;  setHovered(true);  };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    mouseSpeedRef.current = 0;
    setHovered(false);
    setZone('center');
  };

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const rel = (e.clientX - left) / width; // 0→1

    // Zones: 0–0.25 strong left, 0.25–0.38 mild left,
    //        0.38–0.62 center (hold), 0.62–0.75 mild right, 0.75–1 strong right
    if (rel < 0.25)       { mouseSpeedRef.current =  5;  setZone('left');   }
    else if (rel < 0.38)  { mouseSpeedRef.current =  2.5; setZone('left');  }
    else if (rel > 0.75)  { mouseSpeedRef.current = -5;  setZone('right');  }
    else if (rel > 0.62)  { mouseSpeedRef.current = -2.5; setZone('right'); }
    else                  { mouseSpeedRef.current =  0;  setZone('center'); }
  };

  const cursor = !hovered ? 'default'
    : zone === 'left'  ? 'w-resize'
    : zone === 'right' ? 'e-resize'
    : 'default';

  return (
    <div className="relative px-8 md:px-16 lg:px-24">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        style={{ cursor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* LEFT black hole */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{ width: '220px', background: 'linear-gradient(to right, #0A0A0F 0%, #0A0A0F 15%, rgba(10,10,15,0.92) 35%, rgba(10,10,15,0.6) 60%, rgba(10,10,15,0.15) 80%, transparent 100%)' }}
        />
        {/* RIGHT black hole */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{ width: '220px', background: 'linear-gradient(to left, #0A0A0F 0%, #0A0A0F 15%, rgba(10,10,15,0.92) 35%, rgba(10,10,15,0.6) 60%, rgba(10,10,15,0.15) 80%, transparent 100%)' }}
        />

        {/* Left scroll arrow hint */}
        {hovered && zone === 'left' && (
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/60 text-3xl font-bold select-none">
            ←
          </motion.div>
        )}
        {/* Right scroll arrow hint */}
        {hovered && zone === 'right' && (
          <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-white/60 text-3xl font-bold select-none">
            →
          </motion.div>
        )}
        {/* Center hold hint */}
        {hovered && zone === 'center' && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[11px] font-body text-text-secondary bg-[#12121A]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
            ⏸ Move mouse left or right to scroll
          </motion.div>
        )}

        {/* Sliding track — NO CSS animation, driven by RAF */}
        <div
          ref={trackRef}
          className="flex gap-5 w-max py-4"
          style={{ willChange: 'transform' }}
        >
          {doubled.map((project, index) => (
            <div key={`${project.id}-${index}`} className="shrink-0 w-[300px]">
              <ProjectCard project={project} index={index % projects.length} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── Mobile / Tablet Snap-Scroll ─────────────────────────────────────────────
function SnapScrollRow() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * CARD_WIDTH_APPROX, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Arrow buttons */}
      <div className="flex items-center gap-2 justify-end">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canScrollLeft
              ? 'border-white/20 text-white hover:border-accent-violet hover:text-accent-violet'
              : 'border-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canScrollRight
              ? 'border-white/20 text-white hover:border-accent-violet hover:text-accent-violet'
              : 'border-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="shrink-0 w-[85vw] sm:w-[44vw] min-w-[260px] max-w-[320px] flex"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 border-b border-white/5 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-14"
        >
          <div className="flex items-center gap-2">
            <span className="text-accent-violet font-heading font-medium tracking-widest text-sm uppercase">
              Featured Projects
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Things I've Built
          </h2>
          <p className="font-body text-text-secondary text-sm md:text-base max-w-xl mt-1">
            A mix of web platforms, mobile apps, and machine learning tools — all built and shipped end-to-end.
          </p>
        </motion.div>

      </div>

      {/* Desktop: infinite marquee (full-bleed, outside the padded container) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden lg:block pb-6"
      >
        <MarqueeRow />
      </motion.div>

      {/* Mobile / Tablet: manual snap-scroll */}
      <div className="lg:hidden px-6 md:px-12">
        <SnapScrollRow />
      </div>

    </section>
  );
}
