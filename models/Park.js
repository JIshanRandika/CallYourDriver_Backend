import mongoose from 'mongoose';

const parkSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Park = mongoose.model('Park', parkSchema);
export default Park;