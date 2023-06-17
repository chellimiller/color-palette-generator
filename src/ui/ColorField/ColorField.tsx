import React from 'react';
import clsx from 'clsx';
import './ColorField.scss';
import { TextField, InputAdornment, BaseTextFieldProps } from '@mui/material';
import ColorSwatch from '../ColorSwatch';

const CLASSES = {
  default: 'color-field',
  ColorSwatch: {
    default: 'color-field__color-swatch',
  },
};

interface ColorFieldProps extends Omit<BaseTextFieldProps, 'variant'> {
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: BaseTextFieldProps['variant'] | 'ghost';
}

const ColorField: React.FC<ColorFieldProps> = React.memo((props) => {
  const {
    value,
    onChange,
    className,
    variant = 'outlined',
    ...forwarded
  } = props;

  const trueVariant = variant === 'ghost' ? 'standard' : variant;

  return (
    <TextField
      {...forwarded}
      variant={trueVariant}
      className={clsx(CLASSES.default, className)}
      value={value}
      onChange={onChange}
      InputProps={{
        disableUnderline: variant === 'ghost',
        startAdornment: (
          <InputAdornment
            className={CLASSES.ColorSwatch.default}
            position="start"
            component={ColorSwatch}
            color={value}
          />
        ),
      }}
    />
  );
});

export default ColorField;
