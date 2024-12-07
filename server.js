import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import parkRoutes from './routes/parkRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cronJob from './resetDailySuggestions.js';

dotenv.config();
const app = express();

// Configure database
connectDB();

// Middleware for JSON parsing
app.use(express.json());

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://callyourdriver-ef3f0.web.app', 'https://callyourdriver.online']; // Add mobile app domains here
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/parks', parkRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for Vercel
export default app;
