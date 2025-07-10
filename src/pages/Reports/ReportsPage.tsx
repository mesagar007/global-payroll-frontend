import React, { useState } from 'react';
import { getValidStatus } from '@/utils/statusUtils';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Assessment,
  Download,
  Visibility,
  Schedule,
  PictureAsPdf,
  TableChart,
  BarChart,
  FileUpload,
  Email,
  Settings,
  DateRange,
  FilterList,
  Share,
  Refresh,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { StatusChip } from '@/components/common';

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ReportsPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const reportTemplates = [
    {
      id: '1',
      name: 'Monthly Payroll Summary',
      category: 'Payroll',
      description: 'Comprehensive monthly payroll report with all calculations',
      format: ['PDF', 'Excel'],
      parameters: ['Month', 'Department', 'Employee Group'],
      frequency: 'Monthly',
      lastGenerated: '2024-12-31',
      icon: <Assessment />,
    },
    {
      id: '2',
      name: 'Employee Payslips',
      category: 'Payroll',
      description: 'Individual payslips for employees',
      format: ['PDF'],
      parameters: ['Month', 'Employees'],
      frequency: 'Monthly',
      lastGenerated: '2024-12-31',
      icon: <PictureAsPdf />,
    },
    {
      id: '3',
      name: 'GPSSA Contribution Report',
      category: 'Statutory',
      description: 'UAE GPSSA contribution report for government submission',
      format: ['Excel', 'CSV'],
      parameters: ['Month', 'Year'],
      frequency: 'Monthly',
      lastGenerated: '2024-12-31',
      icon: <TableChart />,
    },
    {
      id: '4',
      name: 'Unemployment Insurance Report',
      category: 'Statutory',
      description: 'UAE unemployment insurance contribution report',
      format: ['Excel', 'CSV'],
      parameters: ['Month', 'Year'],
      frequency: 'Monthly',
      lastGenerated: '2024-12-31',
      icon: <TableChart />,
    },
    {
      id: '5',
      name: 'Salary Analysis',
      category: 'HR Analytics',
      description: 'Detailed salary analysis with trends and comparisons',
      format: ['PDF', 'Excel'],
      parameters: ['Date Range', 'Department', 'Position'],
      frequency: 'Quarterly',
      lastGenerated: '2024-12-31',
      icon: <BarChart />,
    },
    {
      id: '6',
      name: 'Employee Headcount Report',
      category: 'HR Analytics',
      description: 'Employee headcount analysis by department and position',
      format: ['PDF', 'Excel'],
      parameters: ['Date Range', 'Department'],
      frequency: 'Monthly',
      lastGenerated: '2024-12-31',
      icon: <Assessment />,
    },
  ];

  const reportHistory = [
    {
      id: '1',
      name: 'Monthly Payroll Summary - December 2024',
      type: 'Payroll',
      format: 'PDF',
      status: 'COMPLETED',
      generatedDate: '2024-12-31T23:59:59Z',
      generatedBy: 'Sarah Johnson',
      size: '2.5 MB',
      downloadCount: 12,
    },
    {
      id: '2',
      name: 'Employee Payslips - December 2024',
      type: 'Payroll',
      format: 'PDF',
      status: 'COMPLETED',
      generatedDate: '2024-12-31T23:45:00Z',
      generatedBy: 'Ahmed Al-Rashid',
      size: '15.2 MB',
      downloadCount: 45,
    },
    {
      id: '3',
      name: 'GPSSA Report - December 2024',
      type: 'Statutory',
      format: 'Excel',
      status: 'GENERATING',
      generatedDate: null,
      generatedBy: 'System',
      size: null,
      downloadCount: 0,
      progress: 75,
    },
    {
      id: '4',
      name: 'Salary Analysis - Q4 2024',
      type: 'Analytics',
      format: 'PDF',
      status: 'ERROR',
      generatedDate: '2024-12-30T14:30:00Z',
      generatedBy: 'Mohammed Al-Farisi',
      size: null,
      downloadCount: 0,
      error: 'Insufficient data for analysis',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleGenerateReport = (report: any) => {
    setSelectedReport(report);
    setGenerateDialogOpen(true);
  };

  const handleStartGeneration = async () => {
    setGenerating(true);
    setGenerationProgress(0);
    
    // Simulate report generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerateDialogOpen(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'GENERATING': return 'warning';
      case 'ERROR': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generate payroll reports and analytics for your organization
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<Schedule />}
          >
            Scheduled Reports
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Available Reports
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {reportTemplates.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Report templates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                Generated Today
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generating reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main" gutterBottom>
                Total Downloads
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                156
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Report Templates" />
            <Tab label="Report History" />
            <Tab label="Scheduled Reports" />
            <Tab label="Analytics Dashboard" />
          </Tabs>
        </Box>

        {/* Report Templates Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {reportTemplates.map((report) => (
              <Grid item xs={12} md={6} lg={4} key={report.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: 'primary.main',
                          color: 'white',
                          borderRadius: 1,
                        }}
                      >
                        {report.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {report.name}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {report.description}
                    </Typography>
                    
                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={report.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={report.frequency}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Formats: {report.format.join(', ')}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Last generated: {formatDate(report.lastGenerated)}
                    </Typography>
                    
                    <Box display="flex" gap={1} mt={2}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Assessment />}
                        onClick={() => handleGenerateReport(report)}
                        disabled={!hasPermission('REPORT_GENERATE')}
                      >
                        Generate
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                      >
                        Preview
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Report History Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Format</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Generated Date</TableCell>
                  <TableCell>Generated By</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Downloads</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportHistory.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {report.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.type}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.format}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                    <StatusChip status={getValidStatus(report.status)} showDot />
                      {report.status === 'GENERATING' && (
                        <LinearProgress
                          variant="determinate"
                          value={report.progress || 0}
                          sx={{ mt: 1, width: 100 }}
                        />
                      )}
                      {report.status === 'ERROR' && (
                        <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
                          {report.error}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.generatedDate ? (
                        <Typography variant="body2">
                          {formatDate(report.generatedDate)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.generatedBy}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.size || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.downloadCount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {report.status === 'COMPLETED' && (
                          <Tooltip title="Download">
                            <IconButton size="small">
                              <Download />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Share">
                          <IconButton size="small">
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Scheduled Reports Tab */}
        <TabPanel value={tabValue} index={2}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Set up automatic report generation on a schedule. Reports will be generated automatically and can be emailed to specified recipients.
          </Alert>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Scheduled Report Jobs
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Monthly Payroll Summary"
                    secondary="Runs on the last day of each month at 11:59 PM"
                  />
                  <Chip label="ACTIVE" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="GPSSA Monthly Report"
                    secondary="Runs on the 1st of each month at 9:00 AM"
                  />
                  <Chip label="ACTIVE" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Quarterly Salary Analysis"
                    secondary="Runs on the 1st of each quarter at 8:00 AM"
                  />
                  <Chip label="PAUSED" color="warning" size="small" />
                </ListItem>
              </List>
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<Schedule />}
                  disabled={!hasPermission('REPORT_SCHEDULE')}
                >
                  Create Schedule
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Analytics Dashboard Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payroll Trends
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      backgroundColor: 'grey.50',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Chart: Monthly payroll trends over the last 12 months
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Department Breakdown
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      backgroundColor: 'grey.50',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Chart: Payroll distribution by department
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Statutory Contributions
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      backgroundColor: 'grey.50',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Chart: GPSSA and other statutory contributions
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Employee Growth
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      backgroundColor: 'grey.50',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Chart: Employee headcount growth over time
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog
        open={generateDialogOpen}
        onClose={() => !generating && setGenerateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Generate Report: {selectedReport?.name}
        </DialogTitle>
        <DialogContent>
          {generating ? (
            <Box textAlign="center" py={4}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Generating Report...
              </Typography>
              <LinearProgress
                variant="determinate"
                value={generationProgress}
                sx={{ mt: 2, width: '100%' }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {generationProgress}% Complete
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select label="Month" defaultValue="2024-12">
                    <MenuItem value="2024-12">December 2024</MenuItem>
                    <MenuItem value="2025-01">January 2025</MenuItem>
                    <MenuItem value="2025-02">February 2025</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Format</InputLabel>
                  <Select label="Format" defaultValue="PDF">
                    <MenuItem value="PDF">PDF</MenuItem>
                    <MenuItem value="Excel">Excel</MenuItem>
                    <MenuItem value="CSV">CSV</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label="Department" defaultValue="" multiple>
                    <MenuItem value="1">Engineering</MenuItem>
                    <MenuItem value="2">Human Resources</MenuItem>
                    <MenuItem value="3">Finance</MenuItem>
                    <MenuItem value="4">Marketing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  This report will include data for the selected month and departments. 
                  Generation may take a few minutes depending on the amount of data.
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setGenerateDialogOpen(false)}
            disabled={generating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartGeneration}
            variant="contained"
            startIcon={generating ? <CircularProgress size={20} /> : <Assessment />}
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportsPage;