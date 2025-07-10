import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  styled,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  permission?: string;
  children?: MenuItem[];
}

interface SidebarMenuItemProps {
  item: MenuItem;
  level: number;
  isActive: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  onClick: () => void;
  onExpandClick: () => void;
}

const StyledListItemButton = styled(ListItemButton)<{
  level: number;
  isActive: boolean;
}>(({ theme, level, isActive }) => ({
  paddingLeft: theme.spacing(2 + level * 2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  
  ...(isActive && {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      backgroundColor: theme.palette.primary.main,
      borderRadius: '0 2px 2px 0',
    },
  }),
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: 'translateX(4px)',
  },
  
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  },
  
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 400,
  },
}));

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  level,
  isActive,
  isExpanded,
  hasChildren,
  onClick,
  onExpandClick,
}) => {
  const handleClick = () => {
    if (hasChildren) {
      onExpandClick();
    } else {
      onClick();
    }
  };

  return (
    <ListItem disablePadding>
      <StyledListItemButton
        level={level}
        isActive={isActive}
        onClick={handleClick}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
      </StyledListItemButton>
    </ListItem>
  );
};

export default SidebarMenuItem;
