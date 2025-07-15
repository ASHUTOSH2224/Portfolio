import api from './api';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId: string;
  credentialUrl?: string;
  verifyUrl?: string;
  description: string;
  skills: string[];
  category: string;
  provider: string;
  isActive: boolean;
  priority: number;
  verificationCount: number;
  badge?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CertificationFilters {
  category?: string;
  provider?: string;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CertificationStats {
  total: number;
  active: number;
  expired: number;
  categories: number;
  providers: number;
}

class CertificationService {
  // Get all certifications with filters
  async getCertifications(filters: CertificationFilters = {}): Promise<{
    certifications: Certification[];
    totalCount: number;
    stats: CertificationStats;
  }> {
    const response = await api.get('/certifications', { params: filters });
    return response.data;
  }

  // Get active certifications
  async getActiveCertifications(): Promise<Certification[]> {
    const response = await api.get('/certifications/active');
    return response.data.certifications;
  }

  // Get single certification
  async getCertification(id: string): Promise<Certification> {
    const response = await api.get(`/certifications/${id}`);
    return response.data.certification;
  }

  // Create new certification
  async createCertification(certificationData: Omit<Certification, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'verificationCount'>): Promise<Certification> {
    const response = await api.post('/certifications', certificationData);
    return response.data.certification;
  }

  // Update certification
  async updateCertification(id: string, certificationData: Partial<Certification>): Promise<Certification> {
    const response = await api.put(`/certifications/${id}`, certificationData);
    return response.data.certification;
  }

  // Delete certification
  async deleteCertification(id: string): Promise<void> {
    await api.delete(`/certifications/${id}`);
  }

  // Upload certification badge
  async uploadCertificationBadge(id: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('badge', file);
    
    const response = await api.post(`/certifications/${id}/badge`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.badgeUrl;
  }

  // Toggle active status
  async toggleActive(id: string): Promise<Certification> {
    const response = await api.patch(`/certifications/${id}/active`);
    return response.data.certification;
  }

  // Increment verification count
  async incrementVerifications(id: string): Promise<void> {
    await api.post(`/certifications/${id}/verify`);
  }

  // Get certification categories
  async getCategories(): Promise<string[]> {
    const response = await api.get('/certifications/categories');
    return response.data.categories;
  }

  // Get certification providers
  async getProviders(): Promise<string[]> {
    const response = await api.get('/certifications/providers');
    return response.data.providers;
  }

  // Check expiration status
  async checkExpiration(): Promise<{
    expiringSoon: Certification[];
    expired: Certification[];
  }> {
    const response = await api.get('/certifications/expiration-check');
    return response.data;
  }
}

export default new CertificationService(); 