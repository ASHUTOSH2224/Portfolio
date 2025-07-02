import React, { useState } from 'react';
import { 
  Plus, 
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  User,
  AlertCircle
} from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Editor';
  lastLogin: string;
  emailNotifications: boolean;
  status: 'Active' | 'Inactive';
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: '1',
      username: 'admin',
      name: 'System Administrator',
      email: 'admin@scalixity.com',
      role: 'Super Admin',
      lastLogin: '2024-01-15 10:30 AM',
      emailNotifications: true,
      status: 'Active'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Admin':
        return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'Editor':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default:
        return 'text-text-muted bg-surface-tertiary border-surface-border';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'text-green-400 bg-green-400/10 border-green-400/30'
      : 'text-red-400 bg-red-400/10 border-red-400/30';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Admin Users Management</h2>
            <p className="text-text-muted mt-2">Manage administrative access and user permissions</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
          >
            <Plus className="w-5 h-5" />
            <span className="relative z-10">Add New Admin</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        {/* Users Table */}
        <div className="glass-effect rounded-2xl border border-surface-border overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-surface-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Administrative Users</h3>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-tertiary border-b border-surface-border">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Username</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Last Login</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Email Notifications</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-b border-surface-border hover:bg-surface-tertiary/50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-matteBlack-800 font-bold text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-text-primary font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-text-primary">{user.name}</td>
                    <td className="py-4 px-6 text-text-secondary">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-text-secondary">{user.lastLogin}</td>
                    <td className="py-4 px-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.emailNotifications}
                          onChange={() => {
                            const updatedUsers = users.map(u => 
                              u.id === user.id ? { ...u, emailNotifications: !u.emailNotifications } : u
                            );
                            setUsers(updatedUsers);
                          }}
                          className="sr-only"
                        />
                        <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                          user.emailNotifications ? 'bg-accent-primary' : 'bg-surface-border'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-1 ml-1 ${
                            user.emailNotifications ? 'translate-x-4' : ''
                          }`}></div>
                        </div>
                      </label>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-text-muted hover:text-red-400 transition-colors duration-200 glass-effect rounded-lg hover-glow">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Network Error Message */}
          <div className="p-6 border-t border-surface-border">
            <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg py-3 px-4">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Network error while loading users</span>
              <button className="ml-4 text-xs underline hover:no-underline">×</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers; 