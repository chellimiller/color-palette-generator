import * as React from 'react';
import { Override } from '../types';

export type ColorPaletteSettingsInputProps = Override<
  React.ComponentProps<'input'>,
  {
    label: string;
    name: string;
  }
>;

const ColorPaletteSettingsInput: React.FC<ColorPaletteSettingsInputProps> = (
  props
) => {
  const { label, name, ...forwarded } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...forwarded} />
    </>
  );
};

export default ColorPaletteSettingsInput;
