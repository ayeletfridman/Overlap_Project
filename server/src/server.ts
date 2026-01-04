import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import countryRoutes from './routes/countryRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRoutes);

app.use(errorHandler);

export default app;