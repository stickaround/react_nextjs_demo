import * as React from 'react';
import { useRouter } from 'next/router';
import { Container, Card, CardContent, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toast';

import { getUser, updateUser } from '../../../services/api';
import PostForm from './form';
import { User } from '../../../types';

function PostUpdate() {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    getUser(id as string).then((res) => {
      setUser(res.data);
      payload.setValues({
        username: res.data.username,
        password: '',
      });
    });
  }, [router]);

  const payload = useFormik({
    initialValues: {
      username: user?.username,
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input username!'),
      password: Yup.string().required('Input password!'),
    }),
    onSubmit: (values) => {
      updateUser(id as string, {
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
            UPDATE POST
          </Typography>
          <PostForm
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
            submitText='Update'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostUpdate;
