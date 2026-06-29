import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiPackage, FiSmartphone, FiLayers } from 'react-icons/fi';
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

// Each stat has its own gradient config for the icon badge
const gradientMap = {
  'CGPA':               { from: '#7C3AED', to: '#4F46E5', shadow: 'rgba(124,58,237,0.45)' },
  'Projects Shipped':   { from: '#0EA5E9', to: '#6366F1', shadow: 'rgba(14,165,233,0.35)' },
  'Apps in Production': { from: '#10B981', to: '#0EA5E9', shadow: 'rgba(16,185,129,0.35)' },
  'Tech Stacks Used':   { from: '#F59E0B', to: '#EF4444', shadow: 'rgba(245,158,11,0.35)' },
};

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

  const grad = gradientMap[label] || { from: '#7C3AED', to: '#5B21B6', shadow: 'rgba(124,58,237,0.4)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative glass rounded-2xl p-5 flex flex-col gap-3 group overflow-hidden cursor-default
                 border border-white/10 hover:border-white/20 transition-colors duration-300"
      style={{
        boxShadow: 'none',
      }}
    >
      {/* Subtle gradient glow in bg corner */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${grad.from}, transparent)` }}
      />

      {/* Icon badge — large gradient circle */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative"
        style={{
          background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
          boxShadow: `0 6px 18px ${grad.shadow}`,
        }}
      >
        {/* Inner glow ring */}
        <div className="absolute inset-0 rounded-xl border border-white/25" />
        <Icon size={20} color="#fff" strokeWidth={1.8} aria-hidden="true" />
      </motion.div>

      {/* Value + label */}
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-heading font-bold text-white tracking-tight leading-none">
          {displayValue}
        </p>
        <p className="text-sm font-body text-text-secondary leading-snug">{label}</p>
      </div>

      {/* Animated bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
      />
    </motion.div>
  );
}

const stats = [
  { icon: FiAward,      value: '3.85/4.00', label: 'CGPA'               },
  { icon: FiPackage,    value: '7',         label: 'Projects Shipped'   },
  { icon: FiSmartphone, value: '2',         label: 'Apps in Production' },
  { icon: FiLayers,     value: '5+',        label: 'Tech Stacks Used'   },
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
