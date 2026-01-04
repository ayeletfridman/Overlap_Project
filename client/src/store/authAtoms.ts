import { atom } from 'recoil';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: 'admin' | 'user';
}

export const authState = atom<{ user: User | null; token: string | null }>({
  key: 'authState',
  default: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  },
});