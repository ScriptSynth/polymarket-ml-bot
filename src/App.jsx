import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Settings, 
  Eye, 
  Layout, 
  Palette, 
  ChevronDown, 
  Star, 
  GitCommit, 
  GitPullRequest, 
  CircleAlert, 
  Flame,
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  Users,
  Link as LinkIcon,
  Globe,
  Trophy,
  Activity,
  Code2,
  GitBranch,
  CircleDot
} from 'lucide-react';

// Utility for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Counter component for animated stats
const Counter = ({ value, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[,+]/g, ''));
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-8 px-4 border-r border-gray-800 last:border-r-0">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-blue-500" />
        <span className="text-3xl font-bold text-white">
          {count.toLocaleString()}{value.includes('+') ? '+' : ''}
        </span>
      </div>
      <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</span>
    </div>
  );
};

const THEMES = {
  dark: { bg: '#1e2030', text: '#cdd6f4', accent: '#89b4fa', border: '#313244' },
  light: { bg: '#ffffff', text: '#2d333b', accent: '#0969da', border: '#d0d7de' },
  radical: { bg: '#141321', text: '#fe428e', accent: '#f8d847', border: '#fe428e' },
  tokyonight: { bg: '#1a1b27', text: '#70a5fd', accent: '#bf91f3', border: '#70a5fd' },
  dracula: { bg: '#282a36', text: '#f8f8f2', accent: '#bd93f9', border: '#6272a4' },
  merko: { bg: '#0a0f0b', text: '#b7d364', accent: '#68b587', border: '#b7d364' },
};

const WIDGET_TYPES = {
  stats: 'GitHub Stats',
  languages: 'Top Languages',
  streak: 'Coding Streak',
};

const STATS_DATA = {
  stars: '1.2k',
  commits: '847',
  prs: '203',
  issues: '56',
  streak: '42',
  languages: [
    { name: 'JavaScript', percent: 38, color: '#f1e05a' },
    { name: 'TypeScript', percent: 24, color: '#3178c6' },
    { name: 'Python', percent: 18, color: '#3572A5' },
    { name: 'CSS', percent: 12, color: '#563d7c' },
    { name: 'Other', percent: 8, color: '#858585' },
  ],
  trophies: [
    { name: 'MultiLanguage', tier: 'Gold', icon: 'Code2', color: '#f0c040' },
    { name: 'PullRequest', tier: 'Silver', icon: 'GitPullRequest', color: '#c0c0c0' },
    { name: 'Commits', tier: 'Gold', icon: 'GitCommit', color: '#f0c040' },
    { name: 'Stars', tier: 'Bronze', icon: 'Star', color: '#cd7f32' },
    { name: 'Followers', tier: 'Silver', icon: 'Users', color: '#c0c0c0' },
    { name: 'Issues', tier: 'Gold', icon: 'CircleDot', color: '#f0c040' },
  ]
};

