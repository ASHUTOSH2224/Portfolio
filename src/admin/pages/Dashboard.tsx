import React from 'react';
import { 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import StatsCard from '../components/StatsCard';

const Dashboard: React.FC = () => {
  const inquiryStats = [
    { title: 'Total Inquiries', value: '0', color: 'primary' as const, icon: Mail },
    { title: 'New', value: '0', color: 'secondary' as const, icon: AlertCircle },
    { title: 'In Progress', value: '0', color: 'warning' as const, icon: Clock },
    { title: 'Resolved', value: '0', color: 'success' as const, icon: CheckCircle },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {inquiryStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Service Inquiries Table */}
        <div className="glass-effect rounded-2xl border border-surface-border overflow-hidden animate-fade-in-up delay-200">
          {/* Table Header */}
          <div className="p-6 border-b border-surface-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Service Inquiries</h3>
                <p className="text-text-muted">Showing 0 out of 0 total inquiries</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search by company, email, industry or service..."
                    className="pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 w-80"
                  />
                </div>

                {/* Filter */}
                <button className="flex items-center space-x-2 px-4 py-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300">
                  <Filter className="w-4 h-4" />
                  <span>All Statuses</span>
                </button>

                {/* Refresh */}
                <button className="p-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 group">
                  <RefreshCw className="w-4 h-4 group-hover:animate-spin" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="p-6">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-accent-primary" />
              </div>
              <h4 className="text-lg font-medium text-text-primary mb-2">No inquiries yet</h4>
              <p className="text-text-muted max-w-md mx-auto">
                When clients reach out through your contact form, their inquiries will appear here for easy management and tracking.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10">View Portfolio Contact Form</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6 animate-fade-in-up delay-400">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-surface-border">
              <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-text-primary">Admin system initialized</p>
                <p className="text-sm text-text-muted">Portfolio admin dashboard is ready for management</p>
              </div>
              <div className="text-sm text-text-muted">Just now</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 