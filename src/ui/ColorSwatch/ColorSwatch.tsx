import React from 'react';
import clsx from 'clsx';
import './ColorSwatch.scss';
import { Tooltip } from '@mui/material';

const CLASSES = {
  default: 'color-swatch',
  withText: 'color-swatch--with-text',
  invalid: 'color-swatch--invalid',
  size: {
    sm: 'color-swatch--size-sm',
    md: 'color-swatch--size-md',
    lg: 'color-swatch--size-lg',
  },
};

type ColorSwatchProps = React.PropsWithChildren<{
  color?: string;
  id?: string;
  contrast?: string;
  tooltip?: string;
  className?: string;
  invalid?: boolean;
  size?: keyof typeof CLASSES.size;
}>;

const ColorSwatch: React.FC<ColorSwatchProps> = React.memo((props) => {
  const { color, contrast, children, id, tooltip, className, invalid, size } =
    props;

  return (
    <Tooltip title={tooltip} arrow>
      <div
        id={id}
        className={clsx(
          CLASSES.default,
          { [CLASSES.withText]: !!contrast, [CLASSES.invalid]: invalid },
          size && CLASSES.size[size],
          className
        )}
        style={{
          background: color,
          color: contrast,
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
});

export default ColorSwatch;
