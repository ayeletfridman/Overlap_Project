import PermissionRequest from '../models/PermissionRequest';
import User from '../models/User';

export const createRequest = async (userId: string, requestedPermission: string, reason: string) => {
  return await PermissionRequest.create({ userId, requestedPermission, reason });
};

export const getRequests = async (filters: any = {}) => {
  return await PermissionRequest.find(filters).populate('userId', 'firstName lastName email');
};

export const updateRequestStatus = async (requestId: string, status: 'approved' | 'rejected', adminNotes?: string) => {
  const request = await PermissionRequest.findById(requestId);
  if (!request) throw new Error('הבקשה לא נמצאה');

  request.status = status;
  if (adminNotes) request.adminNotes = adminNotes;
  await request.save();

  if (status === 'approved') {
    const updateField = `permissions.${request.requestedPermission}`;
    await User.findByIdAndUpdate(request.userId, {
      $set: { [updateField]: true }
    });
  }

  return request;
};