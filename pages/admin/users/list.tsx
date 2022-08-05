import * as React from 'react';
import Link from 'next/link';
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

import { User } from '../../../types';
import { getUsers, deleteUser } from '../../../services/api';

function UserList() {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  function handleDelete(id: string = '') {
    confirmAlert({
      title: 'Are you sure to delete this user?',
      buttons: [
        {
          label: 'OK',
          onClick: () => {
            deleteUser(id)
              .then((res) => {
                toast.success('Successfully deleted!');
                getUsers().then((res) => {
                  setUsers(res.data);
                });
              })
              .catch((res) => {
                toast.error(res?.response?.data?.message);
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
        <Link href='/admin/users/create'>
          <Button color='secondary' variant='contained'>
            Create New!
          </Button>
        </Link>
      </div>
      <Table sx={{ minWidth: '700px', mt: 5 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index: number) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Link href={`users/${user.id}`}>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDelete(user.id)}
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

export default UserList;
