import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import Analytics from '../models/Analytics.js';

// @desc    Submit contact form
// @route   POST /api/contact/submit
// @access  Public
export const submitContactForm = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      subject,
      message,
      category,
      priority,
      budget,
      timeline,
      projectType
    } = req.body;

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers.referer || '';

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      category: category || 'General Inquiry',
      priority: priority || 'Medium',
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      projectType,
      ipAddress,
      userAgent,
      referrer,
      source: 'Website'
    });

    // Track conversion in analytics
    try {
      const sessionId = req.headers['x-session-id'] || `session_${Date.now()}`;
      await Analytics.findOneAndUpdate(
        { 'session.sessionId': sessionId },
        {
          $push: {
            conversions: {
              type: 'contact_form',
              value: 1,
              metadata: {
                contactId: contact._id,
                category: contact.category,
                priority: contact.priority
              }
            }
          }
        },
        { upsert: true }
      );
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError);
      // Don't fail the contact submission if analytics fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during contact form submission'
    });
  }
};

// @desc    Get all contacts with filtering and pagination
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      status,
      category,
      priority,
      search,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { isSpam: false };

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query.createdAt.$lte = new Date(dateTo);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('readBy', 'name email')
      .populate('responses.respondedBy', 'name email');

    // Get total count
    const totalCount = await Contact.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching contacts'
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const contact = await Contact.findById(req.params.id)
      .populate('readBy', 'name email')
      .populate('responses.respondedBy', 'name email')
      .populate('notes.createdBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching contact'
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { status } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    contact.status = status;
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating contact status'
    });
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/contact/:id/read
// @access  Private/Admin
export const markAsRead = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    await contact.markAsRead(req.user.id);
    const updatedContact = await Contact.findById(req.params.id)
      .populate('readBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while marking contact as read'
    });
  }
};

// @desc    Add response to contact
// @route   POST /api/contact/:id/respond
// @access  Private/Admin
export const respondToContact = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message, method = 'Admin Panel' } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    await contact.addResponse(message, req.user.id, method);
    const updatedContact = await Contact.findById(req.params.id)
      .populate('readBy', 'name email')
      .populate('responses.respondedBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while adding response'
    });
  }
};

// @desc    Add note to contact
// @route   POST /api/contact/:id/notes
// @access  Private/Admin
export const addContactNote = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { content, isPrivate = false } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    await contact.addNote(content, req.user.id, isPrivate);
    const updatedContact = await Contact.findById(req.params.id)
      .populate('readBy', 'name email')
      .populate('notes.createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while adding note'
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private/Admin
export const getContactStats = async (req, res, next) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get basic stats
    const totalContacts = await Contact.countDocuments({ isSpam: false });
    const unreadContacts = await Contact.getUnreadCount();
    const spamContacts = await Contact.countDocuments({ isSpam: true });
    
    // Get recent stats
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      isSpam: false
    });
    
    const weeklyContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
      isSpam: false
    });

    // Get status breakdown
    const statusStats = await Contact.aggregate([
      { $match: { isSpam: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get category breakdown
    const categoryStats = await Contact.aggregate([
      { $match: { isSpam: false } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get priority breakdown
    const priorityStats = await Contact.aggregate([
      { $match: { isSpam: false } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get daily stats for the last 30 days
    const dailyStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          isSpam: false
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalContacts,
          unreadContacts,
          spamContacts,
          recentContacts,
          weeklyContacts
        },
        breakdown: {
          status: statusStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          category: categoryStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          priority: priorityStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {})
        },
        dailyStats
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching contact statistics'
    });
  }
};

// @desc    Bulk update contacts
// @route   PATCH /api/contact/bulk
// @access  Private/Admin
export const bulkUpdateContacts = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { contactIds, action, status } = req.body;

    let updateResult;

    switch (action) {
      case 'delete':
        updateResult = await Contact.deleteMany({ _id: { $in: contactIds } });
        break;
      case 'markAsRead':
        updateResult = await Contact.updateMany(
          { _id: { $in: contactIds } },
          { status: 'Read', readAt: Date.now(), readBy: req.user.id }
        );
        break;
      case 'markAsSpam':
        updateResult = await Contact.updateMany(
          { _id: { $in: contactIds } },
          { isSpam: true, status: 'Spam' }
        );
        break;
      case 'updateStatus':
        if (!status) {
          return res.status(400).json({
            success: false,
            error: 'Status is required for updateStatus action'
          });
        }
        updateResult = await Contact.updateMany(
          { _id: { $in: contactIds } },
          { status }
        );
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

    res.status(200).json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      affectedCount: updateResult.modifiedCount || updateResult.deletedCount
    });
  } catch (error) {
    console.error('Bulk update contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during bulk update'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting contact'
    });
  }
}; 