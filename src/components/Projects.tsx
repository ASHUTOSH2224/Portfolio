import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Star, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'AI/ML', 'Full Stack', 'Mobile', 'Web App'];
  
  const projects = [
    {
      id: 1,
      title: 'AI Sales Automation Platform',
      description: 'Intelligent business platform leveraging ML algorithms for automated workflows and data-driven decision making.',
      longDescription: 'A comprehensive AI-powered platform that revolutionizes sales processes through advanced machine learning algorithms, real-time analytics, and automated workflow management.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      category: 'AI/ML',
      technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '2.5k', stars: 45, forks: 12 }
    },
    {
      id: 2,
      title: 'Smart Email Marketing Suite',
      description: 'ML-powered marketing system with personalized campaigns and intelligent content generation.',
      longDescription: 'Advanced email marketing platform using OpenAI GPT for content generation and machine learning for campaign optimization and user engagement analysis.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'AI/ML',
      technologies: ['Python', 'FastAPI', 'OpenAI GPT', 'React', 'MongoDB', 'scikit-learn'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '1.8k', stars: 32, forks: 8 }
    },
    {
      id: 3,
      title: 'E-commerce Astrology Platform',
      description: 'Secure e-commerce platform with real-time consultations, payment processing, and mobile app.',
      longDescription: 'Full-stack e-commerce solution for astrology services featuring secure payments, real-time video consultations, and cross-platform mobile application.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'Full Stack',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React Native', 'Stripe', 'JWT'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '1.2k', stars: 28, forks: 6 }
    },
    {
      id: 4,
      title: 'Real-time Analytics Dashboard',
      description: 'Interactive dashboard with live data visualization and predictive analytics capabilities.',
      longDescription: 'Modern analytics platform providing real-time insights through interactive visualizations, predictive modeling, and comprehensive reporting tools.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Web App',
      technologies: ['React', 'D3.js', 'Node.js', 'WebSocket', 'PostgreSQL', 'Docker'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '950', stars: 19, forks: 4 }
    },
    {
      id: 5,
      title: 'Cross-Platform Mobile App',
      description: 'Feature-rich mobile application with offline capabilities and cloud synchronization.',
      longDescription: 'Native-quality mobile application built with Flutter, featuring offline-first architecture, real-time synchronization, and seamless user experience.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Mobile',
      technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'REST API', 'Push Notifications'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: false,
      stats: { views: '1.1k', stars: 24, forks: 7 }
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Secure, transparent voting platform built on blockchain technology with smart contracts.',
      longDescription: 'Decentralized voting system ensuring transparency and security through blockchain technology, smart contracts, and cryptographic verification.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      category: 'Web App',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS', 'MetaMask'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true,
      stats: { views: '2.1k', stars: 38, forks: 11 }
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Featured Work
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 animate-fade-in-up">⭐ Featured Projects</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div 
                key={project.id}
                className="group modern-card overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="tag">{project.category}</span>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.longDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span key={techIndex} className="tag text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-gray-500 text-xs">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 btn-secondary"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'glass text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="tag text-xs">{project.category}</span>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{project.stats.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{project.stats.stars}</span>
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tag text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 text-xs">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <a
                      href={project.liveUrl}
                      className="p-2 glass rounded-lg hover:bg-gray-800 transition-colors duration-300 group/btn"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass rounded-lg hover:bg-gray-800 transition-colors duration-300 group/btn"
                    >
                      <Github className="w-4 h-4 text-gray-400 group-hover/btn:text-white" />
                    </a>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1 group/more">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover/more:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16 animate-fade-in-up delay-800">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 btn-secondary text-lg px-8 py-4"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;