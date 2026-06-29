import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight, FiFileText } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focus on upper middle viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      const offsetTop = targetEl.offsetTop - 80; // navbar offset
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-dark/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Section */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-accent-violet rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-accent-violet/20 group-hover:bg-accent-hover transition-colors duration-300">
              UN
            </div>
            <span className="font-heading font-semibold text-white text-lg tracking-wide group-hover:text-accent-hover transition-colors duration-300">
              Umer Nisar
            </span>
          </a>

          {/* Center Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative font-body text-sm font-medium transition-colors duration-300 py-2 ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-violet"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Section Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="/assets/resume/UmerNisar-Resume_.pdf"
              download="UmerNisar-Resume.pdf"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 border border-white/20 hover:border-accent-violet text-white hover:text-accent-hover rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300"
            >
              <FiFileText size={16} />
              Resume
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-accent-violet hover:bg-accent-hover text-white rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 shadow-lg shadow-accent-violet/20"
            >
              Let's Talk
              <FiArrowRight size={16} />
            </motion.a>
          </div>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-accent-violet transition-colors p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        </div>
      </header>

      {/* Drawer Menu - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[285px] bg-surface-dark border-l border-white/10 z-50 md:hidden p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex flex-col gap-8">
                {/* Header in drawer */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-accent-violet rounded-lg flex items-center justify-center font-bold text-white text-md">
                      UN
                    </div>
                    <span className="font-heading font-semibold text-white text-md tracking-wide">
                      Umer Nisar
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-text-secondary hover:text-white transition-colors"
                  >
                    <FiX size={22} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={`font-body text-lg font-medium transition-colors duration-300 relative py-1 self-start ${
                          isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeUnderlineMobile"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-violet"
                          />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Action Buttons in drawer */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                <motion.a
                  href="/assets/resume/UmerNisar-Resume_.pdf"
                  download="UmerNisar-Resume.pdf"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 border border-white/20 hover:border-accent-violet text-white hover:text-accent-hover rounded-full py-3 text-sm font-medium transition-colors duration-300"
                >
                  <FiFileText size={16} />
                  Download Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-accent-violet hover:bg-accent-hover text-white rounded-full py-3 text-sm font-medium transition-colors duration-300 shadow-lg shadow-accent-violet/20"
                >
                  Let's Talk
                  <FiArrowRight size={16} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
