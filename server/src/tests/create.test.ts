import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';

describe('POST /api/countries', () => {
  
  beforeAll(async () => {
    const url = process.env.MONGO_URI || 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.model('Country').deleteMany({ region: 'TestRegion' });
    await mongoose.connection.close();
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/countries')
      .send({ name: 'Invalid Country' });

    expect(res.statusCode).toEqual(400);
  });

  it('should create a new country successfully when data is valid', async () => {
    const newCountry = {
      name: 'Testland',
      flag: 'http://test.com/test.png',
      population: 1000,
      region: 'TestRegion'
    };

    const res = await request(app)
      .post('/api/countries')
      .send(newCountry);

    expect(res.statusCode).toEqual(201); 
    expect(res.body.name).toEqual('Testland');
  });
});