import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please provide a valid phone number'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters'],
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
    minlength: [20, 'Message must be at least 20 characters'],
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  category: {
    type: String,
    enum: [
      'General Inquiry',
      'Project Collaboration',
      'Job Opportunity',
      'Consultation',
      'Technical Support',
      'Other'
    ],
    default: 'General Inquiry'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'In Progress', 'Responded', 'Closed', 'Spam'],
    default: 'New'
  },
  source: {
    type: String,
    enum: ['Website', 'LinkedIn', 'Email', 'Referral', 'Other'],
    default: 'Website'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  referrer: {
    type: String,
    trim: true
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  spamScore: {
    type: Number,
    default: 0,
    min: [0, 'Spam score must be between 0 and 100'],
    max: [100, 'Spam score must be between 0 and 100']
  },
  attachments: [{
    filename: {
      type: String,
      trim: true
    },
    originalName: {
      type: String,
      trim: true
    },
    mimetype: {
      type: String,
      trim: true
    },
    size: {
      type: Number
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  responses: [{
    message: {
      type: String,
      trim: true,
      required: true
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    respondedAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['Email', 'Phone', 'Admin Panel'],
      default: 'Admin Panel'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  notes: [{
    content: {
      type: String,
      trim: true,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  }],
  followUpDate: {
    type: Date
  },
  estimatedValue: {
    type: Number,
    min: [0, 'Estimated value must be positive']
  },
  projectType: {
    type: String,
    enum: [
      'Web Development',
      'Mobile App',
      'AI/ML Project',
      'Consultation',
      'Full Stack Project',
      'Frontend Only',
      'Backend Only',
      'Other'
    ]
  },
  budget: {
    type: String,
    enum: [
      'Under $1,000',
      '$1,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000+',
      'Not specified'
    ],
    default: 'Not specified'
  },
  timeline: {
    type: String,
    enum: [
      'ASAP',
      'Within 1 week',
      'Within 1 month',
      '1-3 months',
      '3-6 months',
      '6+ months',
      'Not specified'
    ],
    default: 'Not specified'
  },
  readAt: {
    type: Date
  },
  readBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ source: 1 });
contactSchema.index({ isSpam: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ followUpDate: 1 });
contactSchema.index({ tags: 1 });

// Compound indexes
contactSchema.index({ status: 1, priority: -1, createdAt: -1 });
contactSchema.index({ category: 1, status: 1 });
contactSchema.index({ isSpam: 1, status: 1 });

// Pre-save middleware to update updatedAt
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to detect spam
contactSchema.pre('save', function(next) {
  // Simple spam detection logic
  let spamScore = 0;
  
  // Check for spam keywords
  const spamKeywords = [
    'viagra', 'casino', 'loan', 'mortgage', 'bitcoin', 'crypto',
    'investment', 'guarantee', 'urgent', 'limited time', 'act now'
  ];
  
  const content = (this.subject + ' ' + this.message).toLowerCase();
  spamKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      spamScore += 20;
    }
  });
  
  // Check for suspicious patterns
  if (this.message.includes('http') || this.message.includes('www.')) {
    spamScore += 15;
  }
  
  // Check for excessive caps
  const capsCount = (this.message.match(/[A-Z]/g) || []).length;
  if (capsCount > this.message.length * 0.5) {
    spamScore += 10;
  }
  
  // Check for very short messages
  if (this.message.length < 50) {
    spamScore += 5;
  }
  
  this.spamScore = Math.min(spamScore, 100);
  this.isSpam = spamScore > 50;
  
  next();
});

// Instance method to mark as read
contactSchema.methods.markAsRead = function(userId) {
  this.status = 'Read';
  this.readAt = Date.now();
  this.readBy = userId;
  return this.save();
};

// Instance method to add response
contactSchema.methods.addResponse = function(message, userId, method = 'Admin Panel') {
  this.responses.push({
    message,
    respondedBy: userId,
    method
  });
  this.status = 'Responded';
  return this.save();
};

// Instance method to add note
contactSchema.methods.addNote = function(content, userId, isPrivate = false) {
  this.notes.push({
    content,
    createdBy: userId,
    isPrivate
  });
  return this.save();
};

// Instance method to update status
contactSchema.methods.updateStatus = function(status) {
  this.status = status;
  return this.save();
};

// Static method to get unread count
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ status: 'New', isSpam: false });
};

// Static method to get recent contacts
contactSchema.statics.getRecent = function(limit = 10) {
  return this.find({ isSpam: false })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('readBy', 'name email')
    .populate('responses.respondedBy', 'name email');
};

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status, isSpam: false })
    .sort({ createdAt: -1 })
    .populate('readBy', 'name email')
    .populate('responses.respondedBy', 'name email');
};

// Static method to search contacts
contactSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
      { subject: { $regex: query, $options: 'i' } },
      { message: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ],
    isSpam: false
  }).sort({ createdAt: -1 });
};

// Virtual for response count
contactSchema.virtual('responseCount').get(function() {
  return this.responses.length;
});

// Virtual for latest response
contactSchema.virtual('latestResponse').get(function() {
  if (this.responses.length === 0) return null;
  return this.responses[this.responses.length - 1];
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Contact', contactSchema); 