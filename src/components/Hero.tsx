import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Terminal, Code, Cpu, Star, Zap, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScroll = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className="relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight">
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Turn Your Idea into a
                  </span>
                  <span className="relative inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent animate-gradient-shift">
                      Modern Web or Mobile App
                    </span>
                  </span>
                </h1>
              </div>

              <div className="relative">
                <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  I build high-quality, client-focused web and mobile applications. Proven delivery, fast turnaround, and clear communication.
                </p>
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

              <a href="mailto:contact@example.com" className="group relative px-8 py-4 border-2 border-accent-primary/40 text-accent-primary font-bold rounded-2xl hover:border-accent-primary hover:bg-accent-primary hover:text-white transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/30">
                <span className="relative flex items-center gap-3">
                  <Terminal className="w-5 h-5 group-hover:animate-bounce" />
                  Let's Connect
                </span>
              </a>
            </div>
          </div>

          {/* Right Content - Simplified */}
          <div className={`relative ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Placeholder" className="rounded-2xl shadow-2xl" />
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