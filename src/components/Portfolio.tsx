import React, { useState } from 'react';
import { ExternalLink, Github, Star, Eye, ArrowRight, Play, Code, Filter, Grid, List, Search } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Web Apps', 'AI/ML', 'Mobile', 'Full-Stack', 'E-commerce', 'Dashboard', 'API'];

  const projects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      category: "Full-Stack",
      description: "A next-generation e-commerce platform with AI-driven product recommendations, real-time inventory management, and personalized shopping experiences.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { views: 1250, stars: 89, downloads: 234 },
      color: "from-vercel-blue to-vercel-purple",
      features: ["AI Recommendations", "Real-time Analytics", "Payment Integration", "Mobile Responsive"],
      year: 2024,
      duration: "3 months"
    },
    {
      id: 2,
      title: "Smart Home IoT Dashboard",
      category: "Dashboard",
      description: "A comprehensive IoT dashboard for smart home automation with real-time monitoring, device control, and energy optimization.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "Python", "WebSocket", "PostgreSQL", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { views: 980, stars: 67, downloads: 156 },
      color: "from-vercel-green to-vercel-blue",
      features: ["Real-time Monitoring", "Device Control", "Energy Analytics", "Mobile App"],
      year: 2024,
      duration: "2 months"
    },
    {
      id: 3,
      title: "Machine Learning Trading Bot",
      category: "AI/ML",
      description: "An intelligent trading bot that uses machine learning algorithms to analyze market trends and execute automated trades.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      technologies: ["Python", "TensorFlow", "Pandas", "FastAPI", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 756, stars: 45, downloads: 89 },
      color: "from-vercel-purple to-vercel-pink",
      features: ["ML Algorithms", "Real-time Data", "Risk Management", "Performance Analytics"],
      year: 2023,
      duration: "4 months"
    },
    {
      id: 4,
      title: "Cross-Platform Mobile App",
      category: "Mobile",
      description: "A feature-rich mobile application built with React Native, offering seamless experience across iOS and Android platforms.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Jest"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 634, stars: 38, downloads: 123 },
      color: "from-vercel-pink to-vercel-orange",
      features: ["Cross-platform", "Offline Support", "Push Notifications", "Social Integration"],
      year: 2023,
      duration: "3 months"
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      category: "Web Apps",
      description: "A modern chat application with real-time messaging, video calls, and file sharing capabilities.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 892, stars: 52, downloads: 178 },
      color: "from-vercel-orange to-vercel-green",
      features: ["Real-time Chat", "Video Calls", "File Sharing", "Group Chats"],
      year: 2023,
      duration: "2 months"
    },
    {
      id: 6,
      title: "Data Analytics Dashboard",
      category: "Dashboard",
      description: "A comprehensive analytics dashboard for business intelligence with interactive charts and real-time data visualization.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      technologies: ["Angular", "D3.js", "Python", "PostgreSQL", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 445, stars: 29, downloads: 67 },
      color: "from-vercel-blue to-vercel-green",
      features: ["Interactive Charts", "Real-time Data", "Custom Reports", "Export Options"],
      year: 2023,
      duration: "3 months"
    },
    {
      id: 7,
      title: "RESTful API Gateway",
      category: "API",
      description: "A scalable API gateway with authentication, rate limiting, and microservices orchestration.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 567, stars: 34, downloads: 92 },
      color: "from-vercel-green to-vercel-blue",
      features: ["Authentication", "Rate Limiting", "Load Balancing", "Monitoring"],
      year: 2023,
      duration: "2 months"
    },
    {
      id: 8,
      title: "E-commerce Mobile App",
      category: "E-commerce",
      description: "A complete mobile e-commerce solution with payment integration, order tracking, and customer management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["Flutter", "Dart", "Firebase", "Stripe", "Google Cloud"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 723, stars: 41, downloads: 145 },
      color: "from-vercel-purple to-vercel-pink",
      features: ["Payment Integration", "Order Tracking", "Customer Management", "Push Notifications"],
      year: 2023,
      duration: "4 months"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Complete Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Explore my complete collection of projects showcasing diverse technologies and solutions
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:border-vercel-blue focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black border border-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-vercel-blue text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-vercel-blue text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? 'bg-vercel-blue text-white shadow-lg shadow-vercel-blue/25'
                  : 'bg-black text-gray-400 hover:text-white border border-gray-800 hover:border-vercel-blue'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-black border border-gray-800 rounded-xl overflow-hidden animate-card-slide-in card-hover-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-vercel-blue hover:text-white transition-all duration-300"
                      >
                        <Play className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-vercel-blue hover:text-white transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-vercel-blue text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-vercel-blue bg-opacity-10 text-vercel-blue text-sm font-medium rounded-lg border border-vercel-blue border-opacity-20">
                      {project.category}
                    </span>
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
                  
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-vercel-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {project.year} • {project.duration}
                    </div>
                    <div className="flex items-center space-x-3">
                      <a
                        href={project.liveUrl}
                        className="text-vercel-blue hover:text-white transition-colors duration-200 flex items-center text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="text-vercel-blue hover:text-white transition-colors duration-200 flex items-center text-sm"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-black border border-gray-800 rounded-xl p-6 animate-card-slide-in card-hover-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Project Image */}
                  <div className="lg:w-1/3">
                    <div className="relative h-48 lg:h-full rounded-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="lg:w-2/3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-vercel-blue bg-opacity-10 text-vercel-blue text-sm font-medium rounded-lg border border-vercel-blue border-opacity-20">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-1 bg-vercel-green bg-opacity-10 text-vercel-green text-xs font-medium rounded border border-vercel-green border-opacity-20">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-vercel-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded border border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {project.year} • {project.duration}
                      </div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={project.liveUrl}
                          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.githubUrl}
                          className="bg-black text-white border border-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 hover:border-vercel-blue transition-all duration-200 flex items-center space-x-2"
                        >
                          <Code className="w-4 h-4" />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center mt-16">
          <div className="bg-black border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto animate-card-slide-in card-glow-effect">
            <h3 className="text-2xl font-bold text-white mb-4">
              Portfolio Summary
            </h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-vercel-blue mb-2">{projects.length}</div>
                <div className="text-gray-400">Total Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vercel-green mb-2">{projects.filter(p => p.featured).length}</div>
                <div className="text-gray-400">Featured</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vercel-purple mb-2">{filters.length - 1}</div>
                <div className="text-gray-400">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 