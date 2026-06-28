import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

// Code-split below-the-fold sections — they load only when needed
const Skills    = lazy(() => import('./components/Skills'));
const Projects  = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact   = lazy(() => import('./components/Contact'));
const Footer    = lazy(() => import('./components/Footer'));

// Lightweight section fallback — same height as the section to avoid layout shift
function SectionSkeleton({ minH = 'min-h-[50vh]' }) {
  return (
    <div className={`w-full ${minH} flex items-center justify-center`}>
      <span className="w-6 h-6 rounded-full border-2 border-accent-violet border-t-transparent animate-spin block" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-white relative">
      {/* Scroll-progress bar — fills left-to-right as user scrolls */}
      <ScrollProgress />

      {/* Navigation — eager-loaded (always visible) */}
      <Navbar />

      {/* Main content */}
      <main className="pt-24">
        {/* Hero — eager-loaded for fast LCP */}
        <section id="home" className="min-h-screen flex items-center justify-center border-b border-white/5">
          <Hero />
        </section>

        {/* About — eager-loaded (just below fold, small) */}
        <About />

        {/* Below-fold sections — lazily loaded */}
        <Suspense fallback={<SectionSkeleton minH="min-h-[60vh]" />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionSkeleton minH="min-h-[70vh]" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton minH="min-h-[50vh]" />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionSkeleton minH="min-h-[60vh]" />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Back-to-top button */}
      <BackToTop />
    </div>
  );
}

export default App;
