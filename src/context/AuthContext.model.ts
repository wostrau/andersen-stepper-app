import { ReactNode } from 'react';

export type AuthDataType = {
  email: string;
  password: string;
};

export type AuthContextType = {
  authData: AuthDataType;
  updateAuthData: (newEmail: string, newPassword: string) => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
