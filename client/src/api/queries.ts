import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/authAtoms';
import api from './apiClient';
import { registerUser } from './countryApi';

import { 
  fetchCountries, 
  deleteCountry, 
  resetCountries, 
  updateCountry, 
  createCountry 
} from './countryApi';
import { MESSAGES } from '../utils/constant';

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};

export const useCountryMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCountry(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['countries'], (oldData: any[] | undefined) => {
        return oldData ? oldData.filter((c) => c.id != deletedId) : [];
      });
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      toast.success(MESSAGES.DELETE_SUCCESS);
    },
    onError: () => toast.error(MESSAGES.DELETE_ERROR)
  });

  const seedMutation = useMutation({
    mutationFn: resetCountries,
    onSuccess: (newData) => {
      if (newData) queryClient.setQueryData(['countries'], newData);
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      toast.success(MESSAGES.SEED_SUCCESS);
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, values }: { id?: string, values: any }) => {
      return id ? updateCountry(id, values) : createCountry(values);
    },
    onSuccess: (data, variables) => {
      if (variables.id) {
        queryClient.setQueryData(['countries'], (oldData: any) => 
          oldData?.map((c: any) => (c.id === variables.id ? data : c))
        );
        toast.success(MESSAGES.UPDATE_SUCCESS);
      } else {
        queryClient.setQueryData(['countries'], (oldData: any) => 
          oldData ? [...oldData, data] : [data]
        );
        toast.success(MESSAGES.CREATE_SUCCESS);
      }
      navigate('/');
    },
    onError: () => toast.error(MESSAGES.SAVE_ERROR)
  });

  const handleDelete = (id: string) => {
    if (window.confirm(MESSAGES.DELETE_CONFIRM)) {
      deleteMutation.mutate(id);
    }
  };

  return { 
    handleDelete, 
    seedMutation, 
    saveMutation,
    isDeleting: deleteMutation.isPending,
    isSaving: saveMutation.isPending 
  };
};

export const useAuthMutations = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: any) => api.post('/auth/login', credentials),
    onSuccess: (res) => {
      const { token, user } = res.data;
      
      setAuth({ token, user });
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success(`שלום, ${user.firstName}!`);
      navigate('/'); 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'שגיאה בהתחברות');
    }
  });

  return { loginMutation };
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('נרשמת בהצלחה! כעת ניתן להתחבר');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'שגיאה בהרשמה');
    }
  });
};
