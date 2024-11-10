import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import Driver from './models/Driver.js';
import User from './models/User.js';
import Park from './models/Park.js';
import Category from './models/Category.js';

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

// Sample park data
const parks = [
  { name: 'Park A' },
  { name: 'Park B' },
  { name: 'Park C' },
];

// Sample category data
const categories = [
  { name: 'Threewheel 🛺' },
  { name: 'Bike 🛵' },
  { name: 'Mini Car 🚙', isDisabled: true },
  { name: 'Car 🚗', isDisabled: true },
  { name: 'Mini Van 🚌', isDisabled: true },
  { name: 'Van 🚐', isDisabled: true },
  { name: 'Mini Lorry 🚛', isDisabled: true },
  { name: 'Lorry 🚚', isDisabled: true },
];

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
    await Park.deleteMany();
    await Category.deleteMany();

    console.log('Existing data cleared');

    // Insert parks
    await Park.insertMany(parks);
    console.log('Park data seeded');

    // Insert categories
    await Category.insertMany(categories);
    console.log('Category data seeded');

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
