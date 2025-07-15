import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db');
    console.log('Connected to MongoDB');

    // Check all existing users
    const existingUsers = await User.find({});
    if (existingUsers.length > 0) {
      console.log('\nExisting users in database:');
      existingUsers.forEach(user => {
        console.log(`- ${user.email} (${user.role})`);
      });
      
      const existingAdmin = existingUsers.find(user => user.role === 'admin');
      if (existingAdmin) {
        console.log('\nAdmin user already exists:', existingAdmin.email);
        process.exit(0);
      }
    } else {
      console.log('No existing users found in database.');
    }

    // Create admin user
    const adminData = {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      role: 'admin',
      isActive: true
    };

    const admin = await User.create(adminData);
    console.log('\nAdmin user created successfully:');
    console.log('Email:', admin.email);
    console.log('Password:', adminData.password);
    console.log('Role:', admin.role);
    console.log('ID:', admin._id);

    console.log('\n⚠️  IMPORTANT: Change the default password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

// Check if this script is being run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedAdmin();
}

export default seedAdmin; 