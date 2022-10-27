import styles from './theme.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface ThemeProps {
  children: ReactNode;
}

export const colors = {
  primary: '#03c9d7',
  secondary: '#fb9678',
  background: '#fafbfb',
  text: '#333333',
  text_light: '#3e3e4e',
  text_muted: '#777e89',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors['primary'],
    },
    secondary: {
      main: colors['secondary'],
    },
    background: {
      default: colors['secondary'],
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
    h1: {
      color: colors['text'],
      fontWeight: 'bold',
      marginBottom: 8,
    },
    h2: {
      color: colors['text'],
      fontWeight: 'bold',
      marginBottom: 4,
    },
    h3: {
      color: colors['text'],
      fontWeight: 'bold',
      marginBottom: 2,
    },
    body2: {
      color: colors['text_muted'],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        underlineAlways: false,
        root: {
          textDecoration: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          textTransform: 'capitalize',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
});

theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: '1.8rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
};
theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: '1.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
theme.typography.h3 = {
  ...theme.typography.h3,
  fontSize: '1.3rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.75rem',
  },
};

export function Theme(props: ThemeProps) {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
