import styles from './layout.module.css';
import Box from '@mui/material/Box';
import loginbg from '../../../assets/login.svg';
import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { ctrSx } from '@devugur/utilities';

/* eslint-disable-next-line */
export interface UnauthLayoutProps {
  children: ReactNode;
}

export function UnauthLayout(props: UnauthLayoutProps) {
  const { children } = props;
  return (
    <Grid container sx={{ placeItems: 'center', height: '100vh' }}>
      <Grid
        item
        xs={0}
        md={6}
        sx={{ ...ctrSx, zIndex: 2, display: { xs: 'none', md: 'block' } }}
      >
        <img
          src={loginbg}
          alt="excited women with a laptop"
          style={{ width: '100%', maxWidth: 800, margin: 'auto' }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ ...ctrSx, p: 2, bgcolor: '#fafbfb', height: '100%' }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
