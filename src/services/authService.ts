import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  // Logout user
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data.user;
  }

  // Update password
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.put('/auth/update-password', {
      currentPassword,
      newPassword
    });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    // We'll consider the user authenticated if we can get their data
    try {
      this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService(); 