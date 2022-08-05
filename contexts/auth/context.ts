import * as React from 'react';

import { User } from '../../types';

export const AuthContext = React.createContext<
  | {
      user: User | null;
      token: string;
      setUser: (user: User | null) => void;
      setToken: (token: string) => void;
    }
  | undefined
>(undefined);
