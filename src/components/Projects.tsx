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
      title: 'Scalixity Website',
      description: 'Real-time AI business platform that helps companies automate workflows and make data-driven decisions using advanced machine learning algorithms.',
      longDescription: 'A comprehensive business intelligence platform featuring real-time analytics, automated workflow management, and ML-powered insights for data-driven decision making.',
      tech: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      icon: Zap,
      gradient: 'from-accent-primary to-accent-secondary',
      bgGradient: 'from-accent-primary/10 to-accent-secondary/5',
      borderColor: 'border-accent-primary/30',
      codeSnippet: `const analyzeData = async (data) => {
  const result = await aiModel.predict(data);
  return processInsights(result);
};`,
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'AI/ML'
    },
    {
      title: 'Email Marketing Automation',
      description: 'ML + LLM powered marketing system that personalizes campaigns and optimizes engagement rates through intelligent content generation.',
      longDescription: 'Advanced email marketing platform leveraging GPT models and machine learning for personalized campaign creation, audience segmentation, and performance optimization.',
      tech: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      icon: Mail,
      gradient: 'from-accent-secondary to-accent-tertiary',
      bgGradient: 'from-accent-secondary/10 to-accent-tertiary/5',
      borderColor: 'border-accent-secondary/30',
      codeSnippet: `def generate_personalized_content(user_profile):
    prompt = f"Generate email for {user_profile}"
    return openai.Completion.create(prompt=prompt)`,
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'ML/Backend'
    },
    {
      title: 'Nakshatra Gyan',
      description: 'Secure astrology e-commerce platform with advanced authentication, payment processing, and real-time consultation features.',
      longDescription: 'Full-stack e-commerce solution with secure payment integration, real-time chat system, and comprehensive admin dashboard for digital astrology services.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'React Native'],
      icon: Shield,
      gradient: 'from-accent-tertiary to-accent-primary',
      bgGradient: 'from-accent-tertiary/10 to-accent-primary/5',
      borderColor: 'border-accent-tertiary/30',
      codeSnippet: `const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, next);
};`,
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      category: 'Full Stack'
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
    <section id="projects" className="py-20 bg-surface-primary relative overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/30 via-surface-secondary/20 to-surface-accent/30"></div>
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/8 rounded-full blur-3xl animate-float delay-300"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-mono text-accent-primary">$ </span>
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              cat projects.json
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            <span className="font-mono text-accent-primary">{'// '}</span>
            Showcasing innovative solutions that blend cutting-edge technology
            <br />
            <span className="font-mono text-accent-primary">{'// '}</span>
            with practical business applications
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group code-editor hover:scale-105 transition-all duration-300 hover:shadow-glow-orange animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Code Editor Header */}
              <div className="code-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                </div>
                <div className="code-tab active">
                  <project.icon className="w-3 h-3" />
                  <span>{project.title.replace(/\s+/g, '')}.tsx</span>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-text-muted font-mono">{project.category}</span>
                </div>
              </div>

              {/* Code Editor Content */}
              <div className="code-content">
                {/* Project Info */}
                <div className="mb-6">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="line-content">
                      <span className="syntax-comment">// {project.title}</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="line-content">
                      <span className="syntax-keyword">const</span>
                      <span className="text-text-primary"> project = {'{'}</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span className="line-content">
                      <span className="ml-4 syntax-string">"description"</span>
                      <span className="text-text-primary">: </span>
                      <span className="syntax-string">"{project.description}"</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span className="line-content">
                      <span className="text-text-primary">{'};'}</span>
                    </span>
                  </div>
                </div>

                {/* Code Snippet Preview */}
                <div className="mb-6 bg-surface-accent rounded-lg p-4 border border-surface-border">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="line-content">
                      <span className="syntax-comment">// Code Preview</span>
                    </span>
                  </div>
                  <div className="text-xs font-mono text-text-secondary leading-relaxed">
                    {project.codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="code-line">
                        <span className="line-number">{i + 2}</span>
                        <span className="line-content text-text-secondary">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="code-line mb-2">
                    <span className="line-number">8</span>
                    <span className="line-content">
                      <span className="syntax-comment">// Tech Stack</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`${getTechBadgeClass(tech)} text-xs`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleProjectClick(project, 'live')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-medium hover:shadow-glow-lg transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </button>
                  <button
                    onClick={() => handleProjectClick(project, 'github')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect border border-surface-border text-text-primary hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View More Projects */}
        <div className="text-center mt-16 animate-fade-in-up delay-600">
          <div className="terminal-window max-w-md mx-auto">
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <span className="text-sm text-text-muted ml-4 font-mono">~/projects</span>
            </div>
            <div className="terminal-content">
              <div className="mb-2">
                <span className="terminal-prompt">alex@dev:~/projects$ </span>
                <span className="text-text-primary">ls -la</span>
              </div>
              <div className="mb-2 text-text-secondary">
                <span>total 47 repositories</span>
              </div>
              <div className="mb-4">
                <span className="terminal-prompt">alex@dev:~/projects$ </span>
                <span className="text-text-primary">git remote -v</span>
              </div>
              <a 
                href="https://github.com/ASHUTOSH2224"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-lg hover:shadow-glow-orange transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
              >
                <span className="relative z-10 font-mono">cd github.com/ASHUTOSH2224</span>
                <ExternalLink size={16} className="relative z-10 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;