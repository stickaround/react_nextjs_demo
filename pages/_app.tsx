import * as React from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toast';

import '../styles/globals.css';
import { AuthProvider } from '../contexts/auth/AuthProvider';
import { setBearerHeader } from '../services/api';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    setBearerHeader(window);
  }, []);
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position='top-right' delay={2000} />
    </AuthProvider>
  );
}

export default MyApp;
