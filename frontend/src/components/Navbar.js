import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const drawerWidth = 240;

  const navItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/', protected: true },
    { text: 'Expenses', icon: <ReceiptIcon />, path: '/expenses', protected: true },
    { text: 'Login', icon: <LoginIcon />, path: '/login', protected: false },
    { text: 'Register', icon: <HowToRegIcon />, path: '/register', protected: false },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Expense Tracker
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {navItems.map((item) => {
          if ((user && item.protected) || (!user && !item.protected)) {
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          }
          return null;
        })}
      </List>
      
      {user && (
        <>
          <Divider />
          <Box sx={{ p: 2, mt: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              Logged in as
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {user.name || user.email}
            </Typography>
            <ListItemButton 
              onClick={logout}
              sx={{ mt: 1, borderRadius: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default Navbar;