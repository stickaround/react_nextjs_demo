import * as React from 'react';
import { useRouter } from 'next/router';
import { Container, Card, CardContent, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toast';

import { createUser } from '../../../services/api';
import UserForm from './form';

function PostCreate() {
  const router = useRouter();

  const payload = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input username!'),
      password: Yup.string().required('Input password!'),
    }),
    onSubmit: (values) => {
      createUser({
        username: values.username ?? '',
        password: values.password ?? '',
      })
        .then((res) => {
          toast.success('Successfully updated!');
          router.push('/admin/users');
        })
        .catch((res) => {
          toast.error(res?.response?.data?.message);
        });
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
            Create User
          </Typography>
          <UserForm
            handleChange={payload.handleChange}
            handleSubmit={payload.handleSubmit}
            errors={{
              username: payload.errors.username ?? '',
              password: payload.errors.password ?? '',
            }}
            touched={{
              username: payload.touched.username,
              password: payload.touched.password,
            }}
            values={payload.values}
            submitText='Create'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostCreate;
