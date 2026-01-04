import app from './server';
import dotenv from 'dotenv';
import {fetchAndStoreCountries} from './services/countryService';

dotenv.config();
const PORT = process.env.PORT ;
import { connectDB } from './config/db';
const start = async () => {
  try {
    await connectDB();
    await fetchAndStoreCountries();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();