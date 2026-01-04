import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  name: string;
  countryId: mongoose.Types.ObjectId; // הקישור למדינה
}

const CitySchema = new Schema({
  name: { type: String, required: true },
  countryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Country', // מקשר למודל המדינות
    required: true 
  },
}, { timestamps: true });

export default mongoose.model<ICity>('City', CitySchema);