import request from 'supertest';
import app from '../server'; 
import mongoose from 'mongoose';

describe('Country API', () => {
  
  beforeAll(async () => {
    const url = process.env.MONGO_URI || 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it(' should get all countries', async () => {
    const res = await request(app).get('/api/countries');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});