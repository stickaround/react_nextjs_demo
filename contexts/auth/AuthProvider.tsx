import * as React from 'react';
import { AuthContext } from './context';
import { User } from './types';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState('');

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Auth context must be used in Auth Context Provider!');
  }
  return context;
}
