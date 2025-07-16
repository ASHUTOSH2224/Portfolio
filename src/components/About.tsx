import React from 'react';
import { Code, Brain, Rocket, Award, Users, Coffee, Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Code, label: 'Projects', value: '50+', color: 'text-accent-primary' },
    { icon: Users, label: 'Clients', value: '30+', color: 'text-accent-secondary' },
    { icon: Coffee, label: 'Coffee Cups', value: '1000+', color: 'text-accent-tertiary' },
    { icon: Award, label: 'Experience', value: '3+ Years', color: 'text-accent-success' }
  ];

  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems that solve real-world problems',
      color: 'from-accent-secondary/20 to-accent-secondary/10'
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Creating seamless experiences from frontend to backend',
      color: 'from-accent-primary/20 to-accent-primary/10'
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast, scalable applications',
      color: 'from-accent-tertiary/20 to-accent-tertiary/10'
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-surface-primary to-surface-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-8 animate-fade-in-up font-display">
            About Me
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto animate-fade-in-up delay-200 font-light">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Content */}
          <div className="space-y-10 animate-fade-in-left">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-text-primary font-display">
                Turning Ideas Into Reality
              </h3>
              <div className="space-y-6 text-xl text-text-secondary leading-relaxed">
                <p>
                  With a <span className="text-accent-primary font-semibold">B.Tech in Computer Science</span>, 
                  I've dedicated my career to mastering full-stack development and artificial intelligence.
                </p>
                <p>
                  As <span className="text-gradient font-semibold">Head of Software Architecture</span> at Scalixity, 
                  I lead teams in building scalable, intelligent systems that drive business growth.
                </p>
                <p>
                  I believe in <span className="text-accent-secondary font-semibold">clean code</span>, 
                  innovative solutions, and continuous learning.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-6 p-6 glass-card hover:scale-105 transition-all duration-300 animate-fade-in-up bg-gradient-to-r ${item.color}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-4 bg-gradient-primary rounded-2xl">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h4>
                    <p className="text-text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 animate-fade-in-right">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="modern-card p-10 text-center group hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className={`text-4xl font-bold mb-3 ${stat.color}`}>{stat.value}</div>
                <div className="text-text-muted font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="text-center animate-fade-in-up delay-600">
          <h3 className="text-3xl font-bold text-text-primary mb-12 font-display">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'Python', 'TypeScript', 'AI/ML', 'AWS', 'MongoDB', 'Docker'].map((tech, index) => (
              <span 
                key={tech}
                className="tag text-lg animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up delay-800">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-accent-primary mr-4" />
              <h3 className="text-3xl font-bold text-text-primary font-display">Ready to Collaborate?</h3>
            </div>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <a
              href="#contact"
              className="btn-primary text-xl px-10 py-5"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;