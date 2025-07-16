import React from 'react';
import { Code, Brain, Rocket, Award, Users, Coffee } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+' },
    { icon: Users, label: 'Happy Clients', value: '30+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: Award, label: 'Years Experience', value: '3+' }
  ];

  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems that solve real-world problems'
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Creating seamless experiences from frontend to backend'
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast, scalable applications'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Turning Ideas Into Reality
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                With a B.Tech in Computer Science Engineering, I've dedicated my career to mastering 
                the art of full-stack development and artificial intelligence. My journey began with 
                curiosity about how technology can transform businesses and improve lives.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                As Head of Software Architecture at Scalixity, I lead teams in building scalable, 
                intelligent systems that drive business growth. I believe in clean code, innovative 
                solutions, and continuous learning.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 glass-card hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="modern-card p-8 text-center group hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="text-center animate-fade-in-up delay-600">
          <h3 className="text-2xl font-bold text-white mb-8">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'TypeScript', 'AI/ML', 'AWS', 'MongoDB', 'Docker'].map((tech, index) => (
              <span 
                key={tech}
                className="tag animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;