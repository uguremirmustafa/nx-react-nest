import { MenuItem } from '@devugur/shared-types';
import Dashboard from '@mui/icons-material/DashboardOutlined';
import Person from '@mui/icons-material/PersonOutlineOutlined';

export const menuItems: MenuItem[] = [
  {
    key: 'DASHBOARD',
    label: 'Dashboard',
    path: '/dashboard',
    icon: Dashboard,
  },
  {
    key: 'USERS',
    label: 'Users',
    path: '/users',
    icon: Person,
  },
];
