import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import HeroVisual from './HeroVisual';

// Custom typewriter component
function Typewriter() {
  const roles = [
    'Full-Stack Developer',
    'Mobile App Developer (Flutter)',
    'Machine Learning Enthusiast',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <span className="text-accent-violet inline-flex items-center font-heading font-semibold">
      {currentText}
      <span className="animate-[pulse_0.8s_infinite] ml-1 font-bold text-accent-violet">|</span>
    </span>
  );
}

export default function Hero() {
  // Mouse parallax state for HeroVisual
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    setMouse({
      x: (e.clientX / innerWidth - 0.5) * 2,
      y: (e.clientY / innerHeight - 0.5) * 2,
    });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      window.scrollTo({ top: targetEl.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } },
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
        >
          {/* Label */}
          <motion.span
            variants={itemVariants}
            className="text-accent-violet font-heading font-medium tracking-wider text-lg uppercase mb-3 block"
          >
            Hi, I'm
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white leading-tight tracking-tight mb-4"
          >
            Umer Nisar
          </motion.h1>

          {/* Typewriter Line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-lg md:text-xl text-text-secondary mb-6 font-body"
          >
            <FiCode className="text-accent-violet flex-shrink-0" size={22} />
            <Typewriter />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mb-8"
          >
            Software Engineering student (CGPA 3.85/4.00) at COMSATS University Islamabad, building full-stack web apps, cross-platform mobile apps, and ML pipelines. Currently seeking a Software Development Internship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
          >
            <motion.a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, 'projects')}
              whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(124,58,237,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex items-center gap-2 bg-accent-violet hover:bg-accent-hover text-white rounded-full px-7 py-3.5 text-sm md:text-base font-medium transition-colors duration-250 shadow-lg shadow-accent-violet/20"
            >
              View Projects
              <FiArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex items-center gap-2 border border-white/20 hover:border-accent-violet text-white hover:text-accent-hover rounded-full px-7 py-3.5 text-sm md:text-base font-medium transition-all duration-250"
            >
              Contact Me
              <FiArrowRight className="rotate-45" size={18} />
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {[
              { href: 'https://github.com/UmerDevHub', icon: FiGithub, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/umer-nisar-699a39352/?skipRedirect=true', icon: FiLinkedin, label: 'LinkedIn' },
              { href: 'mailto:umernisar053@gmail.com', icon: FiMail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-violet hover:border-accent-violet transition-colors duration-250"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Column - Editor Mockup Visual */}
        <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
          <HeroVisual mouseX={mouse.x} mouseY={mouse.y} />
        </div>

      </div>
    </div>
  );
}
