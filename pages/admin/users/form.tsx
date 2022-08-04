import { FormControl, Box, TextField, Button } from '@mui/material';

interface UserFormProps {
  handleSubmit: () => void;
  handleChange: (arg: any) => void;
  touched: { username: boolean | undefined; password: boolean | undefined };
  values: { username: string | undefined; password: string | undefined };
  errors: { username: string; password: string };
  submitText: string;
}

function UserForm({
  handleSubmit,
  handleChange,
  touched,
  values,
  errors,
  submitText,
}: UserFormProps) {
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id='username'
          label='Username'
          name='username'
          variant='standard'
          error={!!errors.username && touched.username}
          helperText={touched.username && errors.username}
          onChange={handleChange}
          value={values.username}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id='password'
          label='Password'
          name='password'
          type='password'
          variant='standard'
          error={!!errors.password && touched.password}
          helperText={touched.password && errors.password}
          onChange={handleChange}
          value={values.password}
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
          {submitText}
        </Button>
      </Box>
    </Box>
  );
}

export default UserForm;
