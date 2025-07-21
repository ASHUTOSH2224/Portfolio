import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronDown, Sparkles, Zap, Code, Brain, Smartphone, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const roles = [
    'Full Stack Developer',
    'AI Engineer', 
    'Mobile Developer',
    'DevOps Specialist',
    'UI/UX Designer',
    'Problem Solver'
  ];

  const capabilities = [
    { icon: Code, title: 'Web Development', desc: 'React, Node.js, TypeScript' },
    { icon: Brain, title: 'AI & Machine Learning', desc: 'TensorFlow, Python, NLP' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'React Native, Flutter' },
    { icon: Globe, title: 'Cloud & DevOps', desc: 'AWS, Docker, Kubernetes' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: ['#0070f3', '#7928ca', '#ff0080', '#f5a524'][Math.floor(Math.random() * 4)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(0, 112, 243, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* 3D Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Rotating Cube */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 animate-spin"
          style={{ 
            animationDuration: '20s',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute w-full h-full bg-gradient-to-r from-vercel-blue to-vercel-purple opacity-20 rounded-lg transform rotate-45"></div>
          <div className="absolute w-full h-full bg-gradient-to-r from-vercel-purple to-vercel-pink opacity-20 rounded-lg transform -rotate-45"></div>
        </div>

        {/* Floating Spheres */}
        <div 
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-vercel-pink to-vercel-orange rounded-full opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-r from-vercel-green to-vercel-blue rounded-full opacity-20 animate-float"
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Interactive Mouse Followers */}
        <div 
          className="absolute w-4 h-4 bg-vercel-blue rounded-full opacity-50 animate-pulse"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: 'all 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-2 h-2 bg-vercel-purple rounded-full opacity-30"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            transition: 'all 0.15s ease-out'
          }}
        ></div>
      </div>

      <div className="container relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-vercel-green bg-opacity-10 border border-vercel-green border-opacity-20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="status-dot status-online"></div>
          <span className="text-caption text-vercel-green font-medium">Available for new projects</span>
        </div>

        {/* Main Heading with Typewriter Effect */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-inter font-bold text-white leading-tight animate-fade-in-up">
            Transforming Ideas Into
            <br />
            <span className="bg-gradient-to-r from-vercel-blue via-vercel-green to-vercel-purple bg-clip-text text-transparent animate-gradient">
              Digital Reality
            </span>
          </h1>
          
          {/* Animated Role Display */}
          <div className="h-16 flex items-center justify-center animate-fade-in-up delay-200">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-vercel-blue animate-pulse" />
              <p className="text-xl md:text-2xl text-gray-400 font-medium">
                {roles[currentRole]}
              </p>
              <Sparkles className="w-6 h-6 text-vercel-purple animate-pulse" />
            </div>
          </div>
        </div>

        {/* Client-Focused Description */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-300">
          I help businesses and startups build scalable, innovative solutions that drive growth. 
          From concept to deployment, I deliver cutting-edge applications that exceed expectations.
        </p>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up delay-400">
          {capabilities.map((capability, index) => (
            <div 
              key={capability.title}
              className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-vercel-blue transition-all duration-300 animate-card-slide-in card-hover-effect"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-vercel-blue to-vercel-purple rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <capability.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{capability.title}</h3>
              <p className="text-gray-400 text-sm">{capability.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-500">
          <a
            href="#contact"
            className="group bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
          <a
            href="#projects"
            className="group bg-black text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-900 hover:border-vercel-blue transition-all duration-200 flex items-center space-x-2"
          >
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>View My Work</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 animate-fade-in-up delay-600">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-black hover:bg-gray-900 border border-gray-700 hover:border-vercel-blue rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vercel-blue/25"
          >
            <Github className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="https://linkedin.com/in/ashutosh-singh-4b9a93230"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-black hover:bg-gray-900 border border-gray-700 hover:border-vercel-blue rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vercel-blue/25"
          >
            <Linkedin className="w-5 h-5 text-gray-300" />
          </a>
          <a
            href="mailto:2224ashutosh@gmail.com"
            className="p-3 bg-black hover:bg-gray-900 border border-gray-700 hover:border-vercel-blue rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-vercel-blue/25"
          >
            <Mail className="w-5 h-5 text-gray-300" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-vercel-blue rounded-full mt-2 animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Cards */}
      <div className="absolute bottom-20 right-10 space-y-4 animate-fade-in-up delay-700">
        <div className="bg-black border border-gray-800 rounded-lg p-4 hover:border-vercel-blue transition-all duration-300 card-hover-effect">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-vercel-green rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Live Chat Available</span>
          </div>
        </div>
        <div className="bg-black border border-gray-800 rounded-lg p-4 hover:border-vercel-blue transition-all duration-300 card-hover-effect">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-vercel-blue" />
            <span className="text-white text-sm">Free Consultation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;