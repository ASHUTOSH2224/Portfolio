import express from 'express';
import { body, query, param } from 'express-validator';
import { 
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  incrementViews,
  searchProjects,
  getProjectsByCategory,
  getFeaturedProjects,
  bulkUpdateProjects
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Validation middleware
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters'),
  body('longDescription')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Long description cannot exceed 2000 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Technology name cannot be empty'),
  body('category')
    .isIn(['AI/ML', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'ML/Backend', 'DevOps', 'Other'])
    .withMessage('Invalid category'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid live URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid GitHub URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  body('codeSnippet')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Code snippet cannot exceed 1000 characters'),
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Duration cannot exceed 50 characters'),
  body('teamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Team size must be at least 1'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Tag cannot be empty'),
  body('challenges')
    .optional()
    .isArray()
    .withMessage('Challenges must be an array'),
  body('solutions')
    .optional()
    .isArray()
    .withMessage('Solutions must be an array'),
  body('learnings')
    .optional()
    .isArray()
    .withMessage('Learnings must be an array')
];

// Public routes
router.get('/', 
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['AI/ML', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'ML/Backend', 'DevOps', 'Other']).withMessage('Invalid category'),
  query('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
  query('status').optional().isIn(['active', 'inactive', 'in-progress', 'completed']).withMessage('Invalid status'),
  query('search').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('sortBy').optional().isIn(['title', 'createdAt', 'updatedAt', 'viewCount', 'sortOrder']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
  getProjects
);

router.get('/featured', getFeaturedProjects);

router.get('/category/:category', 
  param('category').isIn(['AI/ML', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'ML/Backend', 'DevOps', 'Other']).withMessage('Invalid category'),
  getProjectsByCategory
);

router.get('/search', 
  query('q').trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  searchProjects
);

router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid project ID'),
  getProject
);

router.post('/:id/view', 
  param('id').isMongoId().withMessage('Invalid project ID'),
  incrementViews
);

// Protected admin routes
router.use(protect);
router.use(adminOnly);

router.post('/', 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]),
  projectValidation,
  createProject
);

router.put('/:id', 
  param('id').isMongoId().withMessage('Invalid project ID'),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]),
  projectValidation,
  updateProject
);

router.patch('/:id/featured', 
  param('id').isMongoId().withMessage('Invalid project ID'),
  toggleFeatured
);

router.patch('/bulk',
  body('projectIds').isArray({ min: 1 }).withMessage('Project IDs must be an array with at least one ID'),
  body('projectIds.*').isMongoId().withMessage('Invalid project ID'),
  body('action').isIn(['delete', 'activate', 'deactivate', 'feature', 'unfeature']).withMessage('Invalid bulk action'),
  bulkUpdateProjects
);

router.delete('/:id', 
  param('id').isMongoId().withMessage('Invalid project ID'),
  deleteProject
);

export default router; 