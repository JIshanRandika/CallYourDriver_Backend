import { Schema, model } from 'mongoose';
const driverSchema = new Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true }
});
export default model('Driver', driverSchema);
