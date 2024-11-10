import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import parkRoutes from './routes/parkRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cronJob from './resetDailySuggestions.js';  // Import the cron job file

dotenv.config();
const app = express();

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/parks', parkRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;  // This is important for Vercel

