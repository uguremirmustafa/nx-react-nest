import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
} from '@mui/material';
import React from 'react';
import styles from './sidebar.module.css';

import { Link } from 'react-router-dom';
import { colors } from '../theme/theme';
import { menuItems } from '@devugur/utilities';

/* eslint-disable-next-line */
export interface SidebarProps {
  isActive: boolean;
  activePath: string;
}

export function Sidebar(props: SidebarProps) {
  const { isActive, activePath } = props;

  return (
    <Slide direction="right" in={isActive} mountOnEnter>
      <div
        className={`${styles['container']} ${isActive ? styles['active'] : ''}`}
      >
        <Paper square elevation={isActive ? 12 : 0} sx={{ height: '100%' }}>
          <List sx={{ pt: 2 }}>
            {menuItems.map((item) => {
              const activeLink = activePath === item.path;
              return (
                <Link to={item.path} style={{ color: colors.text_light }}>
                  <ListItemButton
                    selected={activeLink}
                    key={item.label}
                    sx={{
                      py: 1,
                      minHeight: 32,
                      borderRadius: 2,
                      mb: 1,
                      mx: 2,
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {React.createElement(item.icon)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Paper>
      </div>
    </Slide>
  );
}

export default Sidebar;
