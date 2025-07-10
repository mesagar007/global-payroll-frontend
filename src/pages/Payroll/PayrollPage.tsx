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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  Refresh,
  Download,
  CheckCircle,
  Visibility,
  Send,
  MoreVert,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { StatusChip } from '@/components/common';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PayrollRun {
  id: string;
  period: string;
  type: string;
  status: string;
  employeeCount: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  processedDate: string | null;
  processedBy: string | null;
  progress?: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payroll-tabpanel-${index}`}
      aria-labelledby={`payroll-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PayrollPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRun, setSelectedRun] = useState<any>(null);

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([
    {
      id: '1',
      period: 'January 2025',
      type: 'MONTHLY',
      status: 'COMPLETED',
      employeeCount: 45,
      totalGross: 675000,
      totalDeductions: 82500,
      totalNet: 592500,
      processedDate: '2025-01-31',
      processedBy: 'Sarah Johnson',
    },
    {
      id: '2',
      period: 'February 2025',
      type: 'MONTHLY',
      status: 'PROCESSING',
      employeeCount: 47,
      totalGross: 705000,
      totalDeductions: 86250,
      totalNet: 618750,
      processedDate: null,
      processedBy: null,
      progress: 65,
    },
    {
      id: '3',
      period: 'March 2025',
      type: 'MONTHLY',
      status: 'DRAFT',
      employeeCount: 47,
      totalGross: 0,
      totalDeductions: 0,
      totalNet: 0,
      processedDate: null,
      processedBy: null,
    },
  ]);

  const processSteps = [
    'Validate Employee Data',
    'Calculate Payroll Components',
    'Apply Deductions',
    'Generate Payslips',
    'Finalize Results',
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProcessPayroll = async () => {
    setProcessing(true);
    setProcessStep(0);

    for (let i = 0; i < processSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessStep(i + 1);
    }

    setPayrollRuns(prev =>
      prev.map(run =>
        run.id === '2'
          ? {
              ...run,
              status: 'COMPLETED',
              progress: 100,
              processedDate: new Date().toISOString().split('T')[0],
              processedBy: 'System',
            }
          : run
      )
    );

    setProcessing(false);
    setProcessDialogOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, run: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRun(run);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRun(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payroll Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Process and manage organizational payroll cycles
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={() => setTabValue(3)}>Reports</Button>
          {hasPermission('PAYROLL_PROCESS') && (
            <Button variant="contained" startIcon={<PlayArrow />} onClick={() => setProcessDialogOpen(true)}>
              Process Payroll
            </Button>
          )}
        </Box>
      </Box>

      {/* Tabs */}
      <Card>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Payroll Runs" />
          <Tab label="Current Period" />
          <Tab label="Approvals" />
          <Tab label="Reports" />
        </Tabs>

        {/* Tab Content */}
        <TabPanel value={tabValue} index={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Payroll Processing History</Typography>
            <Button startIcon={<Refresh />} onClick={() => setLoading(true)}>Refresh</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Gross</TableCell>
                  <TableCell>Net</TableCell>
                  <TableCell>Processed Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrollRuns.map(run => (
                  <TableRow key={run.id}>
                    <TableCell>{run.period}</TableCell>
                    <TableCell><Chip label={run.type} size="small" /></TableCell>
                    <TableCell>
                     <StatusChip status={getValidStatus(run.status)} showDot />

                      {run.status === 'PROCESSING' && (
                        <LinearProgress value={run.progress || 0} variant="determinate" sx={{ mt: 1 }} />
                      )}
                    </TableCell>
                    <TableCell>{run.employeeCount}</TableCell>
                    <TableCell>{formatCurrency(run.totalGross)}</TableCell>
                    <TableCell>{formatCurrency(run.totalNet)}</TableCell>
                    <TableCell>{run.processedDate ?? 'Pending'}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, run)}><MoreVert /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Other Tabs... */}
        {/* You can keep your existing JSX for other tabs (Current Period, Approvals, Reports) as it is. */}
      </Card>

      {/* Payroll Processing Dialog */}
      <Dialog open={processDialogOpen} onClose={() => !processing && setProcessDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Process Payroll - February 2025</DialogTitle>
        <DialogContent>
          {processing ? (
            <>
              <Typography variant="h6" gutterBottom>Processing Payroll...</Typography>
              <Stepper activeStep={processStep} alternativeLabel>
                {processSteps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box mt={3} textAlign="center">
                <CircularProgress size={40} />
                <Typography variant="body2" mt={1}>
                  {processStep < processSteps.length
                    ? `Step ${processStep + 1} of ${processSteps.length}: ${processSteps[processStep]}`
                    : 'Finalizing...'}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography>Are you sure you want to process payroll for February 2025?</Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                This will calculate payroll for 47 employees.
              </Alert>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProcessDialogOpen(false)} disabled={processing}>Cancel</Button>
          <Button onClick={handleProcessPayroll} variant="contained" disabled={processing}>
            {processing ? 'Processing...' : 'Start Processing'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Download fontSize="small" /></ListItemIcon>
          <ListItemText>Download Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Send fontSize="small" /></ListItemIcon>
          <ListItemText>Send Payslips</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PayrollPage;
