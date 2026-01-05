import api from './apiClient';

export const updateProfile = async (formData: FormData) => {
  const { data } = await api.put('/auth/update-me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get('/auth/all');
  return data;
};

export const adminUpdateUser = async (userId: string, updateData: { permissions: any, role: string }) => {
  const { data } = await api.put(`/auth/admin-update/${userId}`, updateData);
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get(`/auth/${id}`);
  return data;
};

export const updateUserById = async (id: string, formData: FormData) => {
  const { data } = await api.put(`/auth/admin-update-full/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};