import {
  Box,
  OutlinedInput,
  InputProps,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

export interface TextInputProps extends InputProps {
  label?: string;
  err?: string | boolean;
}

export function TextInput(props: TextInputProps) {
  const { label, fullWidth = true, err, ...rest } = props;
  return (
    <FormControl sx={{ width: fullWidth ? '100%' : 'undefined' }}>
      {label && (
        <FormLabel htmlFor={rest.id} sx={{ fontSize: '14px', mb: 0.5 }}>
          {label}
        </FormLabel>
      )}
      <OutlinedInput {...rest} size={rest.size ?? 'small'} />
      {!!err && <FormHelperText>{err}</FormHelperText>}
    </FormControl>
  );
}
