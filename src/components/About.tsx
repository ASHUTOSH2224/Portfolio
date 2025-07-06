import React from 'react';
import { GraduationCap, Briefcase, Award, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies Mastered', value: '20+' },
    { label: 'Clients Satisfied', value: '30+' },
  ];

  return (
    <section id="about" className="py-20 bg-surface-primary relative overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/20 via-surface-secondary/10 to-surface-accent/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/8 rounded-full blur-3xl animate-float delay-200"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-secondary/6 rounded-full blur-3xl animate-float delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Passionate about building intelligent, scalable, and secure applications that solve real-world problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card hover:shadow-glow-orange transition-all duration-300">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <Code2 className="w-6 h-6 text-accent-primary mr-3" />
                My Journey
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                With a background in Computer Science, I've dedicated my career to mastering 
                the art of full-stack development. My journey began with 
                curiosity about how technology can transform businesses and improve lives.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Today, I specialize in creating cutting-edge web applications, 
                combining my expertise in React, TypeScript, and modern development practices
                to create solutions that are both innovative and practical.
              </p>
            </div>

            {/* Experience & Education */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-surface-card rounded-xl p-6 border border-accent-primary/30 hover:border-accent-primary/50 transition-all duration-300 group hover:shadow-glow-orange">
                <Briefcase className="w-8 h-8 text-accent-primary mb-4 group-hover:animate-bounce" />
                <h4 className="font-semibold text-text-primary mb-2">Current Focus</h4>
                <p className="text-accent-primary font-medium">Full Stack Developer</p>
                <p className="text-text-muted text-sm">Building Amazing Apps</p>
              </div>
              
              <div className="bg-surface-card rounded-xl p-6 border border-accent-secondary/30 hover:border-accent-secondary/50 transition-all duration-300 group hover:shadow-glow-orange">
                <GraduationCap className="w-8 h-8 text-accent-secondary mb-4 group-hover:animate-bounce" />
                <h4 className="font-semibold text-text-primary mb-2">Education</h4>
                <p className="text-accent-secondary font-medium">Computer Science</p>
                <p className="text-text-muted text-sm">Continuous Learning</p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8 animate-fade-in-right">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-surface-card rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 border border-surface-border hover:border-accent-primary/30 hover:shadow-glow-orange group"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card hover:shadow-glow-orange transition-all duration-300">
              <h4 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Award className="w-5 h-5 text-accent-primary mr-3" />
                Key Specialties
              </h4>
              <div className="space-y-4">
                {[
                  'Full-Stack Web Development (React)',
                  'TypeScript & Modern JavaScript',
                  'API Development & Integration',
                  'Database Design & Optimization',
                  'System Architecture & Best Practices'
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center text-text-secondary hover:text-text-primary transition-colors duration-300 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mr-4 group-hover:animate-pulse"></div>
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;