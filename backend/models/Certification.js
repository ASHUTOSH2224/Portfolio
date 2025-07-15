import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a certification title'],
    trim: true,
    maxlength: [150, 'Title cannot be more than 150 characters']
  },
  issuer: {
    type: String,
    required: [true, 'Please provide the issuing organization'],
    trim: true,
    maxlength: [100, 'Issuer cannot be more than 100 characters']
  },
  issueDate: {
    type: Date,
    required: [true, 'Please provide the issue date']
  },
  expirationDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v > this.issueDate;
      },
      message: 'Expiration date must be after issue date'
    }
  },
  credentialId: {
    type: String,
    required: [true, 'Please provide the credential ID'],
    trim: true,
    maxlength: [100, 'Credential ID cannot be more than 100 characters']
  },
  credentialUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid credential URL'
    }
  },
  verifyUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid verification URL'
    }
  },
  description: {
    type: String,
    required: [true, 'Please provide a certification description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Please specify a certification category'],
    enum: [
      'Web Development',
      'Cloud Computing',
      'Database',
      'DevOps',
      'AI/ML',
      'Security',
      'Mobile Development',
      'Project Management',
      'Other'
    ],
    default: 'Other'
  },
  provider: {
    type: String,
    enum: [
      'AWS',
      'Microsoft',
      'Google',
      'MongoDB',
      'Meta',
      'Oracle',
      'IBM',
      'Salesforce',
      'Docker',
      'Kubernetes',
      'freeCodeCamp',
      'Coursera',
      'Udemy',
      'edX',
      'LinkedIn Learning',
      'Pluralsight',
      'Other'
    ],
    default: 'Other'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  certificateImage: {
    type: String,
    trim: true
  },
  badgeImage: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0,
    min: [0, 'Priority must be a positive number']
  },
  viewCount: {
    type: Number,
    default: 0
  },
  verificationCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    earnedHours: {
      type: Number,
      min: [0, 'Hours must be a positive number']
    },
    courseUrl: {
      type: String,
      trim: true
    },
    grade: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot be more than 1000 characters']
    }
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
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
certificationSchema.index({ title: 1 });
certificationSchema.index({ issuer: 1 });
certificationSchema.index({ category: 1 });
certificationSchema.index({ provider: 1 });
certificationSchema.index({ isActive: 1 });
certificationSchema.index({ isExpired: 1 });
certificationSchema.index({ priority: -1 });
certificationSchema.index({ issueDate: -1 });
certificationSchema.index({ expirationDate: 1 });
certificationSchema.index({ tags: 1 });

// Compound indexes
certificationSchema.index({ isActive: 1, priority: -1, issueDate: -1 });
certificationSchema.index({ category: 1, isActive: 1 });
certificationSchema.index({ provider: 1, isActive: 1 });

// Pre-save middleware to update updatedAt
certificationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to check expiration
certificationSchema.pre('save', function(next) {
  if (this.expirationDate && this.expirationDate < Date.now()) {
    this.isExpired = true;
  } else {
    this.isExpired = false;
  }
  next();
});

// Instance method to check if certification is expired
certificationSchema.methods.checkExpiration = function() {
  if (this.expirationDate && this.expirationDate < Date.now()) {
    this.isExpired = true;
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method to increment view count
certificationSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to increment verification count
certificationSchema.methods.incrementVerifications = function() {
  this.verificationCount += 1;
  return this.save();
};

// Static method to get active certifications
certificationSchema.statics.getActive = function() {
  return this.find({ isActive: true, isExpired: false })
    .sort({ priority: -1, issueDate: -1 });
};

// Static method to get certifications by category
certificationSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true, isExpired: false })
    .sort({ priority: -1, issueDate: -1 });
};

// Static method to get certifications by provider
certificationSchema.statics.getByProvider = function(provider) {
  return this.find({ provider, isActive: true, isExpired: false })
    .sort({ priority: -1, issueDate: -1 });
};

// Static method to search certifications
certificationSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { issuer: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { skills: { $in: [new RegExp(query, 'i')] } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ],
    isActive: true
  }).sort({ priority: -1, issueDate: -1 });
};

// Virtual for certification status
certificationSchema.virtual('status').get(function() {
  if (!this.isActive) return 'inactive';
  if (this.isExpired) return 'expired';
  if (this.expirationDate && this.expirationDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) {
    return 'expiring-soon';
  }
  return 'active';
});

// Virtual for display date
certificationSchema.virtual('displayDate').get(function() {
  return this.issueDate.getFullYear().toString();
});

// Ensure virtual fields are serialized
certificationSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Certification', certificationSchema); 