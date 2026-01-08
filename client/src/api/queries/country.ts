import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { Country, CountryFormValues } from '../../types/country.types';
import type { ApiError } from '../../types/user.types';

import { 
  fetchCountries, 
  deleteCountry, 
  resetCountries, 
  updateCountry, 
  createCountry 
} from '../countryApi';
import { MESSAGES } from '../../utils/constant';

export const useCountries = () => {
  return useQuery<Country[], ApiError>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};

export const useCountryMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation<void, ApiError, string>({
   mutationFn: async (id) => {
    await deleteCountry(id);
  },
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Country[]>(['countries'], (oldData) => {
        return oldData ? oldData.filter((c) => c._id !== deletedId) : [];
      });
      toast.success(MESSAGES.DELETE_SUCCESS);
    },
    onError: () => toast.error(MESSAGES.DELETE_ERROR)
  });
const seedMutation = useMutation({
  mutationFn: resetCountries,
  onSuccess: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['countries'] });
    queryClient.removeQueries({ queryKey: ['countries'] });
    queryClient.setQueryData(['countries'], newData);
    queryClient.invalidateQueries({ queryKey: ['countries'] });

    toast.success(MESSAGES.SEED_SUCCESS);
  },
});
  const saveMutation = useMutation<Country, ApiError, { id?: string, values: CountryFormValues }>({
    mutationFn: async ({ id, values }) => {
      return id ? updateCountry(id, values) : createCountry(values);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Country[]>(['countries'], (oldData) => {
        if (variables.id) {
          return oldData?.map((c) => (c._id === variables.id ? data : c));
        }
        return oldData ? [...oldData, data] : [data];
      });
      
      toast.success(variables.id ? MESSAGES.UPDATE_SUCCESS : MESSAGES.CREATE_SUCCESS);
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