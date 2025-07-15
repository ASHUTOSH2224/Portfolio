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
  Calendar,
  Eye,
  Edit,
  MessageSquare,
  StickyNote,
  RefreshCw
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import contactService, { ContactSubmission } from '../../services/contactService';
import toast from 'react-hot-toast';

const ContactManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const queryClient = useQueryClient();

  // Fetch contacts with filters
  const { data: contactData, isLoading: contactsLoading, refetch } = useQuery({
    queryKey: ['contacts', filterStatus, filterPriority, searchTerm],
    queryFn: () => contactService.getContacts({
      status: filterStatus === 'all' ? undefined : filterStatus,
      priority: filterPriority === 'all' ? undefined : filterPriority,
      search: searchTerm || undefined,
      limit: 50,
    }),
    refetchInterval: 60000,
  });

  // Update contact status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      contactService.updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact status updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update status');
    },
  });

  // Update contact priority mutation
  const updatePriorityMutation = useMutation({
    mutationFn: ({ id, priority }: { id: string; priority: string }) => 
      contactService.updateContactPriority(id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact priority updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update priority');
    },
  });

  // Add response mutation
  const addResponseMutation = useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) => 
      contactService.addResponse(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Response sent successfully');
      setShowResponseModal(false);
      setResponseMessage('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to send response');
    },
  });

  // Add note mutation
  const addNoteMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => 
      contactService.addNote(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Note added successfully');
      setShowNoteModal(false);
      setNoteContent('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to add note');
    },
  });

  // Mark as spam mutation
  const markSpamMutation = useMutation({
    mutationFn: contactService.markAsSpam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact marked as spam');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to mark as spam');
    },
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: contactService.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted successfully');
      setSelectedContact(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete contact');
    },
  });

  // Initialize contact stats with default values
  const contactStats = contactData?.stats || {
    new: 0,
    inProgress: 0,
    responded: 0,
    highPriority: 0
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'text-accent-primary bg-accent-primary/10 border-accent-primary/30';
      case 'Read':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'In Progress':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Responded':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Closed':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default:
        return 'text-text-muted bg-surface-tertiary border-surface-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-500';
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-text-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <AlertCircle className="w-4 h-4" />;
      case 'Read':
        return <Eye className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Responded':
        return <CheckCircle className="w-4 h-4" />;
      case 'Closed':
        return <Archive className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: contactId, status: newStatus });
  };

  const handlePriorityChange = (contactId: string, newPriority: string) => {
    updatePriorityMutation.mutate({ id: contactId, priority: newPriority });
  };

  const handleSendResponse = () => {
    if (!selectedContact || !responseMessage.trim()) {
      toast.error('Please enter a response message');
      return;
    }
    addResponseMutation.mutate({ 
      id: selectedContact.id, 
      message: responseMessage 
    });
  };

  const handleAddNote = () => {
    if (!selectedContact || !noteContent.trim()) {
      toast.error('Please enter note content');
      return;
    }
    addNoteMutation.mutate({ 
      id: selectedContact.id, 
      content: noteContent 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">Contact Management</h2>
        <p className="text-text-muted">Manage and respond to contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="glass-effect rounded-xl p-6 border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Inquiries</p>
              <p className="text-2xl font-bold text-accent-primary">{contactData?.totalCount || 0}</p>
            </div>
            <Mail className="w-8 h-8 text-accent-primary" />
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6 border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">New</p>
              <p className="text-2xl font-bold text-yellow-400">{contactStats.new}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6 border border-blue-400/30 bg-gradient-to-br from-blue-400/10 to-blue-400/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">In Progress</p>
              <p className="text-2xl font-bold text-blue-400">{contactStats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6 border border-green-400/30 bg-gradient-to-br from-green-400/10 to-green-400/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Responded</p>
              <p className="text-2xl font-bold text-green-400">{contactStats.responded}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6 border border-red-400/30 bg-gradient-to-br from-red-400/10 to-red-400/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">High Priority</p>
              <p className="text-2xl font-bold text-red-400">{contactStats.highPriority}</p>
            </div>
            <Star className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="glass-effect rounded-lg border border-surface-border p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                />
              </div>

              {/* Status Filter */}
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="In Progress">In Progress</option>
                <option value="Responded">Responded</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Priority Filter */}
              <select 
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
              >
                <option value="all">All Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              {/* Refresh */}
              <button 
                onClick={() => refetch()}
                className="p-2 glass-effect border border-surface-border rounded-lg text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 group"
              >
                <RefreshCw className="w-4 h-4 group-hover:animate-spin" />
              </button>
            </div>
          </div>

          {/* Contacts List */}
          <div className="space-y-3">
            {contactsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-4"></div>
                <p className="text-text-muted">Loading contacts...</p>
              </div>
            ) : contactData?.contacts?.length === 0 ? (
              <div className="text-center py-16 glass-effect rounded-lg border border-surface-border">
                <Mail className="w-16 h-16 text-accent-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No contacts found</h3>
                <p className="text-text-muted">No contacts match your current filters.</p>
              </div>
            ) : (
              contactData?.contacts?.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`glass-effect rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
                    selectedContact?.id === contact.id 
                      ? 'border-accent-primary bg-accent-primary/5' 
                      : 'border-surface-border hover:border-accent-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-text-primary">{contact.name}</h4>
                      <span className="text-sm text-text-muted">{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </div>
                  </div>
                  
                  <h5 className="text-sm font-medium text-text-secondary mb-2">{contact.subject}</h5>
                  <p className="text-sm text-text-muted line-clamp-2 mb-3">{contact.message}</p>
                  
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}</span>
                    <div className="flex items-center space-x-2">
                      {contact.responses?.length > 0 && (
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{contact.responses.length}</span>
                        </span>
                      )}
                      {contact.notes?.length > 0 && (
                        <span className="flex items-center space-x-1">
                          <StickyNote className="w-3 h-3" />
                          <span>{contact.notes.length}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Details Panel */}
        <div className="space-y-4">
          {selectedContact ? (
            <>
              {/* Contact Info */}
              <div className="glass-effect rounded-lg border border-surface-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{selectedContact.name}</h3>
                    <p className="text-text-muted">{selectedContact.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Status Dropdown */}
                    <select
                      value={selectedContact.status}
                      onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                      className="px-2 py-1 text-xs glass-effect border border-surface-border rounded text-text-primary bg-matteBlack-800"
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Responded">Responded</option>
                      <option value="Closed">Closed</option>
                    </select>
                    
                    {/* Priority Dropdown */}
                    <select
                      value={selectedContact.priority}
                      onChange={(e) => handlePriorityChange(selectedContact.id, e.target.value)}
                      className="px-2 py-1 text-xs glass-effect border border-surface-border rounded text-text-primary bg-matteBlack-800"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Subject</label>
                    <p className="text-text-primary">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Message</label>
                    <p className="text-text-primary">{selectedContact.message}</p>
                  </div>
                  <div className="text-xs text-text-muted">
                    Submitted on {new Date(selectedContact.createdAt).toLocaleDateString()} at {new Date(selectedContact.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowResponseModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect border border-surface-border text-text-primary rounded-lg hover:border-accent-primary/50 transition-all duration-300"
                >
                  <StickyNote className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
                <button
                  onClick={() => markSpamMutation.mutate(selectedContact.id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect border border-yellow-400/50 text-yellow-400 rounded-lg hover:bg-yellow-400/10 transition-all duration-300"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Mark Spam</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this contact?')) {
                      deleteContactMutation.mutate(selectedContact.id);
                    }
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect border border-red-400/50 text-red-400 rounded-lg hover:bg-red-400/10 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>

              {/* Responses */}
              {selectedContact.responses && selectedContact.responses.length > 0 && (
                <div className="glass-effect rounded-lg border border-surface-border p-4">
                  <h4 className="font-medium text-text-primary mb-3">Responses ({selectedContact.responses.length})</h4>
                  <div className="space-y-3">
                    {selectedContact.responses.map((response, index) => (
                      <div key={index} className="p-3 glass-effect rounded border border-surface-border">
                        <p className="text-sm text-text-primary mb-2">{response.message}</p>
                        <div className="text-xs text-text-muted">
                          Sent by {response.sentBy} on {new Date(response.sentAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedContact.notes && selectedContact.notes.length > 0 && (
                <div className="glass-effect rounded-lg border border-surface-border p-4">
                  <h4 className="font-medium text-text-primary mb-3">Notes ({selectedContact.notes.length})</h4>
                  <div className="space-y-3">
                    {selectedContact.notes.map((note, index) => (
                      <div key={index} className="p-3 glass-effect rounded border border-surface-border">
                        <p className="text-sm text-text-primary mb-2">{note.content}</p>
                        <div className="text-xs text-text-muted">
                          Added by {note.createdBy} on {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass-effect rounded-lg border border-surface-border p-8 text-center">
              <Mail className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Select a Contact</h3>
              <p className="text-text-muted">Choose a contact from the list to view details and manage responses.</p>
            </div>
          )}
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-xl border border-surface-border p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Send Response</h3>
            <textarea
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Enter your response..."
              className="w-full h-32 px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 resize-none"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleSendResponse}
                disabled={addResponseMutation.isPending}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
              >
                {addResponseMutation.isPending ? 'Sending...' : 'Send Response'}
              </button>
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setResponseMessage('');
                }}
                className="px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-text-primary transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-xl border border-surface-border p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Add Note</h3>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter your note..."
              className="w-full h-32 px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 resize-none"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddNote}
                disabled={addNoteMutation.isPending}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
              >
                {addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
              </button>
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setNoteContent('');
                }}
                className="px-4 py-2 glass-effect border border-surface-border text-text-muted rounded-lg hover:text-text-primary transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement; 