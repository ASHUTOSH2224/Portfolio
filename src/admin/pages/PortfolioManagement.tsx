import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Eye,
  Upload,
  Code,
  Award,
  User,
  Briefcase
} from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
  featured: boolean;
}

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'AI/ML' | 'Tools';
  proficiency: number;
}

const PortfolioManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'about' | 'certifications'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI Business Platform',
      description: 'Real-time AI business platform that helps companies automate workflows and make data-driven decisions.',
      technologies: ['React', 'TypeScript', 'FastAPI', 'TensorFlow', 'Redis', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true
    },
    {
      id: '2',
      title: 'Email Marketing Automation',
      description: 'ML + LLM powered marketing system that personalizes campaigns and optimizes engagement rates.',
      technologies: ['Python', 'FastAPI', 'OpenAI GPT', 'scikit-learn', 'React', 'MongoDB'],
      liveUrl: '#',
      githubUrl: 'https://github.com/ASHUTOSH2224',
      featured: true
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React', category: 'Frontend', proficiency: 95 },
    { id: '2', name: 'Node.js', category: 'Backend', proficiency: 90 },
    { id: '3', name: 'Python', category: 'Backend', proficiency: 88 },
    { id: '4', name: 'TypeScript', category: 'Frontend', proficiency: 92 }
  ]);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'certifications', label: 'Certifications', icon: Briefcase }
  ];

  const renderProjectsTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">Manage Projects</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-effect rounded-xl border border-surface-border p-6 hover-glow transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h4>
                {project.featured && (
                  <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full border border-accent-primary/30">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-text-muted hover:text-accent-secondary transition-colors duration-200 glass-effect rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-text-muted hover:text-red-400 transition-colors duration-200 glass-effect rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-text-secondary text-sm mb-4 line-clamp-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-2 py-1 glass-effect border border-surface-border text-text-muted text-xs rounded-full">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-text-muted text-xs">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <a href={project.liveUrl} className="text-accent-primary hover:text-accent-secondary transition-colors duration-200">
                Live Demo
              </a>
              <a href={project.githubUrl} className="text-text-muted hover:text-accent-primary transition-colors duration-200">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">Manage Skills</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills by Category */}
      {['Frontend', 'Backend', 'Mobile', 'AI/ML', 'Tools'].map((category) => (
        <div key={category} className="glass-effect rounded-xl border border-surface-border p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">{category}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-4 glass-effect rounded-lg border border-surface-border hover-glow transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-text-primary font-medium">{skill.name}</span>
                      <span className="text-accent-primary text-sm font-semibold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-surface-border rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-1 text-text-muted hover:text-accent-secondary transition-colors duration-200">
                      <Edit className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-text-muted hover:text-red-400 transition-colors duration-200">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );

  const renderAboutTab = () => (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl border border-surface-border p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">About Me Content</h3>
        
        <div className="space-y-6">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Profile Image</label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-matteBlack-800 font-bold text-2xl">
                A
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300">
                <Upload className="w-4 h-4" />
                <span>Upload New Image</span>
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 resize-none"
              placeholder="Write about yourself..."
              defaultValue="With a B.Tech in Computer Science Engineering, I've dedicated my career to mastering the art of full-stack development and artificial intelligence. My journey began with curiosity about how technology can transform businesses and improve lives."
            />
          </div>

          {/* Current Role */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Current Role</label>
              <input
                type="text"
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                defaultValue="Head of Software Architecture"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Company</label>
              <input
                type="text"
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                defaultValue="Freelance / Remote"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Portfolio Management</h2>
          <p className="text-text-muted">Manage your portfolio content and keep it up to date</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-surface-tertiary rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-accent-primary text-matteBlack-800'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-border'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in-up">
          {activeTab === 'projects' && renderProjectsTab()}
          {activeTab === 'skills' && renderSkillsTab()}
          {activeTab === 'about' && renderAboutTab()}
          {activeTab === 'certifications' && (
            <div className="glass-effect rounded-xl border border-surface-border p-12 text-center">
              <Award className="w-12 h-12 text-accent-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Certifications Management</h3>
              <p className="text-text-muted">This section will allow you to manage your professional certifications</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PortfolioManagement; 