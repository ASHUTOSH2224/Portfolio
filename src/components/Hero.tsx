import React from 'react';
import { Github, Linkedin, Mail, Code, Zap, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ashutosh@example.com', label: 'Email' },
    { icon: Code, href: '#', label: 'LeetCode' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-matteBlack-800 relative overflow-hidden">
      {/* Refined Background Effects */}
      <div className="absolute inset-0 matrix-bg opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-radial from-accent-primary/8 via-transparent to-transparent animate-pulse-slow"></div>
      
      {/* Cleaner Geometric Shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-accent-primary/20 rounded-lg animate-rotate-slow"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-accent-primary/10 rounded-full animate-float delay-200"></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 border border-accent-secondary/30 rotate-45 animate-float delay-400"></div>
      <div className="absolute bottom-20 right-40 w-20 h-20 border border-accent-tertiary/15 rounded-full animate-rotate-slow"></div>

      <div className="container-max relative z-10">
        <div className="text-center animate-fade-in-up">
          {/* Refined Status Badge */}
          <div className="inline-flex items-center space-x-2 glass-effect rounded-full px-6 py-3 mb-8 animate-fade-in-down delay-200 hover-glow border border-surface-border">
            <Zap className="w-4 h-4 text-accent-primary animate-pulse" />
            <span className="text-sm text-text-secondary font-medium">Available for Remote Work</span>
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Main Title */}
          <div className="relative mb-6 animate-fade-in-up delay-300">
            <h1 className="text-6xl md:text-8xl font-black relative">
              {/* Main gradient text with refined colors */}
              <span className="relative z-10 bg-gradient-to-r from-white via-accent-primary to-accent-secondary bg-clip-text text-transparent animate-gradient-shift">
                Ashutosh
              </span>
              
              {/* Refined glow layers */}
              <span className="absolute inset-0 text-6xl md:text-8xl font-black text-white blur-sm opacity-50">
                Ashutosh
              </span>
              <span className="absolute inset-0 text-6xl md:text-8xl font-black text-accent-primary blur-md opacity-30">
                Ashutosh
              </span>
              <span className="absolute inset-0 text-6xl md:text-8xl font-black text-accent-secondary blur-lg opacity-20">
                Ashutosh
              </span>
              
              {/* Refined particles */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent-primary rounded-full animate-ping opacity-60"></div>
              <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-accent-secondary rounded-full animate-ping delay-300 opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent-tertiary rounded-full animate-ping delay-500 opacity-60"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-accent-primary rounded-full animate-ping delay-700 opacity-50"></div>
              
              {/* Refined holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent animate-shine opacity-20"></div>
            </h1>
            
            {/* Cleaner floating elements */}
            <div className="absolute -top-6 -left-6 w-3 h-3 border border-accent-primary/30 rotate-45 animate-float opacity-40"></div>
            <div className="absolute -top-3 right-1/4 w-2 h-2 bg-accent-secondary/20 rounded-full animate-float delay-200"></div>
            <div className="absolute -bottom-4 left-1/4 w-1 h-6 bg-gradient-to-b from-accent-primary/20 to-transparent animate-float delay-400"></div>
            <div className="absolute -bottom-3 -right-6 w-4 h-4 border border-accent-tertiary/20 rounded-full animate-float delay-600"></div>
          </div>
          
          {/* Enhanced Subtitle */}
          <h2 className="text-2xl md:text-4xl font-semibold text-text-secondary mb-6 animate-fade-in-up delay-500">
            Full Stack Developer & 
            <span className="text-accent-primary text-glow-sm"> AI Engineer</span>
          </h2>
          
          {/* Refined Description */}
          <p className="text-lg md:text-xl text-text-muted mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-700">
            Head of Software Architecture at{' '}
            <span className="text-accent-primary font-semibold hover:text-accent-secondary transition-all duration-300 cursor-pointer">Scalixity</span>, 
            specializing in intelligent web applications, machine learning solutions, 
            and scalable architectures that drive business growth.
          </p>

          {/* Refined CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16 animate-fade-in-up delay-900">
            <button className="px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <span className="relative z-10">View My Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button className="px-8 py-4 border-2 border-accent-primary/40 text-accent-primary font-semibold rounded-lg hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Refined Social Links */}
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up delay-1000">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group relative p-4 glass-effect rounded-xl text-text-muted hover:text-accent-primary transition-all duration-300 transform hover:scale-110 hover-glow border border-surface-border hover:border-accent-primary/30"
                aria-label={social.label}
              >
                <social.icon size={24} className="relative z-10 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-accent-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Refined Tooltip */}
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-surface-tertiary text-text-secondary text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-surface-border">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Refined Scroll Indicator */}
          <div className="animate-fade-in delay-1200">
            <p className="text-text-muted text-sm mb-4 animate-pulse">Scroll to explore</p>
            <div className="flex justify-center">
              <div className="w-8 h-12 border-2 border-surface-border-light rounded-full flex justify-center animate-bounce hover:border-accent-primary transition-colors duration-300 cursor-pointer group">
                <ChevronDown className="w-4 h-4 text-text-muted mt-2 group-hover:text-accent-primary transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refined Particle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-accent-primary/40 rounded-full animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;