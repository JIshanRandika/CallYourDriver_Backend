import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Driver from './models/Driver.js';

dotenv.config();


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  const users = [
    {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
    },
    {
      username: 'user1',
      password: await bcrypt.hash('user123', 10),
    },
  ];
  await User.deleteMany();
  await User.insertMany(users);
  console.log('Users seeded');
};

// Seed Drivers
const seedDrivers = async () => {
  const drivers = [
    {
      name: 'John Doe',
      contactNumber: '1234567890',
      vehicleNumber: 'ABC123',
    },
    {
      name: 'Jane Smith',
      contactNumber: '0987654321',
      vehicleNumber: 'XYZ789',
    },
  ];
  await Driver.deleteMany();
  await Driver.insertMany(drivers);
  console.log('Drivers seeded');
};

// Run seed functions and disconnect
const seedData = async () => {
  await connectDB();
  await seedUsers();
  await seedDrivers();
  mongoose.disconnect();
  console.log('Seeding complete and MongoDB disconnected');
};

seedData().catch((error) => {
  console.error('Seeding error:', error.message);
  mongoose.disconnect();
});
