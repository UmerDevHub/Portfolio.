import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import projects from '../data/projects';
import ProjectCard from './ProjectCard';

const CARD_WIDTH_APPROX = 320; // px — matches card min-w below

export default function Projects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
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

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * CARD_WIDTH_APPROX, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="w-full py-24 border-b border-white/5 bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between gap-6 mb-12"
        >
          {/* Left — label + heading + subheading */}
          <div className="flex flex-col gap-2">
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
          </div>

          {/* Right — arrow buttons (desktop only) */}
          <div className="hidden md:flex items-center gap-2 shrink-0 pt-2">
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
        </motion.div>

        {/* Horizontal Scroll Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Left fade edge */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-surface-dark to-transparent z-10 transition-opacity duration-300"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />
          {/* Right fade edge */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-dark to-transparent z-10 transition-opacity duration-300"
            style={{ opacity: canScrollRight ? 1 : 0 }}
          />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="shrink-0 w-[85vw] sm:w-[44vw] lg:w-[calc(25%-16px)] xl:w-[calc(25%-15px)] min-w-[280px] max-w-[340px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
