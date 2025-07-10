import { getValidStatus } from '@/utils/statusUtils';
import React, { useState, useEffect } from 'react';
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
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PlayArrow,
  ExpandMore,
  Code,
  Functions,
  Check,
  Close,
  Visibility,
  MoreVert,
  Science,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { StatusChip, Loading, ConfirmDialog } from '@/components/common';

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
      id={`component-tabpanel-${index}`}
      aria-labelledby={`component-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ComponentsPage: React.FC = () => {
  const { hasPermission } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formulaDialogOpen, setFormulaDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [components, setComponents] = useState([
    {
      id: '1',
      name: 'Basic Salary',
      type: 'EARNING',
      category: 'SALARY',
      status: 'ACTIVE',
      formula: 'EMPLOYEE.BASIC_SALARY',
      description: 'Base salary for the employee',
      country: 'UAE',
      version: '1.0',
      lastUpdated: '2024-01-15',
    },
    {
      id: '2',
      name: 'Housing Allowance',
      type: 'EARNING',
      category: 'ALLOWANCE',
      status: 'ACTIVE',
      formula: 'EMPLOYEE.BASIC_SALARY * 0.25',
      description: '25% of basic salary as housing allowance',
      country: 'UAE',
      version: '1.2',
      lastUpdated: '2024-02-01',
    },
    {
      id: '3',
      name: 'UAE GPSSA',
      type: 'DEDUCTION',
      category: 'STATUTORY',
      status: 'ACTIVE',
      formula: 'IF(EMPLOYEE.NATIONALITY == "UAE", (EMPLOYEE.BASIC_SALARY + HOUSING_ALLOWANCE) * 0.05, 0)',
      description: 'UAE GPSSA contribution for UAE nationals',
      country: 'UAE',
      version: '1.0',
      lastUpdated: '2024-01-10',
    },
    {
      id: '4',
      name: 'Unemployment Insurance',
      type: 'DEDUCTION',
      category: 'STATUTORY',
      status: 'ACTIVE',
      formula: '(EMPLOYEE.BASIC_SALARY + HOUSING_ALLOWANCE) * 0.005',
      description: 'UAE unemployment insurance contribution',
      country: 'UAE',
      version: '1.0',
      lastUpdated: '2024-01-10',
    },
    {
      id: '5',
      name: 'Overtime Pay',
      type: 'EARNING',
      category: 'VARIABLE',
      status: 'ACTIVE',
      formula: 'OVERTIME_HOURS * (EMPLOYEE.BASIC_SALARY / 30 / 8) * 1.25',
      description: 'Overtime payment at 125% of hourly rate',
      country: 'UAE',
      version: '1.1',
      lastUpdated: '2024-01-20',
    },
  ]);

  const [formulaTests, setFormulaTests] = useState([
    {
      testCase: 'UAE National with AED 15,000 salary',
      variables: {
        'EMPLOYEE.BASIC_SALARY': 15000,
        'EMPLOYEE.NATIONALITY': 'UAE',
        'HOUSING_ALLOWANCE': 3750,
      },
      expectedResult: 937.5,
      actualResult: 937.5,
      passed: true,
    },
    {
      testCase: 'Expat with AED 12,000 salary',
      variables: {
        'EMPLOYEE.BASIC_SALARY': 12000,
        'EMPLOYEE.NATIONALITY': 'India',
        'HOUSING_ALLOWANCE': 3000,
      },
      expectedResult: 0,
      actualResult: 0,
      passed: true,
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, component: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedComponent(component);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComponent(null);
  };

  const handleTestFormula = (component: any) => {
    setSelectedComponent(component);
    setTestDialogOpen(true);
    handleMenuClose();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EARNING': return 'success';
      case 'DEDUCTION': return 'error';
      case 'BENEFIT': return 'info';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SALARY': return 'primary';
      case 'ALLOWANCE': return 'secondary';
      case 'STATUTORY': return 'warning';
      case 'VARIABLE': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payroll Components
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage payroll components and formulas for different countries
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Science />}
            onClick={() => setTabValue(2)}
          >
            Test Lab
          </Button>
          {hasPermission('COMPONENT_CREATE') && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Component
            </Button>
          )}
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                Earnings
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="error.main" gutterBottom>
                Deductions
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                Statutory
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compliance components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main" gutterBottom>
                Countries
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                UAE, Saudi, Oman
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Components" />
            <Tab label="Formula Management" />
            <Tab label="Test Lab" />
            <Tab label="Rules & Dependencies" />
          </Tabs>
        </Box>

        {/* All Components Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Component Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {component.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {component.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={component.type}
                        size="small"
                        color={getTypeColor(component.type)}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={component.category}
                        size="small"
                        color={getCategoryColor(component.category)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <img
                          src={`/flags/${component.country.toLowerCase()}.png`}
                          alt={component.country}
                          width={20}
                          height={15}
                          style={{ borderRadius: 2 }}
                        />
                        {component.country}
                      </Box>
                    </TableCell>
                    <TableCell>
                    <StatusChip status={getValidStatus(component.status)} showDot />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        v{component.version}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(component.lastUpdated).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, component)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Formula Management Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Formula Editor
          </Typography>
          
          {components.map((component) => (
            <Accordion key={component.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box display="flex" alignItems="center" gap={2} width="100%">
                  <Typography variant="subtitle1" fontWeight="medium">
                    {component.name}
                  </Typography>
                  <Chip
                    label={component.type}
                    size="small"
                    color={getTypeColor(component.type)}
                    variant="outlined"
                  />
                  <Box flexGrow={1} />
                  <Typography variant="body2" color="text.secondary">
                    v{component.version}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Formula:
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        backgroundColor: 'grey.100',
                        p: 2,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        overflow: 'auto',
                        fontFamily: 'monospace',
                      }}
                    >
                      {component.formula}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Actions:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        size="small"
                        onClick={() => {
                          setSelectedComponent(component);
                          setFormulaDialogOpen(true);
                        }}
                      >
                        Edit Formula
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<PlayArrow />}
                        size="small"
                        onClick={() => handleTestFormula(component)}
                      >
                        Test Formula
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        size="small"
                      >
                        View History
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Test Lab Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Formula Test Environment
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Test Formula: UAE GPSSA
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  mb: 2,
                  fontFamily: 'monospace',
                }}
              >
                IF(EMPLOYEE.NATIONALITY == "UAE", (EMPLOYEE.BASIC_SALARY + HOUSING_ALLOWANCE) * 0.05, 0)
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Test Cases:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Test Case</TableCell>
                      <TableCell>Variables</TableCell>
                      <TableCell>Expected</TableCell>
                      <TableCell>Actual</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formulaTests.map((test, index) => (
                      <TableRow key={index}>
                        <TableCell>{test.testCase}</TableCell>
                        <TableCell>
                          <Box component="pre" sx={{ fontSize: '0.75rem' }}>
                            {JSON.stringify(test.variables, null, 2)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {test.expectedResult}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {test.actualResult}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {test.passed ? (
                            <Chip
                              label="PASS"
                              size="small"
                              color="success"
                              icon={<Check />}
                            />
                          ) : (
                            <Chip
                              label="FAIL"
                              size="small"
                              color="error"
                              icon={<Close />}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  size="small"
                >
                  Run All Tests
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Rules & Dependencies Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Component Rules & Dependencies
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Component dependencies determine the order of calculation. The system automatically resolves dependencies to ensure correct calculation sequence.
          </Alert>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Dependency Graph
              </Typography>
              <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                <Box>Basic Salary → Housing Allowance</Box>
                <Box>Basic Salary + Housing Allowance → UAE GPSSA</Box>
                <Box>Basic Salary + Housing Allowance → Unemployment Insurance</Box>
                <Box>Basic Salary → Overtime Pay</Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Card>

      {/* Create Component Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Component</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Component Name"
                placeholder="e.g., Transport Allowance"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select label="Type">
                  <MenuItem value="EARNING">Earning</MenuItem>
                  <MenuItem value="DEDUCTION">Deduction</MenuItem>
                  <MenuItem value="BENEFIT">Benefit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="SALARY">Salary</MenuItem>
                  <MenuItem value="ALLOWANCE">Allowance</MenuItem>
                  <MenuItem value="STATUTORY">Statutory</MenuItem>
                  <MenuItem value="VARIABLE">Variable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select label="Country">
                  <MenuItem value="UAE">UAE</MenuItem>
                  <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                  <MenuItem value="Oman">Oman</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                placeholder="Describe the component and its purpose"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Formula"
                multiline
                rows={4}
                placeholder="Enter the calculation formula"
                sx={{ fontFamily: 'monospace' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Create Component
          </Button>
        </DialogActions>
      </Dialog>

      {/* Formula Editor Dialog */}
      <Dialog
        open={formulaDialogOpen}
        onClose={() => setFormulaDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Edit Formula: {selectedComponent?.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Formula"
                multiline
                rows={8}
                value={selectedComponent?.formula || ''}
                sx={{ fontFamily: 'monospace' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Available Variables:
              </Typography>
              <Box sx={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <Box>EMPLOYEE.BASIC_SALARY</Box>
                <Box>EMPLOYEE.NATIONALITY</Box>
                <Box>EMPLOYEE.HIRE_DATE</Box>
                <Box>HOUSING_ALLOWANCE</Box>
                <Box>TRANSPORT_ALLOWANCE</Box>
                <Box>OVERTIME_HOURS</Box>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Functions:
              </Typography>
              <Box sx={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <Box>IF(condition, true_value, false_value)</Box>
                <Box>PRORATE(amount, days, total_days)</Box>
                <Box>ROUND(number, decimals)</Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormulaDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<PlayArrow />}>
            Test Formula
          </Button>
          <Button variant="contained">
            Save Formula
          </Button>
        </DialogActions>
      </Dialog>

      {/* Test Formula Dialog */}
      <Dialog
        open={testDialogOpen}
        onClose={() => setTestDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Test Formula: {selectedComponent?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Formula:
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
                fontSize: '0.875rem',
                mb: 3,
                fontFamily: 'monospace',
              }}
            >
              {selectedComponent?.formula}
            </Box>
            
            <Typography variant="subtitle2" gutterBottom>
              Test Variables:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="EMPLOYEE.BASIC_SALARY"
                  type="number"
                  defaultValue={15000}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="EMPLOYEE.NATIONALITY"
                  defaultValue="UAE"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="HOUSING_ALLOWANCE"
                  type="number"
                  defaultValue={3750}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="OVERTIME_HOURS"
                  type="number"
                  defaultValue={0}
                  size="small"
                />
              </Grid>
            </Grid>
            
            <Box mt={3}>
              <Typography variant="subtitle2" gutterBottom>
                Result:
              </Typography>
              <Alert severity="success">
                <Typography variant="h6">
                  937.50 AED
                </Typography>
              </Alert>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestDialogOpen(false)}>
            Close
          </Button>
          <Button variant="contained" startIcon={<PlayArrow />}>
            Run Test
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Component</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleTestFormula(selectedComponent)}>
          <ListItemIcon>
            <PlayArrow fontSize="small" />
          </ListItemIcon>
          <ListItemText>Test Formula</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Functions fontSize="small" />
          </ListItemIcon>
          <ListItemText>Formula History</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Code fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Dependencies</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ComponentsPage;
