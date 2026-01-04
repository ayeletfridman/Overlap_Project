import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server'; 
import Country from '../models/Country'; 

describe('DELETE /api/countries/:id', () => {
  
  beforeAll(async () => {
    const url = process.env.MONGO_URI || 'mongodb://127.0.0.1/test_db';
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should delete an existing country and confirm it is gone from DB', async () => {
    const tempCountry = await Country.create({
      name: 'DeleteMe',
      flag: 'http://test.com/flag.png',
      population: 500,
      region: 'TestRegion'
    });

    const res = await request(app).delete(`/api/countries/${tempCountry._id}`);

    expect(res.statusCode).toEqual(200);

    const deletedCountry = await Country.findById(tempCountry._id);
    expect(deletedCountry).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/countries/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });
});