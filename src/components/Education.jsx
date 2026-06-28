import { motion } from 'framer-motion';
import {
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiStar,
} from 'react-icons/fi';

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Chip({ label, color = 'default' }) {
  const colorMap = {
    default: 'bg-white/5 border-white/10 text-text-secondary',
    violet:  'bg-accent-violet/10 border-accent-violet/20 text-[#C4B5FD]',
  };
  return (
    <span className={`text-[11px] font-body font-medium rounded-full px-3 py-1 border ${colorMap[color]}`}>
      {label}
    </span>
  );
}

function InfoRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm font-body text-text-secondary">
      <Icon size={14} className="text-accent-violet shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function EducationCard() {
  const coursework = [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Software Quality Engineering',
    'Software Construction & Development',
    'Linear Algebra',
    'Design & Analysis of Algorithms',
  ];

  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-7 flex flex-col gap-5 h-full hover:border-accent-violet/30 hover:shadow-lg hover:shadow-accent-violet/5 transition-all duration-300"
    >
      {/* Icon badge + label row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-violet/15 flex items-center justify-center text-accent-violet shrink-0">
          <FiBookOpen size={20} />
        </div>
        <span className="text-accent-violet font-heading font-medium tracking-widest text-xs uppercase">
          Education
        </span>
      </div>

      {/* Timeline line + content */}
      <div className="flex gap-4">
        {/* Vertical timeline */}
        <div className="flex flex-col items-center pt-1 shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent-violet" />
          <div className="w-px flex-1 bg-gradient-to-b from-accent-violet/40 to-transparent mt-1" />
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h3 className="font-heading font-bold text-white text-lg leading-snug">
              Bachelor of Science in<br />Software Engineering
            </h3>
            <p className="font-body text-text-secondary text-sm mt-1">
              COMSATS University Islamabad, Wah Campus
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <InfoRow icon={FiCalendar}>6th Semester</InfoRow>
            <InfoRow icon={FiStar}>
              <span className="text-white font-semibold">CGPA: 3.85/4.00</span>
              <span className="ml-2 text-text-secondary">· Expected 2027</span>
            </InfoRow>
          </div>

          <div>
            <p className="text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {coursework.map((c) => (
                <Chip key={c} label={c} color="violet" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CertificationCard() {
  const covered = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'REST APIs'];

  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl p-7 flex flex-col gap-5 h-full hover:border-accent-violet/30 hover:shadow-lg hover:shadow-accent-violet/5 transition-all duration-300"
    >
      {/* Icon badge + label row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-violet/15 flex items-center justify-center text-accent-violet shrink-0">
          <FiAward size={20} />
        </div>
        <span className="text-accent-violet font-heading font-medium tracking-widest text-xs uppercase">
          Certification
        </span>
      </div>

      {/* Timeline line + content */}
      <div className="flex gap-4">
        {/* Vertical timeline */}
        <div className="flex flex-col items-center pt-1 shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent-violet" />
          <div className="w-px flex-1 bg-gradient-to-b from-accent-violet/40 to-transparent mt-1" />
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h3 className="font-heading font-bold text-white text-lg leading-snug">
              Full Stack Web Development
            </h3>
            <p className="font-body text-text-secondary text-sm mt-1">
              Apna College
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <InfoRow icon={FiCheckCircle}>
              <span className="text-white font-semibold">Completed 2024</span>
            </InfoRow>
          </div>

          <div>
            <p className="text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Covered
            </p>
            <div className="flex flex-wrap gap-2">
              {covered.map((c) => (
                <Chip key={c} label={c} color="violet" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="w-full py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-accent-violet font-heading font-medium tracking-widest text-sm uppercase block mb-2">
            Background
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Education &amp; Certifications
          </h2>
        </motion.div>

        {/* Two-column card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <EducationCard />
          <CertificationCard />
        </motion.div>

      </div>
    </section>
  );
}
