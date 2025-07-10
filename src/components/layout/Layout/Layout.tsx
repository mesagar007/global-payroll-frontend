import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { ErrorBoundary } from '@/components/common';

interface LayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  showFooter?: boolean;
}

const Main = styled('main')<{ sidebarOpen: boolean; sidebarWidth: number }>(
  ({ theme, sidebarOpen, sidebarWidth }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(sidebarOpen && {
      [theme.breakpoints.up('md')]: {
        marginLeft: sidebarWidth,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    }),
  })
);

const ContentContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)', // Subtract header height
  paddingTop: theme.custom.header.height,
  display: 'flex',
  flexDirection: 'column',
}));

const PageContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(0, 2, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3, 3),
  },
}));

const Layout: React.FC<LayoutProps> = ({
  children,
  showBreadcrumb = true,
  showFooter = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Header
        onMenuClick={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
      />
      
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />
      
      <Main
        sidebarOpen={sidebarOpen && !isMobile}
        sidebarWidth={theme.custom.sidebar.width}
      >
        <ContentContainer>
          <PageContent>
            {showBreadcrumb && <Breadcrumb />}
            
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </PageContent>
          
          {showFooter && <Footer />}
        </ContentContainer>
      </Main>
    </Box>
  );
};

export default Layout;
