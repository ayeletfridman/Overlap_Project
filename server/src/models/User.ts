import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

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
    canDelete: { type: Boolean, default: false },
    canReset: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
resetPasswordToken: String,
resetPasswordExpire: Date

});

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken; 
};
export default mongoose.model('User', UserSchema);