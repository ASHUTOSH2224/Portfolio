import express from 'express';
import { body, query, param } from 'express-validator';
import { 
  trackPageView,
  trackEvent,
  trackConversion,
  createSession,
  endSession,
  getAnalyticsDashboard,
  getPageViews,
  getEvents,
  getConversions,
  getSessionStats,
  getPopularPages,
  getConversionFunnel,
  getResumeDownloads,
  getTrafficSources,
  getDeviceStats,
  getLocationStats,
  getDailyStats,
  getWeeklyStats,
  getMonthlyStats,
  exportAnalytics,
  getUserAnalytics,
  getTrafficAnalytics
} from '../controllers/analyticsController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const sessionValidation = [
  body('sessionId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  body('ipAddress')
    .isIP()
    .withMessage('Please provide a valid IP address'),
  body('userAgent')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('User agent must be between 1 and 500 characters'),
  body('referrer')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Referrer cannot exceed 500 characters'),
  body('location')
    .optional()
    .isObject()
    .withMessage('Location must be an object'),
  body('device')
    .optional()
    .isObject()
    .withMessage('Device must be an object'),
  body('browser')
    .optional()
    .isObject()
    .withMessage('Browser must be an object'),
  body('os')
    .optional()
    .isObject()
    .withMessage('OS must be an object'),
  body('screen')
    .optional()
    .isObject()
    .withMessage('Screen must be an object')
];

const pageViewValidation = [
  body('sessionId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  body('path')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Path must be between 1 and 200 characters'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer'),
  body('exitPage')
    .optional()
    .isBoolean()
    .withMessage('Exit page must be a boolean')
];

const eventValidation = [
  body('sessionId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  body('type')
    .isIn(['click', 'form_submit', 'download', 'email_click', 'phone_click', 'social_click', 'project_view', 'scroll', 'video_play', 'modal_open', 'modal_close', 'file_download', 'external_link', 'contact_form', 'resume_download', 'other'])
    .withMessage('Invalid event type'),
  body('element')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Element cannot exceed 200 characters'),
  body('value')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Value cannot exceed 500 characters'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
  body('ipAddress')
    .optional()
    .isIP()
    .withMessage('Please provide a valid IP address'),
  body('userAgent')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('User agent cannot exceed 500 characters')
];

const conversionValidation = [
  body('sessionId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters'),
  body('type')
    .isIn(['contact_form', 'resume_download', 'email_click', 'phone_click', 'social_follow', 'project_inquiry', 'calendly_booking', 'other'])
    .withMessage('Invalid conversion type'),
  body('value')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Value must be a non-negative number'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object')
];

// Public routes for tracking
router.post('/session', sessionValidation, createSession);
router.post('/pageview', pageViewValidation, trackPageView);
router.post('/event', eventValidation, trackEvent);
router.post('/conversion', conversionValidation, trackConversion);
router.post('/session/:sessionId/end', 
  param('sessionId').trim().isLength({ min: 1, max: 100 }).withMessage('Session ID must be between 1 and 100 characters'),
  endSession
);

// Protected admin routes
router.use(protect);
router.use(adminOnly);

// Dashboard and overview
router.get('/dashboard', getAnalyticsDashboard);

// Page views
router.get('/pageviews', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('path').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Path must be between 1 and 200 characters'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getPageViews
);

router.get('/pageviews/popular', 
  query('days').optional().isInt({ min: 1, max: 365 }).withMessage('Days must be between 1 and 365'),
  getPopularPages
);

// Events
router.get('/events', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('type').optional().isIn(['click', 'form_submit', 'download', 'email_click', 'phone_click', 'social_click', 'project_view', 'scroll', 'video_play', 'modal_open', 'modal_close', 'file_download', 'external_link', 'contact_form', 'resume_download', 'other']).withMessage('Invalid event type'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getEvents
);

// Conversions
router.get('/conversions', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('type').optional().isIn(['contact_form', 'resume_download', 'email_click', 'phone_click', 'social_follow', 'project_inquiry', 'calendly_booking', 'other']).withMessage('Invalid conversion type'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getConversions
);

router.get('/conversions/funnel', 
  query('days').optional().isInt({ min: 1, max: 365 }).withMessage('Days must be between 1 and 365'),
  getConversionFunnel
);

// Resume downloads
router.get('/resume-downloads', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getResumeDownloads
);

// Traffic sources
router.get('/traffic-sources', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  getTrafficSources
);

// Device and location stats
router.get('/devices', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  getDeviceStats
);

router.get('/locations', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  getLocationStats
);

// Sessions
router.get('/sessions', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('limit').optional().isInt({ min: 1, max: 1000 }).withMessage('Limit must be between 1 and 1000'),
  getSessionStats
);

// Time-based stats
router.get('/daily', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  getDailyStats
);

router.get('/weekly', 
  query('weeks').optional().isInt({ min: 1, max: 52 }).withMessage('Weeks must be between 1 and 52'),
  getWeeklyStats
);

router.get('/monthly', 
  query('months').optional().isInt({ min: 1, max: 12 }).withMessage('Months must be between 1 and 12'),
  getMonthlyStats
);

// Export
router.get('/export', 
  query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO 8601 date'),
  query('format').optional().isIn(['json', 'csv']).withMessage('Format must be json or csv'),
  exportAnalytics
);

// User analytics
router.get('/users', 
  query('timeframe').optional().matches(/^\d+d$/).withMessage('Timeframe must be in format: Xd (e.g., 30d)'),
  getUserAnalytics
);

// Traffic analytics
router.get('/traffic', 
  query('timeframe').optional().matches(/^\d+d$/).withMessage('Timeframe must be in format: Xd (e.g., 30d)'),
  getTrafficAnalytics
);

export default router; 