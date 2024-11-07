require('dotenv').config();
import express, { json } from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import driverRoutes from './routes/driverRoutes';

const app = express();
connectDB();
app.use(json());

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
