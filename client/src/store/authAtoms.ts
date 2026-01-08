import { atom } from 'recoil';
import type { User } from '../types/user.types';

export const authState = atom<{ user: User | null; token: string | null }>({
  key: 'AuthState',
  default: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  },
});