import api from './apiClient';

export const createPermissionRequest = async (requestData: { requestedPermission: string; reason: string }) => {
  const { data } = await api.post('/permissions', requestData);
  return data;
};

export const getMyPermissionHistory = async () => {
  const { data } = await api.get('/permissions/my-history');
  return data;
};

export const getAllAdminRequests = async () => {
  const { data } = await api.get('/permissions/admin/all');
  return data;
};

export const updateRequestStatus = async (id: string, status: 'approved' | 'rejected', adminNotes?: string) => {
  const { data } = await api.put(`/permissions/${id}/status`, { status, adminNotes });
  return data;
};