import express from 'express';
import { body, query, param } from 'express-validator';
import { 
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  incrementViews,
  incrementVerifications,
  searchCertifications,
  getCertificationsByCategory,
  getCertificationsByProvider,
  getActiveCertifications,
  bulkUpdateCertifications
} from '../controllers/certificationController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Validation middleware
const certificationValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage('Title must be between 5 and 150 characters'),
  body('issuer')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Issuer must be between 2 and 100 characters'),
  body('issueDate')
    .isISO8601()
    .withMessage('Please provide a valid issue date'),
  body('expirationDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid expiration date'),
  body('credentialId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Credential ID must be between 1 and 100 characters'),
  body('credentialUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid credential URL'),
  body('verifyUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid verification URL'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Skill cannot be empty'),
  body('category')
    .isIn(['Web Development', 'Cloud Computing', 'Database', 'DevOps', 'AI/ML', 'Security', 'Mobile Development', 'Project Management', 'Other'])
    .withMessage('Invalid category'),
  body('provider')
    .isIn(['AWS', 'Microsoft', 'Google', 'MongoDB', 'Meta', 'Oracle', 'IBM', 'Salesforce', 'Docker', 'Kubernetes', 'freeCodeCamp', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight', 'Other'])
    .withMessage('Invalid provider'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .withMessage('Invalid difficulty level'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('priority')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Priority must be a non-negative integer'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Tag cannot be empty'),
  body('metadata.earnedHours')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Earned hours must be a non-negative integer'),
  body('metadata.courseUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid course URL'),
  body('metadata.grade')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Grade cannot exceed 20 characters'),
  body('metadata.notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

// Public routes
router.get('/', 
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['Web Development', 'Cloud Computing', 'Database', 'DevOps', 'AI/ML', 'Security', 'Mobile Development', 'Project Management', 'Other']).withMessage('Invalid category'),
  query('provider').optional().isIn(['AWS', 'Microsoft', 'Google', 'MongoDB', 'Meta', 'Oracle', 'IBM', 'Salesforce', 'Docker', 'Kubernetes', 'freeCodeCamp', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight', 'Other']).withMessage('Invalid provider'),
  query('difficulty').optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert']).withMessage('Invalid difficulty'),
  query('search').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('sortBy').optional().isIn(['title', 'issueDate', 'priority', 'createdAt']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
  getCertifications
);

router.get('/active', getActiveCertifications);

router.get('/category/:category', 
  param('category').isIn(['Web Development', 'Cloud Computing', 'Database', 'DevOps', 'AI/ML', 'Security', 'Mobile Development', 'Project Management', 'Other']).withMessage('Invalid category'),
  getCertificationsByCategory
);

router.get('/provider/:provider', 
  param('provider').isIn(['AWS', 'Microsoft', 'Google', 'MongoDB', 'Meta', 'Oracle', 'IBM', 'Salesforce', 'Docker', 'Kubernetes', 'freeCodeCamp', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight', 'Other']).withMessage('Invalid provider'),
  getCertificationsByProvider
);

router.get('/search', 
  query('q').trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  searchCertifications
);

router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid certification ID'),
  getCertification
);

router.post('/:id/view', 
  param('id').isMongoId().withMessage('Invalid certification ID'),
  incrementViews
);

router.post('/:id/verify', 
  param('id').isMongoId().withMessage('Invalid certification ID'),
  incrementVerifications
);

// Protected admin routes
router.use(protect);
router.use(adminOnly);

router.post('/', 
  upload.fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'badgeImage', maxCount: 1 }
  ]),
  certificationValidation,
  createCertification
);

router.put('/:id', 
  param('id').isMongoId().withMessage('Invalid certification ID'),
  upload.fields([
    { name: 'certificateImage', maxCount: 1 },
    { name: 'badgeImage', maxCount: 1 }
  ]),
  certificationValidation,
  updateCertification
);

router.patch('/bulk',
  body('certificationIds').isArray({ min: 1 }).withMessage('Certification IDs must be an array with at least one ID'),
  body('certificationIds.*').isMongoId().withMessage('Invalid certification ID'),
  body('action').isIn(['delete', 'activate', 'deactivate', 'checkExpiration']).withMessage('Invalid bulk action'),
  bulkUpdateCertifications
);

router.delete('/:id', 
  param('id').isMongoId().withMessage('Invalid certification ID'),
  deleteCertification
);

export default router; 