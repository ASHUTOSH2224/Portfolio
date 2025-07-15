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
  Briefcase,
  Star,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import projectService, { Project } from '../../services/projectService';
import certificationService, { Certification } from '../../services/certificationService';
import toast from 'react-hot-toast';
import AdminLayout from '../layout/AdminLayout';

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'AI/ML' | 'Tools';
  proficiency: number;
}

const PortfolioManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'about' | 'certifications'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  
  const queryClient = useQueryClient();

  // Fetch projects with error handling
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getProjects(),
    refetchInterval: 300000,
  });

  // Initialize project stats with default values
  const projectStats = projectsData?.stats || {
    total: 0,
    active: 0,
    featured: 0,
    inProgress: 0,
    completed: 0
  };

  // Fetch certifications
  const { data: certificationsData, isLoading: certificationsLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => certificationService.getCertifications(),
    refetchInterval: 300000,
  });

  // Initialize certification stats with default values
  const certificationStats = certificationsData?.stats || {
    total: 0,
    active: 0,
    expired: 0,
    categories: 0
  };

  // Project mutations
  const createProjectMutation = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
      setShowProjectForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create project');
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      projectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully');
      setEditingProject(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update project');
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete project');
    },
  });

  const toggleProjectFeaturedMutation = useMutation({
    mutationFn: projectService.toggleFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project featured status updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update featured status');
    },
  });

  // Certification mutations
  const createCertificationMutation = useMutation({
    mutationFn: certificationService.createCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Certification created successfully');
      setShowCertificationForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create certification');
    },
  });

  const updateCertificationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Certification> }) => 
      certificationService.updateCertification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Certification updated successfully');
      setEditingCertification(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update certification');
    },
  });

  const deleteCertificationMutation = useMutation({
    mutationFn: certificationService.deleteCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Certification deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete certification');
    },
  });

  const toggleCertificationActiveMutation = useMutation({
    mutationFn: certificationService.toggleActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Certification status updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update certification status');
    },
  });

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
        <button 
          onClick={() => setShowProjectForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-accent-primary">{projectStats.total}</div>
          <div className="text-sm text-text-muted">Total Projects</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-accent-secondary">{projectStats.featured}</div>
          <div className="text-sm text-text-muted">Featured</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-green-400">{projectStats.active}</div>
          <div className="text-sm text-text-muted">Active</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-yellow-400">{projectStats.inProgress}</div>
          <div className="text-sm text-text-muted">In Progress</div>
        </div>
      </div>

      {/* Projects Grid */}
      {projectsLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading projects...</p>
        </div>
      ) : !projectsData?.projects || projectsData.projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-accent-primary" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">No projects yet</h4>
          <p className="text-text-muted max-w-md mx-auto">
            Start by adding your first project to showcase your work.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {projectsData.projects.map((project) => (
            <div key={project.id} className="glass-effect rounded-xl border border-surface-border p-6 hover-glow transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full border border-accent-primary/30">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' ? 'bg-green-400/20 text-green-400' :
                      project.status === 'in-progress' ? 'bg-yellow-400/20 text-yellow-400' :
                      project.status === 'completed' ? 'bg-blue-400/20 text-blue-400' :
                      'bg-gray-400/20 text-gray-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleProjectFeaturedMutation.mutate(project.id)}
                    className="p-2 text-text-muted hover:text-yellow-400 transition-colors duration-200 glass-effect rounded-lg"
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                  <button 
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setEditingProject(project)}
                    className="p-2 text-text-muted hover:text-accent-secondary transition-colors duration-200 glass-effect rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        deleteProjectMutation.mutate(project.id);
                      }
                    }}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors duration-200 glass-effect rounded-lg"
                  >
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
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-secondary transition-colors duration-200">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors duration-200">
                      GitHub
                    </a>
                  )}
                </div>
                <span className="text-text-muted">{project.viewCount} views</span>
              </div>
            </div>
          ))}
        </div>
      )}
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

  const renderCertificationsTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">Manage Certifications</h3>
        <button 
          onClick={() => setShowCertificationForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-accent-primary">{certificationStats.total}</div>
          <div className="text-sm text-text-muted">Total Certifications</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-green-400">{certificationStats.active}</div>
          <div className="text-sm text-text-muted">Active</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-red-400">{certificationStats.expired}</div>
          <div className="text-sm text-text-muted">Expired</div>
        </div>
        <div className="glass-effect rounded-lg p-4 border border-surface-border">
          <div className="text-2xl font-bold text-blue-400">{certificationStats.categories}</div>
          <div className="text-sm text-text-muted">Categories</div>
        </div>
      </div>

      {/* Certifications Grid */}
      {certificationsLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading certifications...</p>
        </div>
      ) : !certificationsData?.certifications || certificationsData.certifications.length === 0 ? (
        <div className="text-center py-16">
          <Award className="w-16 h-16 text-accent-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No certifications yet</h3>
          <p className="text-text-muted">Add your first certification to showcase your achievements.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {certificationsData.certifications.map((certification) => (
            <div key={certification.id} className="glass-effect rounded-xl border border-surface-border p-6 hover-glow transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-1">{certification.title}</h4>
                  <p className="text-text-muted text-sm mb-2">{certification.issuer}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      certification.isActive ? 'bg-green-400/20 text-green-400' : 'bg-gray-400/20 text-gray-400'
                    }`}>
                      {certification.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-text-muted">{certification.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCertificationActiveMutation.mutate(certification.id)}
                    className="p-2 text-text-muted hover:text-green-400 transition-colors duration-200 glass-effect rounded-lg"
                  >
                    {certification.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  </button>
                  {certification.verifyUrl && (
                    <button 
                      onClick={() => window.open(certification.verifyUrl, '_blank')}
                      className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => setEditingCertification(certification)}
                    className="p-2 text-text-muted hover:text-accent-secondary transition-colors duration-200 glass-effect rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this certification?')) {
                        deleteCertificationMutation.mutate(certification.id);
                      }
                    }}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors duration-200 glass-effect rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">{certification.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {certification.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 glass-effect border border-surface-border text-text-muted text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {certification.skills.length > 3 && (
                  <span className="px-2 py-1 text-text-muted text-xs">
                    +{certification.skills.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>Issued: {new Date(certification.issueDate).toLocaleDateString()}</span>
                {certification.expirationDate && (
                  <span className={new Date(certification.expirationDate) < new Date() ? 'text-red-400' : ''}>
                    Expires: {new Date(certification.expirationDate).toLocaleDateString()}
                  </span>
                )}
                <span>{certification.verificationCount} verifications</span>
              </div>
            </div>
          ))}
        </div>
      )}
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
          {activeTab === 'certifications' && renderCertificationsTab()}
        </div>
      </div>

      {/* Project Form Modal */}
      {(showProjectForm || editingProject) && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
                     onSubmit={(data) => {
             if (editingProject) {
               updateProjectMutation.mutate({ id: editingProject.id, data });
             } else {
               createProjectMutation.mutate(data as any);
             }
           }}
        />
      )}

      {/* Certification Form Modal */}
      {(showCertificationForm || editingCertification) && (
        <CertificationFormModal
          certification={editingCertification}
          onClose={() => {
            setShowCertificationForm(false);
            setEditingCertification(null);
          }}
                     onSubmit={(data) => {
             if (editingCertification) {
               updateCertificationMutation.mutate({ id: editingCertification.id, data });
             } else {
               createCertificationMutation.mutate(data as any);
             }
           }}
        />
      )}
    </AdminLayout>
  );
};

// Project Form Modal Component
interface ProjectFormModalProps {
  project?: Project | null;
  onClose: () => void;
  onSubmit: (data: Partial<Project>) => void;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ project, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    technologies: project?.technologies?.join(', ') || '',
    category: project?.category || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    status: project?.status || 'active',
    featured: project?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-xl border border-surface-border p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 h-24 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, TypeScript, Node.js"
              className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              >
                <option value="active">Active</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-accent-primary border-surface-border rounded focus:ring-accent-primary/50"
              />
              <label htmlFor="featured" className="text-sm font-medium text-text-secondary">Featured Project</label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-text-primary transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Certification Form Modal Component
interface CertificationFormModalProps {
  certification?: Certification | null;
  onClose: () => void;
  onSubmit: (data: Partial<Certification>) => void;
}

const CertificationFormModal: React.FC<CertificationFormModalProps> = ({ certification, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: certification?.title || '',
    issuer: certification?.issuer || '',
    issueDate: certification?.issueDate?.split('T')[0] || '',
    expirationDate: certification?.expirationDate?.split('T')[0] || '',
    credentialId: certification?.credentialId || '',
    credentialUrl: certification?.credentialUrl || '',
    verifyUrl: certification?.verifyUrl || '',
    description: certification?.description || '',
    skills: certification?.skills?.join(', ') || '',
    category: certification?.category || '',
    provider: certification?.provider || '',
    isActive: certification?.isActive ?? true,
    priority: certification?.priority || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-xl border border-surface-border p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          {certification ? 'Edit Certification' : 'Add New Certification'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Issuer</label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 h-24 resize-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Issue Date</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Expiration Date (Optional)</label>
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Credential ID</label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="JavaScript, React, API Design"
              className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Credential URL</label>
              <input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Verify URL</label>
              <input
                type="url"
                value={formData.verifyUrl}
                onChange={(e) => setFormData({ ...formData, verifyUrl: e.target.value })}
                className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Provider</label>
              <input
                type="text"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-accent-primary border-surface-border rounded focus:ring-accent-primary/50"
              />
              <label htmlFor="active" className="text-sm font-medium text-text-secondary">Active Certification</label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300"
            >
              {certification ? 'Update Certification' : 'Create Certification'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-text-primary transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioManagement; 