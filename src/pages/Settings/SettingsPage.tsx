import React, { useState } from 'react';
import { getValidStatus } from '@/utils/statusUtils';


import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Save,
  Business,
  Security,
  Notifications,
  IntegrationInstructions,
  Backup,
  People,
  Settings as SettingsIcon,
  Email,
  Phone,
  LocationOn,
  Language,
  Palette,
  Shield,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { StatusChip, ConfirmDialog } from '@/components/common';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.ae',
      role: 'HR Manager',
      status: 'ACTIVE',
      lastLogin: '2024-12-31T09:30:00Z',
      permissions: ['EMPLOYEE_CREATE', 'EMPLOYEE_UPDATE', 'PAYROLL_VIEW'],
    },
    {
      id: '2',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@company.ae',
      role: 'Payroll Specialist',
      status: 'ACTIVE',
      lastLogin: '2024-12-31T14:15:00Z',
      permissions: ['PAYROLL_PROCESS', 'PAYROLL_APPROVE', 'REPORT_GENERATE'],
    },
    {
      id: '3',
      name: 'Mohammed Al-Farisi',
      email: 'mohammed.farisi@company.ae',
      role: 'Finance Manager',
      status: 'ACTIVE',
      lastLogin: '2024-12-30T16:45:00Z',
      permissions: ['PAYROLL_APPROVE', 'REPORT_GENERATE', 'SETTINGS_UPDATE'],
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            System Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure system settings and manage users
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Backup />}
          >
            Backup System
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={saving || !hasPermission('SETTINGS_UPDATE')}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="Organization"
              icon={<Business />}
              iconPosition="start"
            />
            <Tab
              label="Users & Permissions"
              icon={<People />}
              iconPosition="start"
            />
            <Tab
              label="System Configuration"
              icon={<SettingsIcon />}
              iconPosition="start"
            />
            <Tab
              label="Security"
              icon={<Security />}
              iconPosition="start"
            />
            <Tab
              label="Notifications"
              icon={<Notifications />}
              iconPosition="start"
            />
            <Tab
              label="Integrations"
              icon={<IntegrationInstructions />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Organization Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  label="Company Name"
                  defaultValue="ABC Company LLC"
                />
                <TextField
                  fullWidth
                  label="Trade License Number"
                  defaultValue="DED-123456789"
                />
                <TextField
                  fullWidth
                  label="Tax Registration Number"
                  defaultValue="TRN-987654321"
                />
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  defaultValue="Dubai International Financial Centre, Dubai, UAE"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue="+971 4 123 4567"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  defaultValue="info@company.ae"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Payroll Settings
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControl fullWidth>
                  <InputLabel>Default Currency</InputLabel>
                  <Select label="Default Currency" defaultValue="AED">
                    <MenuItem value="AED">AED - UAE Dirham</MenuItem>
                    <MenuItem value="SAR">SAR - Saudi Riyal</MenuItem>
                    <MenuItem value="OMR">OMR - Omani Rial</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Pay Frequency</InputLabel>
                  <Select label="Pay Frequency" defaultValue="MONTHLY">
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                    <MenuItem value="BIWEEKLY">Bi-weekly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Payroll Cycle Start</InputLabel>
                  <Select label="Payroll Cycle Start" defaultValue="1">
                    <MenuItem value="1">1st of the month</MenuItem>
                    <MenuItem value="15">15th of the month</MenuItem>
                    <MenuItem value="LAST">Last day of the month</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Working Days per Week"
                  type="number"
                  defaultValue="5"
                />
                <TextField
                  fullWidth
                  label="Working Hours per Day"
                  type="number"
                  defaultValue="8"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-calculate overtime"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable gratuity calculation"
                />
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Users & Permissions Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
            <Typography variant="h6">
              System Users
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setUserDialogOpen(true)}
              disabled={!hasPermission('USER_CREATE')}
            >
              Add User
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="medium">
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                     <StatusChip status={getValidStatus(user.status)} showDot />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(user.lastLogin)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.permissions.length} permissions
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditUser(user)}
                          disabled={!hasPermission('USER_UPDATE')}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user)}
                          disabled={!hasPermission('USER_DELETE')}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* System Configuration Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Regional Settings
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControl fullWidth>
                  <InputLabel>Default Language</InputLabel>
                  <Select label="Default Language" defaultValue="en">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="ar">Arabic</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Time Zone</InputLabel>
                  <Select label="Time Zone" defaultValue="Asia/Dubai">
                    <MenuItem value="Asia/Dubai">Asia/Dubai (UTC+4)</MenuItem>
                    <MenuItem value="Asia/Riyadh">Asia/Riyadh (UTC+3)</MenuItem>
                    <MenuItem value="Asia/Muscat">Asia/Muscat (UTC+4)</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select label="Date Format" defaultValue="DD/MM/YYYY">
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Number Format</InputLabel>
                  <Select label="Number Format" defaultValue="1,234.56">
                    <MenuItem value="1,234.56">1,234.56</MenuItem>
                    <MenuItem value="1.234,56">1.234,56</MenuItem>
                    <MenuItem value="1 234.56">1 234.56</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                System Preferences
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable audit logging"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-backup database"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Enable two-factor authentication"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Send email notifications"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Enable API access"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-update system"
                />
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Password Policy
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  label="Minimum Password Length"
                  type="number"
                  defaultValue="8"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require uppercase letters"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require lowercase letters"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require numbers"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Require special characters"
                />
                <TextField
                  fullWidth
                  label="Password Expiry (days)"
                  type="number"
                  defaultValue="90"
                />
                <TextField
                  fullWidth
                  label="Password History"
                  type="number"
                  defaultValue="5"
                  helperText="Number of previous passwords to remember"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Session Management
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  type="number"
                  defaultValue="30"
                />
                <TextField
                  fullWidth
                  label="Max Login Attempts"
                  type="number"
                  defaultValue="5"
                />
                <TextField
                  fullWidth
                  label="Account Lockout Duration (minutes)"
                  type="number"
                  defaultValue="15"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable IP whitelist"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Force logout on password change"
                />
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Email Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Payroll Processing Complete"
                    secondary="Notify when payroll processing is completed"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Employee Onboarding"
                    secondary="Notify when new employees are added"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Salary Changes"
                    secondary="Notify when employee salaries are updated"
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="System Errors"
                    secondary="Notify when system errors occur"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                SMTP Configuration
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  label="SMTP Server"
                  defaultValue="smtp.gmail.com"
                />
                <TextField
                  fullWidth
                  label="Port"
                  type="number"
                  defaultValue="587"
                />
                <TextField
                  fullWidth
                  label="Username"
                  defaultValue="payroll@company.ae"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  defaultValue="********"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable SSL/TLS"
                />
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                >
                  Test Connection
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Integrations Tab */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" gutterBottom>
            Third-Party Integrations
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <IntegrationInstructions />
                    </Box>
                    <Box>
                      <Typography variant="h6">
                        Banking Integration
                      </Typography>
                      <StatusChip status="active" showDot />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Connect with UAE banks for salary transfers and payment processing
                  </Typography>
                  <Button variant="outlined" size="small">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'secondary.main',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <Shield />
                    </Box>
                    <Box>
                      <Typography variant="h6">
                        GPSSA Integration
                      </Typography>
                      <StatusChip status="inactive" showDot />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Direct integration with UAE GPSSA for contribution reporting
                  </Typography>
                  <Button variant="outlined" size="small">
                    Setup
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* User Dialog */}
      <Dialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={selectedUser?.name || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                defaultValue={selectedUser?.email || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  defaultValue={selectedUser?.role || ''}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="HR Manager">HR Manager</MenuItem>
                  <MenuItem value="Payroll Specialist">Payroll Specialist</MenuItem>
                  <MenuItem value="Finance Manager">Finance Manager</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={selectedUser?.status || 'ACTIVE'}
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Permissions
              </Typography>
              <Grid container spacing={1}>
                {[
                  'EMPLOYEE_CREATE',
                  'EMPLOYEE_UPDATE',
                  'EMPLOYEE_DELETE',
                  'PAYROLL_PROCESS',
                  'PAYROLL_APPROVE',
                  'REPORT_GENERATE',
                  'SETTINGS_UPDATE',
                ].map((permission) => (
                  <Grid item xs={6} md={4} key={permission}>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked={selectedUser?.permissions?.includes(permission)}
                        />
                      }
                      label={permission.replace('_', ' ')}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            {selectedUser ? 'Update User' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          setUsers(prev => prev.filter(u => u.id !== selectedUser?.id));
          setDeleteDialogOpen(false);
          setSelectedUser(null);
        }}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
      />
    </Box>
  );
};

export default SettingsPage;
                