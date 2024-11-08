import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true }
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
