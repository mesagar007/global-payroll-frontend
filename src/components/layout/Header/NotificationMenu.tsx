import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Badge,
  Avatar,
  Button,
  Divider,
  styled,
} from '@mui/material';
import {
  Notifications,
  CheckCircle,
  Warning,
  Info,
  Error,
  MarkEmailRead,
} from '@mui/icons-material';

interface NotificationMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: theme.spacing(1),
    minWidth: 360,
    maxWidth: 400,
    maxHeight: 500,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const NotificationItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5),
  alignItems: 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const NotificationContent = styled(Box)({
  flex: 1,
  marginLeft: 12,
});

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Payroll Processed Successfully',
    message: 'December 2024 payroll has been processed for 25 employees',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Approval Required',
    message: 'UAE overtime formula needs approval before next payroll',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Employee Added',
    message: 'Ahmed Al-Rashid has been added to the system',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'error',
    title: 'Formula Validation Failed',
    message: 'Housing allowance formula contains syntax errors',
    time: '1 day ago',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle color="success" />;
    case 'warning':
      return <Warning color="warning" />;
    case 'error':
      return <Error color="error" />;
    case 'info':
    default:
      return <Info color="info" />;
  }
};

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    // Implement mark all as read logic
    console.log('Mark all as read');
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <NotificationHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <Notifications />
          <Typography variant="h6">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Badge badgeContent={unreadCount} color="error" />
          )}
        </Box>
        <Button
          size="small"
          startIcon={<MarkEmailRead />}
          onClick={handleMarkAllAsRead}
        >
          Mark all read
        </Button>
      </NotificationHeader>

      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            onClick={onClose}
            sx={{
              backgroundColor: notification.read ? 'transparent' : 'action.hover',
              opacity: notification.read ? 0.7 : 1,
            }}
          >
            <ListItemIcon sx={{ mt: 0.5 }}>
              {getNotificationIcon(notification.type)}
            </ListItemIcon>
            <NotificationContent>
              <Typography variant="subtitle2" fontWeight="bold">
                {notification.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </NotificationContent>
          </NotificationItem>
        ))}
      </Box>

      <Divider />

      <Box p={2} textAlign="center">
        <Button variant="text" fullWidth>
          View All Notifications
        </Button>
      </Box>
    </StyledMenu>
  );
};

export default NotificationMenu;