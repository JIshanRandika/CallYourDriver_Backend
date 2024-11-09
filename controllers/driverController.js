import Driver from '../models/Driver.js';

// Create a new driver
export const createDriver = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      vehicleNumber,
      availableDays,
      availabilityStartTime,
      availabilityEndTime,
      currentAvailability,
      category,
      parkName,
      points
    } = req.body;

    const driver = new Driver({
      name,
      contactNumber,
      vehicleNumber,
      availableDays,
      availabilityStartTime,
      availabilityEndTime,
      currentAvailability,
      category,
      parkName,
      points
    });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single driver by ID
export const getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
export const updateDriver = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      vehicleNumber: req.body.vehicleNumber,
      availableDays: req.body.availableDays,
      availabilityStartTime: req.body.availabilityStartTime,
      availabilityEndTime: req.body.availabilityEndTime,
      currentAvailability: req.body.currentAvailability,
      category: req.body.category,
      parkName: req.body.parkName,
      points: req.body.points
    };

    const driver = await Driver.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver by ID
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
