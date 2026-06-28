import {
  FiCode,
  FiDatabase,
  FiSmartphone,
  FiCpu,
  FiGlobe,
  FiMap,
} from 'react-icons/fi';
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPython,
  SiScikitlearn,
  SiStreamlit,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSqlite,
  SiJavascript,
  SiHtml5,
} from 'react-icons/si';

// Tech icon map — maps a short key to an { icon, label, color } object
export const techIconMap = {
  React:         { icon: SiReact,       label: 'React',          color: '#61DAFB' },
  Vite:          { icon: SiVite,        label: 'Vite',           color: '#646CFF' },
  Tailwind:      { icon: SiTailwindcss, label: 'Tailwind CSS',   color: '#38BDF8' },
  Laravel:       { icon: SiLaravel,     label: 'Laravel',        color: '#FF2D20' },
  MySQL:         { icon: SiMysql,       label: 'MySQL',          color: '#4479A1' },
  PHP:           { icon: SiPhp,         label: 'PHP',            color: '#777BB4' },
  Python:        { icon: SiPython,      label: 'Python',         color: '#3776AB' },
  'Scikit-learn':{ icon: SiScikitlearn, label: 'Scikit-learn',   color: '#F7931E' },
  Streamlit:     { icon: SiStreamlit,   label: 'Streamlit',      color: '#FF4B4B' },
  Flutter:       { icon: SiFlutter,     label: 'Flutter',        color: '#02569B' },
  Dart:          { icon: SiDart,        label: 'Dart',           color: '#0175C2' },
  Firebase:      { icon: SiFirebase,    label: 'Firebase',       color: '#FFCA28' },
  'Google Maps': { icon: FiMap,         label: 'Google Maps',    color: '#4285F4' },
  SQLite:        { icon: SiSqlite,      label: 'SQLite',         color: '#003B57' },
  JavaScript:    { icon: SiJavascript,  label: 'JavaScript',     color: '#F7DF1E' },
  CSS:           { icon: FiCode,        label: 'CSS3',           color: '#1572B6' },
  HTML:          { icon: SiHtml5,       label: 'HTML5',          color: '#E34F26' },
  API:           { icon: FiGlobe,       label: 'REST API',       color: '#10B981' },
};

const projects = [
  {
    id: 1,
    title: 'Captain Munch',
    category: 'Food Business Website',
    description:
      'Modern food brand website built to convert visitors into customers.',
    techIcons: ['React', 'Vite', 'Tailwind'],
    image: '/assets/images/projects/captain-munch.png',
    liveUrl: 'https://captain-munch.vercel.app/',
    githubUrl: 'https://github.com/UmerDevHub/captain-munch',
    liveLabel: 'Live Demo',
  },
  {
    id: 2,
    title: "Jugnu's Salon",
    category: 'Salon Business Website',
    description:
      'Polished, conversion-focused website with services and client testimonials.',
    techIcons: ['React', 'Vite', 'Tailwind'],
    image: '/assets/images/projects/jugnus-salon.png',
    liveUrl: 'https://jugnus-salon-xi.vercel.app/',
    githubUrl: 'https://github.com/UmerDevHub/jugnus-salon',
    liveLabel: 'Live Demo',
  },
  {
    id: 3,
    title: 'Watchify Store',
    category: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce site with product catalog, cart, and admin dashboard.',
    techIcons: ['Laravel', 'MySQL', 'PHP'],
    image: '/assets/images/projects/watchify-store.png',
    liveUrl: 'https://watchifystore-production.up.railway.app/home',
    githubUrl: 'https://github.com/UmerDevHub/watch-ecommerce-website',
    liveLabel: 'Live Demo',
  },
  {
    id: 4,
    title: 'Heart Disease Predictor',
    category: 'ML Classification Pipeline',
    description:
      'Predicts heart disease risk using ML models with ~87% accuracy.',
    techIcons: ['Python', 'Scikit-learn', 'Streamlit'],
    image: '/assets/images/projects/heart-disease.png',
    liveUrl: 'https://heartsdisease-predictor.streamlit.app/',
    githubUrl: 'https://github.com/UmerDevHub/heart-disease-predictor',
    liveLabel: 'Live Demo',
  },
  {
    id: 5,
    title: 'Carpool App',
    category: 'Ride-Sharing Platform',
    description:
      'Cross-platform ride-sharing app with real-time booking and live updates.',
    techIcons: ['Flutter', 'Firebase', 'Google Maps'],
    image: '/assets/images/projects/carpool.png',
    liveUrl: null,
    githubUrl: 'https://github.com/UmerDevHub/Carpool',
    liveLabel: null,
  },
  {
    id: 6,
    title: 'Pocket Journal',
    category: 'Offline-First App',
    description:
      'Private diary app with full offline CRUD, published on Play Store.',
    techIcons: ['Flutter', 'SQLite'],
    image: '/assets/images/projects/pocket-journal.png',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.umer.pocketjournal.app2026',
    githubUrl: 'https://github.com/UmerDevHub/pocket-journal-app',
    liveLabel: 'Play Store',
  },
  {
    id: 7,
    title: 'Ashiyana e Jannat',
    category: 'Islamic Habit Tracker',
    description:
      'Tracks prayers, Quran reading & good deeds with beautiful analytics.',
    techIcons: ['Flutter', 'Dart'],
    image: '/assets/images/projects/ashiyana.png',
    liveUrl: null,
    githubUrl: 'https://github.com/UmerDevHub/ashiyana_e_jannat',
    liveLabel: null,
  },
  {
    id: 8,
    title: 'Weather App',
    category: 'Weather Dashboard',
    description:
      'Responsive weather app fetching live data via public API with clean UI.',
    techIcons: ['JavaScript', 'HTML', 'CSS', 'API'],
    image: '/assets/images/projects/weather-app.png',
    liveUrl: 'https://weather-frontend-psi-fawn.vercel.app/',
    githubUrl: 'https://github.com/UmerDevHub/Weather-Frontend',
    liveLabel: 'Live Demo',
  },
];

export default projects;
