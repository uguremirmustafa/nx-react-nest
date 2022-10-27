import { Page } from '@devugur/shared-types';
import { lazy } from 'react';

export const UNAUTH_PAGES: Page[] = [
  {
    path: '/signup',
    component: lazy(() => import('./signup/SignupPage')),
    name: 'Sign Up',
  },
  {
    path: '/login',
    component: lazy(() => import('./login/LoginPage')),
    name: 'Login',
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('./forgot-password/ForgotPasswordPage')),
    name: 'Forgot Password',
  },
];
export const AUTH_PAGES: Page[] = [
  {
    path: '/profile',
    component: lazy(() => import('./profile/ProfilePage')),
    name: 'Profile',
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./dashboard/DashboardPage')),
    name: 'Dashboard',
  },
  {
    path: '/users',
    component: lazy(() => import('./users/UsersPage')),
    name: 'Users',
  },
];
