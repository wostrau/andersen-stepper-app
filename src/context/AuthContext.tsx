import React, { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from './AuthContext.model';

export const AuthContext = createContext<AuthContextType>({
  authData: { email: '', password: '' },
  updateAuthData: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const updateAuthData = (newEmail: string, newPassword: string) => {
    setAuthData({ email: newEmail, password: newPassword });
  };

  const contextValue = { authData, updateAuthData };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
