import React from 'react';
import { GraduationCap, Briefcase, Award, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies Mastered', value: '20+' },
    { label: 'Clients Satisfied', value: '30+' },
  ];

  return (
    <section id="about" className="py-20 bg-matteBlack-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 matrix-bg opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/3 rounded-full blur-3xl animate-float delay-200"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-secondary/2 rounded-full blur-3xl animate-float delay-500"></div>
      
      <div className="container-max relative z-10">
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
            <div className="glass-effect rounded-2xl p-8 border border-surface-border hover-glow transition-all duration-300">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <Code2 className="w-6 h-6 text-accent-primary mr-3" />
                My Journey
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                With a B.Tech in Computer Science Engineering, I've dedicated my career to mastering 
                the art of full-stack development and artificial intelligence. My journey began with 
                curiosity about how technology can transform businesses and improve lives.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Today, as Head of Software Architecture at Scalixity, I lead the development of 
                cutting-edge AI-powered business platforms, combining my expertise in MERN stack, 
                Python, and machine learning to create solutions that are both innovative and practical.
              </p>
            </div>

            {/* Experience & Education */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-effect rounded-xl p-6 border border-accent-primary/20 hover:border-accent-primary/40 transition-all duration-300 group hover-glow">
                <Briefcase className="w-8 h-8 text-accent-primary mb-4 group-hover:animate-bounce" />
                <h4 className="font-semibold text-text-primary mb-2">Current Role</h4>
                <p className="text-accent-primary font-medium">Head of Software Architecture</p>
                <p className="text-text-muted text-sm">Scalixity • Remote</p>
              </div>
              
              <div className="glass-effect rounded-xl p-6 border border-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300 group hover-glow">
                <GraduationCap className="w-8 h-8 text-accent-secondary mb-4 group-hover:animate-bounce" />
                <h4 className="font-semibold text-text-primary mb-2">Education</h4>
                <p className="text-accent-secondary font-medium">B.Tech in CSE</p>
                <p className="text-text-muted text-sm">Computer Science Engineering</p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8 animate-fade-in-right">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 border border-surface-border hover:border-accent-primary/30 hover-glow group"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="glass-effect rounded-2xl p-8 border border-surface-border hover-glow transition-all duration-300">
              <h4 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Award className="w-5 h-5 text-accent-primary mr-3" />
                Key Specialties
              </h4>
              <div className="space-y-4">
                {[
                  'Full-Stack Web Development (MERN)',
                  'Mobile App Development',
                  'Machine Learning & AI Automation',
                  'API Development & MLOps',
                  'System Architecture & Scalability'
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