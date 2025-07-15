import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  login, 
  logout, 
  getMe, 
  updatePassword, 
  forgotPassword, 
  resetPassword,
  refreshToken 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const passwordUpdateValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);
router.post('/forgot-password', 
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  forgotPassword
);
router.post('/reset-password/:token', 
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  resetPassword
);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, passwordUpdateValidation, updatePassword);

export default router; 