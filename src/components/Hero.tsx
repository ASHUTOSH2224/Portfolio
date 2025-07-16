import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Zap } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float delay-300"
          style={{
            right: mousePosition.x * 0.01,
            bottom: mousePosition.y * 0.01,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Available for work</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight animate-fade-in-up delay-100">
            <span className="block text-white">Hi, I'm</span>
            <span className="block text-gradient">Ashutosh</span>
          </h1>
          
          {/* Animated Role */}
          <div className="h-16 flex items-center justify-center animate-fade-in-up delay-200">
            <span className="text-2xl md:text-3xl font-semibold text-gray-300">
              {roles[currentRole]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-300">
          I craft exceptional digital experiences through innovative code and cutting-edge AI solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up delay-400">
          <a
            href="#projects"
            className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="group flex items-center space-x-3 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 animate-fade-in-up delay-500">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
          >
            <Github className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-singh-4b9a93230"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
          >
            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
          </a>
          <a
            href="mailto:2224ashutosh@gmail.com"
            className="p-3 glass rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
          >
            <Mail className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
          </a>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <Code2 className="w-8 h-8 text-blue-500/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float delay-200">
          <Zap className="w-6 h-6 text-yellow-500/30" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float delay-400">
          <Sparkles className="w-7 h-7 text-purple-500/30" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;