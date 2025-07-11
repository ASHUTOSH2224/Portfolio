# Portfolio Backend API

A comprehensive Node.js backend for managing portfolio website with admin dashboard, analytics, dynamic content management, and contact form handling.

## Features

- 🔐 **Authentication & Authorization** - JWT-based admin authentication
- 📧 **Contact Management** - Handle contact form submissions with spam detection
- 🎨 **Dynamic Content** - Manage projects and certifications dynamically
- 📊 **Analytics** - Track website traffic, resume downloads, and user behavior
- 🛡️ **Security** - Rate limiting, input validation, and security headers
- 📁 **File Upload** - Handle image and document uploads
- 🔧 **Admin Panel** - Complete admin dashboard for content management
- 🚀 **Performance** - Optimized queries and caching strategies

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Upload**: Multer with local storage
- **Validation**: Express-validator
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Morgan for HTTP request logging

## Quick Start

### 1. Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 2. Installation

```bash
# Clone and navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.template .env

# Edit .env with your configuration
nano .env
```

### 3. Environment Setup

Fill in your `.env` file with the required values:

```bash
# Minimum required configuration
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your-long-random-secret-key
ADMIN_EMAIL=admin@yourportfolio.com
ADMIN_PASSWORD=YourSecurePassword123!
FRONTEND_URL=http://localhost:5173
```

### 4. Database Setup

```bash
# Create admin user (run once)
node utils/seedAdmin.js

# Or import it and run
npm run seed-admin
```

### 5. Start Development Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000` (or your configured PORT).

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new admin user | Public |
| POST | `/auth/login` | Login admin user | Public |
| POST | `/auth/logout` | Logout user | Public |
| GET | `/auth/me` | Get current user info | Private |
| PUT | `/auth/update-password` | Update password | Private |

### Contact Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/contact/submit` | Submit contact form | Public |
| GET | `/contact` | Get all contacts | Admin |
| GET | `/contact/:id` | Get single contact | Admin |
| PATCH | `/contact/:id/status` | Update contact status | Admin |
| POST | `/contact/:id/respond` | Add response to contact | Admin |

### Projects Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/projects` | Get all projects | Public |
| GET | `/projects/featured` | Get featured projects | Public |
| GET | `/projects/:id` | Get single project | Public |
| POST | `/projects` | Create new project | Admin |
| PUT | `/projects/:id` | Update project | Admin |
| DELETE | `/projects/:id` | Delete project | Admin |

### Certifications Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/certifications` | Get all certifications | Public |
| GET | `/certifications/active` | Get active certifications | Public |
| GET | `/certifications/:id` | Get single certification | Public |
| POST | `/certifications` | Create new certification | Admin |
| PUT | `/certifications/:id` | Update certification | Admin |
| DELETE | `/certifications/:id` | Delete certification | Admin |

### Analytics

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/analytics/pageview` | Track page view | Public |
| POST | `/analytics/event` | Track event | Public |
| POST | `/analytics/conversion` | Track conversion | Public |
| GET | `/analytics/dashboard` | Get analytics dashboard | Admin |
| GET | `/analytics/resume-downloads` | Get resume download stats | Admin |

### Admin Panel

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/admin/dashboard` | Get admin dashboard stats | Admin |
| GET | `/admin/users` | Get all users | Admin |
| POST | `/admin/users` | Create new user | Admin |
| GET | `/admin/system/info` | Get system information | Admin |

## Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: 'admin' | 'user',
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date
}
```

### Project
```javascript
{
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  category: String,
  liveUrl: String,
  githubUrl: String,
  image: String,
  featured: Boolean,
  status: 'active' | 'inactive' | 'in-progress' | 'completed',
  viewCount: Number,
  createdBy: ObjectId,
  createdAt: Date
}
```

### Certification
```javascript
{
  title: String,
  issuer: String,
  issueDate: Date,
  expirationDate: Date,
  credentialId: String,
  verifyUrl: String,
  description: String,
  skills: [String],
  category: String,
  provider: String,
  isActive: Boolean,
  priority: Number,
  createdBy: ObjectId,
  createdAt: Date
}
```

### Contact
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  category: String,
  priority: 'Low' | 'Medium' | 'High' | 'Urgent',
  status: 'New' | 'Read' | 'In Progress' | 'Responded' | 'Closed',
  isSpam: Boolean,
  responses: [Object],
  notes: [Object],
  createdAt: Date
}
```

## File Upload

The API supports file uploads for:
- Project images
- Certification badges/certificates
- User avatars

**Supported formats**: JPEG, PNG, GIF, WebP, PDF
**Max file size**: 5MB for images, 10MB for documents

Upload endpoints automatically handle file validation and storage.

## Security Features

- **Rate Limiting**: 100 requests per 15-minute window per IP
- **Input Validation**: All inputs validated and sanitized
- **Authentication**: JWT tokens with secure headers
- **Password Security**: Bcrypt hashing with salt rounds
- **Account Locking**: Temporary lock after failed login attempts
- **CORS Protection**: Configured for frontend domain only
- **Security Headers**: Helmet.js for security headers

## Analytics Tracking

The backend automatically tracks:
- Page views and session duration
- User interactions and events
- Conversion tracking (contact forms, downloads)
- Device and location statistics
- Traffic sources and referrers

### Resume Download Tracking

To track resume downloads, send a POST request to `/api/analytics/event`:

```javascript
{
  "sessionId": "user_session_id",
  "type": "resume_download",
  "element": "resume_button",
  "value": "resume.pdf"
}
```

## Error Handling

The API uses consistent error response format:

```javascript
{
  "success": false,
  "error": "Error message",
  "details": "Additional details" // Optional
}
```

## Development

### Project Structure
```
backend/
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── utils/            # Utility functions
├── uploads/          # File uploads storage
├── server.js         # Main server file
└── package.json
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Database Seeding
```bash
# Seed admin user
npm run seed-admin

# Seed sample data (optional)
npm run seed-data
```

## Deployment

### Environment Variables for Production
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=very-long-random-production-secret
FRONTEND_URL=https://yourportfolio.com
```

### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "portfolio-backend"

# Monitor
pm2 status
pm2 logs portfolio-backend
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Maintenance

### Database Backup
```bash
# Manual backup
mongodump --uri="mongodb://localhost:27017/portfolio_db" --out=backup/

# Restore
mongorestore --uri="mongodb://localhost:27017/portfolio_db" backup/portfolio_db/
```

### Log Rotation
Configure log rotation in production to prevent disk space issues.

### File Cleanup
The system includes automatic cleanup of orphaned files. Configure cleanup schedule in production.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB service is running
   - Verify connection string in .env
   - Check network connectivity

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure admin user exists

3. **File Upload Problems**
   - Check upload directory permissions
   - Verify file size limits
   - Check allowed file types

4. **Rate Limiting**
   - Increase limits in production
   - Configure Redis for distributed limiting

### Debug Mode
```bash
DEBUG=* npm run dev
```

## API Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|---------|
| Authentication | 5 requests | 15 minutes |
| Contact Form | 3 requests | 15 minutes |
| General API | 100 requests | 15 minutes |
| File Upload | 10 requests | 15 minutes |

## Support

For issues and questions:
1. Check this documentation
2. Review error logs
3. Check environment configuration
4. Verify database connectivity

## License

This project is part of the Portfolio Admin System. 