import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPhone,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi';

// ——— Info rows data ———
const contactInfo = [
  {
    icon: FiPhone,
    label: 'Phone',
    display: '03065082951',
    href: 'tel:+923065082951',
  },
  {
    icon: FiMail,
    label: 'Email',
    display: 'umernisar053@gmail.com',
    href: 'mailto:umernisar053@gmail.com',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    display: 'github.com/UmerDevHub',
    href: 'https://github.com/UmerDevHub',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    display: 'linkedin.com/in/umer-nisar-699a39352',
    href: 'https://www.linkedin.com/in/umer-nisar-699a39352/',
  },
];

// ——— Shared input class ———
const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-white placeholder-text-secondary outline-none transition-all duration-200 focus:border-accent-violet focus:ring-2 focus:ring-accent-violet/30';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: connect to Formspree endpoint https://formspree.io/f/xbderjjr
    console.log('Form submitted:', form);

    // Simulate a short async delay
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });

    // Auto-hide success toast after 4s
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="w-full py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent-violet font-heading font-medium tracking-widest text-sm uppercase">
              Contact
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-3">
            Let's Build Something Together
          </h2>
          <p className="font-body text-text-secondary text-base md:text-lg max-w-xl">
            Open to Software Development Internship opportunities — let's talk.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column — Info Card (~2/5) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-7 flex flex-col gap-6 h-full">
              <div>
                <h3 className="font-heading font-semibold text-white text-xl mb-1">
                  Get in Touch
                </h3>
                <p className="font-body text-sm text-text-secondary">
                  Feel free to reach out through any of the channels below — I usually respond within 24 hours.
                </p>
              </div>

              {/* Info Rows */}
              <div className="flex flex-col gap-5">
                {contactInfo.map(({ icon: Icon, label, display, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center text-accent-violet shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider mb-0.5">
                        {label}
                      </span>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-body text-sm text-white hover:text-accent-hover transition-colors duration-200 break-all"
                      >
                        {display}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative bottom note */}
              <div className="mt-auto pt-4 border-t border-white/5">
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  💼 Currently seeking a{' '}
                  <span className="text-accent-violet font-medium">
                    Software Development Internship
                  </span>{' '}
                  — available to start immediately.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Contact Form (~3/5) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-7 h-full">
              <h3 className="font-heading font-semibold text-white text-xl mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email side by side (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Umer Nisar"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Hi Umer, I'd love to connect about..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="flex items-center justify-center gap-2 bg-accent-violet hover:bg-accent-hover text-white font-heading font-medium rounded-xl py-3.5 px-8 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-accent-violet/20 self-start"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSend size={16} />
                  )}
                  {loading ? 'Sending…' : 'Send Message'}
                </motion.button>
              </form>

              {/* Success Toast */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3.5"
                  >
                    <FiCheckCircle size={18} className="text-emerald-400 shrink-0" />
                    <p className="font-body text-sm text-emerald-300">
                      Message sent! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
