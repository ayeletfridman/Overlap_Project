import mongoose, { Schema } from 'mongoose';

const PermissionRequestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedPermission: { 
    type: String, 
    enum: ['canAdd', 'canEdit', 'canDelete', 'canReset'], 
    required: true 
  },
  reason: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  adminNotes: { type: String }, 
}, { timestamps: true });

export default mongoose.model('PermissionRequest', PermissionRequestSchema);