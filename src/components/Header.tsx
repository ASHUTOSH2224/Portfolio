import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-matte border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex justify-between items-center py-6 px-6">
          {/* Enhanced Creative Logo */}
          <div className="relative group cursor-pointer">
            <div className="text-3xl font-black relative">
              {/* Main text with multiple glow layers */}
              <span className="relative z-10 bg-gradient-to-r from-white via-accent-primary to-accent-purple bg-clip-text text-transparent">
                Ashutosh
              </span>
              
              {/* Glow effects */}
              <span className="absolute inset-0 text-3xl font-black text-white blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Ashutosh
              </span>
              <span className="absolute inset-0 text-3xl font-black text-accent-primary blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                Ashutosh
              </span>
              <span className="absolute inset-0 text-3xl font-black text-accent-purple blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                Ashutosh
              </span>
              
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-purple group-hover:w-full transition-all duration-500"></div>
            </div>
            
            {/* Floating particles around logo */}
            <div className="absolute -top-2 -left-2 w-1 h-1 bg-accent-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
            <div className="absolute -top-1 right-0 w-1 h-1 bg-accent-purple rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-150 transition-opacity duration-300"></div>
            <div className="absolute -bottom-2 left-1/3 w-1 h-1 bg-accent-secondary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300 transition-opacity duration-300"></div>
          </div>

          {/* Center Navigation - Clean Design */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['About', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative px-4 py-2 text-white/80 hover:text-white font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">{item}</span>
                {/* Hover underline effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-purple group-hover:w-full transition-all duration-300"></div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            ))}
          </nav>

          {/* Right Side Buttons - Matching Screenshot */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 group">
              <Download size={16} className="group-hover:animate-bounce" />
              <span className="font-medium">Resume</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-purple text-white font-medium rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <span className="relative z-10">Hire Me</span>
              <ExternalLink size={16} className="relative z-10 group-hover:animate-bounce" />
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 text-white/80 hover:text-accent-primary glass-effect rounded-lg hover-glow transition-all duration-300 group"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
        }`}>
          <div className="backdrop-blur-matte border-t border-white/10 rounded-b-2xl mx-6">
            <nav className="flex flex-col space-y-2 py-6 px-4">
              {['About', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left px-6 py-4 text-white/80 hover:text-accent-primary transition-all duration-300 glass-effect rounded-lg hover-glow group animate-fade-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-accent-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-white/10 animate-fade-in-up delay-500">
                <button className="flex items-center justify-center space-x-2 px-6 py-4 text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 group">
                  <Download size={16} className="group-hover:animate-bounce" />
                  <span className="font-medium">Resume</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-purple text-white font-medium rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
                  <span className="relative z-10">Hire Me</span>
                  <ExternalLink size={16} className="relative z-10 group-hover:animate-bounce" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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