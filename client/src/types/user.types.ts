export interface User {
  _id: string; 
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;
  role: 'admin' | 'user';
  email: string;
  permissions: {
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canReset: boolean;
  };
  createdAt: string | Date;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;

  };
}