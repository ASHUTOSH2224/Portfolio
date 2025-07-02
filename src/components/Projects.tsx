import React from 'react';
import { ExternalLink, Github, Zap, Shield, Mail } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Scalixity Website',
      description: 'Real-time AI business platform that helps companies automate workflows and make data-driven decisions.',
      tech: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      icon: Zap,
      gradient: 'from-accent-primary to-accent-secondary',
      bgGradient: 'from-accent-primary/10 to-accent-secondary/5',
      borderColor: 'border-accent-primary/30',
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224'
    },
    {
      title: 'Email Marketing Automation',
      description: 'ML + LLM powered marketing system that personalizes campaigns and optimizes engagement rates.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      icon: Mail,
      gradient: 'from-accent-secondary to-accent-tertiary',
      bgGradient: 'from-accent-secondary/10 to-accent-tertiary/5',
      borderColor: 'border-accent-secondary/30',
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224'
    },
    {
      title: 'Nakshatra Gyan',
      description: 'Secure astrology e-commerce platform with advanced authentication and payment processing.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'React Native'],
      icon: Shield,
      gradient: 'from-accent-tertiary to-accent-primary',
      bgGradient: 'from-accent-tertiary/10 to-accent-primary/5',
      borderColor: 'border-accent-tertiary/30',
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-matteBlack-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 matrix-bg opacity-15"></div>
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent-primary/3 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/2 rounded-full blur-3xl animate-float delay-300"></div>
      
      <div className="container-max relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Showcasing innovative solutions that blend cutting-edge technology with practical business applications
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group glass-effect ${project.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-glow-lg border hover-glow animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Project Icon */}
              <div className={`inline-flex p-3 bg-gradient-to-r ${project.gradient} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow-sm`}>
                <project.icon className="w-6 h-6 text-white" />
              </div>

              {/* Project Info */}
              <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h3>
              
              <p className="text-text-secondary mb-6 leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 glass-effect border border-surface-border text-text-muted text-sm rounded-full hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a
                  href={project.liveUrl}
                  className="flex items-center space-x-2 px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 transform hover:scale-105 group"
                >
                  <ExternalLink size={16} className="group-hover:animate-bounce" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="flex items-center space-x-2 px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:border-accent-secondary/50 hover:text-accent-secondary transition-all duration-300 transform hover:scale-105 group"
                >
                  <Github size={16} className="group-hover:animate-bounce" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-12 animate-fade-in-up delay-600">
          <a 
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
          >
            <span className="relative z-10">View All Projects on GitHub</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;