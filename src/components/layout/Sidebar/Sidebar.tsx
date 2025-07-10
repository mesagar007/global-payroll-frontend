import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
} from '@mui/material';
import {
  Dashboard,
  People,
  AccountBalanceWallet,
  Assessment,
  Settings,
  Business,
  Build,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/config/routes.config';
import SidebarMenuItem from './SidebarMenuItem';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: theme.custom.sidebar.width,
    boxSizing: 'border-box',
    background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogoIcon = styled(Business)(({ theme }) => ({
  fontSize: 32,
  background: theme.custom.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  permission?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: routes.dashboard,
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: <People />,
    path: routes.employees,
    permission: 'EMPLOYEE_READ',
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: <AccountBalanceWallet />,
    permission: 'PAYROLL_READ',
    children: [
      {
        id: 'payroll-management',
        label: 'Payroll Management',
        icon: <AccountBalanceWallet />,
        path: routes.payroll,
      },
      {
        id: 'payroll-cycles',
        label: 'Payroll Cycles',
        icon: <AccountBalanceWallet />,
        path: routes.payrollCycles,
      },
      {
        id: 'payroll-processing',
        label: 'Processing',
        icon: <AccountBalanceWallet />,
        path: routes.payrollProcessing,
        permission: 'PAYROLL_PROCESS',
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: <Build />,
    path: routes.components,
    permission: 'COMPONENT_READ',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <Assessment />,
    path: routes.reports,
    permission: 'REPORT_READ',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    path: routes.settings,
    permission: 'SETTINGS_READ',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['payroll']);

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const handleExpandClick = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isItemActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      if (item.permission && !hasPermission(item.permission)) {
        return false;
      }
      if (item.children) {
        item.children = filterMenuItems(item.children);
      }
      return true;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = item.path ? isItemActive(item.path) : false;

    return (
      <React.Fragment key={item.id}>
        <SidebarMenuItem
          item={item}
          level={level}
          isActive={isActive}
          isExpanded={isExpanded}
          hasChildren={hasChildren || false}
          onClick={() => handleItemClick(item)}
          onExpandClick={() => handleExpandClick(item.id)}
        />
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LogoContainer>
        <LogoIcon />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Global Payroll
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Management System
          </Typography>
        </Box>
      </LogoContainer>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List>
          {filteredMenuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      <Divider />
      
      <Box p={2}>
        <Typography variant="caption" color="text.secondary" display="block">
          Version 1.0.0
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          © 2024 Global Payroll
        </Typography>
      </Box>
    </Box>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      {drawer}
    </StyledDrawer>
  );
};

export default Sidebar;