import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Star, ArrowRight, Zap } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'AI/ML', 'Full Stack', 'Mobile', 'Web App'];
  
  const projects = [
    {
      id: 1,
      title: 'AI Sales Automation Platform',
      description: 'Intelligent business platform leveraging ML algorithms for automated workflows.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      category: 'AI/ML',
      technologies: ['React', 'Python', 'TensorFlow', 'FastAPI'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '2.5k', stars: 45 }
    },
    {
      id: 2,
      title: 'Smart Email Marketing Suite',
      description: 'ML-powered marketing system with personalized campaigns and intelligent content.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'AI/ML',
      technologies: ['Python', 'FastAPI', 'OpenAI GPT', 'React'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '1.8k', stars: 32 }
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'Secure e-commerce platform with real-time consultations and payment processing.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'Full Stack',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React Native'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '1.2k', stars: 28 }
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description: 'Interactive dashboard with live data visualization and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Web App',
      technologies: ['React', 'D3.js', 'Node.js', 'WebSocket'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '950', stars: 19 }
    },
    {
      id: 5,
      title: 'Mobile App',
      description: 'Feature-rich mobile application with offline capabilities and cloud sync.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '1.1k', stars: 24 }
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Secure, transparent voting platform built on blockchain technology.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      category: 'Web App',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '2.1k', stars: 38 }
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-surface-secondary to-surface-tertiary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-8 animate-fade-in-up font-display">
            Featured Work
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto animate-fade-in-up delay-200 font-light">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-24">
          <div className="flex items-center justify-center mb-12">
            <Star className="w-8 h-8 text-accent-primary mr-3" />
            <h3 className="text-3xl font-bold text-text-primary animate-fade-in-up font-display">Featured Projects</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div 
                key={project.id}
                className="group modern-card overflow-hidden animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-6 right-6">
                    <span className="bg-accent-primary/20 border border-accent-primary/30 text-accent-primary px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.stats.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stats.stars}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="tag">{project.category}</span>
                    <Zap className="w-5 h-5 text-accent-primary" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-text-primary mb-4 group-hover:text-gradient transition-all duration-300 font-display">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-muted mb-8 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <a
                      href={project.liveUrl}
                      className="flex items-center space-x-3 btn-primary"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 btn-secondary"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'glass-effect text-text-muted hover:text-accent-primary hover:bg-surface-elevated'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group modern-card overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-accent-primary fill-current" />
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="tag">{project.category}</span>
                  <div className="flex items-center space-x-3 text-sm text-text-muted">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.stats.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stats.stars}</span>
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-gradient transition-all duration-300 font-display">
                  {project.title}
                </h3>
                
                <p className="text-text-muted mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tag text-sm">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-text-muted text-sm">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.liveUrl}
                      className="p-3 glass-effect rounded-xl hover:bg-surface-elevated transition-colors duration-300 group/btn hover-glow"
                    >
                      <ExternalLink className="w-5 h-5 text-text-muted group-hover/btn:text-accent-primary" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-effect rounded-xl hover:bg-surface-elevated transition-colors duration-300 group/btn hover-glow"
                    >
                      <Github className="w-5 h-5 text-text-muted group-hover/btn:text-accent-primary" />
                    </a>
                  </div>
                  <button className="text-accent-primary hover:text-accent-secondary font-medium flex items-center space-x-2 group/more">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/more:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-20 animate-fade-in-up delay-800">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 btn-secondary text-xl px-10 py-5"
          >
            <Github className="w-6 h-6" />
            <span>View All Projects</span>
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;