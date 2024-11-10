import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import Driver from './models/Driver.js';
import User from './models/User.js';

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample driver data
const drivers = [
  {
    name: 'John Doe',
    contactNumber: '1234567890',
    vehicleNumber: 'AB1234',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availabilityStartTime: '08:00',
    availabilityEndTime: '18:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Park A',
    points: 100,
  },
  {
    name: 'Jane Smith',
    contactNumber: '0987654321',
    vehicleNumber: 'CD5678',
    availableDays: ['Tuesday', 'Thursday', 'Sunday'],
    availabilityStartTime: '07:00',
    availabilityEndTime: '17:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Park A',
    points: 100,
  },
];

// Sample user data with password hashing
const users = [
  {
    name: 'Ishan',
    username: 'ishan',
    password: '1998',
    contactNumber: '1112223333',
  },
  {
    name: 'Randika',
    username: 'randika',
    password: '1998',
    contactNumber: '4445556666',
  },
];

// Hash passwords for user data
const hashPasswords = async () => {
  return Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return user;
    })
  );
};

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Driver.deleteMany();
    await User.deleteMany();

    console.log('Existing data cleared');

    // Insert drivers
    await Driver.insertMany(drivers);
    console.log('Driver data seeded');

    // Hash passwords and insert users
    const hashedUsers = await hashPasswords();
    await User.insertMany(hashedUsers);
    console.log('User data seeded');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seed function
seedData();
