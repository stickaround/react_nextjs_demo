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
import { login, setBearerHeader } from '../services/api';

function Login() {
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
        const { data } = await login(values);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setBearerHeader(window);
        router.push('/posts');
        toast.success('Successfully registered!');
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 500, m: '100px' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{ textAlign: 'center' }}
          >
            LOGIN
          </Typography>
          <Box component='form' onSubmit={userData.handleSubmit}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id='username'
                label='Username'
                name='username'
                variant='standard'
                error={!!userData.errors.username && userData.touched.username}
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
                error={!!userData.errors.password && userData.touched.password}
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
                Login
              </Button>
              <Link href='/register'>
                <Button size='small' color='info' variant='contained'>
                  Register
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
