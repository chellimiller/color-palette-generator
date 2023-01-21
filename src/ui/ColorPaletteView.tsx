import * as React from 'react';
import { useColorPaletteById } from '../state';
import { ColorPalette, Override } from '../types';
import ColorPaletteSettingsForm from './ColorPaletteSettingsForm';

export type ColorPaletteViewProps = Override<
  React.ComponentProps<'div'>,
  {
    paletteId: ColorPalette['id'];
  }
>;

const ColorPaletteView: React.FC<ColorPaletteViewProps> = (props) => {
  const { paletteId, ...forwarded } = props;

  const palette = useColorPaletteById(paletteId);

  return (
    <div {...forwarded}>
      {palette && <ColorPaletteSettingsForm value={palette} />}
    </div>
  );
};

export default ColorPaletteView;
