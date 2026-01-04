import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import countryRoutes from './routes/countryRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

export default app;

