import Project from '../models/Project.js';
import { validationResult } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { PaginationHelper } from '../utils/paginationHelper.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const pagination = new PaginationHelper(req.query);
  const { page, limit, skip } = pagination.getPagination();

  const filter = {};
  
  // Build filter based on query parameters
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured !== undefined) filter.featured = req.query.featured === 'true';
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { technologies: { $in: [new RegExp(req.query.search, 'i')] } }
    ];
  }

  // Build sort
  const sortBy = req.query.sortBy || 'sortOrder';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const sort = { [sortBy]: sortOrder };

  const projects = await Project.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email');

  const total = await Project.countDocuments(filter);

  // Get stats
  const stats = {
    total: await Project.countDocuments(),
    featured: await Project.countDocuments({ featured: true }),
    active: await Project.countDocuments({ status: 'active' }),
    inProgress: await Project.countDocuments({ status: 'in-progress' })
  };

  res.json({
    success: true,
    data: {
      projects,
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

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('createdBy', 'name email');
  
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  res.json({
    success: true,
    data: project
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const projectData = {
    ...req.body,
    createdBy: req.user.id
  };

  // Handle file uploads
  if (req.files) {
    if (req.files.image) {
      projectData.image = req.files.image[0].path;
    }
    if (req.files.images) {
      projectData.images = req.files.images.map(file => file.path);
    }
  }

  const project = await Project.create(projectData);

  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const project = await Project.findById(req.params.id);
  
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const updateData = { ...req.body };

  // Handle file uploads
  if (req.files) {
    if (req.files.image) {
      updateData.image = req.files.image[0].path;
    }
    if (req.files.images) {
      updateData.images = req.files.images.map(file => file.path);
    }
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: updatedProject
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  await project.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Toggle project featured status
// @route   PATCH /api/projects/:id/featured
// @access  Private/Admin
export const toggleFeatured = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  project.featured = !project.featured;
  await project.save();

  res.json({
    success: true,
    data: project
  });
});

// @desc    Increment project views
// @route   POST /api/projects/:id/view
// @access  Public
export const incrementViews = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  );
  
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  res.json({
    success: true,
    data: { viewCount: project.viewCount }
  });
});

// @desc    Search projects
// @route   GET /api/projects/search
// @access  Public
export const searchProjects = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    throw new AppError('Search query is required', 400);
  }

  const projects = await Project.find({
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { technologies: { $in: [new RegExp(q, 'i')] } },
      { category: { $regex: q, $options: 'i' } }
    ]
  })
  .sort({ viewCount: -1 })
  .limit(10)
  .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: projects
  });
});

// @desc    Get projects by category
// @route   GET /api/projects/category/:category
// @access  Public
export const getProjectsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const projects = await Project.find({ category })
    .sort({ sortOrder: 1, createdAt: -1 })
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: projects
  });
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ featured: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    data: projects
  });
});

// @desc    Bulk update projects
// @route   PATCH /api/projects/bulk
// @access  Private/Admin
export const bulkUpdateProjects = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Error', 400, errors.array());
  }

  const { projectIds, action } = req.body;

  let updateData = {};
  
  switch (action) {
    case 'delete':
      await Project.deleteMany({ _id: { $in: projectIds } });
      break;
    case 'activate':
      updateData = { status: 'active' };
      break;
    case 'deactivate':
      updateData = { status: 'inactive' };
      break;
    case 'feature':
      updateData = { featured: true };
      break;
    case 'unfeature':
      updateData = { featured: false };
      break;
    default:
      throw new AppError('Invalid action', 400);
  }

  if (action !== 'delete') {
    await Project.updateMany(
      { _id: { $in: projectIds } },
      updateData
    );
  }

  res.json({
    success: true,
    data: { affected: projectIds.length }
  });
}); 