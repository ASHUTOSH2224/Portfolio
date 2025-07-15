import api from './api';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'in-progress' | 'completed';
  viewCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProjectStats {
  total: number;
  active: number;
  featured: number;
  inProgress: number;
  completed: number;
}

class ProjectService {
  // Get all projects with filters
  async getProjects(filters: ProjectFilters = {}): Promise<{
    projects: Project[];
    totalCount: number;
    stats: ProjectStats;
  }> {
    const response = await api.get('/projects', { params: filters });
    return response.data;
  }

  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    const response = await api.get('/projects/featured');
    return response.data.projects;
  }

  // Get single project
  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data.project;
  }

  // Create new project
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'viewCount'>): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data.project;
  }

  // Update project
  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data.project;
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  // Upload project image
  async uploadProjectImage(id: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post(`/projects/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.imageUrl;
  }

  // Toggle featured status
  async toggleFeatured(id: string): Promise<Project> {
    const response = await api.patch(`/projects/${id}/featured`);
    return response.data.project;
  }

  // Increment view count
  async incrementViews(id: string): Promise<void> {
    await api.post(`/projects/${id}/view`);
  }

  // Get project categories
  async getCategories(): Promise<string[]> {
    const response = await api.get('/projects/categories');
    return response.data.categories;
  }

  // Get project technologies
  async getTechnologies(): Promise<string[]> {
    const response = await api.get('/projects/technologies');
    return response.data.technologies;
  }
}

export default new ProjectService(); 