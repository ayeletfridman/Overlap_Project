import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '../../store/authAtoms';
import api from '../apiClient'; 
import { toast } from 'react-hot-toast';
import type {  LoginResponse, LoginCredentials, ApiError } from '../../types/user.types';
import type { AxiosResponse } from 'axios';

export const useAuthMutations = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const loginMutation = useMutation<AxiosResponse<LoginResponse>, ApiError, LoginCredentials>({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (res) => {
      const { token, user } = res.data;
      
      setAuth({ token, user });
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success(`שלום, ${user.firstName}!`);
      navigate('/'); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'שגיאה בהתחברות');
    }
  });

  const registerMutation = useMutation<AxiosResponse<any>, ApiError, FormData>({
    mutationFn: (userData) => api.post('/auth/register', userData),
    onSuccess: () => {
      toast.success('נרשמת בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'שגיאה בהרשמה');
    }
  });

  return { 
    loginMutation, 
    registerMutation, 
  };
};