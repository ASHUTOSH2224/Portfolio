import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import certificationRoutes from './routes/certifications.js';
import contactRoutes from './routes/contact.js';
import analyticsRoutes from './routes/analytics.js';
import adminRoutes from './routes/admin.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Higher limit for development
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development' // Skip rate limiting in development
});

// Security middleware
app.use(helmet());
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// MongoDB Connection with retry logic
const connectDB = async (retries = 5, timeout = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to MongoDB Atlas');
      return;
    } catch (err) {
      if (i === retries - 1) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
      }
      console.log(`Connection attempt ${i + 1} failed. Retrying in ${timeout/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }
};

// Connect to MongoDB
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 MongoDB: ${process.env.MONGODB_URI}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app; 