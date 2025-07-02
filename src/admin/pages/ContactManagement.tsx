import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Filter,
  MoreHorizontal,
  Reply,
  Archive,
  Trash2,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  starred: boolean;
}

const ContactManagement: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Web Development Project Inquiry',
      message: 'Hi Ashutosh, I am interested in hiring you for a full-stack web development project. The project involves building an e-commerce platform with React and Node.js. Could we schedule a call to discuss the requirements and timeline?',
      submittedAt: '2024-01-15 14:30',
      status: 'new',
      priority: 'high',
      starred: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      subject: 'Collaboration Opportunity',
      message: 'Hello, I work at TechCorp and we are looking for a skilled developer to join our team for a machine learning project. Your background in AI and full-stack development looks perfect for our needs.',
      submittedAt: '2024-01-14 09:15',
      status: 'read',
      priority: 'medium',
      starred: false
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@startup.io',
      subject: 'Mobile App Development',
      message: 'Hi, I am the founder of a startup and we need help building a React Native mobile app. Would you be available for a consultation?',
      submittedAt: '2024-01-13 16:45',
      status: 'replied',
      priority: 'medium',
      starred: false
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'read':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'replied':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'archived':
        return 'text-text-muted bg-surface-tertiary border-surface-border';
      default:
        return 'text-text-muted bg-surface-tertiary border-surface-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-text-muted';
    }
  };

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filterStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'read':
        return <Clock className="w-4 h-4" />;
      case 'replied':
        return <CheckCircle className="w-4 h-4" />;
      case 'archived':
        return <Archive className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Contact Management</h2>
          <p className="text-text-muted">Manage and respond to contact form submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-effect rounded-xl p-6 border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Total Inquiries</p>
                <p className="text-2xl font-bold text-accent-primary">{submissions.length}</p>
              </div>
              <Mail className="w-8 h-8 text-accent-primary" />
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6 border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">New</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {submissions.filter(s => s.status === 'new').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6 border border-green-400/30 bg-gradient-to-br from-green-400/10 to-green-400/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Replied</p>
                <p className="text-2xl font-bold text-green-400">
                  {submissions.filter(s => s.status === 'replied').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6 border border-red-400/30 bg-gradient-to-br from-red-400/10 to-red-400/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">High Priority</p>
                <p className="text-2xl font-bold text-red-400">
                  {submissions.filter(s => s.priority === 'high').length}
                </p>
              </div>
              <Star className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between glass-effect rounded-lg border border-surface-border p-4">
              <div className="flex items-center space-x-4">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  className="pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 w-64"
                />
              </div>
            </div>

            {/* Submissions */}
            <div className="space-y-3">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`glass-effect rounded-lg border p-4 cursor-pointer hover-glow transition-all duration-300 ${
                    selectedSubmission?.id === submission.id 
                      ? 'border-accent-primary/50 bg-accent-primary/5' 
                      : 'border-surface-border hover:border-accent-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-matteBlack-800 font-bold">
                        {submission.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-text-primary font-semibold">{submission.name}</h4>
                        <p className="text-text-muted text-sm">{submission.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {submission.starred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(submission.priority)}`}></div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                  
                  <h5 className="text-text-primary font-medium mb-2">{submission.subject}</h5>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-3">{submission.message}</p>
                  
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{submission.submittedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(submission.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="glass-effect rounded-xl border border-surface-border">
            {selectedSubmission ? (
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-1">
                      {selectedSubmission.subject}
                    </h3>
                    <p className="text-text-muted text-sm">
                      From: {selectedSubmission.name} &lt;{selectedSubmission.email}&gt;
                    </p>
                    <p className="text-text-muted text-sm">
                      {selectedSubmission.submittedAt}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 glass-effect rounded-lg hover-glow">
                      <Star className={selectedSubmission.starred ? 'fill-yellow-400' : ''} size={16} />
                    </button>
                    <button className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {/* Priority & Status */}
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSubmission.status)}`}>
                    {selectedSubmission.status}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(selectedSubmission.priority)}`}>
                    {selectedSubmission.priority} priority
                  </span>
                </div>

                {/* Message */}
                <div className="bg-surface-tertiary/30 rounded-lg p-4 border border-surface-border">
                  <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-red-400 hover:border-red-400/50 transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Mail className="w-12 h-12 text-accent-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No submission selected</h3>
                <p className="text-text-muted">Select a submission from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactManagement; 