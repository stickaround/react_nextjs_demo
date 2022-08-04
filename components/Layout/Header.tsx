import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const guestItems = [
  {
    label: 'Login',
    path: 'login',
  },
  {
    label: 'register',
    path: 'register',
  },
];

const userItems = [
  {
    label: 'Post',
    path: 'posts',
  },
];

const adminItems = [
  {
    label: 'User',
    path: 'users',
  },
  {
    label: 'Post',
    path: 'posts',
  },
];

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const mode = 'guest';

  const navItems =
    mode === 'guest'
      ? [...guestItems]
      : mode === 'admin'
      ? [...adminItems]
      : [...userItems];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setAnchorEl(null);
    router.push('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        POST MANAGEMENT
      </Typography>
      <Divider />
      <List>
        {guestItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.path}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' sx={{ zIndex: -1 }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            fontWeight={700}
            fontSize={25}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            POST MANAGEMENT
          </Typography>
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
          >
            {guestItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                style={{ textDecoration: 'none' }}
              >
                <Button key={item.label} sx={{ color: '#fff' }}>
                  {item.label}
                </Button>
              </Link>
            ))}
            {/* {(mode === 'user' || mode === 'admin') && (
              <div>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )} */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
