import * as React from 'react';
import { useRouter } from 'next/router';
import { Container, Card, CardContent, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toast';

import { createPost } from '../../services/api';
import PostForm from './form';

function PostCreate() {
  const router = useRouter();

  const payload = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Input title!'),
      content: Yup.string().required('Input content!'),
    }),
    onSubmit: (values) => {
      createPost({
        title: values.title ?? '',
        content: values.content ?? '',
      }).then((res) => {
        toast.success('Successfully updated!');
        router.push('/posts');
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
            Create POST
          </Typography>
          <PostForm
            handleChange={payload.handleChange}
            handleSubmit={payload.handleSubmit}
            errors={{
              title: payload.errors.title ?? '',
              content: payload.errors.content ?? '',
            }}
            touched={{
              title: payload.touched.title,
              content: payload.touched.content,
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
