import React from 'react';
import { ExternalLink, Github, Zap, Shield, Mail } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Scalixity Website',
      description: 'Real-time AI business platform that helps companies automate workflows and make data-driven decisions.',
      tech: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-900/20 to-cyan-900/20',
      borderColor: 'border-blue-500/30',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Email Marketing Automation',
      description: 'ML + LLM powered marketing system that personalizes campaigns and optimizes engagement rates.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      icon: Mail,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/30',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Nakshatra Gyan',
      description: 'Secure astrology e-commerce platform with advanced authentication and payment processing.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'React Native'],
      icon: Shield,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-900/20 to-teal-900/20',
      borderColor: 'border-emerald-500/30',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing innovative solutions that blend cutting-edge technology with practical business applications
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${project.bgGradient} backdrop-blur-sm border ${project.borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Project Icon */}
              <div className={`inline-flex p-3 bg-gradient-to-r ${project.gradient} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <project.icon className="w-6 h-6 text-white" />
              </div>

              {/* Project Info */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-800/50 border border-gray-600 text-gray-300 text-sm rounded-full hover:border-blue-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a
                  href={project.liveUrl}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-200 transform hover:scale-105"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-all duration-200 transform hover:scale-105"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            View All Projects on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;