// SVG Preview Component
const WidgetPreview = ({ settings }) => {
  const theme = THEMES[settings.theme] || THEMES.dark;
  const widgetTitle = settings.customTitle || WIDGET_TYPES[settings.type];
  const initial = settings.username ? settings.username.charAt(0).toUpperCase() : 'O';
  const username = settings.username || 'octocat';
  
  const titleColor = settings.titleColor || theme.text;
  const iconColor = settings.iconColor || theme.accent;
  const borderColor = settings.borderColor || theme.border;
  const valueColor = settings.iconColor || theme.accent;
  const labelColor = theme.text + 'CC';

  const borderRadius = settings.borderRadius || 10;
  const opacity = (settings.bgOpacity || 100) / 100;
  const fontSizeFactor = settings.fontSize === 'small' ? 0.85 : settings.fontSize === 'large' ? 1.15 : 1;
  const padding = settings.compactMode ? 15 : 25;

  const cardWidth = settings.compactMode ? 400 : 450;
  const cardHeight = settings.compactMode ? 220 : 280;

  // Render different widget types
  const renderWidgetContent = () => {
    switch (settings.type) {
      case 'languages':
        return (
          <g transform={`translate(${padding}, 80)`}>
            {STATS_DATA.languages.map((lang, i) => (
              <g key={i} transform={`translate(0, ${i * 35 * fontSizeFactor})`}>
                <text x="0" y="14" fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${14 * fontSizeFactor}px`, fontWeight: 600 }}>{lang.name}</text>
                <rect x="100" y="4" width={220 * (lang.percent / 100)} height="10" rx="5" fill={lang.color} />
                <rect x="100" y="4" width="220" height="10" rx="5" fill={lang.color} opacity="0.1" />
                <text x="330" y="14" fill={valueColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${13 * fontSizeFactor}px`, fontWeight: 700 }}>{lang.percent}%</text>
              </g>
            ))}
          </g>
        );

      case 'streak':
        return (
          <g transform={`translate(${cardWidth / 2}, 120)`}>
            {/* Flame focus */}
            <defs>
              <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={iconColor} />
                <stop offset="100%" stopColor={iconColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 -60 L150 -60 L150 0 L0 0 Z" fill="url(#flameGrad)" opacity="0.1" transform="translate(-75, 0)" />
            
            <text x="0" y="0" fill={iconColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${60 * fontSizeFactor}px`, fontWeight: 900 }}>{STATS_DATA.streak}</text>
            <text x="0" y="30" fill={labelColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${20 * fontSizeFactor}px`, fontWeight: 600 }}>day streak 🔥</text>
            
            <g transform={`translate(0, 80)`}>
              <g transform="translate(-130, 0)">
                <text x="0" y="0" fill={valueColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${16 * fontSizeFactor}px`, fontWeight: 700 }}>1,240</text>
                <text x="0" y="18" fill={labelColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${10 * fontSizeFactor}px` }}>Total Contribs</text>
              </g>
              <line x1="-65" y1="-10" x2="-65" y2="20" stroke={borderColor} opacity="0.3" />
              <g transform="translate(0, 0)">
                <text x="0" y="0" fill={valueColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${16 * fontSizeFactor}px`, fontWeight: 700 }}>64</text>
                <text x="0" y="18" fill={labelColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${10 * fontSizeFactor}px` }}>Best Streak</text>
              </g>
              <line x1="65" y1="-10" x2="65" y2="20" stroke={borderColor} opacity="0.3" />
              <g transform="translate(130, 0)">
                <text x="0" y="0" fill={valueColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${16 * fontSizeFactor}px`, fontWeight: 700 }}>2021</text>
                <text x="0" y="18" fill={labelColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${10 * fontSizeFactor}px` }}>Active Since</text>
              </g>
            </g>
          </g>
        );

      case 'trophy':
        return (
          <g transform={`translate(${padding}, 85)`}>
            {STATS_DATA.trophies.map((trophy, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <g key={i} transform={`translate(${col * (cardWidth - padding * 2) / 3}, ${row * 75 * fontSizeFactor})`}>
                  <rect x="0" y="0" width="110" height="65" rx="8" fill={trophy.color} opacity="0.1" />
                  <circle cx="55" cy="22" r="14" fill={trophy.color} opacity="0.2" />
                  <text x="55" y="45" fill={labelColor} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${11 * fontSizeFactor}px`, fontWeight: 700 }}>{trophy.name}</text>
                  <text x="55" y="58" fill={trophy.color} textAnchor="middle" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${10 * fontSizeFactor}px`, fontWeight: 800 }}>{trophy.tier}</text>
                </g>
              );
            })}
          </g>
        );

      case 'activity':
        return (
          <g transform={`translate(${padding}, 85)`}>
            <text x="0" y="-10" fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${12 * fontSizeFactor}px`, fontWeight: 600 }}>Contribution Activity</text>
            <g transform="translate(0, 5)">
              {[...Array(12)].map((_, col) => (
                <g key={col} transform={`translate(${col * 32}, 0)`}>
                  {[...Array(7)].map((_, row) => {
                    const themeColors = [theme.bg, iconColor + '33', iconColor + '66', iconColor + 'AA', iconColor];
                    const randomColor = themeColors[Math.floor(Math.random() * 5)];
                    return (
                      <rect key={row} x="0" y={row * 15} width="12" height="12" rx="2" fill={randomColor} />
                    );
                  })}
                </g>
              ))}
            </g>
            <g transform="translate(0, 115)">
              <text x="30" y="10" fill={labelColor} opacity="0.5" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: '9px' }}>March</text>
              <text x="160" y="10" fill={labelColor} opacity="0.5" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: '9px' }}>April</text>
              <text x="300" y="10" fill={labelColor} opacity="0.5" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: '9px' }}>May</text>
            </g>
          </g>
        );

      default:
        return (
          <g transform={`translate(${padding}, 85)`}>
            {/* Total Stars */}
            <g transform="translate(0, 0)">
              {settings.showIcons && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={iconColor} transform={`scale(${0.8 * fontSizeFactor})`} />}
              <text x={settings.showIcons ? 25 : 0} y={14 * fontSizeFactor} fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px` }}>Total Stars</text>
              <text x={cardWidth - padding * 2} y={14 * fontSizeFactor} fill={valueColor} textAnchor="end" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px`, fontWeight: 700 }}>{STATS_DATA.stars}</text>
            </g>

            {/* Total Commits */}
            <g transform={`translate(0, ${35 * fontSizeFactor})`}>
              {settings.showIcons && <path d="M12 2v10m0 0l-4-4m4 4l4-4M5 20h14" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${0.8 * fontSizeFactor})`} />}
              <text x={settings.showIcons ? 25 : 0} y={14 * fontSizeFactor} fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px` }}>Total Commits</text>
              <text x={cardWidth - padding * 2} y={14 * fontSizeFactor} fill={valueColor} textAnchor="end" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px`, fontWeight: 700 }}>{STATS_DATA.commits}</text>
            </g>

            {/* Pull Requests */}
            <g transform={`translate(0, ${70 * fontSizeFactor})`}>
              {settings.showIcons && <path d="M18 13l3.5-3.5L18 6m-6 10l-3.5 3.5L5 16M9 5v4a2 2 0 01-2 2H5m14-7v4a2 2 0 01-2 2h-2" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${0.8 * fontSizeFactor})`} />}
              <text x={settings.showIcons ? 25 : 0} y={14 * fontSizeFactor} fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px` }}>Pull Requests</text>
              <text x={cardWidth - padding * 2} y={14 * fontSizeFactor} fill={valueColor} textAnchor="end" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px`, fontWeight: 700 }}>{STATS_DATA.prs}</text>
            </g>

            {/* Issues */}
            <g transform={`translate(0, ${105 * fontSizeFactor})`}>
              {settings.showIcons && (
                <g transform={`scale(${0.8 * fontSizeFactor})`}>
                  <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
                </g>
              )}
              <text x={settings.showIcons ? 25 : 0} y={14 * fontSizeFactor} fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px` }}>Issues</text>
              <text x={cardWidth - padding * 2} y={14 * fontSizeFactor} fill={valueColor} textAnchor="end" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px`, fontWeight: 700 }}>{STATS_DATA.issues}</text>
            </g>

            {/* Streak */}
            <g transform={`translate(0, ${140 * fontSizeFactor})`}>
              {settings.showIcons && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={iconColor} transform={`scale(${0.8 * fontSizeFactor})`} />}
              <text x={settings.showIcons ? 25 : 0} y={14 * fontSizeFactor} fill={labelColor} style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px` }}>Current Streak</text>
              <text x={cardWidth - padding * 2} y={14 * fontSizeFactor} fill={valueColor} textAnchor="end" style={{ fontFamily: 'Segoe UI, Ubuntu, sans-serif', fontSize: `${15 * fontSizeFactor}px`, fontWeight: 700 }}>{STATS_DATA.streak} days</text>
            </g>
          </g>
        );
    }
  };

  return (
    <div className="relative group select-none overflow-hidden rounded-xl">
      <svg
        width={cardWidth}
        height={cardHeight}
        viewBox={`0 0 ${cardWidth} ${cardHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto transition-all duration-300"
        style={{
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
        }}
      >
        {/* Main Card */}
        <rect
          x="0.5"
          y="0.5"
          width={cardWidth - 1}
          height={cardHeight - 1}
          rx={borderRadius}
          fill={theme.bg}
          fillOpacity={opacity}
          stroke={settings.hideBorder ? 'none' : borderColor}
        />
        
        {/* Top Accent Bar */}
        <path
          d={`M1 ${borderRadius/2}C1 2.34315 2.34315 1 4 1H${cardWidth - 4}C${cardWidth - 2.34315} 1 ${cardWidth - 1} 2.34315 ${cardWidth - 1} 4V6H1V${borderRadius/2}Z`}
          fill={iconColor}
        />

        {/* Header Section */}
        <text
          x={padding}
          y="40"
          fill={titleColor}
          style={{
            fontFamily: 'Segoe UI, Ubuntu, sans-serif',
            fontWeight: 800,
            fontSize: `${20 * fontSizeFactor}px`,
            letterSpacing: '-0.5px'
          }}
        >
          {widgetTitle}
        </text>

        {/* Username on Card */}
        {settings.showUsername && (
          <text
            x={padding}
            y="56"
            fill={labelColor}
            style={{
              fontFamily: 'Segoe UI, Ubuntu, sans-serif',
              fontWeight: 500,
              fontSize: `${11 * fontSizeFactor}px`,
            }}
          >
            @{username}
          </text>
        )}

        {/* Avatar Placeholder */}
        <g transform={`translate(${cardWidth - padding - 32}, 22)`}>
          <circle cx="16" cy="16" r="16" fill={iconColor} opacity="0.1" />
          <text
            x="16"
            y="21"
            fill={iconColor}
            textAnchor="middle"
            style={{
              fontFamily: 'Segoe UI, Ubuntu, sans-serif',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            {initial}
          </text>
        </g>

        {/* Divider */}
        <line x1={padding} y1="65" x2={cardWidth - padding} y2="65" stroke={borderColor} opacity="0.5" />

        {/* Dynamic Content */}
        {renderWidgetContent()}

        {/* Footer Text - Fixed at bottom 10px, right 14px */}
        <text
          x={cardWidth - 14}
          y={cardHeight - 10}
          fill="#888"
          textAnchor="end"
          aria-label="Powered by gitwidgets.dev"
          style={{
            fontFamily: 'Segoe UI, Ubuntu, sans-serif',
            fontSize: '9px',
            fontWeight: 600
          }}
        >
          Powered by gitwidgets.dev
        </text>
      </svg>
    </div>
  );
};

function App() {
  const [settings, setSettings] = useState({
    username: '',
    type: 'stats',
    theme: 'dark',
    titleColor: '',
    iconColor: '',
    borderColor: '',
    hideBorder: false,
    showIcons: true,
    customTitle: '',
    borderRadius: 10,
    fontSize: 'medium',
    showUsername: true,
    compactMode: false,
    animation: 'none',
    bgOpacity: 100
  });

  const [copying, setCopying] = useState(false);
  const [activeTab, setActiveTab] = useState('markdown');
  const generatorRef = useRef(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const constructUrl = () => {
    const params = new URLSearchParams();
    params.append('username', settings.username || 'octocat');
    params.append('type', settings.type);
    params.append('theme', settings.theme);
    if (settings.titleColor) params.append('title_color', settings.titleColor.replace('#', ''));
    if (settings.iconColor) params.append('icon_color', settings.iconColor.replace('#', ''));
    if (settings.borderColor) params.append('border_color', settings.borderColor.replace('#', ''));
    if (settings.hideBorder) params.append('hide_border', 'true');
    if (!settings.showIcons) params.append('hide_icons', 'true');
    if (settings.customTitle) params.append('custom_title', settings.customTitle);
    
    // New params
    if (settings.borderRadius !== 10) params.append('border_radius', settings.borderRadius);
    if (settings.fontSize !== 'medium') params.append('font_size', settings.fontSize);
    if (!settings.showUsername) params.append('hide_username', 'true');
    if (settings.compactMode) params.append('compact', 'true');
    if (settings.animation !== 'none') params.append('animation', settings.animation);
    if (settings.bgOpacity !== 100) params.append('bg_opacity', settings.bgOpacity);
    
    return `https://api.gitwidgets.dev/api?${params.toString()}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const embedCode = {
    markdown: `![${settings.customTitle || WIDGET_TYPES[settings.type]}](${constructUrl()})`,
    html: `<img src="${constructUrl()}" alt="${settings.customTitle || WIDGET_TYPES[settings.type]}" />`
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 selection:bg-blue-500/30 selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-2 px-4 text-center text-sm font-medium text-white">
        <motion.span 
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚀 GitWidgets.dev is now live — completely free!
        </motion.span>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Github className="w-8 h-8 text-blue-500" />
            <span>GitWidgets<span className="text-blue-500">.dev</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#examples" className="hover:text-white transition-colors">Examples</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <button 
              onClick={scrollToGenerator}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
            >
              Beautiful GitHub Widgets <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                for your README
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Free, customizable, live-updating badges. <br />
              Paste one line and you're done.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={scrollToGenerator}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg inline-flex items-center gap-2 transition-all hover:gap-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                aria-label="Generate Your Widget"
              >
                Generate Your Widget <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Twitter className="w-4 h-4" />
                <span>Built by <a href="https://x.com/supply_code" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 font-medium transition-colors">@supply_code</a> on X</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Stats Bar */}
        <section className="bg-[#161b22] border-y border-gray-800">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            <Counter value="12,400+" label="Widgets Generated" icon={Layout} />
            <Counter value="3,200+" label="Developers" icon={Code2} />
            <Counter value="8,900+" label="README Embeds" icon={ExternalLink} />
            <Counter value="94" label="Countries" icon={Globe} />
          </div>
        </section>

        {/* Generator Section */}
        <section ref={generatorRef} className="py-24 bg-[#161b22]/50 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Widget Generator</h2>
            <p className="text-gray-400">Configure your widget details and see the changes live.</p>
          </div>

          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: Controls */}
            <article className="bg-[#0d1117] rounded-2xl border border-gray-800 p-8 shadow-xl">
              <header className="flex items-center gap-2 mb-8 text-white font-semibold border-b border-gray-800 pb-4">
                <Settings className="w-5 h-5 text-blue-500" />
                <h3>Customization</h3>
              </header>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">GitHub Username</label>
                  <input 
                    type="text" 
                    placeholder="e.g. octocat"
                    aria-label="GitHub Username"
                    className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                    value={settings.username}
                    onChange={(e) => setSettings({...settings, username: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Widget Type</label>
                    <select 
                      aria-label="Widget Type"
                      className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={settings.type}
                      onChange={(e) => setSettings({...settings, type: e.target.value})}
                    >
                      {Object.entries(WIDGET_TYPES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
                    <select 
                      aria-label="Theme Selection"
                      className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                      value={settings.theme}
                      onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    >
                      {Object.keys(THEMES).map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title Color</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        aria-label="Title Color Picker"
                        className="w-8 h-8 rounded shrink-0 cursor-pointer bg-transparent border-none"
                        value={settings.titleColor || THEMES[settings.theme].text}
                        onChange={(e) => setSettings({...settings, titleColor: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="#hex"
                        aria-label="Title Color Hex"
                        className="w-full text-xs bg-[#161b22] border border-gray-800 rounded px-2 py-1 text-white font-mono"
                        value={settings.titleColor}
                        onChange={(e) => setSettings({...settings, titleColor: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon Color</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        aria-label="Icon Color Picker"
                        className="w-8 h-8 rounded shrink-0 cursor-pointer bg-transparent border-none"
                        value={settings.iconColor || THEMES[settings.theme].accent}
                        onChange={(e) => setSettings({...settings, iconColor: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="#hex"
                        aria-label="Icon Color Hex"
                        className="w-full text-xs bg-[#161b22] border border-gray-800 rounded px-2 py-1 text-white font-mono"
                        value={settings.iconColor}
                        onChange={(e) => setSettings({...settings, iconColor: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Border Color</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        aria-label="Border Color Picker"
                        className="w-8 h-8 rounded shrink-0 cursor-pointer bg-transparent border-none"
                        value={settings.borderColor || THEMES[settings.theme].border}
                        onChange={(e) => setSettings({...settings, borderColor: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="#hex"
                        aria-label="Border Color Hex"
                        className="w-full text-xs bg-[#161b22] border border-gray-800 rounded px-2 py-1 text-white font-mono"
                        value={settings.borderColor}
                        onChange={(e) => setSettings({...settings, borderColor: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-400">Hide Border</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      aria-label="Hide Border Toggle"
                      checked={settings.hideBorder}
                      onChange={(e) => setSettings({...settings, hideBorder: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-800/50">
                  <span className="text-sm font-medium text-gray-400">Show Icons</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      aria-label="Show Icons Toggle"
                      checked={settings.showIcons}
                      onChange={(e) => setSettings({...settings, showIcons: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800/50">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-400">Border Radius</label>
                    <span className="text-xs text-gray-500 font-mono">{settings.borderRadius}px</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1"
                    aria-label="Border Radius Slider"
                    className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({...settings, borderRadius: parseInt(e.target.value)})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Font Size</label>
                    <select 
                      aria-label="Font Size Selection"
                      className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm"
                      value={settings.fontSize}
                      onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Background Opacity</label>
                    <div className="flex items-center gap-2">
                       <input 
                        type="range" min="50" max="100" step="1"
                        aria-label="Background Opacity Slider"
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        value={settings.bgOpacity}
                        onChange={(e) => setSettings({...settings, bgOpacity: parseInt(e.target.value)})}
                      />
                      <span className="text-[10px] text-gray-500 font-mono w-8">{settings.bgOpacity}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-gray-600">Options</span>
                      <div className="flex items-center justify-between bg-[#161b22] p-2 rounded-lg border border-gray-800">
                        <span className="text-xs text-gray-400">Username</span>
                        <input 
                          type="checkbox" 
                          aria-label="Show Username on Card Toggle"
                          className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-blue-600"
                          checked={settings.showUsername}
                          onChange={(e) => setSettings({...settings, showUsername: e.target.checked})}
                        />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold text-gray-600">Layout</span>
                      <div className="flex items-center justify-between bg-[#161b22] p-2 rounded-lg border border-gray-800">
                        <span className="text-xs text-gray-400">Compact</span>
                        <input 
                          type="checkbox" 
                          aria-label="Compact Mode Toggle"
                          className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-blue-600"
                          checked={settings.compactMode}
                          onChange={(e) => setSettings({...settings, compactMode: e.target.checked})}
                        />
                      </div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Animation (HTML only)</label>
                  <select 
                    aria-label="Embed Animation Selection"
                    className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm"
                    value={settings.animation}
                    onChange={(e) => setSettings({...settings, animation: e.target.value})}
                  >
                    <option value="none">None</option>
                    <option value="fade">Fade In</option>
                    <option value="slide">Slide Down</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Custom Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My Open Source Journey"
                    aria-label="Custom Widget Title"
                    className="w-full bg-[#161b22] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={settings.customTitle}
                    onChange={(e) => setSettings({...settings, customTitle: e.target.value})}
                  />
                </div>
              </div>
            </article>

            {/* RIGHT: Live Preview */}
            <div className="flex flex-col gap-6">
              <section className="bg-[#0d1117] rounded-2xl border border-gray-800 p-8 shadow-xl flex-grow flex flex-col items-center justify-center min-h-[400px]">
                <header className="w-full flex items-center justify-between mb-8 text-white font-semibold border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-500" />
                    <h3>Live Preview</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Real-time
                  </div>
                </header>

                <div className="w-full max-w-[450px] mx-auto overflow-hidden">
                  <WidgetPreview settings={settings} />
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 italic max-w-xs">
                  "This preview uses live mock data. Your final widget will fetch your actual GitHub stats."
                </div>
              </section>

              {/* Embed Code Output */}
              <section className="bg-[#0d1117] rounded-2xl border border-gray-800 p-6 shadow-xl">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-4" role="tablist">
                      {['markdown', 'html'].map(tab => (
                        <button
                          key={tab}
                          role="tab"
                          aria-selected={activeTab === tab}
                          onClick={() => setActiveTab(tab)}
                          className={cn(
                            "text-sm font-medium px-4 py-1.5 rounded-full transition-all capitalize",
                            activeTab === tab 
                              ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                              : "text-gray-500 hover:text-gray-300"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleCopy(embedCode[activeTab])}
                      aria-label="Copy Embed Code"
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white flex items-center gap-2 text-xs font-bold"
                    >
                      {copying ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copying ? 'COPIED' : 'COPY'}
                    </button>
                 </div>
                 
                 <div className="relative group">
                   <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
                   <div className="bg-[#010409] border border-gray-800 p-4 rounded-xl font-mono text-[11px] overflow-hidden group-hover:border-blue-500/50 transition-colors">
                      <pre className="text-blue-400 break-all whitespace-pre-wrap">
                        {embedCode[activeTab]}
                      </pre>
                   </div>
                 </div>
                 
                 <p className="mt-4 text-xs text-gray-500 text-center">
                   Paste this into your <span className="text-gray-300 font-mono">README.md</span> and your widget goes live instantly.
                 </p>
              </section>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="examples" className="py-24 bg-[#0d1117]">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">See What Others Are Building</h2>
            <p className="text-gray-400">Join thousands of developers using GitWidgets.dev</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { user: 'shadcn', theme: 'dark' },
              { user: 'gaearon', theme: 'radical' },
              { user: 'wesbos', theme: 'tokyonight' },
              { user: 'danabb', theme: 'dracula' },
              { user: 'sarah_edo', theme: 'light' },
              { user: 'kentcdodds', theme: 'merko' }
            ].map((example, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 10px rgba(59,130,246,0.2)' }}
                className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 group transition-all"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <WidgetPreview settings={{ theme: example.theme, username: example.user }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    {example.user}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-500/60 tracking-widest">{example.theme}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-[#161b22]/30 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: '1', title: 'Enter Username', desc: 'Type your GitHub username and we\'ll fetch your real-time stats.', icon: <Github className="w-8 h-8" /> },
                { step: '2', title: 'Customize Style', desc: 'Choose from 6 themes or build your own with custom colors.', icon: <Palette className="w-8 h-8" /> },
                { step: '3', title: 'Copy & Paste', desc: 'Copy the Markdown code and paste it directly into your README.', icon: <Copy className="w-8 h-8" /> }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-600/20 group-hover:text-blue-400">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#010409] border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-2xl text-white mb-8">
            <Github className="w-8 h-8 text-blue-500" />
            <span>GitWidgets<span className="text-blue-500">.dev</span></span>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/supply-code" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors group" aria-label="GitHub">
              <Github className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </a>
            <a href="https://x.com/supply_code" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors group" aria-label="X (Twitter)">
              <Twitter className="w-6 h-6 text-gray-400 group-hover:text-white" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white">@supply_code</span>
            </a>
            <a href="mailto:hi@gitwidgets.dev" className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors group" aria-label="Email">
              <Mail className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </a>
          </div>

          <p className="text-gray-500 text-sm mb-2">
            Made for developers, by developers
          </p>
          <p className="text-gray-600 text-xs">
            © 2026 GitWidgets.dev. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast Notification (Simple Implementation) */}
      <AnimatePresence>
        {copying && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 z-[100]"
          >
            <Check className="w-5 h-5" />
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

