import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Cpu,
  Database,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  MapPin,
  Server,
  Wrench,
  X,
  Sparkles,
  Loader2,
  MoveRight,
  ArrowUpRight,
  Code,
  Globe,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

/* --- GEMINI API HELPER --- */
const callGemini = async (prompt) => {
  const apiKey = ""; // Provided by runtime environment
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate response.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Error connecting to AI service.";
  }
};

/* --- GLOBAL STYLES & FONTS --- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Syne:wght@400;700;800&display=swap');
    
    :root {
      --bg-color: #080808;
      --card-bg: #121212;
      --text-main: #ededed;
      --text-muted: #999999;
      --accent: #D64000; /* Burnt International Orange */
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-main);
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Safe Area Support for iOS */
    .safe-area-inset-bottom {
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    /* Prevent text selection on buttons for mobile */
    button {
      -webkit-tap-highlight-color: transparent;
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    h1, h2, h3, .font-display {
      font-family: 'Syne', sans-serif;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-color);
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }

    /* Noise Texture */
    .bg-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Utility */
    .glass-panel {
      background: rgba(18, 18, 18, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid #222;
    }
    
    .timeline-dot {
      position: absolute;
      left: -5px;
      top: 24px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 4px var(--bg-color);
    }

    /* --- ANIMATION KEYFRAMES FOR BACKGROUND --- */
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 10s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }

    /* Marquee Animation */
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.333%); }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }

    /* Line clamp utility */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Swiper custom styles */
    .swiper-button-prev,
    .swiper-button-next {
      display: none !important;
    }
  `}</style>
);

/* --- COMPONENTS --- */

const NavItem = ({ label, id, activePage, setPage }) => (
  <button
    onClick={() => setPage(id)}
    className={`
      relative px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300
      ${activePage === id
        ? 'text-white'
        : 'text-gray-400 hover:text-white'
      }
    `}
  >
    {label}
    <span className={`absolute bottom-0 left-0 h-[2px] bg-[#D64000] transition-all duration-300 ${activePage === id ? 'w-full' : 'w-0'}`} />
  </button>
);

const TechBadge = ({ children }) => (
  <span className="inline-block px-2 md:px-3 py-1 md:py-1.5 mr-1.5 md:mr-2 mb-1.5 md:mb-2 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-[#333] bg-[#111] text-gray-300 hover:border-[#D64000] hover:text-white transition-colors cursor-default">
    {children}
  </span>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#222] pb-4 mt-10 md:mt-16">
    <div className="p-1.5 md:p-2 bg-[#111] rounded-lg border border-[#222]">
      <Icon size={20} className="text-[#D64000] md:w-6 md:h-6" />
    </div>
    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tight">{title}</h3>
  </div>
);

