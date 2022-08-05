import * as React from 'react';
import { AuthContext } from './context';
import { User } from '../../types';
import { setBearerHeader, getProfile } from '../../services/api';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    getProfile().then((res) => {
      setUser(res.data);
    });

    setBearerHeader(window);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      user,
      token,
      setUser,
      setToken,
    }),
    [user, token, setUser, setToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthProvider() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Auth context must be used in Auth Context Provider!');
  }

  return context;
}
