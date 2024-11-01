import { Schema, model } from "mongoose"; // Use import for controllers

const Driver = new Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  category: { type: String, required: true },
  vehiclePark: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

export default Driver; // This is the default export


