import { ctrSx } from '@devugur/utilities';
import { Box, LinearProgress } from '@mui/material';
import styles from './loader.module.css';

/* eslint-disable-next-line */
export interface LoaderProps {}

export function Loader(props: LoaderProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        ...ctrSx,
        bgcolor: 'white',
      }}
    >
      <LinearProgress />
    </Box>
  );
}
