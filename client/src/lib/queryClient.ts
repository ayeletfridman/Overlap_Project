import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError: true, 
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error: any) => {
        const msg = error.response?.data?.message || 'שגיאה בביצוע הפעולה';
        toast.error(msg);
      },
    },
  },
});