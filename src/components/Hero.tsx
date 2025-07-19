import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Vercel-style Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900"></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
          style={{
            background: 'linear-gradient(90deg, #0070f3 0%, #00d4aa 25%, #f5a524 50%, #ff0080 75%, #7928ca 100%)',
            opacity: 0.15
          }}
        ></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-vercel-blue opacity-5 rounded-full blur-3xl animate-float"
          style={{
            left: `${20 + mousePosition.x * 0.01}%`,
            top: `${30 + mousePosition.y * 0.01}%`,
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-vercel-purple opacity-5 rounded-full blur-3xl animate-float"
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

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-vercel-green bg-opacity-10 border border-vercel-green border-opacity-20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="status-dot status-online"></div>
          <span className="text-caption text-vercel-green font-medium">Available for projects</span>
        </div>

        {/* Main Heading - Vercel Style */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-inter font-bold text-white leading-tight animate-fade-in-up">
            Build and deploy
            <br />
            <span className="bg-gradient-to-r from-vercel-blue via-vercel-green to-vercel-purple bg-clip-text text-transparent">
              amazing things
            </span>
          </h1>
          
          {/* Animated Role */}
          <div className="h-16 flex items-center justify-center animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-gray-400 font-medium">
              {roles[currentRole]}
            </p>
          </div>
        </div>

        {/* Description - Vercel Style */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-300">
          I provide the developer expertise and technical solutions to build, scale, and secure faster, more innovative web applications.
        </p>

        {/* CTA Buttons - Vercel Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-400">
          <a
            href="#projects"
            className="group bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
          >
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
          <a
            href="#contact"
            className="group bg-black text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-900 hover:border-gray-600 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Social Links - Vercel Style */}
        <div className="flex items-center justify-center space-x-6 animate-fade-in-up delay-500">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Github className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-singh-4b9a93230"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Linkedin className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="mailto:2224ashutosh@gmail.com"
            className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 hover:scale-105"
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