const LargeExperienceCard = ({ role, company, date, bullets, location }) => (
  <div className="relative pl-6 md:pl-0 mb-8 md:mb-12 last:mb-0 group">
    {/* Left Border for Mobile */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-[#222] md:hidden"></div>
    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#D64000] md:hidden"></div>

    <div className="bg-[#111] border border-[#222] p-4 md:p-6 lg:p-8 rounded-xl hover:border-[#D64000]/50 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 md:mb-6 gap-2 md:gap-4">
        <div>
          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-[#D64000] transition-colors">{company}</h4>
          <div className="flex items-center gap-2 md:gap-3 text-[#D64000] font-medium text-sm md:text-base lg:text-lg">
            <span>{role}</span>
          </div>
        </div>
        <div className="text-left md:text-right mt-2 md:mt-0">
          <div className="text-xs md:text-sm font-mono text-gray-400 bg-[#1a1a1a] px-2 md:px-3 py-1 rounded inline-block mb-1 border border-[#333]">{date}</div>
          {location && <div className="text-xs text-gray-500 font-mono flex items-center md:justify-end gap-1"><MapPin size={12} /> {location}</div>}
        </div>
      </div>

      <ul className="space-y-2 md:space-y-3">
        {bullets.map((point, i) => (
          <li key={i} className="flex gap-2 md:gap-3 text-sm md:text-base text-gray-300 leading-relaxed font-light">
            <span className="text-[#D64000] mt-1.5 md:mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-[#D64000]"></span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const LargeEducationCard = ({ school, degree, date, grade, bullets }) => (
  <div className="flex flex-col md:flex-row gap-3 md:gap-6 p-4 md:p-6 border-b border-[#222] hover:bg-[#111] transition-colors rounded-lg">
    <div className="md:w-1/4 flex md:block items-center gap-3 md:gap-0">
      <span className="text-xs md:text-sm font-mono text-[#D64000] block mb-0 md:mb-1">{date}</span>
      <span className="text-xs font-mono text-gray-500 block uppercase tracking-widest">{grade}</span>
    </div>
    <div className="md:w-3/4">
      <h4 className="text-base md:text-lg lg:text-xl font-bold text-white mb-1 md:mb-2">{school}</h4>
      <p className="text-sm md:text-base text-gray-300 font-medium mb-2">{degree}</p>
      {bullets && bullets.length > 0 && (
        <ul className="text-xs md:text-sm text-gray-500 leading-relaxed space-y-1 list-disc list-inside">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const SkillCategory = ({ title, skills, icon: Icon }) => (
  <div className="bg-[#111] p-4 md:p-6 border border-[#222] rounded-lg h-full hover:border-gray-700 transition-colors">
    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
      <Icon size={16} className="text-[#D64000] md:w-[18px] md:h-[18px]" />
      <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white">{title}</h4>
    </div>
    <div className="flex flex-wrap">
      {skills.map(s => <TechBadge key={s}>{s}</TechBadge>)}
    </div>
  </div>
);

const AchievementCard = ({ title, subtitle, icon: Icon, link: Link }) => (
  <a href={Link} target="_blank" rel="noopener noreferrer">
    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 border border-[#222] bg-[#0a0a0a] rounded-lg hover:border-[#D64000] transition-colors group">
      <div className="p-2 md:p-3 bg-[#111] rounded group-hover:bg-[#222] transition-colors flex-shrink-0">
        <Icon size={20} className="text-[#D64000] md:w-6 md:h-6" />
      </div>
      <div className="min-w-0">
        <h5 className="text-white font-bold text-base md:text-lg mb-1">{title}</h5>
        <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  </a>
);



const AIProjectDemo = ({ type, onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    let prompt = "";

    if (type === "EchoMail") {
      prompt = `Write a short, punchy cold email to a potential client about: ${input}. Keep it professional but engaging.`;
    } else if (type === "FashionMatch") {
      prompt = `Suggest a complete fashion outfit for this occasion: ${input}. Include colors and accessories. Keep it stylish.`;
    } else if (type === "AskFinance") {
      prompt = `Explain the financial concept "${input}" in simple terms a 10-year-old would understand.`;
    }

    const result = await callGemini(prompt);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="mt-6 p-6 bg-[#0a0a0a] border border-[#333] border-l-4 border-l-[#D64000]">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <Sparkles size={14} className="text-[#D64000]" />
          AI Live Demo
        </h4>
        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={16} /></button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            type === "EchoMail" ? "E.g., Selling SEO services to bakeries..." :
              type === "FashionMatch" ? "E.g., Summer wedding in Italy..." :
                "E.g., Compound Interest..."
          }
          className="flex-grow bg-[#1a1a1a] border border-[#333] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#D64000]"
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
        />
        <button
          onClick={handleAction}
          disabled={loading}
          className="bg-[#D64000] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#b03500] disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Run"}
        </button>
      </div>

      {output && (
        <div className="p-4 bg-[#111] border border-[#222] text-sm text-gray-300 leading-relaxed animate-in fade-in">
          {output}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ title, desc, tech, index, aiFeature, link, image }) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div
      className="group relative border-t border-[#222] hover:border-[#D64000] transition-colors duration-500 py-6 md:py-12"
      style={{ animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards` }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="md:w-1/3">
          {image && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block mb-4 md:mb-6 overflow-hidden rounded-lg border border-[#222] group-hover:border-[#D64000] transition-colors">
              <img
                src={image}
                alt={title}
                className="w-full h-36 sm:h-40 md:h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          )}
          <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2 md:gap-3">
              {title}
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D64000]" size={18} />
            </h3>
          </a>
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
            {tech.map((t, i) => (
              <span key={i} className="text-[10px] md:text-xs font-mono text-[#666]">/{t}</span>
            ))}
          </div>


        </div>

        <div className="md:w-2/3">
          <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
            {desc}
          </p>

          {showDemo && (
            <AIProjectDemo type={aiFeature} onClose={() => setShowDemo(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

const StatBlock = ({ value, label }) => (
  <div className="flex flex-col border-l border-[#333] pl-6 py-2 hover:border-[#D64000] transition-colors group">
    <span className="text-4xl font-display font-bold text-white group-hover:text-[#D64000] transition-colors">{value}</span>
    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-1">{label}</span>
  </div>
);

/* --- ANIMATED STAT TILE (Bento Grid) --- */
const AnimatedStatTile = ({ value, label, suffix = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value);
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(numericValue * easeOut);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => animate(), delay);
    }
  }, [isInView, value, delay]);

  const formattedValue = value.toString().includes('.') 
    ? displayValue.toFixed(2) 
    : Math.round(displayValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="bg-[#111] border border-[#222] p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl hover:border-[#D64000]/50 transition-all duration-300 group cursor-default"
    >
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-[#D64000] transition-colors">
        {formattedValue}{suffix}
      </span>
      <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 mt-1 md:mt-2">{label}</span>
    </motion.div>
  );
};

/* --- LOGO MARQUEE COMPONENT --- */
const LogoMarquee = () => {
  const logos = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Python', icon: '🐍' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GDSC DTU', icon: '🎓' },
    { name: 'Google Cloud', icon: '☁️' },
    { name: 'FastAPI', icon: '⚡' },
  ];

  return (
    <div className="relative overflow-hidden py-6 border-t border-b border-[#222] bg-[#0a0a0a]">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-8 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-xl">{logo.icon}</span>
            <span className="text-sm font-mono uppercase tracking-widest">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- FREELANCE PROJECT CARD --- */
const FreelanceProjectCard = ({ clientName, image, link }) => (
  <div className="group relative bg-[#111] border border-[#222] rounded-lg overflow-hidden hover:border-[#D64000] transition-all duration-300">
    <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
      <img
        src={image}
        alt={clientName}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
    </div>
    <div className="p-3 md:p-4">
      <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{clientName}</h4>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#D64000] hover:text-white font-medium transition-colors group/link"
        >
          View Project
          <ArrowUpRight size={12} className="md:w-[14px] md:h-[14px] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </a>
      )}
    </div>
  </div>
);

/* --- EXPERIENCE SECTION COMPONENT --- */
const ExperienceSection = () => {
  const companies = [
    
    { 
      name: 'Beatoven.ai', 
      logo: '/assets/images/beatoven-logo.jpg',
      time: 'Aug 2025 - Present',
      alt: 'Beatoven.ai logo'
    },
    { 
      name: 'Sellermate.ai', 
      logo: '/assets/images/sellermate.avif',
      time: 'Jan 2025 - June 2025',
      alt: 'Sellermate.ai logo'
    },
    { 
      name: 'Intaligen', 
      logo: '/assets/intaligen.png',
      time: 'May 2024 - July 2024',
      alt: 'Intaligen logo'
    },
  ];

  const freelanceProjects = [
    {
      clientName: 'Sukhsancharak',
      image: '/assets/sukh.png', // Placeholder - will be replaced
      link: 'https://www.sukhsancharak.com/' // Placeholder link
    },
    {
      clientName: 'Salt & Pepper Kitchen',
      image: '/assets/salt.png', // Placeholder - will be replaced
      link: 'https://saltypepper.netlify.app/' // Placeholder link
    }
  ];

  return (
    <div className="py-8 md:py-12 border-t border-b border-[#222] bg-[#0a0a0a] px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-10 items-center text-center">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            Companies I've Worked With
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 w-full justify-items-center items-start">
          {/* Left Column: Company Logos */}
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-xl">
            <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">
              Companies
            </h3>
            <div className="flex flex-col gap-4 md:gap-6 w-full">
              {companies.map((company, i) => (
                <div
                  key={i}
                  className="w-full max-w-xl flex items-center gap-3 md:gap-6 group cursor-default mx-auto flex-nowrap mt-4 md:mt-10"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-[#111] border border-[#222] rounded-lg p-2 md:p-3 hover:border-[#D64000] transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={company.alt}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 flex-1 min-w-0">
                    <span className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors truncate">
                      {company.name}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors sm:ml-auto">
                      {company.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Freelance Projects */}
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-xl">
            <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500">
              Freelance Work
            </h3>
            <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
              {freelanceProjects.map((project, i) => (
                <FreelanceProjectCard
                  key={i}
                  clientName={project.clientName}
                  image={project.image}
                  link={project.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- PROJECT SHOWCASE CARD (for Swiper) --- */
const ProjectShowcaseCard = ({ project, onTryDemo }) => (
  <div className="relative h-full bg-[#111] border border-[#222] rounded-xl md:rounded-2xl overflow-hidden group">
    {/* Project Image */}
    <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

      {/* Floating Tech Tags */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-wrap gap-1 md:gap-2">
        {project.tech.slice(0, 2).map((t, i) => (
          <span key={i} className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-mono bg-black/60 backdrop-blur-sm text-white rounded">
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* Content */}
    <div className="p-4 md:p-6">
      <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-1 md:mb-2 group-hover:text-[#D64000] transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
        {project.desc}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2 md:gap-3">
        {project.tryLink && (
          <button
            onClick={() => (window.open(project.tryLink, '_blank'))}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#D64000] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#b03500] transition-colors"
          >
            <Sparkles size={12} className="md:w-[14px] md:h-[14px]" /> Try It
          </button>
        )}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-[#333] text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg hover:border-white hover:text-white transition-colors"
        >
          <Github size={12} className="md:w-[14px] md:h-[14px]" /> Code
        </a>
      </div>
    </div>
  </div>
);

/* --- PAGES --- */

const HomePage = ({ setPage }) => {
  const swiperRef = useRef(null);
  const [activeDemo, setActiveDemo] = useState(null);

  const projects = [
    {
      title: "EchoMail",
      desc: "Full Stack Bulk Email Campaign Manager. Create, send, and track beautiful email campaigns that convert.",
      tech: ["Full Stack", "React", "NodeJS"],
      aiFeature: "EchoMail",
      link: "https://github.com/Saarcasmic/BulkEmailCampaignManager",
      image: "/assets/images/Echomail.png",
      tryLink: "https://bulk-email-campaign-manager.vercel.app/"
    },
    {
      title: "AskFinance",
      desc: "Scalable Q&A platform with seamless user authentication (Google OAuth) and optimized search reducing API response time by 30%.",
      tech: ["ReactJS", "FastAPI", "MongoDB"],
      aiFeature: "AskFinance",
      link: "https://github.com/Saarcasmic/AskFinance",
      image: "/assets/images/ASkFinance.png",
      tryLink: "https://askfinance.netlify.app/"
    },
    {
      title: "FashionMatch",
      desc: "AI-driven fashion recommendation system using ResNet50, NLP and web scraping. Achieved 25% conversion upswing.",
      tech: ["ML", "Python", "ResNet50"],
      aiFeature: "FashionMatch",
      link: "https://github.com/Saarcasmic/FashionMatch",
      image: "/assets/images/FashionMatch.png"
    },
    {
      title: "MoneyMinder",
      desc: "Secure money management app with JWT authentication and real-time dashboards for financial tracking.",
      tech: ["Web Dev", "JWT", "React"],
      link: "https://github.com/Saarcasmic/MoneyMinder",
      image: "/assets/images/MoneyMInder.png"
    }
  ];

  return (
    <div className="relative isolate min-h-screen flex flex-col justify-start pt-4 md:pt-8">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D64000] rounded-full mix-blend-screen filter blur-[120px] opacity-5 animate-blob"></div>
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900 rounded-full mix-blend-screen filter blur-[130px] opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      

      {/* === ROW 1: Hero Bento Grid === */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8 px-4 md:px-0">
        
        {/* Left: Project Swiper (3 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-3 relative"
        >
          <div className="relative bg-[#0a0a0a] border border-[#222] rounded-xl md:rounded-2xl p-3 md:p-4 overflow-hidden">
            {/* Swiper Navigation */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 flex gap-1.5 md:gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-1.5 md:p-2 bg-[#111] border border-[#333] rounded-lg text-gray-400 hover:text-white hover:border-[#D64000] transition-colors"
              >
                <ChevronLeft size={16} className="md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="p-1.5 md:p-2 bg-[#111] border border-[#333] rounded-lg text-gray-400 hover:text-white hover:border-[#D64000] transition-colors"
              >
                <ChevronRight size={16} className="md:w-5 md:h-5" />
              </button>
            </div>

            <Swiper
              modules={[Autoplay, EffectCreative, Navigation]}
              effect="creative"
              creativeEffect={{
                prev: { translate: ["-120%", 0, -500], opacity: 0 },
                next: { translate: ["120%", 0, -500], opacity: 0 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="rounded-xl"
            >
              {projects.map((project, i) => (
                <SwiperSlide key={i}>
                  <ProjectShowcaseCard project={project} onTryDemo={setActiveDemo} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className="w-2 h-2 rounded-full bg-[#333] hover:bg-[#D64000] transition-colors"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Identity Card (2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <div className="h-full bg-[#111]/80 backdrop-blur-xl border border-[#222] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#D64000]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-[#D64000] rounded-full animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#D64000]">Available for work</span>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2 leading-tight">
                Saar<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #fff' }}>Agrawal</span>
              </h1>
                <img
                  src="/assets/profile.jpeg"
                  alt="Profile"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-2 md:border-4 border-[#222] shadow-lg"
                />
              </div>
              

              <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-widest text-gray-400 mt-3 md:mt-4 mb-4 md:mb-6">
                Software Engineer × Problem Solver
              </p>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4 md:mb-8">
                I don't just write code. <span className="text-white font-medium">I ship products</span> that scale. 
                From idea to production — fast, reliable, and on deadline.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => setPage('projects')}
                className="group flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#D64000] text-white text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#b03500] transition-all"
              >
                View All Work
                <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
              <button
                onClick={() => setPage('contact')}
                className="flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 border border-[#333] text-gray-300 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg hover:border-white hover:text-white transition-all"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === ROW 2: Stats Bento Grid === */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 px-4 md:px-0">
        <AnimatedStatTile value="4" suffix="+" label="Companies Worked With" delay={100} />
        <AnimatedStatTile value="6" suffix="+" label="Projects Shipped" delay={200} />
        <AnimatedStatTile value="8.34" label="CGPA @ DTU" delay={0} />
        <AnimatedStatTile value="8844" suffix="" label="JEE Mains Rank" delay={300} />
      </div>

      

      {/* === ROW 4: Experience Section === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="rounded-2xl overflow-hidden"
      >
        
        <ExperienceSection />
      </motion.div>

      {/* === ROW 3: Logo Marquee === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-2xl overflow-hidden mb-8"
      >
        <div className="text-center py-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Technologies & Communities</span>
        </div>
        <LogoMarquee />
      </motion.div>

      {/* === AI Demo Modal === */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <AIProjectDemo type={activeDemo} onClose={() => setActiveDemo(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-5xl mx-auto px-4 md:px-0">
    {/* Content Overlay for better readability */}
    <div className="bg-[#080808]/85 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-[#222]/50">
    <div className="flex items-end gap-2 md:gap-4 mb-6 md:mb-12 border-b border-[#333] pb-4 md:pb-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter">About Me</h2>
      <span className="h-2 w-2 md:h-4 md:w-4 bg-[#D64000] mb-2 md:mb-4"></span>
    </div>

    {/* Intro Section */}
    <div className="mb-8 md:mb-16">
      <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light space-y-4 md:space-y-6">
        <p>
          I am a software engineer who enjoys building fast, intuitive, and reliable web applications. With a background in IT from <strong className="text-white font-medium">Delhi Technological University</strong>, I've worked across scalable systems and frontend architectures at <strong className="text-white font-medium">Intaligen</strong>, <strong className="text-white font-medium">Sellermate</strong>, and <strong className="text-white font-medium">Beatoven.ai</strong>—delivering production-ready features using React, FastAPI, Python, and MongoDB. My project work on AskFinance and MoneyMinder strengthened my foundations in authentication, microservices, and containerized deployments.
        </p>
        <p>
        At <strong className="text-white font-medium">Beatoven.ai</strong>, I led major UI revamps, built the complete pricing and subscription flow, resolved critical production bugs, introduced features like media attachments and voting, and integrated Mixpanel analytics for data-driven improvements. At <strong className="text-white font-medium">Sellermate</strong>, I optimized large-scale MongoDB pipelines (cutting sync volumes by over 80%), automated reporting for 1,000+ clients using AWS Lambda, integrated Amazon Catalog APIs for 4M+ products, and shipped UI/UX improvements that boosted data usability. 
        </p>
        <p>
          Previously the <strong className="text-white font-medium">Tech Lead of GDSC-DTU</strong>, I've also qualified Meta Hacker Cup, reached Flipkart GRiD 5.0 semifinals, and secured <strong className="text-white font-medium">AIR 8844 in JEE Mains</strong>—reflecting a strong problem-solving mindset and commitment to continuous growth.
        </p>
      </div>

      <div className="mt-6 md:mt-8">
        <a
          href="https://drive.google.com/file/d/1QLtkFxSl8JurJVH-Xm9Ki0Nc7useTYyw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D64000] text-white px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#b03500] transition-colors rounded-lg"
        >
          <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" /> View Resume
        </a>
      </div>
    </div>

    {/* Experience Section */}
    <SectionHeader title="Professional Experience" icon={Briefcase} />
    <div className="space-y-3 md:space-y-4">
    <LargeExperienceCard
        company="Beatoven.Ai"
        role="Software Development Engineer"
        date="Aug 2025 - Present"
        location="Remote / Hybrid"
        bullets={[
          <span>Revamped core UI/UX components (sidebar, prompt bar, key pages) for a seamless and cohesive experience. <a href="https://sync.beatoven.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#D64000' }} className="hover:underline">Check out the work at sync.beatoven.ai</a></span>,
          "Led development of pricing, subscription, paywall UI, and model limit indicators for streamlined user upgrades.",
          "Enhanced mobile responsiveness across Home, Sidebar, Music, SFX, onboarding, and login interfaces.",
          "Resolved key frontend bugs (sign-out, audio, generation limits) and maintained platform stability via prompt fixes.",
          "Released interactive features: media attachments, video playback, voting, tooltips, and improved prompt guidance.",
          "Integrated Mixpanel analytics for actionable insights and iterative UX improvement."
        ]}
      />
      <LargeExperienceCard
        company="Sellermate.Ai"
        role="Software Development Engineer Intern"
        date="Jan 2025 - July 2025"
        location="Remote / Hybrid"
        bullets={[
          "Spearheaded the development of a keyword heatmap feature to visualize critical data trends.",
          "Optimized MongoDB aggregations, drastically reducing daily sync volume from 13M to 2M records and historical data processing from 300M to 55M.",
          "Automated complex report generation using AWS Lambda, achieving a 100% reduction in manual effort for over 1,000 clients.",
          "Redesigned the sidebar UI for enhanced navigation and integrated the Amazon Catalog API to sync 4M+ items in real-time."
        ]}
      />
      <LargeExperienceCard
        company="Intaligen"
        role="Software Engineering Intern"
        date="May 2024 - July 2024"
        location="New Delhi, India"
        bullets={[
          "Designed and implemented an Advanced Planning & Scheduling Console using client-side rendering, achieving an industry-leading 200ms Time to First Byte (TTFB).",
          "Optimized API performance, resulting in a 25% reduction in latency and a 30% faster overall application load time.",
          "Engineered robust authentication solutions with efficient state management to enhance security.",
          "Collaborated on the architectural design of RESTful API-based microservices for scalable operations."
        ]}
      />
      {/* <LargeExperienceCard
        company="Google Developer Student Clubs (GDSC) - DTU"
        role="Tech Lead"
        date="Aug 2023 - July 2024"
        location="Delhi Technological University"
        bullets={[
          "Orchestrated major technical events including 'Flutter Forward' and 'Solution Challenge Tech Talk', drawing over 200+ participants.",
          "Managed end-to-end logistics and coordinated with 10+ industry speakers for seamless event execution.",
          "Coordinated 'Android Jam Compose Camp', significantly boosting community engagement and practical learning."
        ]}
      /> */}
    </div>

    {/* Skills Section */}
    <SectionHeader title="Technical Arsenal" icon={Cpu} />
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-16">
      <SkillCategory
        title="Languages"
        icon={Code}
        skills={['C/C++', 'Python', 'JavaScript', 'HTML5', 'CSS3']}
      />
      <SkillCategory
        title="Frameworks"
        icon={Layers}
        skills={['ReactJS', 'NodeJS', 'Flask', 'FastAPI', 'Tailwind CSS']}
      />
      <SkillCategory
        title="Infrastructure"
        icon={Server}
        skills={['MongoDB', 'MySQL', 'AWS Lambda', 'Docker', 'REST APIs']}
      />
      <SkillCategory
        title="Tools"
        icon={Wrench}
        skills={['Git/GitHub', 'Postman', 'VS Code', 'Vite', 'Jupyter']}
      />
    </div>

    {/* Education Section */}
    <SectionHeader title="Education" icon={BookOpen} />
    <div className="space-y-3 md:space-y-4 mb-8 md:mb-16">
      <LargeEducationCard
        school="Delhi Technological University (Formerly DCE)"
        degree="Bachelor of Technology in Information Technology"
        date="2021 - 2025"
        grade="CGPA: 8.34"
        bullets={[
          "Pursued B.Tech. in Information Technology from college.",
          "Proficient in subjects such as Data Structures, Object-Oriented Programming, Operating Systems, Computer Networks, Computer Architecture, and Database Management Systems.",
          "Actively participated in hackathons and coding competitions.",
          "Engaged in extracurricular activities, including Badminton tournaments, quiz competitions.",
          "Served as a Class Representative for my batch."
        ]}
      />
      <LargeEducationCard
        school="Brahma Shakti Public School"
        degree="CBSE Class XII (Higher Secondary)"
        date="2020 - 2021"
        grade="Aggregate: 76%"
        bullets={[
          "Developed a strong understanding of various subjects, including Physics, Chemistry, Mathematics, Literature, and Physical Education."
        ]}
      />
      <LargeEducationCard
        school="Parvati Radhakishen Fomra School"
        degree="CBSE Class X (Secondary)"
        date="2018 - 2019"
        grade="Aggregate: 96.6%"
        bullets={[
          "Ranked 3rd in School 10th CBSE Boards, demonstrating exceptional academic achievements.",
          "Actively engaged in various competitions, such as quizzes, declamations, dances, and debates, where I showcased my exceptional skills and consistently delivered impressive performances.",
          "Demonstrated my athletic abilities by participating in track and field events and cricket tournaments, achieving notable successes and contributing to the team's accomplishments."
        ]}
      />
    </div>

    {/* Certifications & Achievements */}
    <SectionHeader title="Honors & Certifications" icon={Award} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      <AchievementCard
        title="Google Cloud Career Practitioners"
        subtitle="Completed program by Google Developer Student Clubs"
        icon={Globe}
        link="https://drive.google.com/file/d/1Y3BBxV-QGGabLypiUBSxw7QzGMuEZ78b/view?usp=drive_link"
      />
      <AchievementCard
        title="The Joy of Computing using Python"
        subtitle="NPTEL Certification (Elite) - Score: 78%"
        icon={Terminal}
        link="https://drive.google.com/file/d/15QtYnwCC4AZDNpDFzcFYdPNKBDiwo9Gt/view?usp=sharing"
      />
      <AchievementCard
        title="JEE Mains 2021"
        subtitle="Secured All India Rank 8844 (Top 1% of 1M+ candidates)"
        icon={Award}
      />
      <AchievementCard
        title="Competitive Programming"
        subtitle="Qualified Meta Hacker Cup '22 | Flipkart GRiD 5.0 Semifinalist | 500+ Problems Solved"
        icon={Code}
      />
    </div>

    </div>
  </div>
);

const ProjectsPage = () => {
  const projects = [
    {
      title: "EchoMail",
      desc: "Full Stack Bulk Email Campaign Manager. Create, send, and track beautiful email campaigns that convert.",
      tech: ["Full Stack", "React", "NodeJS"],
      aiFeature: "EchoMail",
      link: "https://github.com/Saarcasmic/BulkEmailCampaignManager",
      image: "/assets/images/Echomail.png"
    },
    {
      title: "AskFinance",
      desc: "Scalable Q&A platform with seamless user authentication (Google OAuth) and optimized search reducing API response time by 30%.",
      tech: ["ReactJS", "FastAPI", "MongoDB"],
      aiFeature: "AskFinance",
      link: "https://github.com/Saarcasmic/AskFinance",
      image: "/assets/images/ASkFinance.png"
    },
    {
      title: "FashionMatch",
      desc: "AI-driven fashion recommendation system using ResNet50, NLP and web scraping. Achieved 25% conversion upswing.",
      tech: ["Machine Learning", "Python", "ResNet50"],
      aiFeature: "FashionMatch",
      link: "https://github.com/Saarcasmic/FashionMatch",
      image: "/assets/images/FashionMatch.png"
    },
    {
      title: "HeartGuard-AI",
      desc: "Machine Learning project focused on heart disease prediction and analysis using advanced data modeling.",
      tech: ["Machine Learning", "Python", "Data Science"],
      link: "https://github.com/Saarcasmic/HeartGuard-AI",
      image: "/assets/images/Heart.webp"
    },
    {
      title: "MoneyMinder",
      desc: "Secure money management app with JWT authentication and real-time dashboards for financial tracking.",
      tech: ["Web Development", "JWT", "React"],
      link: "https://github.com/Saarcasmic/MoneyMinder",
      image: "/assets/images/MoneyMInder.png"
    },
    {
      title: "Ingredient-Insighter",
      desc: "Frontend project for analyzing ingredients and providing nutritional insights based on user input.",
      tech: ["Frontend", "React", "API"],
      link: "https://github.com/Saarcasmic/Ingridient-Insighter",
      image: "/assets/images/Ingridient.png"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 px-4 md:px-0">
      {/* Content Overlay for better readability */}
      <div className="bg-[#080808]/85 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-[#222]/50">
        <div className="flex items-end gap-2 md:gap-4 mb-8 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter">Work</h2>
          <span className="h-2 w-2 md:h-4 md:w-4 bg-[#D64000] mb-2 md:mb-4"></span>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {

  return (
    <div className="min-h-[60vh] flex flex-col justify-between animate-in fade-in slide-in-from-bottom-10 duration-700 px-4 md:px-0">
      {/* Content Overlay for better readability */}
      <div className="bg-[#080808]/85 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-[#222]/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-[5vw] lg:text-[6vw] leading-[0.9] md:leading-[0.8] font-display font-bold text-white uppercase tracking-tighter mb-6 md:mb-12">
            Let's<br />Talk.
          </h2>

          <div className="border-t border-[#333] pt-6 md:pt-12">
            <div className="mb-6 md:mb-8">
              <p className="text-gray-400 text-xs md:text-sm mb-2 uppercase tracking-widest">Email</p>
              <a
                href="mailto:agrawalsaar16@gmail.com"
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold hover:text-[#D64000] transition-colors border-b-2 border-[#D64000] pb-1 inline-block break-all"
              >
                agrawalsaar16@gmail.com
              </a>
            </div>

            <div>
              <p className="text-gray-400 text-xs md:text-sm mb-2 uppercase tracking-widest">Phone</p>
              <p className="text-lg md:text-xl text-white font-bold">+91 8791567123</p>
            </div>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="bg-[#111] p-4 md:p-6 lg:p-8 border border-[#222] self-start rounded-lg">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            <Briefcase className="text-[#D64000]" size={18} />
            Quick Info
          </h3>

          <div className="space-y-4 md:space-y-5">
            {/* Availability */}
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse flex-shrink-0"></span>
              <div>
                <p className="text-white font-medium">Currently Available</p>
                <p className="text-sm text-gray-500">Open to new opportunities</p>
              </div>
            </div>

            {/* Open To */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Open To</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-full">Full-time Roles</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-full">Freelance Projects</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] text-gray-300 rounded-full">Collaborations</span>
              </div>
            </div>

            {/* Preferred Stack */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Preferred Stack</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs font-medium bg-[#D64000]/10 border border-[#D64000]/30 text-[#D64000] rounded-full">React</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-[#D64000]/10 border border-[#D64000]/30 text-[#D64000] rounded-full">Node.js</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-[#D64000]/10 border border-[#D64000]/30 text-[#D64000] rounded-full">Python</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-[#D64000]/10 border border-[#D64000]/30 text-[#D64000] rounded-full">MongoDB</span>
              </div>
            </div>

            {/* Response Time */}
            <div className="pt-4 border-t border-[#222]">
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">⚡ Fast responder</span> — Usually within 24 hours
              </p>
            </div>

            {/* Resume Download */}
            <a
              href="https://drive.google.com/file/d/1QLtkFxSl8JurJVH-Xm9Ki0Nc7useTYyw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#D64000] text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#b03500] transition-colors rounded-lg mt-2"
            >
              <ArrowUpRight size={16} /> View Resume
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-8 md:mt-12 pt-6 md:pt-12 border-t border-[#333]">
        <div className="flex flex-row md:flex-col gap-4 md:gap-4 items-start flex-wrap">
          <a href="https://linkedin.com/in/saarcasmic" className="text-gray-500 hover:text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-colors flex items-center gap-2 group">
            <span className="w-2 h-2 bg-[#333] group-hover:bg-[#D64000] transition-colors"></span> LinkedIn
          </a>
          <a href="https://github.com/saarcasmic" className="text-gray-500 hover:text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-colors flex items-center gap-2 group">
            <span className="w-2 h-2 bg-[#333] group-hover:bg-[#D64000] transition-colors"></span> GitHub
          </a>
          <a href="https://leetcode.com/saarcasmic" className="text-gray-500 hover:text-white uppercase tracking-widest text-xs md:text-sm font-bold transition-colors flex items-center gap-2 group">
            <span className="w-2 h-2 bg-[#333] group-hover:bg-[#D64000] transition-colors"></span> LeetCode
          </a>
        </div>
        <div className="text-[#333] font-mono text-xs uppercase tracking-widest md:text-right">
          © 2025 Saar Agrawal / New Delhi, India
        </div>
      </div>
      </div>
    </div>
  );
};

/* --- MAIN APP LAYOUT --- */

const App = () => {
  const [page, setPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  return (
    <div className="min-h-screen relative">
      <GlobalStyles />
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-50 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/personal.jpeg')`,
          opacity: 0.25,
          filter: 'brightness(0.9) contrast(1.2) saturate(0.9)'
        }}
      />
      <div className="bg-noise"></div>

      {/* Navigation - Top Right Absolute */}
      <nav className="fixed top-0 right-0 py-8 pl-8 z-50 flex flex-col items-end hidden md:flex">
        <div className="flex flex-col items-end gap-2">
          <NavItem label="Home" id="home" activePage={page} setPage={setPage} />
          <NavItem label="About" id="about" activePage={page} setPage={setPage} />
          <NavItem label="Work" id="projects" activePage={page} setPage={setPage} />
          <NavItem label="Contact" id="contact" activePage={page} setPage={setPage} />
        </div>
      </nav>

      {/* Mobile Nav - Bottom Fixed */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#080808]/95 backdrop-blur-md border-t border-[#222] z-50 md:hidden flex justify-around py-3 px-2 safe-area-inset-bottom">
        <button onClick={() => setPage('home')} className={`flex-1 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-colors ${page === 'home' ? 'text-[#D64000]' : 'text-gray-500 hover:text-gray-300'}`}>Home</button>
        <button onClick={() => setPage('about')} className={`flex-1 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-colors ${page === 'about' ? 'text-[#D64000]' : 'text-gray-500 hover:text-gray-300'}`}>About</button>
        <button onClick={() => setPage('projects')} className={`flex-1 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-colors ${page === 'projects' ? 'text-[#D64000]' : 'text-gray-500 hover:text-gray-300'}`}>Work</button>
        <button onClick={() => setPage('contact')} className={`flex-1 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-colors ${page === 'contact' ? 'text-[#D64000]' : 'text-gray-500 hover:text-gray-300'}`}>Contact</button>
      </nav>

      {/* Subtle Grid Pattern Background (Only on Home) */}
      {page === 'home' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 md:py-16 pb-20 md:pb-16 min-h-screen flex flex-col justify-center border-l border-[#111] border-r border-[#111]">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'contact' && <ContactPage />}
      </main>
    </div>
  );
};

export default App;