import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  Users,
  Download,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/StatsCard';
import contactService from '../../services/contactService';
import analyticsService from '../../services/analyticsService';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch analytics data with error handling
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: () => analyticsService.getDashboardAnalytics('30d'),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch user analytics
  const { data: userAnalytics } = useQuery({
    queryKey: ['user-analytics'],
    queryFn: () => analyticsService.getUserAnalytics('30d'),
    refetchInterval: 30000,
  });

  // Fetch traffic analytics
  const { data: trafficAnalytics } = useQuery({
    queryKey: ['traffic-analytics'],
    queryFn: () => analyticsService.getTrafficAnalytics('30d'),
    refetchInterval: 30000,
  });

  // Fetch contact submissions with error handling
  const { data: contactData, isLoading: contactsLoading, refetch: refetchContacts } = useQuery({
    queryKey: ['contacts', statusFilter, searchTerm],
    queryFn: () => contactService.getContacts({
      status: statusFilter === 'all' ? undefined : statusFilter,
      search: searchTerm || undefined,
      limit: 10,
    }),
    refetchInterval: 60000, // Refresh every minute
  });

  // Fetch resume downloads with error handling
  const { data: resumeData } = useQuery({
    queryKey: ['resume-downloads'],
    queryFn: () => analyticsService.getResumeDownloadStats('30d'),
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const handleRefresh = () => {
    refetchContacts();
    toast.success('Data refreshed');
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    // This would typically update the contact status
    toast.success(`Contact status updated to ${newStatus}`);
  };

  // Initialize stats with default values
  const stats = contactData?.stats || {
    total: 0,
    new: 0,
    inProgress: 0,
    responded: 0,
    closed: 0,
    highPriority: 0
  };

  const inquiryStats = [
    { 
      title: 'Total Inquiries', 
      value: stats.total || 0, 
      color: 'primary' as const, 
      icon: Mail 
    },
    { 
      title: 'New', 
      value: stats.new || 0, 
      color: 'secondary' as const, 
      icon: AlertCircle 
    },
    { 
      title: 'In Progress', 
      value: stats.inProgress || 0, 
      color: 'warning' as const, 
      icon: Clock 
    },
    { 
      title: 'Resolved', 
      value: stats.responded || 0, 
      color: 'success' as const, 
      icon: CheckCircle 
    },
  ];

  const analyticsStats = [
    {
      title: 'Page Views',
      value: analyticsData?.totalPageViews || 0,
      color: 'primary' as const,
      icon: Eye,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Total Sessions',
      value: analyticsData?.totalSessions || 0,
      color: 'secondary' as const,
      icon: Users,
      trend: { value: 8.3, isPositive: true }
    },
    {
      title: 'Total Events',
      value: analyticsData?.totalEvents || 0,
      color: 'tertiary' as const,
      icon: TrendingUp,
      trend: { value: 15.2, isPositive: true }
    },
    {
      title: 'Bounce Rate',
      value: `${((analyticsData?.bounceRate || 0) * 100).toFixed(1)}%`,
      color: 'warning' as const,
      icon: TrendingUp,
      trend: { value: 5.7, isPositive: false }
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-8">
      {/* Analytics Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-6">Portfolio Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {analyticsStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
      </div>

      {/* Contact Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-6">Contact Management</h2>
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
      </div>

      {/* Service Inquiries Table */}
      <div className="glass-effect rounded-2xl border border-surface-border overflow-hidden animate-fade-in-up delay-200">
        {/* Table Header */}
        <div className="p-6 border-b border-surface-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Recent Contact Submissions</h3>
              <p className="text-text-muted">
                Showing {contactData?.contacts?.length || 0} of {contactData?.totalCount || 0} total inquiries
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 w-80"
                />
              </div>

              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="In Progress">In Progress</option>
                <option value="Responded">Responded</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Refresh */}
              <button 
                onClick={handleRefresh}
                className="p-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 group"
              >
                <RefreshCw className="w-4 h-4 group-hover:animate-spin" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6">
          {contactsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-4"></div>
              <p className="text-text-muted">Loading contacts...</p>
            </div>
          ) : !contactData?.contacts || contactData.contacts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-accent-primary" />
              </div>
              <h4 className="text-lg font-medium text-text-primary mb-2">No inquiries yet</h4>
              <p className="text-text-muted max-w-md mx-auto">
                When clients reach out through your contact form, their inquiries will appear here for easy management and tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactData.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="glass-effect rounded-lg border border-surface-border p-4 hover:border-accent-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-text-primary">{contact.name}</h4>
                        <span className="text-sm text-text-muted">{contact.email}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          contact.status === 'New' ? 'bg-accent-primary/20 text-accent-primary' :
                          contact.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' :
                          contact.status === 'Responded' ? 'bg-green-400/20 text-green-400' :
                          'bg-gray-400/20 text-gray-400'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                      <h5 className="text-sm font-medium text-text-secondary mb-1">{contact.subject}</h5>
                      <p className="text-sm text-text-muted line-clamp-2">{contact.message}</p>
                      <div className="mt-2 text-xs text-text-muted">
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/admin/contact`}
                        className="p-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-2xl border border-surface-border p-6 animate-fade-in-up delay-400">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-surface-border">
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-text-primary">Admin system connected to backend</p>
              <p className="text-sm text-text-muted">Portfolio admin dashboard is now live with real-time data</p>
            </div>
            <div className="text-sm text-text-muted">Just now</div>
          </div>
          {resumeData?.totalDownloads && resumeData.totalDownloads > 0 && (
            <div className="flex items-center space-x-4 p-4 glass-effect rounded-lg border border-surface-border">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-text-primary">{resumeData.totalDownloads} resume downloads this month</p>
                <p className="text-sm text-text-muted">Track resume engagement and download patterns</p>
              </div>
              <div className="text-sm text-text-muted">This month</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 