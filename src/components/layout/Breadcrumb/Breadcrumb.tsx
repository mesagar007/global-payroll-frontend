
import { Link as MuiLink } from '@mui/material';

import React from 'react';
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  styled,
} from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-li': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiBreadcrumbs-separator': {
    margin: theme.spacing(0, 1),
  },
}));

const BreadcrumbLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

const getCurrentPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  // Convert kebab-case to Title Case
  return lastSegment
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Dashboard';
};

const generateBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Don't create breadcrumb for the last segment (current page)
    if (index < pathSegments.length - 1) {
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPath,
      });
    }
  });
  
  return breadcrumbs;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true }) => {
  const location = useLocation();
  
  const breadcrumbItems = items || generateBreadcrumbsFromPath(location.pathname);
  const currentPageTitle = getCurrentPageTitle(location.pathname);
  
  return (
    <Box py={2}>
      <StyledBreadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {showHome && (
      <MuiLink
        component={RouterLink}
        to="/dashboard"
        color="inherit"
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
      >
        <Home fontSize="small" />
        Dashboard
      </MuiLink>
    )}
        
        {breadcrumbItems.slice(0, -1).map((item, index) => (
  <MuiLink
    key={index}
    component={RouterLink}
    to={item.path!}
    color="inherit"
    underline="hover"
    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
  >
    {item.icon}
    {item.label}
  </MuiLink>
))}
        
        <Typography
          color="text.primary"
          fontSize="0.875rem"
          fontWeight="medium"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          {currentPageTitle}
        </Typography>
      </StyledBreadcrumbs>
    </Box>
  );
};

export default Breadcrumb;