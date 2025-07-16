import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'glass backdrop-blur py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="w-8 h-8 text-gradient animate-pulse-slow" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-gradient">Ashutosh</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary animate-fade-in-up delay-500"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 glass rounded-2xl p-6 animate-scale-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-4 text-center animate-fade-in-up delay-400"
              >
                Let's Talk
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;