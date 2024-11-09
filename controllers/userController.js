import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { name, username, password, contactNumber } = req.body;
    
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, username, password: hashedPassword, contactNumber });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export const suggestDriver = async (req, res) => {
  const { category, parkName } = req.body;
  const currentTime = moment();

  try {
    let drivers = await Driver.find({
      category,
      parkName,
      currentAvailability: true,
      points: { $gte: 10 },
    });

    drivers = drivers.filter(driver => {
      const startTime = moment(driver.availabilityStartTime, 'HH:mm');
      const endTime = moment(driver.availabilityEndTime, 'HH:mm');
      return currentTime.isBetween(startTime, endTime);
    });

    if (drivers.length === 0) {
      return res.status(404).json({ message: 'No drivers available matching criteria' });
    }

    // Sort by dailySuggestions to ensure fair daily distribution
    drivers.sort((a, b) => a.dailySuggestions - b.dailySuggestions);

    // Select driver with the fewest daily suggestions
    const selectedDriver = drivers[0];
    selectedDriver.points -= 10;  // Deduct points
    selectedDriver.dailySuggestions += 1;  // Increment daily count
    selectedDriver.totalSuggestions += 1;  // Increment total count

    await selectedDriver.save();

    return res.json({
      message: 'Driver suggested successfully',
      driver: {
        name: selectedDriver.name,
        contactNumber: selectedDriver.contactNumber,
        vehicleNumber: selectedDriver.vehicleNumber,
      },
    });
  } catch (error) {
    console.error('Error suggesting driver:', error);
    res.status(500).json({ message: 'Server error suggesting driver' });
  }
};
