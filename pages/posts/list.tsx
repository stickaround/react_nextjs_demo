import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import { toast } from 'react-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Post } from '../../types';
import { getPosts, deletePost } from '../../services/api';

function PostList() {
  const router = useRouter();
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    getPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  function handleDelete(id: string = '') {
    confirmAlert({
      title: 'Are you sure to delete this post?',
      buttons: [
        {
          label: 'OK',
          onClick: () => {
            deletePost(id).then((res) => {
              toast.success('Successfully deleted!');
              getPosts().then((res) => {
                setPosts(res.data);
              });
            });
          },
        },
        {
          label: 'Cancel',
        },
      ],
    });
  }

  return (
    <Container component={Paper} sx={{ m: 5 }}>
      <div style={{ textAlign: 'right' }}>
        <Link href='/posts/create'>
          <Button color='secondary' variant='contained'>
            Create New!
          </Button>
        </Link>
      </div>
      <Table sx={{ minWidth: '700px', mt: 5 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((item, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>
                <Link href={`posts/${item.id}`}>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default PostList;
