import { FormControl, Box, TextField, Button } from '@mui/material';

interface PostFormProps {
  handleSubmit: () => void;
  handleChange: (arg: any) => void;
  touched: { title: boolean | undefined; content: boolean | undefined };
  values: { title: string | undefined; content: string | undefined };
  errors: { title: string; content: string };
  submitText: string;
}

function PostForm({
  handleSubmit,
  handleChange,
  touched,
  values,
  errors,
  submitText,
}: PostFormProps) {
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id='title'
          label='Title'
          name='title'
          variant='standard'
          error={!!errors.title && touched.title}
          helperText={touched.title && errors.title}
          onChange={handleChange}
          value={values.title}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id='content'
          label='Content'
          variant='standard'
          name='content'
          error={!!errors.content && touched.content}
          helperText={touched.content && errors.content}
          onChange={handleChange}
          value={values.content}
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

export default PostForm;
