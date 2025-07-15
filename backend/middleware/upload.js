import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Create upload directories
const uploadDirs = {
  projects: 'uploads/projects',
  certifications: 'uploads/certifications',
  users: 'uploads/users',
  general: 'uploads/general'
};

Object.values(uploadDirs).forEach(ensureDirectoryExists);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadDirs.general;
    
    // Determine upload path based on route
    if (req.route && req.route.path) {
      const route = req.route.path;
      if (route.includes('projects') || route.includes('project')) {
        uploadPath = uploadDirs.projects;
      } else if (route.includes('certifications') || route.includes('certification')) {
        uploadPath = uploadDirs.certifications;
      } else if (route.includes('users') || route.includes('user')) {
        uploadPath = uploadDirs.users;
      }
    }
    
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    
    const filename = `${sanitizedBaseName}_${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];
  
  const allowedDocumentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/json'
  ];
  
  const allowedTypes = [...allowedImageTypes, ...allowedDocumentTypes];
  
  // Check if file type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(`File type ${file.mimetype} is not allowed`);
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

// File size limits (in bytes)
const fileSizeLimits = {
  image: 5 * 1024 * 1024, // 5MB for images
  document: 10 * 1024 * 1024, // 10MB for documents
  default: 5 * 1024 * 1024 // 5MB default
};

// Get file size limit based on mimetype
const getFileSizeLimit = (mimetype) => {
  if (mimetype.startsWith('image/')) {
    return fileSizeLimits.image;
  } else if (mimetype === 'application/pdf' || 
             mimetype.includes('document') || 
             mimetype === 'text/plain' ||
             mimetype === 'application/json') {
    return fileSizeLimits.document;
  }
  return fileSizeLimits.default;
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: Math.max(...Object.values(fileSizeLimits)), // Use the largest limit
    files: 10, // Maximum 10 files per request
    fields: 50 // Maximum 50 non-file fields
  }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          error: 'File too large',
          details: `Maximum file size is ${Math.max(...Object.values(fileSizeLimits)) / (1024 * 1024)}MB`
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          error: 'Too many files',
          details: 'Maximum 10 files allowed per request'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          error: 'Unexpected file field',
          details: error.message
        });
      default:
        return res.status(400).json({
          success: false,
          error: 'File upload error',
          details: error.message
        });
    }
  } else if (error.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      error: 'Invalid file type',
      details: error.message
    });
  }
  
  next(error);
};

// Helper function to delete uploaded files
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Helper function to delete multiple files
const deleteFiles = (filePaths) => {
  const results = [];
  filePaths.forEach(filePath => {
    results.push(deleteFile(filePath));
  });
  return results;
};

// Helper function to move uploaded file
const moveFile = (oldPath, newPath) => {
  try {
    ensureDirectoryExists(path.dirname(newPath));
    fs.renameSync(oldPath, newPath);
    return true;
  } catch (error) {
    console.error('Error moving file:', error);
    return false;
  }
};

// Helper function to get file info
const getFileInfo = (file) => {
  if (!file) return null;
  
  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
    destination: file.destination,
    url: `/uploads/${path.relative('uploads', file.path).replace(/\\/g, '/')}` // Ensure forward slashes for URLs
  };
};

// Helper function to get multiple file info
const getFilesInfo = (files) => {
  if (!files) return [];
  
  if (Array.isArray(files)) {
    return files.map(getFileInfo);
  }
  
  // Handle multer's fields format
  const result = {};
  Object.keys(files).forEach(fieldName => {
    if (Array.isArray(files[fieldName])) {
      result[fieldName] = files[fieldName].map(getFileInfo);
    } else {
      result[fieldName] = getFileInfo(files[fieldName]);
    }
  });
  
  return result;
};

// Validate image dimensions (optional middleware)
const validateImageDimensions = (minWidth = 100, minHeight = 100, maxWidth = 2000, maxHeight = 2000) => {
  return async (req, res, next) => {
    try {
      // This would require sharp or similar image processing library
      // For now, we'll skip dimension validation
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Cleanup orphaned files (utility function)
const cleanupOrphanedFiles = async (maxAge = 24 * 60 * 60 * 1000) => { // 24 hours default
  try {
    const now = Date.now();
    
    Object.values(uploadDirs).forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(filePath);
          
          if (now - stats.mtime.getTime() > maxAge) {
            deleteFile(filePath);
            console.log(`Cleaned up orphaned file: ${filePath}`);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error during file cleanup:', error);
  }
};

export {
  upload,
  handleMulterError,
  deleteFile,
  deleteFiles,
  moveFile,
  getFileInfo,
  getFilesInfo,
  validateImageDimensions,
  cleanupOrphanedFiles,
  uploadDirs
}; 