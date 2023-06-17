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

interface ColorFieldProps extends BaseTextFieldProps {
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorField: React.FC<ColorFieldProps> = React.memo((props) => {
  const { value, onChange, className, ...forwarded } = props;

  return (
    <TextField
      {...forwarded}
      variant="outlined"
      className={clsx(CLASSES.default, className)}
      value={value}
      onChange={onChange}
      InputProps={{
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
