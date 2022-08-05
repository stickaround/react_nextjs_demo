import * as React from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toast';

import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/auth/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position='top-right' delay={2000} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
