import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ExternalLink, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-surface-primary/95 backdrop-blur-lg border-b border-surface-border/50 shadow-2xl shadow-accent-primary/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <div className="text-2xl md:text-3xl font-black relative overflow-hidden">
              <span className="relative z-10 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent animate-gradient-shift">
                Ashutosh
              </span>
              
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary group-hover:w-full transition-all duration-700 rounded-full"></div>
              
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500 rounded-lg"></div>
            </div>
            
            {/* Enhanced floating particles */}
            <div className="absolute -top-3 -left-3 w-2 h-2 bg-accent-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
            <div className="absolute -top-2 right-2 w-1.5 h-1.5 bg-accent-secondary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200 transition-opacity duration-300"></div>
            <div className="absolute -bottom-3 left-1/4 w-1 h-1 bg-accent-tertiary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-400 transition-opacity duration-300"></div>
            <div className="absolute top-1 right-0 w-1 h-1 bg-accent-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-600 transition-opacity duration-300"></div>
          </div>

          {/* Enhanced Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {['About', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative px-5 py-3 text-text-muted hover:text-accent-primary font-medium transition-all duration-500 group overflow-hidden rounded-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item}
                  <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
                </span>
                
                {/* Multi-layer hover effects */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-accent-primary/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              </button>
            ))}
          </nav>

          {/* Enhanced Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="group relative flex items-center space-x-2 px-6 py-3 text-text-muted hover:text-accent-primary border border-surface-border rounded-xl hover:border-accent-primary/50 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-accent-primary/20">
              <Download size={16} className="group-hover:animate-bounce relative z-10" />
              <span className="font-medium relative z-10">Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <button className="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-accent-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden">
              <span className="relative z-10">Hire Me</span>
              <ExternalLink size={16} className="relative z-10 group-hover:animate-bounce" />
              
              {/* Enhanced shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 rounded-xl"></div>
            </button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-3 text-text-muted hover:text-accent-primary bg-surface-card/80 backdrop-blur-sm border border-surface-border rounded-xl transition-all duration-500 group hover:shadow-lg hover:shadow-accent-primary/20"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-500 ${
                  isOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-500 ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-700 ease-in-out ${
          isOpen 
            ? 'max-h-[500px] opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-8 overflow-hidden'
        }`}>
          <div className="bg-surface-card/95 backdrop-blur-lg border border-surface-border/50 rounded-2xl mx-4 shadow-2xl shadow-accent-primary/10 overflow-hidden">
            <nav className="flex flex-col space-y-1 py-6 px-4">
              {['About', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-left px-6 py-4 text-text-muted hover:text-accent-primary transition-all duration-500 bg-surface-primary/50 rounded-xl hover:bg-gradient-to-r hover:from-accent-primary/10 hover:to-accent-secondary/10 group animate-fade-in-left overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item}
                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              ))}
              
              {/* Enhanced Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-6 mt-6 border-t border-surface-border/50 animate-fade-in-up delay-500">
                <button className="group relative flex items-center justify-center space-x-2 px-6 py-4 text-text-muted hover:text-accent-primary border border-surface-border rounded-xl hover:border-accent-primary/50 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-accent-primary/20">
                  <Download size={16} className="group-hover:animate-bounce relative z-10" />
                  <span className="font-medium relative z-10">Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                <button className="group relative flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-accent-primary/30 transition-all duration-500 transform hover:scale-105 overflow-hidden">
                  <span className="relative z-10">Hire Me</span>
                  <ExternalLink size={16} className="relative z-10 group-hover:animate-bounce" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;