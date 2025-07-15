import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  // Page View Analytics
  pageViews: [{
    path: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    sessionId: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // in seconds
      default: 0
    },
    exitPage: {
      type: Boolean,
      default: false
    }
  }],
  
  // User Session Data
  session: {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number, // in seconds
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  },
  
  // User Information
  user: {
    ipAddress: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    browser: {
      name: {
        type: String
      },
      version: {
        type: String
      }
    },
    os: {
      name: {
        type: String
      },
      version: {
        type: String
      }
    },
    device: {
      type: {
        type: String,
        enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
        default: 'Unknown'
      },
      model: {
        type: String
      }
    },
    screen: {
      width: {
        type: Number
      },
      height: {
        type: Number
      }
    }
  },
  
  // Geographic Data
  location: {
    country: {
      type: String
    },
    region: {
      type: String
    },
    city: {
      type: String
    },
    timezone: {
      type: String
    },
    coordinates: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      }
    }
  },
  
  // Traffic Source
  source: {
    referrer: {
      type: String,
      trim: true
    },
    utm: {
      source: {
        type: String,
        trim: true
      },
      medium: {
        type: String,
        trim: true
      },
      campaign: {
        type: String,
        trim: true
      },
      term: {
        type: String,
        trim: true
      },
      content: {
        type: String,
        trim: true
      }
    },
    searchQuery: {
      type: String,
      trim: true
    },
    channel: {
      type: String,
      enum: ['Direct', 'Search', 'Social', 'Email', 'Referral', 'Other'],
      default: 'Direct'
    }
  },
  
  // Events and Interactions
  events: [{
    type: {
      type: String,
      enum: [
        'click',
        'form_submit',
        'download',
        'email_click',
        'phone_click',
        'social_click',
        'project_view',
        'scroll',
        'video_play',
        'modal_open',
        'modal_close',
        'file_download',
        'external_link',
        'contact_form',
        'resume_download',
        'other'
      ],
      required: true
    },
    element: {
      type: String,
      trim: true
    },
    value: {
      type: String,
      trim: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Performance Metrics
  performance: {
    loadTime: {
      type: Number // in milliseconds
    },
    domContentLoaded: {
      type: Number // in milliseconds
    },
    firstPaint: {
      type: Number // in milliseconds
    },
    firstContentfulPaint: {
      type: Number // in milliseconds
    },
    largestContentfulPaint: {
      type: Number // in milliseconds
    },
    cumulativeLayoutShift: {
      type: Number
    },
    firstInputDelay: {
      type: Number // in milliseconds
    }
  },
  
  // Conversion Tracking
  conversions: [{
    type: {
      type: String,
      enum: [
        'contact_form',
        'resume_download',
        'email_click',
        'phone_click',
        'social_follow',
        'project_inquiry',
        'calendly_booking',
        'other'
      ],
      required: true
    },
    value: {
      type: Number,
      default: 1
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    }
  }],
  
  // Timestamps
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
analyticsSchema.index({ 'session.sessionId': 1 });
analyticsSchema.index({ 'user.ipAddress': 1 });
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ 'session.startTime': -1 });
analyticsSchema.index({ 'pageViews.path': 1 });
analyticsSchema.index({ 'pageViews.timestamp': -1 });
analyticsSchema.index({ 'events.type': 1 });
analyticsSchema.index({ 'events.timestamp': -1 });
analyticsSchema.index({ 'conversions.type': 1 });
analyticsSchema.index({ 'conversions.timestamp': -1 });
analyticsSchema.index({ 'location.country': 1 });
analyticsSchema.index({ 'source.channel': 1 });
analyticsSchema.index({ 'user.device.type': 1 });

// Compound indexes
analyticsSchema.index({ 'session.sessionId': 1, 'pageViews.timestamp': -1 });
analyticsSchema.index({ 'user.ipAddress': 1, createdAt: -1 });
analyticsSchema.index({ 'events.type': 1, 'events.timestamp': -1 });

// Pre-save middleware to update updatedAt
analyticsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to add page view
analyticsSchema.methods.addPageView = function(path, title, duration = 0) {
  this.pageViews.push({
    path,
    title,
    sessionId: this.session.sessionId,
    duration
  });
  this.session.pageCount += 1;
  this.session.lastActivity = Date.now();
  return this.save();
};

// Instance method to add event
analyticsSchema.methods.addEvent = function(type, element, value, metadata) {
  this.events.push({
    type,
    element,
    value,
    metadata
  });
  this.session.lastActivity = Date.now();
  return this.save();
};

// Instance method to add conversion
analyticsSchema.methods.addConversion = function(type, value = 1, metadata) {
  this.conversions.push({
    type,
    value,
    metadata
  });
  this.session.lastActivity = Date.now();
  return this.save();
};

// Instance method to end session
analyticsSchema.methods.endSession = function() {
  this.session.isActive = false;
  this.session.endTime = Date.now();
  this.session.duration = Math.round((this.session.endTime - this.session.startTime) / 1000);
  return this.save();
};

// Static method to get daily stats
analyticsSchema.statics.getDailyStats = function(date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return this.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalPageViews: { $sum: { $size: '$pageViews' } },
        totalEvents: { $sum: { $size: '$events' } },
        totalConversions: { $sum: { $size: '$conversions' } },
        avgSessionDuration: { $avg: '$session.duration' },
        avgPageViews: { $avg: { $size: '$pageViews' } },
        uniqueCountries: { $addToSet: '$location.country' },
        topDevices: { $push: '$user.device.type' }
      }
    }
  ]);
};

// Static method to get popular pages
analyticsSchema.statics.getPopularPages = function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    { $unwind: '$pageViews' },
    {
      $group: {
        _id: '$pageViews.path',
        views: { $sum: 1 },
        avgDuration: { $avg: '$pageViews.duration' },
        uniqueVisitors: { $addToSet: '$user.ipAddress' }
      }
    },
    {
      $addFields: {
        uniqueVisitorCount: { $size: '$uniqueVisitors' }
      }
    },
    {
      $project: {
        path: '$_id',
        views: 1,
        avgDuration: 1,
        uniqueVisitorCount: 1
      }
    },
    { $sort: { views: -1 } }
  ]);
};

// Static method to get conversion funnel
analyticsSchema.statics.getConversionFunnel = function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    { $unwind: '$conversions' },
    {
      $group: {
        _id: '$conversions.type',
        count: { $sum: 1 },
        totalValue: { $sum: '$conversions.value' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Ensure virtual fields are serialized
analyticsSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Analytics', analyticsSchema); 