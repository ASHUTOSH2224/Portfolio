import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-secondary border-t border-surface-border relative overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-accent/10 to-surface-accent/5"></div>
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="animate-fade-in-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2">
              Alex
            </div>
            <p className="text-text-muted text-sm">
              Full Stack Developer & Software Engineer
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center animate-fade-in-up">
            <p className="text-text-muted text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-accent-secondary mx-1 animate-pulse" fill="currentColor" /> by Alex
            </p>
            <p className="text-text-muted text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end animate-fade-in-right">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-surface-card border border-surface-border text-text-muted rounded-lg hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 transform hover:scale-105 group hover:shadow-glow-orange"
            >
              <ArrowUp size={16} className="group-hover:animate-bounce" />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-surface-border text-center animate-fade-in-up delay-300">
          <p className="text-text-muted text-xs">
            This portfolio showcases my passion for creating innovative solutions through code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;