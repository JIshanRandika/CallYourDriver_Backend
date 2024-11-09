import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  availableDays: { type: [String], required: true }, // Array of weekdays (e.g., ['Monday', 'Wednesday', 'Friday'])
  availabilityStartTime: { type: String, required: true }, // e.g., "08:00"
  availabilityEndTime: { type: String, required: true }, // e.g., "18:00"
  currentAvailability: { type: Boolean, default: false }, // Whether the driver is currently available
  category: { type: String, required: true },
  parkName: { type: String, required: true },
  points: { type: Number, default: 0 }, // Driver points
  dailySuggestions: { type: Number, default: 0 }, // Track suggestions per day
  totalSuggestions: { type: Number, default: 0 }, // Track total suggestions for each driver
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
