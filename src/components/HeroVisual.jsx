import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

export default function HeroVisual({ mouseX = 0, mouseY = 0 }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotateX(-y / 20);
    setRotateY(x / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Fake syntax highlighted code lines
  const codeLines = [
    { num: '01', indent: 0, text: <><span className="text-[#C084FC]">const</span> <span className="text-[#38BDF8]">developer</span> = &#123;</> },
    { num: '02', indent: 1, text: <><span className="text-[#99F6E4]">name</span>: <span className="text-[#34D399]">"Umer Nisar"</span>,</> },
    { num: '03', indent: 1, text: <><span className="text-[#99F6E4]">role</span>: <span className="text-[#34D399]">"Full-Stack Dev"</span>,</> },
    { num: '04', indent: 1, text: <><span className="text-[#99F6E4]">education</span>: &#123;</> },
    { num: '05', indent: 2, text: <><span className="text-[#99F6E4]">college</span>: <span className="text-[#34D399]">"COMSATS"</span>,</> },
    { num: '06', indent: 2, text: <><span className="text-[#99F6E4]">gpa</span>: <span className="text-[#F59E0B]">3.85</span></> },
    { num: '07', indent: 1, text: <>&#125;,</> },
    { num: '08', indent: 1, text: <><span className="text-[#99F6E4]">skills</span>: [</> },
    { num: '09', indent: 2, text: <><span className="text-[#34D399]">"React"</span>, <span className="text-[#34D399]">"Tailwind"</span>,</> },
    { num: '10', indent: 2, text: <><span className="text-[#34D399]">"Flutter"</span>, <span className="text-[#34D399]">"Python"</span>,</> },
    { num: '11', indent: 2, text: <><span className="text-[#34D399]">"Machine Learning"</span></> },
    { num: '12', indent: 1, text: <>],</> },
    { num: '13', indent: 1, text: <><span className="text-[#99F6E4]">passionate</span>: <span className="text-[#F59E0B]">true</span>,</> },
    { num: '14', indent: 1, text: <><span className="text-[#99F6E4]">buildSolutions</span>: () =&gt; <span className="text-[#F59E0B]">true</span></> },
    { num: '15', indent: 0, text: <>&#125;;</> },
  ];

  return (
    <div className="hidden lg:flex relative items-center justify-center w-full h-[500px]">

      {/* Background Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none -z-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Orbit Ring 1 — Inner, rotating clockwise + parallax */}
      <motion.div
        animate={{ rotate: 360, x: mouseX * 8, y: mouseY * 4 }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, x: { duration: 0.6, ease: 'easeOut' }, y: { duration: 0.6, ease: 'easeOut' } }}
        className="absolute w-[440px] h-[190px] border border-accent-violet/30 rounded-full -z-10 opacity-75 pointer-events-none"
        style={{ rotateX: 62, rotateY: 12 }}
      />

      {/* Orbit Ring 2 — Outer, rotating counter-clockwise + parallax */}
      <motion.div
        animate={{ rotate: -360, x: mouseX * 5, y: mouseY * 3 }}
        transition={{ rotate: { duration: 35, repeat: Infinity, ease: 'linear' }, x: { duration: 0.7, ease: 'easeOut' }, y: { duration: 0.7, ease: 'easeOut' } }}
        className="absolute w-[500px] h-[230px] border border-accent-violet/15 rounded-full -z-10 opacity-50 pointer-events-none"
        style={{ rotateX: 62, rotateY: 12 }}
      />

      {/* Sphere — Left, small (parallax factor: -12) */}
      <motion.div
        animate={{ y: [0, -12, 0], x: mouseX * -12 }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 0.5, ease: 'easeOut' } }}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #9f6fff, #5b21b6 60%, #3b0f8e)',
          boxShadow: '0 0 18px 5px rgba(124,58,237,0.6)',
        }}
      />

      {/* Sphere — Top center, medium (parallax factor: -8) */}
      <motion.div
        animate={{ y: [0, -10, 0], x: mouseX * -8, y2: mouseY * -6 }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }, x: { duration: 0.6, ease: 'easeOut' } }}
        className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #9f6fff, #5b21b6 60%, #3b0f8e)',
          boxShadow: '0 0 22px 6px rgba(124,58,237,0.65)',
        }}
      />

      {/* Sphere — Right, large blurry (parallax factor: 10) */}
      <motion.div
        animate={{ y: [0, 18, 0], x: mouseX * 10 }}
        transition={{ y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }, x: { duration: 0.7, ease: 'easeOut' } }}
        className="absolute right-4 top-1/4 w-14 h-14 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #9f6fff, #5b21b6 60%, #3b0f8e)',
          boxShadow: '0 0 30px 10px rgba(124,58,237,0.35)',
          filter: 'blur(2px)',
        }}
      />

      {/* Background Soft Glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-accent-violet/10 blur-3xl -z-20 animate-[pulse_7s_infinite] pointer-events-none" />

      {/* Main Tablet Mockup — Float loop */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ perspective: 1000 }}
      >
        {/* Tiltable Device */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-[310px] h-[400px] bg-[#0E0E15]/90 border border-white/10 rounded-[2.2rem] shadow-2xl p-5 flex flex-col gap-4 backdrop-blur-md cursor-pointer select-none"
        >
          {/* Glow border */}
          <div className="absolute inset-0 rounded-[2.2rem] border border-accent-violet/20 pointer-events-none opacity-40" />

          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5" style={{ transform: 'translateZ(10px)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span className="font-heading text-xs font-medium text-text-secondary tracking-wider">
              developer.js
            </span>
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>

          {/* Code Block */}
          <div className="flex-1 overflow-hidden" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex gap-4 font-mono text-[12px] leading-relaxed text-left">
              {/* Line numbers */}
              <div className="flex flex-col text-white/20 select-none text-right shrink-0">
                {codeLines.map((line) => (
                  <span key={line.num}>{line.num}</span>
                ))}
              </div>
              {/* Code content */}
              <div className="flex flex-col text-text-secondary overflow-hidden">
                {codeLines.map((line, idx) => (
                  <div
                    key={idx}
                    style={{ paddingLeft: `${line.indent * 12}px` }}
                    className="whitespace-nowrap"
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* </> Badge — right middle edge */}
          <div
            className="absolute -right-3 top-[170px] w-11 h-11 bg-gradient-to-br from-accent-violet to-[#5B21B6] rounded-xl border border-white/20 flex items-center justify-center text-white shadow-xl shadow-accent-violet/30 hover:scale-110 transition-transform duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
            <FiCode size={20} />
          </div>

          {/* Glass Tooltip — bottom-right */}
          <div
            className="absolute -bottom-4 -right-4 bg-[#0A0A0F]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-[190px] shadow-2xl flex items-center justify-between"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-heading font-medium tracking-wide text-white leading-normal">
                Always building
              </span>
              <span className="text-[11px] font-heading font-medium tracking-wide text-white leading-normal">
                real solutions.
              </span>
            </div>
            <span className="relative flex h-2.5 w-2.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

        </motion.div>
      </motion.div>

    </div>
  );
}
