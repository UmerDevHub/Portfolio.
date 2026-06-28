import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { techIconMap } from '../data/projects';

// Per-project fallback gradient (cycles by id)
const gradients = [
  'from-violet-900/80 via-indigo-900/60 to-blue-900/80',
  'from-rose-900/80 via-pink-900/60 to-purple-900/80',
  'from-emerald-900/80 via-teal-900/60 to-cyan-900/80',
  'from-orange-900/80 via-red-900/60 to-rose-900/80',
  'from-blue-900/80 via-sky-900/60 to-indigo-900/80',
  'from-amber-900/80 via-orange-900/60 to-yellow-900/80',
  'from-purple-900/80 via-violet-900/60 to-indigo-900/80',
  'from-cyan-900/80 via-blue-900/60 to-teal-900/80',
];

export default function ProjectCard({ project }) {
  const {
    id,
    title,
    category,
    description,
    techIcons,
    image,
    liveUrl,
    githubUrl,
    liveLabel,
  } = project;

  const fallbackGradient = gradients[(id - 1) % gradients.length];

  return (
    <div className="group glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-accent-violet/40 hover:shadow-xl hover:shadow-accent-violet/10">

      {/* Thumbnail / Cover Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0E0E18]">
        {image ? (
          <img
            src={image}
            alt={`${title} project screenshot`}
            width={600}
            height={338}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : null}

        {/* Fallback gradient (always rendered, sits behind image or alone) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} transition-opacity duration-300 ${image ? 'opacity-0 group-hover:opacity-20' : 'opacity-100'}`}
        />

        {/* Bottom legibility gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />

        {/* Category badge floating on the image */}
        <span className="absolute top-3 left-3 text-[11px] font-heading font-medium text-accent-hover bg-accent-violet/20 border border-accent-violet/30 rounded-full px-3 py-1 backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 gap-3 p-5">

        {/* Title */}
        <h3 className="font-heading font-bold text-white text-lg leading-snug group-hover:text-accent-hover transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech Icon Chips */}
        <div className="flex flex-wrap gap-2 mt-1">
          {techIcons.map((key) => {
            const tech = techIconMap[key];
            if (!tech) return null;
            const Icon = tech.icon;
            return (
              <span
                key={key}
                className="flex items-center gap-1.5 text-[11px] font-body font-medium rounded-full px-2.5 py-1 bg-white/5 border border-white/10 text-text-secondary"
              >
                <Icon size={11} style={{ color: tech.color, flexShrink: 0 }} />
                {tech.label}
              </span>
            );
          })}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-accent-violet hover:bg-accent-hover text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent-violet/20"
            >
              <FiExternalLink size={14} />
              {liveLabel || 'Live Demo'}
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 border border-white/15 hover:border-accent-violet/50 text-text-secondary hover:text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-300 ${liveUrl ? 'px-4' : 'flex-1 px-4'}`}
          >
            <FiGithub size={14} />
            GitHub
          </a>
        </div>
      </div>

    </div>
  );
}
