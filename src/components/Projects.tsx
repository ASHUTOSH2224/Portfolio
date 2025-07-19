import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Star, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'AI/ML', 'Full Stack', 'Mobile', 'Web App'];
  
  const projects = [
    {
      id: 1,
      title: 'AI Sales Automation Platform',
      description: 'Intelligent business platform leveraging ML algorithms for automated workflows and predictive analytics.',
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
      description: 'ML-powered marketing system with personalized campaigns and intelligent content generation.',
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
      description: 'Secure e-commerce platform with real-time consultations and seamless payment processing.',
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
      description: 'Interactive dashboard with live data visualization and predictive analytics capabilities.',
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
      title: 'Mobile Banking App',
      description: 'Feature-rich mobile application with offline capabilities and secure cloud synchronization.',
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
      description: 'Secure, transparent voting platform built on blockchain technology with smart contracts.',
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
    <section id="projects" className="section-large bg-bg-primary">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display-medium font-inter font-bold text-white mb-6 animate-fade-in-up">
            Featured work
          </h2>
          <p className="text-subheadline text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Star className="w-6 h-6 text-vercel-orange mr-3" />
            <h3 className="text-headline font-inter font-bold text-white animate-fade-in-up">
              Featured projects
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div 
                key={project.id}
                className="card-large group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="tag tag-pink">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-sm text-white">
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
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="tag tag-blue">{project.category}</span>
                  </div>
                  
                  <h3 className="text-headline font-inter font-bold text-white mb-4 group-hover:text-vercel-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-body text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.liveUrl}
                      className="btn-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View project
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-vercel-md font-medium text-body transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-vercel-blue text-white shadow-vercel-md'
                  : 'bg-bg-elevated text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
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
              className="card group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Star className="w-5 h-5 text-vercel-orange fill-current" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="tag tag-blue">{project.category}</span>
                  <div className="flex items-center space-x-3 text-caption text-gray-500">
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
                
                <h3 className="text-body font-semibold text-white mb-3 group-hover:text-vercel-blue transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-caption text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <a
                    href={project.liveUrl}
                    className="btn-link flex items-center text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link flex items-center text-sm"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16 animate-fade-in-up delay-300">
          <a
            href="https://github.com/ASHUTOSH2224"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;