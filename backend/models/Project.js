import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot be more than 2000 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Please specify a project category'],
    enum: ['AI/ML', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'ML/Backend', 'DevOps', 'Other'],
    default: 'Other'
  },
  liveUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  image: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'in-progress', 'completed'],
    default: 'active'
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  codeSnippet: {
    type: String,
    trim: true,
    maxlength: [1000, 'Code snippet cannot be more than 1000 characters']
  },
  demoCredentials: {
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    }
  },
  challenges: [{
    type: String,
    trim: true
  }],
  solutions: [{
    type: String,
    trim: true
  }],
  learnings: [{
    type: String,
    trim: true
  }],
  duration: {
    type: String,
    trim: true
  },
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
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
projectSchema.index({ title: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: -1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ sortOrder: 1 });
projectSchema.index({ isPublic: 1 });
projectSchema.index({ tags: 1 });

// Compound indexes
projectSchema.index({ status: 1, featured: -1, sortOrder: 1 });
projectSchema.index({ category: 1, status: 1 });

// Pre-save middleware to update updatedAt
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Pre-save middleware to handle featured projects limit
projectSchema.pre('save', async function(next) {
  if (this.isModified('featured') && this.featured) {
    // Limit featured projects to 3
    const featuredCount = await this.constructor.countDocuments({ featured: true, _id: { $ne: this._id } });
    if (featuredCount >= 3) {
      const error = new Error('Maximum of 3 featured projects allowed');
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
});

// Instance method to increment view count
projectSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to toggle featured status
projectSchema.methods.toggleFeatured = function() {
  this.featured = !this.featured;
  return this.save();
};

// Static method to get featured projects
projectSchema.statics.getFeatured = function() {
  return this.find({ featured: true, status: 'active', isPublic: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(3);
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function(category) {
  return this.find({ category, status: 'active', isPublic: true })
    .sort({ sortOrder: 1, createdAt: -1 });
};

// Static method to search projects
projectSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { technologies: { $in: [new RegExp(query, 'i')] } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ],
    status: 'active',
    isPublic: true
  }).sort({ createdAt: -1 });
};

// Virtual for project URL slug
projectSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Project', projectSchema); 