import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, 
  profileImage: { type: String }, 
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  permissions: {
    canAdd: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);