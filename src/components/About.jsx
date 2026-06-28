import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBookOpen, FiFolder, FiSend, FiCode } from 'react-icons/fi';
import Reveal from './Reveal';

// Count-up hook
function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const numericTarget = parseFloat(target);
    if (isNaN(numericTarget)) { setCount(target); return; }
    let start = 0;
    const steps = 60;
    const increment = numericTarget / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else { setCount(start); }
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ icon: Icon, value, label, delay, active }) {
  const numericMatch = value.match(/^[\d.]+/);
  const suffix = value.replace(/^[\d.]+/, '');
  const numericTarget = numericMatch ? parseFloat(numericMatch[0]) : null;
  const counted = useCountUp(numericTarget, 1600, active);

  const displayValue = numericTarget !== null
    ? (Number.isInteger(numericTarget)
        ? `${Math.round(counted)}${suffix}`
        : `${counted.toFixed(2)}${suffix}`)
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="glass rounded-2xl p-6 flex flex-col gap-3 group hover:border-accent-violet/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-violet/10"
    >
      <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center text-accent-violet group-hover:bg-accent-violet/20 transition-colors duration-300">
        <Icon size={20} />
      </div>
      <p className="text-3xl font-heading font-bold text-white tracking-tight">
        {displayValue}
      </p>
      <p className="text-sm font-body text-text-secondary">{label}</p>
    </motion.div>
  );
}

const stats = [
  { icon: FiBookOpen, value: '3.85/4.00', label: 'CGPA'               },
  { icon: FiFolder,   value: '7',         label: 'Projects Shipped'   },
  { icon: FiSend,     value: '2',         label: 'Apps in Production' },
  { icon: FiCode,     value: '5+',        label: 'Tech Stacks Used'   },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="w-full py-24 border-b border-white/5 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <Reveal className="mb-14">
          <span className="text-accent-violet font-heading font-medium tracking-widest text-sm uppercase block mb-2">
            Who I Am
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white">
            About Me
          </h2>
        </Reveal>

        {/* Two-column layout */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <Reveal delay={0.1} className="lg:col-span-2 flex flex-col gap-6">
            <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed">
              Software Engineering student passionate about building real, deployed products — from e-commerce platforms and ride-sharing apps to ML-powered prediction tools. Comfortable across the full stack: React/Node on the web, Flutter on mobile, and Python for machine learning.
            </p>
            <div className="inline-flex items-start gap-3 bg-accent-violet/10 border border-accent-violet/20 rounded-2xl px-5 py-4">
              <span className="text-accent-violet mt-0.5 text-lg leading-none">✦</span>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                Currently focused on building impactful products and growing as a developer.
              </p>
            </div>
          </Reveal>

          {/* Right Column — Stat Cards */}
          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={i * 0.08}
                  active={isInView}
                />
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

