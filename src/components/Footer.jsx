import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const navLinks = [
  { name: 'Home',      href: '#home'      },
  { name: 'About',     href: '#about'     },
  { name: 'Skills',    href: '#skills'    },
  { name: 'Projects',  href: '#projects'  },
  { name: 'Education', href: '#education' },
  { name: 'Contact',   href: '#contact'   },
];

const socialLinks = [
  { icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/UmerDevHub'                                           },
  { icon: FiLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/umer-nisar-699a39352/?skipRedirect=true'     },
  { icon: FiMail,     label: 'Email',     href: 'mailto:umernisar053@gmail.com'                                           },
];

function handleSmoothScroll(e, href) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  }
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Three-column row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">

          {/* Left — Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent-violet rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-accent-violet/20">
                UN
              </div>
              <span className="font-heading font-semibold text-white text-lg tracking-wide">
                Umer Nisar
              </span>
            </div>
            <p className="font-body text-xs text-text-secondary max-w-[200px] leading-relaxed">
              Building real products. Solving real problems.
            </p>
          </div>

          {/* Center — Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-body text-sm text-text-secondary hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right — Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-violet hover:border-accent-violet transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/5" />

        {/* Copyright */}
        <p className="mt-6 text-center font-body text-xs text-text-secondary">
          © 2026 Umer Nisar. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
