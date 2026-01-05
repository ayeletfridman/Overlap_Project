import { atom } from 'recoil';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string;
  role: 'admin' | 'user';
  email: string;
  permissions: {
      canAdd: { type: Boolean, default: false },
      canEdit: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false },
      canReset: boolean;
    },
  createdAt: Date;
}

export const authState = atom<{ user: User | null; token: string | null }>({
  key: 'authState',
  default: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  },
});