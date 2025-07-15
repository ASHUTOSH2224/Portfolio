import React from 'react';
import { Award, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Proven Delivery', value: '100%' },
    { label: 'Client-focused', value: '100%' },
    { label: 'Fast Turnaround', value: '95%' },
    { label: 'Happy Clients', value: '30+' },
  ];

  return (
    <section id="about" className="py-20 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            I help businesses grow by building amazing web and mobile applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card">
              <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center">
                <Code2 className="w-6 h-6 text-accent-primary mr-3" />
                My Approach
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                I focus on understanding your business goals and translating them into high-quality, scalable, and maintainable code. I believe in clear communication, transparency, and a client-first mindset.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I specialize in modern technologies like React, Next.js, Node.js, and Flutter to deliver exceptional results that drive business growth.
              </p>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-surface-card rounded-xl p-6 text-center border border-surface-border"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card">
              <h4 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                <Award className="w-5 h-5 text-accent-primary mr-3" />
                Key Services
              </h4>
              <div className="space-y-4">
                {[
                  'Web App Development',
                  'Mobile App Development',
                  'UI/UX Design',
                  'API Integration & Backend',
                  'Maintenance & Optimization'
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center text-text-secondary">
                    <div className="w-2 h-2 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mr-4"></div>
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