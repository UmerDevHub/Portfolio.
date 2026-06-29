import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { techIconMap } from '../data/projects';

// Per-project fallback gradient (cycles by id)
const gradients = [
  'from-violet-900 via-indigo-900 to-blue-900',
  'from-rose-900 via-pink-900 to-purple-900',
  'from-emerald-900 via-teal-900 to-cyan-900',
  'from-orange-900 via-red-900 to-rose-900',
  'from-blue-900 via-sky-900 to-indigo-900',
  'from-amber-900 via-orange-900 to-yellow-900',
  'from-purple-900 via-violet-900 to-indigo-900',
];

export default function ProjectCard({ project, index = 0 }) {
  const { id, title, category, description, techIcons, image, liveUrl, githubUrl, liveLabel } = project;
  const fallbackGradient = gradients[(id - 1) % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative glass rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-accent-violet/50 hover:shadow-2xl hover:shadow-accent-violet/15 transition-colors duration-300 cursor-default"
    >
      {/* Animated violet glow border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.4)' }}
      />

      {/* Thumbnail / Cover Image — fixed aspect ratio */}
      <div className="relative w-full overflow-hidden bg-[#0E0E18]" style={{ height: '180px' }}>
        {/* Fallback gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} opacity-80`} />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full ease-in-out" />

        {image ? (
          <img
            src={image}
            alt={`${title} project screenshot`}
            width={600}
            height={338}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : null}

        {/* Bottom legibility gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0F]/90 to-transparent pointer-events-none" />
      </div>

      {/* Card Body — flex-1 so all bodies stretch to same height */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title */}
        <h3 className="font-heading font-bold text-white text-lg leading-snug group-hover:text-accent-hover transition-colors duration-300 line-clamp-1">
          {title}
        </h3>

        {/* Description — fixed 2-line clamp so all cards have same description height */}
        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 min-h-[2.8rem]">
          {description}
        </p>

        {/* Tech Icon Chips — Devicon colorful SVG icons */}
        <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
          {techIcons.map((key) => {
            const tech = techIconMap[key];
            if (!tech) return null;
            return (
              <motion.span
                key={key}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(124,58,237,0.15)' }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 text-[11px] font-body font-medium rounded-full px-2.5 py-1 bg-white/5 border border-white/10 text-text-secondary cursor-default"
              >
                <img
                  src={tech.src}
                  alt={tech.label}
                  width={14}
                  height={14}
                  loading="lazy"
                  decoding="async"
                  className="w-3.5 h-3.5 object-contain flex-shrink-0"
                />
                {tech.label}
              </motion.span>
            );
          })}
        </div>

        {/* Spacer pushes buttons to the very bottom */}
        <div className="flex-1" />

        {/* Action Buttons — always at the bottom */}
        <div className="flex items-center gap-2.5 pt-1">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-violet hover:bg-accent-hover text-white rounded-xl py-2.5 text-sm font-medium transition-colors duration-200"
            >
              <FiExternalLink size={14} aria-hidden="true" />
              {liveLabel || 'Live Demo'}
            </motion.a>
          )}
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, borderColor: 'rgba(124,58,237,0.6)', color: '#ffffff' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`flex items-center justify-center gap-2 border border-white/15 text-text-secondary rounded-xl py-2.5 text-sm font-medium transition-colors duration-200 px-4 ${!liveUrl ? 'flex-1' : ''}`}
          >
            <FiGithub size={14} aria-hidden="true" />
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
