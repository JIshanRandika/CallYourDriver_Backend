import cron from 'node-cron';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Driver from './models/Driver.js';

// Load environment variables
dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Define the cron job to reset dailySuggestions at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await Driver.updateMany({}, { dailySuggestions: 0 });
    console.log('Daily suggestions reset to 0 for all drivers');
  } catch (error) {
    console.error('Error resetting daily suggestions:', error);
  }
});

export default cron;
