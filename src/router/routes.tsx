import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth';
import { Loading } from '@/components/common';
import { Layout } from '@/components/layout';
import { routes } from '@/config/routes.config';

// Lazy load page components for better performance
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const EmployeeListPage = lazy(() => import('@/pages/Employees/EmployeeListPage'));
const EmployeeDetailsPage = lazy(() => import('@/pages/Employees/EmployeeDetailsPage'));
const AddEmployeePage = lazy(() => import('@/pages/Employees/AddEmployeePage'));
const EditEmployeePage = lazy(() => import('@/pages/Employees/EditEmployeePage'));
const PayrollPage = lazy(() => import('@/pages/Payroll/PayrollPage'));
const ComponentsPage = lazy(() => import('@/pages/Components/ComponentsPage'));
const ReportsPage = lazy(() => import('@/pages/Reports/ReportsPage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/Error/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/Error/UnauthorizedPage'));

// Loading wrapper component
const PageLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
    {children}
  </Suspense>
);

// Protected layout wrapper
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <Layout>
      {children}
    </Layout>
  </ProtectedRoute>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={routes.login}
        element={
          <PageLoader>
            <LoginPage />
          </PageLoader>
        }
      />

      {/* Protected Routes */}
      <Route path="/" element={<Navigate to={routes.dashboard} replace />} />
      
      <Route
        path={routes.dashboard}
        element={
          <PageLoader>
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          </PageLoader>
        }
      />

      {/* Employee Routes */}
      <Route
        path={routes.employees}
        element={
          <PageLoader>
            <ProtectedLayout>
              <EmployeeListPage />
            </ProtectedLayout>
          </PageLoader>
        }
      />
      
      <Route
        path={routes.employeeDetails}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['EMPLOYEE_READ']}>
              <Layout>
                <EmployeeDetailsPage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />
      
      <Route
        path={routes.addEmployee}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['EMPLOYEE_CREATE']}>
              <Layout>
                <AddEmployeePage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />
      
      <Route
        path={routes.editEmployee}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['EMPLOYEE_UPDATE']}>
              <Layout>
                <EditEmployeePage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />

      {/* Payroll Routes */}
      <Route
        path={routes.payroll}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['PAYROLL_READ']}>
              <Layout>
                <PayrollPage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />

      {/* Component Routes */}
      <Route
        path={routes.components}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['COMPONENT_READ']}>
              <Layout>
                <ComponentsPage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />

      {/* Report Routes */}
      <Route
        path={routes.reports}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['REPORT_READ']}>
              <Layout>
                <ReportsPage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />

      {/* Settings Routes */}
      <Route
        path={routes.settings}
        element={
          <PageLoader>
            <ProtectedRoute permissions={['SETTINGS_READ']}>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          </PageLoader>
        }
      />

      {/* Error Routes */}
      <Route
        path={routes.unauthorized}
        element={
          <PageLoader>
            <UnauthorizedPage />
          </PageLoader>
        }
      />
      
      <Route
        path={routes.notFound}
        element={
          <PageLoader>
            <NotFoundPage />
          </PageLoader>
        }
      />
      
      {/* Catch all route */}
      <Route
        path="*"
        element={
          <PageLoader>
            <NotFoundPage />
          </PageLoader>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
