import { FiMonitor, FiServer, FiSmartphone, FiCpu, FiDatabase } from 'react-icons/fi';

const skills = [
  {
    category: 'Frontend',
    icon: FiMonitor,
    color: '#38BDF8',        // sky blue
    bgColor: 'rgba(56,189,248,0.12)',
    chipColor: 'rgba(56,189,248,0.12)',
    chipBorder: 'rgba(56,189,248,0.25)',
    chipText: '#7DD3FC',
    chips: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Responsive Web Design'],
  },
  {
    category: 'Backend',
    icon: FiServer,
    color: '#34D399',        // emerald green
    bgColor: 'rgba(52,211,153,0.12)',
    chipColor: 'rgba(52,211,153,0.12)',
    chipBorder: 'rgba(52,211,153,0.25)',
    chipText: '#6EE7B7',
    chips: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'REST APIs'],
  },
  {
    category: 'Mobile',
    icon: FiSmartphone,
    color: '#C084FC',        // violet purple
    bgColor: 'rgba(192,132,252,0.12)',
    chipColor: 'rgba(192,132,252,0.12)',
    chipBorder: 'rgba(192,132,252,0.25)',
    chipText: '#D8B4FE',
    chips: ['Flutter', 'Dart'],
  },
  {
    category: 'Machine Learning',
    icon: FiCpu,
    color: '#FB923C',        // orange
    bgColor: 'rgba(251,146,60,0.12)',
    chipColor: 'rgba(251,146,60,0.12)',
    chipBorder: 'rgba(251,146,60,0.25)',
    chipText: '#FCA86F',
    chips: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit'],
  },
  {
    category: 'Databases',
    icon: FiDatabase,
    color: '#F472B6',        // pink
    bgColor: 'rgba(244,114,182,0.12)',
    chipColor: 'rgba(244,114,182,0.12)',
    chipBorder: 'rgba(244,114,182,0.25)',
    chipText: '#F9A8D4',
    chips: ['MySQL', 'MongoDB', 'SQLite', 'Firebase Firestore'],
  },
];

export default skills;
