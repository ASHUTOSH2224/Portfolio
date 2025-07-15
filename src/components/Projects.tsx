import React, { useEffect } from 'react';
import { ExternalLink, Github, Zap, Shield, Mail, FileText, Play } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

const Projects: React.FC = () => {
  const { trackEvent, trackConversion } = useAnalytics();

  useEffect(() => {
    // Track project section view
    const trackProjectView = async () => {
      try {
        await trackEvent('project_view', 'projects_section', 'view', {
          section: 'projects',
          viewType: 'section_load',
          action: 'view'
        });
      } catch (error) {
        console.error('Failed to track project section view:', error);
      }
    };
    trackProjectView();
  }, [trackEvent]);

  const handleProjectClick = async (project: any, type: 'live' | 'github') => {
    try {
      // Track project click event
      await trackEvent('click', `project_${type}_link`, type, {
        projectId: project.id,
        projectTitle: project.title,
        projectCategory: project.category,
        linkType: type,
        action: 'click'
      });

      // Track project view conversion
      await trackConversion('project_inquiry', type, {
        projectId: project.id,
        projectTitle: project.title,
        projectCategory: project.category,
        linkType: type,
        conversionType: 'project_click'
      });

      // Open the URL in a new tab
      window.open(type === 'live' ? project.liveUrl : project.githubUrl, '_blank');
    } catch (error) {
      console.error('Failed to track project click:', error);
    }
  };

  const projects = [
    {
      title: 'AI-Powered Sales Automation',
      description: 'A real-time AI business platform that helps companies automate workflows and make data-driven decisions using advanced machine learning algorithms.',
      tech: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'Web App'
    },
    {
      title: 'Intelligent Email Marketing',
      description: 'An ML-powered marketing system that personalizes campaigns and optimizes engagement rates through intelligent content generation.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'Mobile App'
    },
    {
      title: 'E-commerce Platform for Astrology',
      description: 'A secure e-commerce platform with advanced authentication, payment processing, and real-time consultation features.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'React Native'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'Web App'
    }
  ];

  const getTechBadgeClass = (tech: string) => {
    const techMap: { [key: string]: string } = {
      'React': 'tech-badge react',
      'TypeScript': 'tech-badge typescript',
      'JavaScript': 'tech-badge javascript',
      'Node.js': 'tech-badge nodejs',
      'Python': 'tech-badge python',
      'FastAPI': 'tech-badge python',
      'Express': 'tech-badge nodejs',
      'MongoDB': 'tech-badge mongodb',
      'PostgreSQL': 'tech-badge python',
      'Redis': 'tech-badge python',
      'Docker': 'tech-badge docker',
      'AWS': 'tech-badge aws',
      'TensorFlow': 'tech-badge python',
      'scikit-learn': 'tech-badge python',
      'OpenAI GPT': 'tech-badge python',
      'Stripe': 'tech-badge javascript',
      'JWT': 'tech-badge nodejs',
      'React Native': 'tech-badge react',
    };
    return techMap[tech] || 'tech-badge';
  };

  return (
    <section id="projects" className="py-20 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A selection of my work.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card"
            >
              <h3 className="text-2xl font-semibold text-text-primary mb-4">{project.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`${getTechBadgeClass(tech)} text-xs`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleProjectClick(project, 'live')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </button>
                <button
                  onClick={() => handleProjectClick(project, 'github')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect border border-surface-border text-text-primary"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;