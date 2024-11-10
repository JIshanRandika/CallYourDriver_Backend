import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isDisabled: { type: Boolean, default: false },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;