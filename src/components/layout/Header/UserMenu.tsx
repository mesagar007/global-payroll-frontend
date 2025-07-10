import React from 'react';
import {
  Menu,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person,
  Settings,
  Logout,
  Business,
  Help,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/login');
  };

  const handleProfile = () => {
    onClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    onClose();
    navigate('/settings');
  };

  const getUserInitials = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user?.name) {
      const nameParts = user.name.split(' ');
      return nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0][0];
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getDisplayName = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || user?.email || 'User';
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 8,
        sx: {
          width: 280,
          maxWidth: '100%',
          mt: 1,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={user?.avatar}
            sx={{ width: 48, height: 48 }}
          >
            {getUserInitials(user)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {getDisplayName(user)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.organization?.name || 'ABC Company LLC'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Business fontSize="small" />
        </ListItemIcon>
        <ListItemText>Organization</ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Help fontSize="small" />
        </ListItemIcon>
        <ListItemText>Help & Support</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;