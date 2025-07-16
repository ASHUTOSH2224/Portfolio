import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-surface-secondary animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            About Me
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-text-primary mb-4">My Approach</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              I focus on understanding your business goals and translating them into high-quality, scalable, and maintainable code. I believe in clear communication, transparency, and a client-first mindset.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I specialize in modern technologies like React, Next.js, Node.js, and Flutter to deliver exceptional results that drive business growth.
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-text-primary mb-4">My Skills</h3>
            <div className="flex flex-wrap gap-4">
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">React</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">Next.js</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">Node.js</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">Flutter</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">Firebase</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">TypeScript</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">PostgreSQL</span>
              <span className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;