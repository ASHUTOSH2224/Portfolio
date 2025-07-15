#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log('🚀 Portfolio Backend Setup\n');

const setup = async () => {
  try {
    // Check if .env exists
    const envPath = path.join(__dirname, '../.env');
    const envTemplatePath = path.join(__dirname, '../.env.template');
    
    if (!fs.existsSync(envPath)) {
      console.log('📝 Creating .env file...');
      
      // Create basic .env content
      const envContent = `# Portfolio Backend Environment Configuration
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio_db
MONGODB_TEST_URI=mongodb://localhost:27017/portfolio_test_db

# JWT Configuration
JWT_SECRET=${generateRandomSecret()}
JWT_EXPIRES_IN=7d

# Admin Configuration
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin123!

# Email Configuration (optional - for contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
UPLOAD_MAX_SIZE=5242880
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Analytics Configuration
ANALYTICS_ENABLED=true
TRACK_IP_ADDRESSES=false
`;

      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file created with default values');
    } else {
      console.log('ℹ️  .env file already exists');
    }

    // Create upload directories
    console.log('📁 Creating upload directories...');
    const uploadDirs = [
      'uploads',
      'uploads/projects',
      'uploads/certifications',
      'uploads/users',
      'uploads/general'
    ];

    uploadDirs.forEach(dir => {
      const dirPath = path.join(__dirname, '../', dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`   Created: ${dir}/`);
      }
    });

    // Create logs directory
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
      console.log('   Created: logs/');
    }

    console.log('✅ Directories created successfully\n');

    // Interactive setup
    console.log('🔧 Let\'s configure your admin account:\n');
    
    const adminEmail = await question('Admin Email (admin@portfolio.com): ') || 'admin@portfolio.com';
    const adminPassword = await question('Admin Password (Admin123!): ') || 'Admin123!';
    const mongoUri = await question('MongoDB URI (mongodb://localhost:27017/portfolio_db): ') || 'mongodb://localhost:27017/portfolio_db';
    const frontendUrl = await question('Frontend URL (http://localhost:5173): ') || 'http://localhost:5173';

    // Update .env file
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/ADMIN_EMAIL=.*/, `ADMIN_EMAIL=${adminEmail}`);
    envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${adminPassword}`);
    envContent = envContent.replace(/MONGODB_URI=.*/, `MONGODB_URI=${mongoUri}`);
    envContent = envContent.replace(/FRONTEND_URL=.*/, `FRONTEND_URL=${frontendUrl}`);

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Configuration updated!');
    
    // Offer to install dependencies
    const installDeps = await question('\n📦 Install dependencies now? (y/N): ');
    if (installDeps.toLowerCase() === 'y' || installDeps.toLowerCase() === 'yes') {
      console.log('Installing dependencies...');
      const { spawn } = await import('child_process');
      
      const npmInstall = spawn('npm', ['install'], {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });

      npmInstall.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Dependencies installed successfully!');
          showNextSteps();
        } else {
          console.log('❌ Failed to install dependencies. Please run "npm install" manually.');
          showNextSteps();
        }
      });
    } else {
      showNextSteps();
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
};

const generateRandomSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const showNextSteps = () => {
  console.log('\n🎉 Setup completed! Next steps:');
  console.log('');
  console.log('1. Make sure MongoDB is running:');
  console.log('   mongod --dbpath /your/db/path');
  console.log('');
  console.log('2. Install dependencies (if not done):');
  console.log('   npm install');
  console.log('');
  console.log('3. Create admin user:');
  console.log('   node utils/seedAdmin.js');
  console.log('');
  console.log('4. Start development server:');
  console.log('   npm run dev');
  console.log('');
  console.log('5. Test the API:');
  console.log('   curl http://localhost:5000/api/health');
  console.log('');
  console.log('📚 Check README.md for detailed documentation');
  console.log('');
};

setup(); 