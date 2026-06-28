import { motion } from 'framer-motion';

/**
 * Reveal — a reusable scroll-triggered animation wrapper.
 *
 * Usage:
 *   <Reveal>single element</Reveal>
 *   <Reveal stagger>multiple children stagger automatically</Reveal>
 *   <Reveal delay={0.2}>delayed single</Reveal>
 *
 * Props:
 *   children   — React node(s)
 *   delay      — initial delay in seconds (default 0)
 *   duration   — animation duration in seconds (default 0.6)
 *   stagger    — if true, wraps children in a stagger container (staggerChildren: 0.08)
 *   y          — slide-up distance in px (default 28)
 *   className  — forwarded to the wrapper div
 *   once       — trigger animation only once (default true)
 */

const itemVariants = (y = 28, duration = 0.6) => ({
  hidden:  { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } },
});

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function RevealItem({ children, delay = 0, duration = 0.6, y = 28, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={itemVariants(y, duration)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  stagger = false,
  y = 28,
  className = '',
  once = true,
}) {
  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-60px' }}
        variants={containerVariants}
        className={className}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={itemVariants(y, duration)}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants(y, duration)}>{children}</motion.div>
        }
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={itemVariants(y, duration)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
