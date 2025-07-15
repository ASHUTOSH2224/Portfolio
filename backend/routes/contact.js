import express from 'express';
import { body, query, param } from 'express-validator';
import { 
  submitContactForm,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
  respondToContact,
  addContactNote,
  getContactStats,
  markAsRead,
  bulkUpdateContacts
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const contactFormValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Message must be between 20 and 2000 characters'),
  body('category')
    .optional()
    .isIn(['General Inquiry', 'Project Collaboration', 'Job Opportunity', 'Consultation', 'Technical Support', 'Other'])
    .withMessage('Invalid category'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('budget')
    .optional()
    .isIn(['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+', 'Not specified'])
    .withMessage('Invalid budget range'),
  body('timeline')
    .optional()
    .isIn(['ASAP', 'Within 1 week', 'Within 1 month', '1-3 months', '3-6 months', '6+ months', 'Not specified'])
    .withMessage('Invalid timeline'),
  body('projectType')
    .optional()
    .isIn(['Web Development', 'Mobile App', 'AI/ML Project', 'Consultation', 'Full Stack Project', 'Frontend Only', 'Backend Only', 'Other'])
    .withMessage('Invalid project type')
];

const responseValidation = [
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Response message must be between 10 and 2000 characters'),
  body('method')
    .optional()
    .isIn(['Email', 'Phone', 'Admin Panel'])
    .withMessage('Invalid response method')
];

const noteValidation = [
  body('content')
    .trim()
    .isLength({ min: 5, max: 1000 })
    .withMessage('Note content must be between 5 and 1000 characters'),
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean')
];

// Public routes
router.post('/submit', contactFormValidation, submitContactForm);

// Protected admin routes
router.use(protect);
router.use(adminOnly);

// Get all contacts with filtering and pagination
router.get('/', 
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['New', 'Read', 'In Progress', 'Responded', 'Closed', 'Spam']).withMessage('Invalid status'),
  query('category').optional().isIn(['General Inquiry', 'Project Collaboration', 'Job Opportunity', 'Consultation', 'Technical Support', 'Other']).withMessage('Invalid category'),
  query('priority').optional().isIn(['Low', 'Medium', 'High', 'Urgent']).withMessage('Invalid priority'),
  query('search').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('dateFrom').optional().isISO8601().withMessage('Invalid date format'),
  query('dateTo').optional().isISO8601().withMessage('Invalid date format'),
  getContacts
);

// Get contact statistics
router.get('/stats', getContactStats);

// Get single contact
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid contact ID'),
  getContact
);

// Update contact status
router.patch('/:id/status',
  param('id').isMongoId().withMessage('Invalid contact ID'),
  body('status').isIn(['New', 'Read', 'In Progress', 'Responded', 'Closed', 'Spam']).withMessage('Invalid status'),
  updateContactStatus
);

// Mark as read
router.patch('/:id/read',
  param('id').isMongoId().withMessage('Invalid contact ID'),
  markAsRead
);

// Add response to contact
router.post('/:id/respond',
  param('id').isMongoId().withMessage('Invalid contact ID'),
  responseValidation,
  respondToContact
);

// Add note to contact
router.post('/:id/notes',
  param('id').isMongoId().withMessage('Invalid contact ID'),
  noteValidation,
  addContactNote
);

// Bulk update contacts
router.patch('/bulk',
  body('contactIds').isArray({ min: 1 }).withMessage('Contact IDs must be an array with at least one ID'),
  body('contactIds.*').isMongoId().withMessage('Invalid contact ID'),
  body('action').isIn(['delete', 'markAsRead', 'markAsSpam', 'updateStatus']).withMessage('Invalid bulk action'),
  body('status').optional().isIn(['New', 'Read', 'In Progress', 'Responded', 'Closed', 'Spam']).withMessage('Invalid status'),
  bulkUpdateContacts
);

// Delete contact
router.delete('/:id',
  param('id').isMongoId().withMessage('Invalid contact ID'),
  deleteContact
);

export default router; 