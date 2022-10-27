import styles from './header.module.css';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ProfileButton from '../profile-button/profile-button';
import { User } from '@devugur/shared-types';

/* eslint-disable-next-line */
export interface HeaderProps {
  user: User;
  logout: () => void;
  toggleSidebar: () => void;
  sidebarActive: boolean;
}

export function Header(props: HeaderProps) {
  const { user, logout, toggleSidebar, sidebarActive } = props;
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
      <IconButton
        color="primary"
        onClick={toggleSidebar}
        sx={{ marginLeft: sidebarActive ? '256px' : 0 }}
      >
        <MenuIcon />
      </IconButton>
      <ProfileButton user={user} logout={logout} />
    </Box>
  );
}
