import api from './api';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'New' | 'Read' | 'In Progress' | 'Responded' | 'Closed';
  isSpam: boolean;
  responses: ContactResponse[];
  notes: ContactNote[];
  createdAt: string;
  updatedAt?: string;
}

export interface ContactResponse {
  id: string;
  message: string;
  sentAt: string;
  sentBy: string;
}

export interface ContactNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface ContactFilters {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ContactStats {
  total: number;
  new: number;
  inProgress: number;
  responded: number;
  closed: number;
  highPriority: number;
}

class ContactService {
  // Get all contacts with filters
  async getContacts(filters: ContactFilters = {}): Promise<{
    contacts: ContactSubmission[];
    totalCount: number;
    stats: ContactStats;
  }> {
    const response = await api.get('/contact', { params: filters });
    return response.data;
  }

  // Get single contact
  async getContact(id: string): Promise<ContactSubmission> {
    const response = await api.get(`/contact/${id}`);
    return response.data.contact;
  }

  // Update contact status
  async updateContactStatus(id: string, status: string): Promise<ContactSubmission> {
    const response = await api.patch(`/contact/${id}/status`, { status });
    return response.data.contact;
  }

  // Update contact priority
  async updateContactPriority(id: string, priority: string): Promise<ContactSubmission> {
    const response = await api.patch(`/contact/${id}/priority`, { priority });
    return response.data.contact;
  }

  // Add response to contact
  async addResponse(id: string, message: string): Promise<ContactSubmission> {
    const response = await api.post(`/contact/${id}/respond`, { message });
    return response.data.contact;
  }

  // Add note to contact
  async addNote(id: string, content: string): Promise<ContactSubmission> {
    const response = await api.post(`/contact/${id}/note`, { content });
    return response.data.contact;
  }

  // Mark as spam
  async markAsSpam(id: string): Promise<void> {
    await api.patch(`/contact/${id}/spam`, { isSpam: true });
  }

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  }

  // Bulk update contacts
  async bulkUpdateContacts(ids: string[], updates: Partial<ContactSubmission>): Promise<void> {
    await api.patch('/contact/bulk', { ids, updates });
  }

  // Submit contact form (public endpoint)
  async submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    category?: string;
  }): Promise<void> {
    await api.post('/contact/submit', formData);
  }
}

export default new ContactService(); 