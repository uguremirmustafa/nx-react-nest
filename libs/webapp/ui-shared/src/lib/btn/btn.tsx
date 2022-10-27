import styles from './btn.module.css';
import { Button, ButtonProps } from '@mui/material';
/* eslint-disable-next-line */
export interface BtnProps extends ButtonProps {}

export function Btn(props: BtnProps) {
  const { children, variant, color, sx, ...rest } = props;
  return (
    <Button
      variant={variant ?? 'contained'}
      color={color ?? 'secondary'}
      sx={{
        // color: 'white',
        // textTransform: 'capitalize',
        // boxShadow: 0,
        // '&:hover': {
        //   boxShadow: 0,
        // },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
