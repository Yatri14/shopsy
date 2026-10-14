import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const createAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');

    const name = 'Admin Test';
    const email = 'admin@gmail.com';
    const password = 'iamadmin2026';

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);

      await mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });

    console.log('================================');
    console.log('ADMIN CREATED SUCCESSFULLY');
    console.log('================================');
    console.log('Name:', admin.name);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Verified:', admin.isVerified);
    console.log('Password:', password);
    console.log('================================');

    await mongoose.disconnect();

    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Failed to create admin:', error);

    try {
      await mongoose.disconnect();
    } catch {}

    process.exit(1);
  }
};

createAdmin();