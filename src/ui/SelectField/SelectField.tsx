import React, { useId } from 'react';
import { SelectProps, FormControl, Select, InputLabel } from '@mui/material';

interface ColorFieldProps extends SelectProps {
  className?: string;
  value?: string;
  fullWidth?: boolean;
}

const ColorField: React.FC<ColorFieldProps> = React.memo((props) => {
  const { className, label, fullWidth, sx, ...forwarded } = props;

  const labelId = useId();

  return (
    <FormControl fullWidth={fullWidth} sx={sx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...forwarded}
        labelId={labelId}
        label={label}
        variant="outlined"
      />
    </FormControl>
  );
});

export default ColorField;
