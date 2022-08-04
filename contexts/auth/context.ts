import * as React from 'react';

import { User } from '../../types';

export const AuthContext = React.createContext<{
  user: User | null;
  token: string;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}>({
  user: null,
  token: '',
  setUser: () => {},
  setToken: () => {},
});
