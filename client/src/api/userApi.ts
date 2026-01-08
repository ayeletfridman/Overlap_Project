import api from './apiClient';
import type { User, LoginResponse, LoginCredentials } from '../types/user.types';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (formData: FormData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

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
export const adminUpdateUser = async (
  userId: string, 
  updateData: { 
    permissions: User['permissions'], // שימוש בטייפ הקיים של ההרשאות מתוך User
    role: User['role']                // וידוא שה-role הוא רק 'admin' או 'user'
  }
): Promise<User> => {
  const { data } = await api.put<User>(`/auth/admin-update/${userId}`, updateData);
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

export const forgotPassword = async (email: string) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

export const resetPassword = async (token: string, password: string) => {
  const { data } = await api.put(`/auth/reset-password/${token}`, { password });
  return data;
};

export const getEmailByUsername = async (username: string) => {
  const { data } = await api.get(`/auth/get-email/${username}`);
  return data; 
};