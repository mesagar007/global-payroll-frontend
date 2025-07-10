import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  People,
  AttachMoney,
  Assessment,
  Schedule,
  TrendingUp,
  Assignment,
  CheckCircle,
  Error,
  Warning,
  Info,
  ArrowForward,
  Refresh,
  Download,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { StatusChip } from '@/components/common';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getUserDisplayName = (user: any) => {
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    return 'User';
  };

  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      icon: People,
      color: 'primary',
      trend: 'up',
    },
    {
      title: 'Monthly Payroll',
      value: 'AED 3.2M',
      change: '+5.2%',
      icon: AttachMoney,
      color: 'success',
      trend: 'up',
    },
    {
      title: 'Processing Time',
      value: '2.3 hrs',
      change: '-15%',
      icon: Schedule,
      color: 'warning',
      trend: 'down',
    },
    {
      title: 'Success Rate',
      value: '99.8%',
      change: '+0.2%',
      icon: Assessment,
      color: 'info',
      trend: 'up',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'success',
      title: 'Payroll Processing Complete',
      description: 'February 2025 payroll processed successfully for 247 employees',
      time: '2 hours ago',
      icon: CheckCircle,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Employee Added',
      description: 'John Doe has been added to Engineering department',
      time: '4 hours ago',
      icon: Info,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Document Expiry Alert',
      description: '5 employee visas will expire in the next 30 days',
      time: '1 day ago',
      icon: Warning,
    },
    {
      id: 4,
      type: 'error',
      title: 'GPSSA Submission Failed',
      description: 'January GPSSA report submission failed due to network error',
      time: '2 days ago',
      icon: Error,
    },
  ];

  const quickActions = [
    {
      title: 'Process Payroll',
      description: 'Run payroll for current period',
      icon: AttachMoney,
      color: 'primary',
      action: () => navigate('/payroll'),
    },
    {
      title: 'Add Employee',
      description: 'Add new employee to system',
      icon: People,
      color: 'secondary',
      action: () => navigate('/employees/add'),
    },
    {
      title: 'Generate Report',
      description: 'Create payroll reports',
      icon: Assessment,
      color: 'info',
      action: () => navigate('/reports'),
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Assignment,
      color: 'warning',
      action: () => navigate('/settings'),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome back, {getUserDisplayName(user)}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your payroll system today.
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <TrendingUp
                        fontSize="small"
                        color={stat.trend === 'up' ? 'success' : 'error'}
                        sx={{
                          transform: stat.trend === 'down' ? 'rotate(180deg)' : 'none',
                        }}
                      />
                      <Typography
                        variant="body2"
                        color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                      >
                        {stat.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: `${stat.color}.main`,
                      color: 'white',
                      width: 56,
                      height: 56,
                    }}
                  >
                    <stat.icon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={action.action}>
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              backgroundColor: `${action.color}.main`,
                              color: 'white',
                              width: 40,
                              height: 40,
                            }}
                          >
                            <action.icon fontSize="small" />
                          </Avatar>
                          <Box flex={1}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {action.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {action.description}
                            </Typography>
                          </Box>
                          <ArrowForward fontSize="small" color="action" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activities
              </Typography>
              <List dense>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: `${activity.type}.main`,
                            color: 'white',
                          }}
                        >
                          <activity.icon fontSize="small" />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" fontWeight="medium">
                            {activity.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;