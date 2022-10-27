import styles from './profile-button.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from 'libs/shared-types/src';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ProfileButtonProps {
  user: User;
  logout: () => void;
}

export function ProfileButton(props: ProfileButtonProps) {
  const { user, logout } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  if (!user.loggedIn) {
    return (
      <Link to="/login">
        <Button onClick={handleClick}>
          <Typography variant="body1" color="primary">
            Login
          </Typography>
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Button
        endIcon={<ExpandMoreIcon color="primary" />}
        onClick={handleClick}
      >
        {renderAvatar(user)}
        <Typography
          variant="caption"
          color="primary"
          sx={{
            pl: 1,
            m: 0,
            textTransform: 'capitalize',
          }}
        >
          Hi, <b>{user.name}</b>
        </Typography>
      </Button>
      <Menu
        color="primary"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            overflow: 'visible',
            filter: 'drop-shadow(0px -2px 10px rgba(0,0,0,0.2))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/profile">
          <MenuItem>
            {renderAvatar(user)}{' '}
            <Typography variant="body1" color="primary">
              Profile
            </Typography>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileButton;

const renderAvatar = (user: User) => {
  return (
    <Avatar
      sx={{ width: 28, height: 28 }}
      alt={user.name}
      src={user.avatar ?? 'https://mui.com/static/images/avatar/2.jpg'}
    >
      {user.name[0]}
    </Avatar>
  );
};
