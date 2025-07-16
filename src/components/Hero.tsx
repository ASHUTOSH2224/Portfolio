import React from 'react';
import { Play, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-surface-primary overflow-hidden animate-fade-in">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight">
                I build modern web and mobile applications that solve business problems.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                I am a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. I specialize in building high-quality, client-focused web and mobile applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="#projects" className="group relative px-8 py-4 bg-accent-primary text-white font-bold rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:bg-accent-primary/90">
                <span className="relative flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  View My Work
                </span>
              </a>
              <a href="#contact" className="group relative px-8 py-4 border-2 border-accent-primary text-accent-primary font-bold rounded-lg hover:bg-accent-primary hover:text-white transition-all duration-500">
                <span className="relative flex items-center gap-3">
                  <Terminal className="w-5 h-5" />
                  Let's Connect
                </span>
              </a>
            </div>
          </div>
          {/* Right Content */}
          <div className="relative animate-fade-in">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Placeholder" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;