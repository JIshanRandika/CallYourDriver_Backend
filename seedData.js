// seedUserData.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const Driver = require("./models/Driver");

dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define initial user data
const users = [
  { name:"Ishan", contactNumber:"0715757700", username: "ishan", password: "1998" }
];

// Define initial driver data
const drivers = [
  { name: "John Doe", vehicleNumber: "AB-1234", contactNumber: "555-1234", category: "Car", vehiclePark: "Central", isAvailable: true },
  { name: "Jane Smith", vehicleNumber: "CD-5678", contactNumber: "555-5678", category: "Mini car", vehiclePark: "North", isAvailable: true },
  { name: "Mike Brown", vehicleNumber: "EF-9101", contactNumber: "555-9101", category: "Van", vehiclePark: "East", isAvailable: true },
  { name: "Emily Davis", vehicleNumber: "GH-2345", contactNumber: "555-2345", category: "ThreeWheel", vehiclePark: "West", isAvailable: true },
  { name: "Chris Wilson", vehicleNumber: "IJ-6789", contactNumber: "555-6789", category: "Bike", vehiclePark: "South", isAvailable: true },
];

// Seed function to insert users
const seedData = async () => {
  try {
     // Clear existing users and drivers
     await User.deleteMany();
     await Driver.deleteMany();

    // Hash passwords and create user entries
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        name: user.name,
        contactNumber: user.contactNumber,
        username: user.username,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users into the database
    await User.insertMany(hashedUsers);
    console.log("Users have been seeded successfully");

    // Insert drivers into the database
    await Driver.insertMany(drivers);
    console.log("Drivers have been seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error);
    mongoose.connection.close();
  }
};

seedData();
