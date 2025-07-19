import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

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
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-vercel-blue opacity-10 rounded-full blur-3xl animate-float"
          style={{
            left: `${20 + mousePosition.x * 0.01}%`,
            top: `${30 + mousePosition.y * 0.01}%`,
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-vercel-purple opacity-10 rounded-full blur-3xl animate-float"
          style={{
            right: `${15 + mousePosition.x * 0.008}%`,
            bottom: `${25 + mousePosition.y * 0.008}%`,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-vercel-pink opacity-5 rounded-full blur-3xl animate-float"
          style={{
            left: `${60 + mousePosition.x * 0.006}%`,
            top: `${60 + mousePosition.y * 0.006}%`,
            animationDelay: '4s'
          }}
        ></div>
      </div>

      <div className="container relative z-10 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-vercel-green bg-opacity-10 border border-vercel-green border-opacity-20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="status-dot status-online"></div>
          <span className="text-caption text-vercel-green font-medium">Available for projects</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <h1 className="text-display-large font-inter font-bold text-white animate-fade-in-up">
            Hi, I'm Ashutosh
          </h1>
          
          {/* Animated Role */}
          <div className="h-16 flex items-center justify-center animate-fade-in-up delay-200">
            <p className="text-subheadline text-gray-400 font-medium">
              {roles[currentRole]}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-subheadline text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-300">
          Crafting exceptional digital experiences through innovative code and cutting-edge AI solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-400">
          <a
            href="#projects"
            className="btn-primary group"
          >
            <span>View my work</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="btn-secondary group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            <span>Download resume</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 animate-fade-in-up delay-500">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-bg-elevated hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-vercel-md transition-all duration-200 hover:scale-105 hover:shadow-vercel-lg"
          >
            <Github className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-singh-4b9a93230"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-bg-elevated hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-vercel-md transition-all duration-200 hover:scale-105 hover:shadow-vercel-lg"
          >
            <Linkedin className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="mailto:2224ashutosh@gmail.com"
            className="p-3 bg-bg-elevated hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-vercel-md transition-all duration-200 hover:scale-105 hover:shadow-vercel-lg"
          >
            <Mail className="w-5 h-5 text-gray-300" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;