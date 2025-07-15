import express from 'express';
import { body, query, param } from 'express-validator';
import { 
  getDashboardStats,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  toggleUserStatus,
  getSystemInfo,
  getSystemLogs,
  clearSystemLogs,
  exportData,
  importData,
  getDatabaseStats,
  runMaintenance,
  getSettings,
  updateSettings,
  sendTestEmail,
  getBackupList,
  createBackup,
  restoreBackup,
  deleteBackup
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// All routes require admin authentication
router.use(protect);
router.use(adminOnly);

// Validation middleware
const userValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be admin or user'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

const settingsValidation = [
  body('siteName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Site name must be between 1 and 100 characters'),
  body('siteDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Site description cannot exceed 500 characters'),
  body('contactEmail')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid contact email'),
  body('analyticsEnabled')
    .optional()
    .isBoolean()
    .withMessage('Analytics enabled must be a boolean'),
  body('maintenanceMode')
    .optional()
    .isBoolean()
    .withMessage('Maintenance mode must be a boolean'),
  body('maxFileSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max file size must be a positive integer'),
  body('allowedFileTypes')
    .optional()
    .isArray()
    .withMessage('Allowed file types must be an array')
];

// Dashboard and overview
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', 
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('role').optional().isIn(['admin', 'user']).withMessage('Invalid role'),
  query('status').optional().isIn(['active', 'inactive', 'locked']).withMessage('Invalid status'),
  query('search').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  getUsers
);

router.get('/users/:id', 
  param('id').isMongoId().withMessage('Invalid user ID'),
  getUser
);

router.post('/users', 
  userValidation,
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  createUser
);

router.put('/users/:id', 
  param('id').isMongoId().withMessage('Invalid user ID'),
  userValidation,
  updateUser
);

router.patch('/users/:id/role', 
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('role').isIn(['admin', 'user']).withMessage('Role must be admin or user'),
  updateUserRole
);

router.patch('/users/:id/status', 
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('isActive').isBoolean().withMessage('isActive must be a boolean'),
  toggleUserStatus
);

router.delete('/users/:id', 
  param('id').isMongoId().withMessage('Invalid user ID'),
  deleteUser
);

// System management
router.get('/system/info', getSystemInfo);
router.get('/system/logs', 
  query('level').optional().isIn(['error', 'warn', 'info', 'debug']).withMessage('Invalid log level'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getSystemLogs
);
router.delete('/system/logs', clearSystemLogs);

router.get('/database/stats', getDatabaseStats);
router.post('/maintenance', runMaintenance);

// Settings management
router.get('/settings', getSettings);
router.put('/settings', settingsValidation, updateSettings);

// Data management
router.post('/export', 
  body('collections')
    .optional()
    .isArray()
    .withMessage('Collections must be an array'),
  body('format')
    .optional()
    .isIn(['json', 'csv'])
    .withMessage('Format must be json or csv'),
  exportData
);

router.post('/import', 
  upload.single('file'),
  body('collection')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Collection name is required'),
  body('overwrite')
    .optional()
    .isBoolean()
    .withMessage('Overwrite must be a boolean'),
  importData
);

// Backup management
router.get('/backups', getBackupList);
router.post('/backups', 
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Backup name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  createBackup
);

router.post('/backups/:id/restore', 
  param('id').isMongoId().withMessage('Invalid backup ID'),
  restoreBackup
);

router.delete('/backups/:id', 
  param('id').isMongoId().withMessage('Invalid backup ID'),
  deleteBackup
);

// Test utilities
router.post('/test-email', 
  body('to')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Subject must be between 1 and 200 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  sendTestEmail
);

export default router; 