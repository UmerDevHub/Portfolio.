import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import skills from '../data/skills';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function SkillCard({ category, icon: Icon, color, bgColor, chipColor, chipBorder, chipText, chips }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-5 flex flex-col gap-4 group hover:border-white/20 hover:shadow-lg transition-all duration-300"
      style={{ '--card-accent': color }}
    >
      {/* Icon Badge + Title */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: bgColor, color }}
        >
          <Icon size={18} />
        </div>
        <h3 className="font-heading font-semibold text-white text-sm leading-tight">
          {category}
        </h3>
      </div>

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="text-[11px] font-body font-medium rounded-full px-3 py-1 leading-none"
            style={{
              background: chipColor,
              border: `1px solid ${chipBorder}`,
              color: chipText,
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between gap-4 mb-14"
        >
          {/* Left: label + heading */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent-violet font-heading font-medium tracking-widest text-sm uppercase">
                Skills &amp; Technologies
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
              Technologies I work with<br className="hidden md:block" /> to build modern solutions
            </h2>
          </div>

          {/* Right: Explore More button (desktop only) */}
          <div className="hidden md:flex shrink-0 items-start pt-1">
            <a
              href="https://github.com/UmerDevHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/15 hover:border-accent-violet text-text-secondary hover:text-white rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
            >
              <FiCode size={15} />
              Explore More
            </a>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.category} {...skill} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
