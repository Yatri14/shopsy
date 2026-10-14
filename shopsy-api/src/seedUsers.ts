import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const seedUsers = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsy';

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected for seeding users');

    const usersToSeed = [
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'iamadmin2026',
        role: 'admin',
        isVerified: true,
      },
      {
        name: 'Customer User',
        email: 'customer@gmail.com',
        password: 'customer123',
        role: 'customer',
        isVerified: true,
      },
      {
        name: 'Seller User',
        email: 'seller@gmail.com',
        password: 'seller123',
        role: 'seller',
        isVerified: true,
      },
    ];

    for (const userData of usersToSeed) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        existingUser.name = userData.name;
        existingUser.password = hashedPassword;
        existingUser.role = userData.role as 'admin' | 'customer' | 'seller';
        existingUser.isVerified = true;
        await existingUser.save();
        console.log(`Updated existing user: ${userData.email} (${userData.role})`);
      } else {
        await User.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          isVerified: true,
        });
        console.log(`Created new user: ${userData.email} (${userData.role})`);
      }
    }

    console.log('================================');
    console.log('DEMO USERS CREATED / UPDATED SUCCESSFULLY:');
    console.log('1. Admin:    admin@gmail.com    / iamadmin2026');
    console.log('2. Customer: customer@gmail.com / customer123');
    console.log('3. Seller:   seller@gmail.com   / seller123');
    console.log('================================');

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Failed to seed users:', error);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  }
};

seedUsers();
