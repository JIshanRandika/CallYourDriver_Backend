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
  { name: 'SUSL Main Gate' },
  { name: 'Y Junction' },
  { name: 'Police Junction' },
  { name: 'Pambahina Junction' },
];

// Sample category data
const categories = [
  { name: 'Threewheel 🛺' },
  { name: 'Bike 🛵' },
  // { name: 'Mini Car 🚙', isDisabled: true },
  // { name: 'Car 🚗', isDisabled: true },
  // { name: 'Mini Van 🚌', isDisabled: true },
  // { name: 'Van 🚐', isDisabled: true },
  // { name: 'Mini Lorry 🚛', isDisabled: true },
  // { name: 'Lorry 🚚', isDisabled: true },
];

// Sample driver data
const drivers = [
  //Gate
  {
    name: 'Saman Kumara',
    contactNumber: '+94713080188',
    vehicleNumber: 'ABI 6916',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '08:30',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Amaashi Gamage',
    contactNumber: '+94702035656',
    vehicleNumber: 'QP 5714',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availabilityStartTime: '07:30',
    availabilityEndTime: '20:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  //Y Junction
  {
    name: 'Upul',
    contactNumber: '+94713234405',
    vehicleNumber: 'YU 3295',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '08:00',
    availabilityEndTime: '18:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Rupananda',
    contactNumber: '+94789630741',
    vehicleNumber: 'ABU4228',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '22:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Y Junction',
    points: 10000,
  },

  //Police Junction
  {
    name: 'Mangala',
    contactNumber: '+94771461003',
    vehicleNumber: 'ABD 4710',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Ranji',
    contactNumber: '+94711111709',
    vehicleNumber: 'ABD 9061',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Wasana',
    contactNumber: '+94771455248',
    vehicleNumber: 'QL 9855',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Police Junction',
    points: 10000,
  },

  //Pambahinna
  {
    name: 'Priyantha',
    contactNumber: '+94775561971',
    vehicleNumber: 'QM 4468',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Pambahina Junction',
    points: 10000,
  },
  {
    name: 'Abeywikrama',
    contactNumber: '+94712007064',
    vehicleNumber: '-----',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Pambahina Junction',
    points: 10000,
  },
  {
    name: 'Anil',
    contactNumber: '+94702935355',
    vehicleNumber: '-----',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '06:00',
    availabilityEndTime: '21:00',
    currentAvailability: true,
    category: 'Threewheel 🛺',
    parkName: 'Pambahina Junction',
    points: 10000,
  },

  ////////Bike/////////
  //Ishan
  {
    name: 'Ishan',
    contactNumber: '+94715757700',
    vehicleNumber: 'BJG 9866',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Ishan',
    contactNumber: '+94715757700',
    vehicleNumber: 'BJG 9866',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Ishan',
    contactNumber: '+94715757700',
    vehicleNumber: 'BJG 9866',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Ishan',
    contactNumber: '+94715757700',
    vehicleNumber: 'BJG 9866',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Pambahina Junction',
    points: 10000,
  },

  //Pubudu
  {
    name: 'Pubudu',
    contactNumber: '+94787216991',
    vehicleNumber: 'MN 9439',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Pubudu',
    contactNumber: '+94787216991',
    vehicleNumber: 'MN 9439',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Pubudu',
    contactNumber: '+94787216991',
    vehicleNumber: 'MN 9439',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Pubudu',
    contactNumber: '+94787216991',
    vehicleNumber: 'MN 9439',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Pambahina Junction',
    points: 10000,
  },

  //Nipun
  {
    name: 'Nipun',
    contactNumber: '+94776977126',
    vehicleNumber: 'JX 6239',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Nipun',
    contactNumber: '+94776977126',
    vehicleNumber: 'JX 6239',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Nipun',
    contactNumber: '+94776977126',
    vehicleNumber: 'JX 6239',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Nipun',
    contactNumber: '+94776977126',
    vehicleNumber: 'JX 6239',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Pambahina Junction',
    points: 10000,
  },

  //Yasantha
  {
    name: 'Yasantha',
    contactNumber: '+94774825133',
    vehicleNumber: 'UJ 4800',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Yasantha',
    contactNumber: '+94774825133',
    vehicleNumber: 'UJ 4800',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Yasantha',
    contactNumber: '+94774825133',
    vehicleNumber: 'UJ 4800',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Yasantha',
    contactNumber: '+94774825133',
    vehicleNumber: 'UJ 4800',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Pambahina Junction',
    points: 10000,
  },
  //Lahiru
  {
    name: 'Lahiru',
    contactNumber: '+94716796141',
    vehicleNumber: 'TC 3495',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'SUSL Main Gate',
    points: 10000,
  },
  {
    name: 'Lahiru',
    contactNumber: '+94716796141',
    vehicleNumber: 'TC 3495',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Y Junction',
    points: 10000,
  },
  {
    name: 'Lahiru',
    contactNumber: '+94716796141',
    vehicleNumber: 'TC 3495',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Police Junction',
    points: 10000,
  },
  {
    name: 'Lahiru',
    contactNumber: '+94716796141',
    vehicleNumber: 'TC 3495',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    availabilityStartTime: '05:30',
    availabilityEndTime: '23:00',
    currentAvailability: true,
    category: 'Bike 🛵',
    parkName: 'Pambahina Junction',
    points: 10000,
  },

];

// Sample user data with password hashing
// const users = [
//   {
//     name: 'Ishan',
//     username: 'Ishan',
//     password: '1998',
//     contactNumber: '1112223333',
//   },
//   {
//     name: 'Randika',
//     username: 'randika',
//     password: '1998',
//     contactNumber: '4445556666',
//   },
// ];

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
    // await User.deleteMany();
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
    // const hashedUsers = await hashPasswords();
    // await User.insertMany(hashedUsers);
    // console.log('User data seeded');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seed function
seedData();
