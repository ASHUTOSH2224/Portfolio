import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'AI-Powered Sales Automation',
      description: 'A real-time AI business platform that helps companies automate workflows and make data-driven decisions using advanced machine learning algorithms.',
      tech: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
    },
    {
      title: 'Intelligent Email Marketing',
      description: 'An ML-powered marketing system that personalizes campaigns and optimizes engagement rates through intelligent content generation.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
    },
    {
      title: 'E-commerce Platform for Astrology',
      description: 'A secure e-commerce platform with advanced authentication, payment processing, and real-time consultation features.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'React Native'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-surface-primary animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            My Work
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A selection of my work.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">{project.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-surface-accent text-text-primary px-4 py-2 rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white font-medium">
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border text-text-primary">
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;