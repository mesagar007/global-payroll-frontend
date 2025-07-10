import axios, { AxiosResponse } from 'axios';
import { LoginCredentials, LoginResponse, User } from '@/types/auth.types';
import { API_BASE_URL } from '@/config/api.config';
// Mock users with complete data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@payroll.ae',
    password: 'admin123',
    name: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Admin',
    avatar: undefined,
    organization: {
      id: '1',
      name: 'ABC Company LLC',
    },
    permissions: [
      'EMPLOYEE_CREATE',
      'EMPLOYEE_UPDATE', 
      'EMPLOYEE_DELETE',
      'EMPLOYEE_VIEW',
      'PAYROLL_PROCESS',
      'PAYROLL_APPROVE',
      'PAYROLL_VIEW',
      'COMPONENT_CREATE',
      'COMPONENT_UPDATE',
      'COMPONENT_DELETE',
      'REPORT_GENERATE',
      'REPORT_VIEW',
      'SETTINGS_UPDATE',
      'USER_CREATE',
      'USER_UPDATE',
      'USER_DELETE',
    ],
  },
  {
    id: '2',
    email: 'hr@payroll.ae',
    password: 'hr1234',
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'HR Manager',
    avatar: undefined,
    organization: {
      id: '1',
      name: 'ABC Company LLC',
    },
    permissions: [
      'EMPLOYEE_CREATE',
      'EMPLOYEE_UPDATE',
      'EMPLOYEE_VIEW',
      'PAYROLL_VIEW',
      'REPORT_GENERATE',
      'REPORT_VIEW',
    ],
  },
  {
    id: '3',
    email: 'payroll@payroll.ae',
    password: 'payroll123',
    name: 'Ahmed Al-Rashid',
    firstName: 'Sagar',
    lastName: 'Chaudhary',
    role: 'Payroll Specialist',
    avatar: undefined,
    organization: {
      id: '1',
      name: 'ABC Company LLC',
    },
    permissions: [
      'EMPLOYEE_VIEW',
      'PAYROLL_PROCESS',
      'PAYROLL_VIEW',
      'COMPONENT_UPDATE',
      'REPORT_GENERATE',
      'REPORT_VIEW',
    ],
  },
];

class AuthService {
  private static instance: AuthService;
  private useMockAuth = true;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (this.useMockAuth) {
      return this.mockLogin(credentials);
    }
    
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using mock authentication');
      return this.mockLogin(credentials);
    }
  }

  private async mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
      refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
    };
  }

  public async refreshToken(refreshToken: string): Promise<LoginResponse> {
    if (this.useMockAuth) {
      return this.mockRefreshToken(refreshToken);
    }

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  private async mockRefreshToken(refreshToken: string): Promise<LoginResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const userId = refreshToken.split('-')[3];
    const user = MOCK_USERS.find(u => u.id === userId);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
      refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
    };
  }

  public async logout(): Promise<void> {
    if (this.useMockAuth) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.warn('Logout failed, but continuing...');
    }
  }

  public getCurrentUser(): User | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      if (token.startsWith('mock-jwt-token-')) {
        const userId = token.split('-')[3];
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) || false;
  }

  public hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role || false;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUseMockAuth(useMock: boolean): void {
    this.useMockAuth = useMock;
  }
}

export default AuthService.getInstance();