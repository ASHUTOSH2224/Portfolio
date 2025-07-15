import Certification from '../models/Certification.js';
import { validationResult } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { PaginationHelper } from '../utils/paginationHelper.js';

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = asyncHandler(async (req, res) => {
  const pagination = new PaginationHelper(req.query);
  const { page, limit, skip } = pagination.getPagination();

  const filter = {};
  
  // Build filter based on query parameters
  if (req.query.category) filter.category = req.query.category;
  if (req.query.provider) filter.provider = req.query.provider;
  if (req.query.difficulty) filter.difficulty = req.query.difficulty;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { issuer: { $regex: req.query.search, $options: 'i' } },
      { skills: { $in: [new RegExp(req.query.search, 'i')] } }
    ];
  }

  // Build sort
  const sortBy = req.query.sortBy || 'priority';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortOrder };

  const certifications = await Certification.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email');

  const total = await Certification.countDocuments(filter);

  // Get stats
  const stats = {
    total: await Certification.countDocuments(),
    active: await Certification.countDocuments({ isActive: true }),
    expired: await Certification.countDocuments({ 
      expirationDate: { $lt: new Date() },
      isActive: true 
    }),
    categories: await Certification.distinct('category').then(cats => cats.length)
  };

  res.json({
    success: true,
    data: {
      certifications,
      stats,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    }
  });
});

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Public
export const getCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id)
    .populate('createdBy', 'name email');
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  res.json({
    success: true,
    data: certification
  });
});

// @desc    Create new certification
// @route   POST /api/certifications
// @access  Private/Admin
export const createCertification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const certificationData = {
    ...req.body,
    createdBy: req.user.id
  };

  // Handle file uploads
  if (req.files) {
    if (req.files.certificateImage) {
      certificationData.certificateImage = req.files.certificateImage[0].path;
    }
    if (req.files.badgeImage) {
      certificationData.badgeImage = req.files.badgeImage[0].path;
    }
  }

  const certification = await Certification.create(certificationData);

  res.status(201).json({
    success: true,
    data: certification
  });
});

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
export const updateCertification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const certification = await Certification.findById(req.params.id);
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  const updateData = { ...req.body };

  // Handle file uploads
  if (req.files) {
    if (req.files.certificateImage) {
      updateData.certificateImage = req.files.certificateImage[0].path;
    }
    if (req.files.badgeImage) {
      updateData.badgeImage = req.files.badgeImage[0].path;
    }
  }

  const updatedCertification = await Certification.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: updatedCertification
  });
});

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
export const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  await certification.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Increment certification views
// @route   POST /api/certifications/:id/view
// @access  Public
export const incrementViews = asyncHandler(async (req, res) => {
  const certification = await Certification.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  );
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  res.json({
    success: true,
    data: { viewCount: certification.viewCount }
  });
});

// @desc    Increment certification verifications
// @route   POST /api/certifications/:id/verify
// @access  Public
export const incrementVerifications = asyncHandler(async (req, res) => {
  const certification = await Certification.findByIdAndUpdate(
    req.params.id,
    { $inc: { verificationCount: 1 } },
    { new: true }
  );
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  res.json({
    success: true,
    data: { verificationCount: certification.verificationCount }
  });
});

// @desc    Search certifications
// @route   GET /api/certifications/search
// @access  Public
export const searchCertifications = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    throw new AppError('Search query is required', 400);
  }

  const certifications = await Certification.find({
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { issuer: { $regex: q, $options: 'i' } },
      { skills: { $in: [new RegExp(q, 'i')] } },
      { category: { $regex: q, $options: 'i' } }
    ]
  })
  .sort({ priority: 1, createdAt: -1 })
  .limit(10)
  .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: certifications
  });
});

// @desc    Get certifications by category
// @route   GET /api/certifications/category/:category
// @access  Public
export const getCertificationsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const certifications = await Certification.find({ category })
    .sort({ priority: 1, createdAt: -1 })
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: certifications
  });
});

// @desc    Get certifications by provider
// @route   GET /api/certifications/provider/:provider
// @access  Public
export const getCertificationsByProvider = asyncHandler(async (req, res) => {
  const { provider } = req.params;
  
  const certifications = await Certification.find({ provider })
    .sort({ priority: 1, createdAt: -1 })
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: certifications
  });
});

// @desc    Get active certifications
// @route   GET /api/certifications/active
// @access  Public
export const getActiveCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find({ isActive: true })
    .sort({ priority: 1, createdAt: -1 })
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: certifications
  });
});

// @desc    Toggle certification active status
// @route   PATCH /api/certifications/:id/toggle
// @access  Private/Admin
export const toggleActive = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  
  if (!certification) {
    throw new AppError('Certification not found', 404);
  }

  certification.isActive = !certification.isActive;
  await certification.save();

  res.json({
    success: true,
    data: certification
  });
});

// @desc    Bulk update certifications
// @route   PATCH /api/certifications/bulk
// @access  Private/Admin
export const bulkUpdateCertifications = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { certificationIds, action } = req.body;

  let updateData = {};
  
  switch (action) {
    case 'delete':
      await Certification.deleteMany({ _id: { $in: certificationIds } });
      break;
    case 'activate':
      updateData = { isActive: true };
      break;
    case 'deactivate':
      updateData = { isActive: false };
      break;
    case 'checkExpiration':
      // Check and deactivate expired certifications
      await Certification.updateMany(
        { 
          _id: { $in: certificationIds },
          expirationDate: { $lt: new Date() }
        },
        { isActive: false }
      );
      break;
    default:
      throw new AppError('Invalid action', 400);
  }

  if (action !== 'delete' && action !== 'checkExpiration') {
    await Certification.updateMany(
      { _id: { $in: certificationIds } },
      updateData
    );
  }

  res.json({
    success: true,
    data: { affected: certificationIds.length }
  });
}); 