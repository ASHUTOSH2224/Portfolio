import React from 'react';
import { Code, Brain, Rocket, Award, Users, Coffee, Target } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+', color: 'vercel-blue' },
    { icon: Users, label: 'Happy Clients', value: '30+', color: 'vercel-green' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+', color: 'vercel-orange' },
    { icon: Award, label: 'Years Experience', value: '3+', color: 'vercel-purple' }
  ];

  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems that solve real-world problems with cutting-edge technology.',
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Creating seamless experiences from frontend interfaces to robust backend systems.',
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast, scalable applications that perform at enterprise scale.',
    }
  ];

  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            About me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up delay-300">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Turning ideas into reality
              </h3>
              <div className="space-y-4 text-lg text-gray-400 leading-relaxed">
                <p>
                  With a <span className="text-vercel-blue font-medium">B.Tech in Computer Science</span>, 
                  I've dedicated my career to mastering full-stack development and artificial intelligence.
                </p>
                <p>
                  As <span className="text-vercel-purple font-medium">Head of Software Architecture</span> at Scalixity, 
                  I lead teams in building scalable, intelligent systems that drive business growth.
                </p>
                <p>
                  I believe in <span className="text-vercel-green font-medium">clean code</span>, 
                  innovative solutions, and continuous learning.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="bg-black border border-gray-800 rounded-lg p-6 hover:border-vercel-blue transition-all duration-300 animate-card-slide-in card-hover-effect"
                  style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-vercel-blue bg-opacity-10 rounded-lg">
                      <item.icon className="w-6 h-6 text-vercel-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-up delay-400">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-black border border-gray-800 rounded-xl p-8 text-center group hover:scale-105 transition-all duration-300 animate-card-slide-in card-3d-effect"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color} bg-opacity-10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold text-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="text-center animate-fade-in-up delay-600">
          <h3 className="text-2xl font-bold text-white mb-8">
            Core technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'TypeScript', 'AI/ML', 'AWS', 'MongoDB', 'Docker'].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:border-gray-600 transition-colors duration-200 animate-fade-in delay-700"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up delay-800">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 max-w-4xl mx-auto animate-card-slide-in card-glow-effect">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-vercel-blue mr-3" />
              <h3 className="text-3xl font-bold text-white">
                Ready to collaborate?
              </h3>
            </div>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <a
              href="#contact"
              className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Start a project</span>
              <Target className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;