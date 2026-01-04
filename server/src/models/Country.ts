import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  flag: string;
  population: number;
  region: string;
}

const CountrySchema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  population: { type: Number, required: true },
  region: { type: String, required: true },
});

export default mongoose.model<ICountry>('Country', CountrySchema);