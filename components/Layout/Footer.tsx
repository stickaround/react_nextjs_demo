import {
  Box,
  CssBaseline,
  BottomNavigation,
  Paper,
  Typography,
} from '@mui/material';

function Footer() {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1976d2',
          padding: '10px',
          borderRadius: 0,
        }}
        elevation={3}
      >
        <Typography sx={{ textAlign: 'center', color: 'white' }}>
          Made by Tony Cronus, 2022
        </Typography>
      </Paper>
    </Box>
  );
}

export default Footer;
