import * as React from 'react';
import { useRouter } from 'next/router';
import { Container, Card, CardContent, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toast';

import { getPost, updatePost } from '../../services/api';
import PostForm from './form';
import { Post } from '../../types';

function PostUpdate() {
  const [post, setPost] = React.useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    getPost(id as string).then((res) => {
      setPost(res.data);
      payload.setValues({
        title: res.data.title,
        content: res.data.content,
      });
    });
  }, [router]);

  const payload = useFormik({
    initialValues: {
      title: post?.title,
      content: post?.content,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Input title!'),
      content: Yup.string().required('Input content!'),
    }),
    onSubmit: (values) => {
      updatePost(id as string, {
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
            UPDATE POST
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
            submitText='Update'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default PostUpdate;
