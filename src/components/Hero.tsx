import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Terminal, Code, Cpu, Star, Zap, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'React Specialist',
    'Problem Solver',
    'Creative Coder',
    'Tech Enthusiast'
  ];

  const terminalCommands = [
    'npm install creativity',
    'git commit -m "Another awesome feature"',
    'npm run build-dreams',
    'yarn deploy-innovation',
    'docker build -t success .',
    'npm start -- --mode=awesome'
  ];

  useEffect(() => {
    setIsLoaded(true);
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const terminalInterval = setInterval(() => {
      const currentCommand = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
      setTerminalText(currentCommand);
      
      setTimeout(() => {
        setTerminalText('');
      }, 2500);
    }, 4000);

    return () => clearInterval(terminalInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleScroll = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary overflow-hidden">
      {/* Enhanced Matrix Rain Background */}
      <div className="matrix-rain opacity-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 4}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          >
            {Array.from({ length: 25 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </div>
        ))}
      </div>

      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-primary/90 via-transparent to-surface-primary/90" />
      
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-accent-secondary/5 to-accent-tertiary/10 animate-pulse"></div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 rounded-full blur-2xl animate-float opacity-60" />
        <div className="absolute top-60 right-20 w-40 h-40 bg-gradient-to-br from-accent-tertiary/25 to-accent-primary/15 rounded-full blur-2xl animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-60 left-32 w-36 h-36 bg-gradient-to-br from-accent-secondary/20 to-accent-tertiary/25 rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/30 rounded-full blur-xl animate-float opacity-70" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-br from-accent-tertiary/30 to-accent-primary/20 rounded-full blur-xl animate-float opacity-60" style={{ animationDelay: '3s' }} />
      </div>

      {/* Interactive particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent-primary rounded-full animate-ping opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Enhanced status badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface-accent/90 backdrop-blur-lg border border-surface-border/50 rounded-full shadow-lg hover:shadow-accent-primary/20 transition-all duration-500 group">
              <div className="relative">
                <div className="w-3 h-3 bg-accent-primary rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-accent-primary rounded-full animate-ping opacity-50" />
              </div>
              <span className="text-sm font-medium text-text-primary">Available for opportunities</span>
              <Heart className="w-4 h-4 text-accent-primary group-hover:animate-bounce" />
            </div>

            {/* Enhanced main heading */}
            <div className="space-y-6">
              <div className="relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight">
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Hi, I'm{' '}
                  </span>
                  <span className="relative inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent animate-gradient-shift">
                      Ashutosh
                    </span>
                    {/* Animated underline */}
                    <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary animate-expand-width" style={{ animationDelay: '1s' }} />
                  </span>
                </h1>
              </div>

              {/* Enhanced animated role with text reveal */}
              <div className="h-20 flex items-center relative overflow-hidden">
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-secondary">
                    <span className="inline-block animate-slide-in-right">
                      {roles[currentRole]}
                    </span>
                    <span className={`ml-2 text-accent-primary ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                      |
                    </span>
                  </h2>
                  {/* Sparkle effects */}
                  <Star className="absolute -top-2 -right-8 w-6 h-6 text-accent-primary animate-spin opacity-70" />
                  <Zap className="absolute -bottom-2 -left-8 w-5 h-5 text-accent-secondary animate-pulse opacity-60" />
                </div>
              </div>

              <div className="relative">
                <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  I craft digital experiences with clean code and innovative solutions. 
                  Passionate about turning complex problems into elegant, scalable applications that make a difference.
                </p>
                {/* Decorative elements */}
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent-primary to-accent-secondary opacity-30 rounded-full"></div>
              </div>
            </div>

            {/* Enhanced action buttons */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent-primary/40 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  <Play className="w-5 h-5 group-hover:animate-bounce" />
                  View My Work
                </span>
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              </button>

              <button className="group relative px-8 py-4 border-2 border-accent-primary/40 text-accent-primary font-bold rounded-2xl hover:border-accent-primary hover:bg-accent-primary hover:text-white transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/30">
                <span className="relative flex items-center gap-3">
                  <Terminal className="w-5 h-5 group-hover:animate-bounce" />
                  Let's Connect
                </span>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </button>
            </div>

            {/* Enhanced quick stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-accent-primary mb-2 group-hover:animate-pulse">50+</div>
                <div className="text-sm text-text-muted font-medium">Projects</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-accent-secondary mb-2 group-hover:animate-pulse">3+</div>
                <div className="text-sm text-text-muted font-medium">Years Exp</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-accent-tertiary mb-2 group-hover:animate-pulse">100%</div>
                <div className="text-sm text-text-muted font-medium">Dedication</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Terminal Interface */}
          <div className={`relative ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Terminal Window */}
            <div className="terminal-window bg-surface-card/95 backdrop-blur-lg border border-surface-border/50 shadow-2xl shadow-accent-primary/20 hover:shadow-accent-primary/30 transition-all duration-500 rounded-2xl overflow-hidden">
              <div className="terminal-header bg-gradient-to-r from-surface-accent/50 to-surface-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="terminal-button red hover:scale-110 transition-transform duration-200" />
                    <div className="terminal-button yellow hover:scale-110 transition-transform duration-200" />
                    <div className="terminal-button green hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-bold text-text-primary">ashutosh-portfolio.tsx</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-text-muted hover:text-accent-primary transition-colors duration-300" />
                    <Cpu className="w-4 h-4 text-text-muted hover:text-accent-secondary transition-colors duration-300" />
                  </div>
                </div>
              </div>

              <div className="terminal-content p-6 space-y-4">
                <div className="space-y-3">
                  {/* Enhanced terminal lines */}
                  <div className="flex items-center gap-3">
                    <span className="terminal-prompt text-accent-primary font-bold">ashutosh@portfolio:~$</span>
                    <span className="text-text-primary font-mono">whoami</span>
                  </div>
                  <div className="text-text-secondary ml-8 font-mono">
                    Full Stack Developer | React Specialist | Problem Solver | Creative Coder
                  </div>
                  
                  <div className="flex items-center gap-3 mt-6">
                    <span className="terminal-prompt text-accent-primary font-bold">ashutosh@portfolio:~$</span>
                    <span className="text-text-primary font-mono">cat skills.json</span>
                  </div>
                  <div className="ml-8 text-text-secondary font-mono">
                    <div className="text-accent-tertiary">{'{'}</div>
                    <div className="ml-4">
                      <span className="text-accent-primary">"frontend"</span>: 
                      <span className="text-accent-secondary"> ["React", "TypeScript", "Next.js", "Tailwind"]</span>,
                    </div>
                    <div className="ml-4">
                      <span className="text-accent-primary">"backend"</span>: 
                      <span className="text-accent-secondary"> ["Node.js", "Python", "PostgreSQL", "MongoDB"]</span>,
                    </div>
                    <div className="ml-4">
                      <span className="text-accent-primary">"tools"</span>: 
                      <span className="text-accent-secondary"> ["Docker", "AWS", "Git", "VS Code"]</span>,
                    </div>
                    <div className="ml-4">
                      <span className="text-accent-primary">"passion"</span>: 
                      <span className="text-accent-secondary"> ["Innovation", "Learning", "Building"]</span>
                    </div>
                    <div className="text-accent-tertiary">{'}'}</div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <span className="terminal-prompt text-accent-primary font-bold">ashutosh@portfolio:~$</span>
                    <span className="text-text-primary font-mono">
                      {terminalText}
                      {showCursor && <span className="terminal-cursor w-2 h-5 bg-accent-primary ml-1 inline-block animate-pulse" />}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating code snippets */}
            <div className="absolute -top-6 -right-6 w-40 h-24 bg-surface-accent/90 backdrop-blur-lg rounded-2xl border border-surface-border/50 p-4 animate-float opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-lg">
              <div className="text-xs font-mono text-text-muted">
                <div className="text-accent-primary">const</div>
                <div className="text-text-primary">magic = () =&gt; {'{}'}</div>
                <div className="text-accent-secondary">// ✨ Always</div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 w-48 h-28 bg-surface-accent/90 backdrop-blur-lg rounded-2xl border border-surface-border/50 p-4 animate-float opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-lg" style={{ animationDelay: '2s' }}>
              <div className="text-xs font-mono text-text-muted">
                <div className="text-accent-secondary">import</div>
                <div className="text-text-primary">{'{ innovation }'}</div>
                <div className="text-accent-tertiary">from 'creativity'</div>
                <div className="text-accent-primary">// 🚀 Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={handleScroll}>
          <div className="flex flex-col items-center gap-3 group">
            <span className="text-text-muted text-sm font-medium group-hover:text-accent-primary transition-colors duration-300">Scroll to explore</span>
            <div className="w-10 h-10 border-2 border-accent-primary rounded-full flex items-center justify-center group-hover:border-accent-secondary group-hover:bg-accent-primary/10 transition-all duration-300">
              <ChevronDown className="w-5 h-5 text-accent-primary group-hover:animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;