import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Container,
  Card,
  CardContent,
  FormControl,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toast';

import { useAuthProvider } from '../contexts/auth/AuthProvider';
import { register } from '../services/api';
import Layout from '../components/Layout';

function Register() {
  const router = useRouter();
  const { setToken, setUser } = useAuthProvider();

  const userData = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input Username!'),
      password: Yup.string().required('Input Password!'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await register(values);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Successfully registered!');
        router.push('/posts');
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <Layout>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: 500, m: '100px' }}>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{ textAlign: 'center' }}
            >
              REGISTER
            </Typography>
            <Box component='form' onSubmit={userData.handleSubmit}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id='username'
                  label='Username'
                  name='username'
                  variant='standard'
                  error={
                    !!userData.errors.username && userData.touched.username
                  }
                  helperText={
                    userData.touched.username && userData.errors.username
                  }
                  onChange={userData.handleChange}
                  value={userData.values.username}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id='password'
                  label='Password'
                  variant='standard'
                  name='password'
                  type='password'
                  error={
                    !!userData.errors.password && userData.touched.password
                  }
                  helperText={
                    userData.touched.password && userData.errors.password
                  }
                  onChange={userData.handleChange}
                  value={userData.values.password}
                />
              </FormControl>
              <Box
                component='div'
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
              >
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  type='submit'
                  sx={{ mr: 1 }}
                >
                  Register
                </Button>
                <Link href='/login'>
                  <Button size='small' color='info' variant='contained'>
                    Login
                  </Button>
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}

export default Register;
