import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Zap, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roles = ['Full Stack Developer', 'AI Engineer', 'Problem Solver', 'Tech Innovator'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-tertiary">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div 
          className="absolute w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-accent-secondary/20 rounded-full blur-3xl animate-float delay-300"
          style={{
            right: mousePosition.x * 0.01,
            bottom: mousePosition.y * 0.01,
          }}
        ></div>
      </div>

      <div className="relative z-10 container-custom text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-3 glass-effect rounded-full px-6 py-3 mb-12 animate-fade-in-up">
          <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
          <span className="text-accent-success text-lg font-medium">Available for Projects</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-8 mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight animate-fade-in-up delay-100 font-display">
            <span className="block text-text-primary text-shadow">Hi, I'm</span>
            <span className="block text-gradient animate-shimmer">Ashutosh</span>
          </h1>
          
          {/* Animated Role */}
          <div className="h-20 flex items-center justify-center animate-fade-in-up delay-200">
            <div className="glass-effect rounded-2xl px-8 py-4">
              <span className="text-3xl md:text-4xl font-semibold text-accent-primary">
                {roles[currentRole]}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-2xl md:text-3xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-16 animate-fade-in-up delay-300 font-light">
          Crafting exceptional digital experiences through 
          <span className="text-gradient font-semibold"> innovative code </span>
          and cutting-edge AI solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20 animate-fade-in-up delay-400">
          <a
            href="#projects"
            className="group flex items-center space-x-4 btn-primary text-xl px-10 py-5"
          >
            <span>View My Work</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="group flex items-center space-x-4 btn-secondary text-xl px-10 py-5"
          >
            <Download className="w-6 h-6 group-hover:animate-bounce" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-8 animate-fade-in-up delay-500">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 glass-effect rounded-2xl hover:bg-surface-elevated transition-all duration-300 hover:scale-110 group hover-glow"
          >
            <Github className="w-8 h-8 text-text-muted group-hover:text-accent-primary" />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-singh-4b9a93230"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 glass-effect rounded-2xl hover:bg-surface-elevated transition-all duration-300 hover:scale-110 group hover-glow"
          >
            <Linkedin className="w-8 h-8 text-text-muted group-hover:text-accent-primary" />
          </a>
          <a
            href="mailto:2224ashutosh@gmail.com"
            className="p-4 glass-effect rounded-2xl hover:bg-surface-elevated transition-all duration-300 hover:scale-110 group hover-glow"
          >
            <Mail className="w-8 h-8 text-text-muted group-hover:text-accent-primary" />
          </a>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-20 animate-float">
          <div className="w-16 h-16 glass-effect rounded-2xl flex items-center justify-center">
            <Code2 className="w-8 h-8 text-accent-primary/60" />
          </div>
        </div>
        <div className="absolute top-48 right-20 animate-float delay-200">
          <div className="w-12 h-12 glass-effect rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-accent-secondary/60" />
          </div>
        </div>
        <div className="absolute bottom-48 left-40 animate-float delay-400">
          <div className="w-14 h-14 glass-effect rounded-2xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-accent-tertiary/60" />
          </div>
        </div>
        <div className="absolute bottom-32 right-32 animate-float delay-600">
          <div className="w-10 h-10 glass-effect rounded-2xl flex items-center justify-center">
            <Star className="w-5 h-5 text-accent-primary/60" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-accent-primary rounded-full flex justify-center">
          <div className="w-2 h-4 bg-gradient-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;