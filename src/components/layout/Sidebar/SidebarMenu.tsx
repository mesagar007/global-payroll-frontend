import React from 'react';
import { List, Collapse } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SidebarMenuItem from './SidebarMenuItem';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  permission?: string;
  children?: MenuItem[];
}

interface SidebarMenuProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    }
    onItemClick?.(item);
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

  const filteredItems = filterMenuItems(items);

  return (
    <List>
      {filteredItems.map(item => renderMenuItem(item))}
    </List>
  );
};

export default SidebarMenu;