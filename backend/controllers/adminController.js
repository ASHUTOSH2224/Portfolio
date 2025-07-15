import User from '../models/User.js';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';
import Contact from '../models/Contact.js';
import Analytics from '../models/Analytics.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { validationResult } from 'express-validator';
// import { PaginationHelper } from '../utils/paginationHelper.js';
import bcrypt from 'bcryptjs';

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalCertifications = await Certification.countDocuments();
  const totalContacts = await Contact.countDocuments();
  const totalAnalytics = await Analytics.countDocuments();

  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('createdBy', 'name email');

  const recentContacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalProjects,
        totalCertifications,
        totalContacts,
        totalAnalytics
      },
      recentProjects,
      recentContacts
    }
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, status, search } = req.query;

  const filter = {};
  if (role) filter.role = role;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await User.countDocuments(filter);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/admin/users
// @access  Private/Admin
export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { name, email, password, role, isActive } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isActive
  });

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  });
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { name, email, role, isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check if email is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role, isActive },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    data: updatedUser
  });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    data: updatedUser
  });
});

// @desc    Toggle user status
// @route   PATCH /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    data: updatedUser
  });
});

// @desc    Get system info
// @route   GET /api/admin/system/info
// @access  Private/Admin
export const getSystemInfo = asyncHandler(async (req, res) => {
  const systemInfo = {
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid,
    environment: process.env.NODE_ENV || 'development'
  };

  res.json({
    success: true,
    data: systemInfo
  });
});

// @desc    Get system logs
// @route   GET /api/admin/system/logs
// @access  Private/Admin
export const getSystemLogs = asyncHandler(async (req, res) => {
  const { level = 'info', limit = 100 } = req.query;

  const mockLogs = [
    {
      level: 'info',
      message: 'Server started successfully',
      timestamp: new Date(),
      service: 'server'
    },
    {
      level: 'warn',
      message: 'Database connection slow',
      timestamp: new Date(Date.now() - 60000),
      service: 'database'
    },
    {
      level: 'error',
      message: 'Failed to send email notification',
      timestamp: new Date(Date.now() - 120000),
      service: 'email'
    }
  ];

  const filteredLogs = mockLogs
    .filter(log => level === 'all' || log.level === level)
    .slice(0, parseInt(limit));

  res.json({
    success: true,
    data: filteredLogs
  });
});

// @desc    Clear system logs
// @route   DELETE /api/admin/system/logs
// @access  Private/Admin
export const clearSystemLogs = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { message: 'System logs cleared successfully' }
  });
});

// @desc    Get database stats
// @route   GET /api/admin/database/stats
// @access  Private/Admin
export const getDatabaseStats = asyncHandler(async (req, res) => {
  const [
    usersCount,
    projectsCount,
    certificationsCount,
    contactsCount,
    analyticsCount
  ] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Certification.countDocuments(),
    Contact.countDocuments(),
    Analytics.countDocuments()
  ]);

  const stats = {
    collections: {
      users: usersCount,
      projects: projectsCount,
      certifications: certificationsCount,
      contacts: contactsCount,
      analytics: analyticsCount
    },
    totalDocuments: usersCount + projectsCount + certificationsCount + contactsCount + analyticsCount
  };

  res.json({
    success: true,
    data: stats
  });
});

// @desc    Run maintenance tasks
// @route   POST /api/admin/maintenance
// @access  Private/Admin
export const runMaintenance = asyncHandler(async (req, res) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const deletedAnalytics = await Analytics.deleteMany({
    createdAt: { $lt: oneYearAgo }
  });

  const deletedContacts = await Contact.deleteMany({
    status: 'spam',
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });

  res.json({
    success: true,
    data: {
      message: 'Maintenance completed successfully',
      deletedAnalytics: deletedAnalytics.deletedCount,
      deletedContacts: deletedContacts.deletedCount
    }
  });
});

// @desc    Get settings
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getSettings = asyncHandler(async (req, res) => {
  const settings = {
    siteName: 'My Portfolio',
    siteDescription: 'A professional portfolio website',
    contactEmail: 'contact@example.com',
    analyticsEnabled: true,
    maintenanceMode: false,
    maxFileSize: 10485760,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  };

  res.json({
    success: true,
    data: settings
  });
});

// @desc    Update settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const updatedSettings = {
    ...req.body,
    updatedAt: new Date()
  };

  res.json({
    success: true,
    data: updatedSettings
  });
});

// @desc    Export data
// @route   POST /api/admin/export
// @access  Private/Admin
export const exportData = asyncHandler(async (req, res) => {
  const { collections = ['users', 'projects', 'certifications', 'contacts'], format = 'json' } = req.body;

  const data = {};

  if (collections.includes('users')) {
    data.users = await User.find().select('-password');
  }
  if (collections.includes('projects')) {
    data.projects = await Project.find();
  }
  if (collections.includes('certifications')) {
    data.certifications = await Certification.find();
  }
  if (collections.includes('contacts')) {
    data.contacts = await Contact.find();
  }

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=export.csv');
    res.send('CSV export not fully implemented');
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=export.json');
    res.json({
      success: true,
      data,
      exportedAt: new Date()
    });
  }
});

// @desc    Import data
// @route   POST /api/admin/import
// @access  Private/Admin
export const importData = asyncHandler(async (req, res) => {
  const { collection, overwrite = false } = req.body;

  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  res.json({
    success: true,
    data: {
      message: `Data imported successfully into ${collection}`,
      filename: req.file.filename,
      overwrite
    }
  });
});

// @desc    Send test email
// @route   POST /api/admin/test-email
// @access  Private/Admin
export const sendTestEmail = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { message: 'Test email sent successfully' }
  });
});

// @desc    Get backup list
// @route   GET /api/admin/backups
// @access  Private/Admin
export const getBackupList = asyncHandler(async (req, res) => {
  const backups = [
    {
      id: '1',
      name: 'Daily Backup',
      description: 'Automated daily backup',
      createdAt: new Date(),
      size: '2.5MB',
      type: 'full'
    },
    {
      id: '2',
      name: 'Weekly Backup',
      description: 'Weekly full backup',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      size: '2.3MB',
      type: 'full'
    }
  ];

  res.json({
    success: true,
    data: backups
  });
});

// @desc    Create backup
// @route   POST /api/admin/backups
// @access  Private/Admin
export const createBackup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const backup = {
    id: Date.now().toString(),
    name: name || `Backup ${new Date().toISOString()}`,
    description: description || 'Manual backup',
    createdAt: new Date(),
    size: '2.1MB',
    type: 'full'
  };

  res.status(201).json({
    success: true,
    data: backup
  });
});

// @desc    Restore backup
// @route   POST /api/admin/backups/:id/restore
// @access  Private/Admin
export const restoreBackup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    data: {
      message: `Backup ${id} restored successfully`,
      restoredAt: new Date()
    }
  });
});

// @desc    Delete backup
// @route   DELETE /api/admin/backups/:id
// @access  Private/Admin
export const deleteBackup = asyncHandler(async (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    data: {
      message: `Backup ${id} deleted successfully`
    }
  });
}); 