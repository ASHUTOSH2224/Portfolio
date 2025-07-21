import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Eye, ArrowRight, Play, Code, Smartphone, Globe, Brain, Database } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Apps', 'AI/ML', 'Mobile', 'Full-Stack', 'E-commerce'];

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
      stats: { views: 1250, stars: 89 },
      color: "from-vercel-blue to-vercel-purple",
      icon: Brain,
      features: ["AI Recommendations", "Real-time Analytics", "Payment Integration", "Mobile Responsive"]
    },
    {
      id: 2,
      title: "Smart Home IoT Dashboard",
      category: "Web Apps",
      description: "A comprehensive IoT dashboard for smart home automation with real-time monitoring, device control, and energy optimization.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "Python", "WebSocket", "PostgreSQL", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { views: 980, stars: 67 },
      color: "from-vercel-green to-vercel-blue",
      icon: Smartphone,
      features: ["Real-time Monitoring", "Device Control", "Energy Analytics", "Mobile App"]
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
      stats: { views: 756, stars: 45 },
      color: "from-vercel-purple to-vercel-pink",
      icon: Brain,
      features: ["ML Algorithms", "Real-time Data", "Risk Management", "Performance Analytics"]
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
      stats: { views: 634, stars: 38 },
      color: "from-vercel-pink to-vercel-orange",
      icon: Smartphone,
      features: ["Cross-platform", "Offline Support", "Push Notifications", "Social Integration"]
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
      stats: { views: 892, stars: 52 },
      color: "from-vercel-orange to-vercel-green",
      icon: Globe,
      features: ["Real-time Chat", "Video Calls", "File Sharing", "Group Chats"]
    },
    {
      id: 6,
      title: "Data Analytics Dashboard",
      category: "Web Apps",
      description: "A comprehensive analytics dashboard for business intelligence with interactive charts and real-time data visualization.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      technologies: ["Angular", "D3.js", "Python", "PostgreSQL", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { views: 445, stars: 29 },
      color: "from-vercel-blue to-vercel-green",
      icon: Database,
      features: ["Interactive Charts", "Real-time Data", "Custom Reports", "Export Options"]
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-vercel-blue opacity-5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vercel-purple opacity-5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Explore my latest work showcasing innovative solutions and cutting-edge technologies
          </p>
        </div>

        {/* Interactive Filter Tabs */}
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

        {/* Featured Project Showcase */}
        {filteredProjects.filter(p => p.featured).length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Featured Work</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-vercel-blue to-vercel-purple mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {filteredProjects.filter(p => p.featured).map((project, index) => (
                <div 
                  key={project.id}
                  className="group relative bg-black border border-gray-800 rounded-2xl overflow-hidden animate-card-slide-in card-3d-effect"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-vercel-blue text-white text-sm font-medium rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-4">
                          <a
                            href={project.liveUrl}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-vercel-blue hover:text-white transition-all duration-300"
                          >
                            <Play className="w-5 h-5" />
                          </a>
                          <a
                            href={project.githubUrl}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-vercel-blue hover:text-white transition-all duration-300"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        </div>
                        <p className="text-white text-sm">Click to explore</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                          <project.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="px-3 py-1 bg-vercel-blue bg-opacity-10 text-vercel-blue text-sm font-medium rounded-lg border border-vercel-blue border-opacity-20">
                          {project.category}
                        </span>
                      </div>
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

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-vercel-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-vercel-blue rounded-full"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg border border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                      <a
                        href={project.liveUrl}
                        className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 group"
                      >
                        <span>Live Demo</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="px-6 py-3 bg-black text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-900 hover:border-vercel-blue transition-all duration-200 flex items-center space-x-2"
                      >
                        <Code className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <div 
              key={project.id}
              className="group bg-black border border-gray-800 rounded-xl overflow-hidden animate-card-slide-in card-hover-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
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
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                      <project.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="px-2 py-1 bg-vercel-blue bg-opacity-10 text-vercel-blue text-xs font-medium rounded border border-vercel-blue border-opacity-20">
                      {project.category}
                    </span>
                  </div>
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
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 max-w-4xl mx-auto animate-card-slide-in card-glow-effect">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to start your project?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Start Project</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="bg-black text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-900 hover:border-gray-600 transition-all duration-200"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;