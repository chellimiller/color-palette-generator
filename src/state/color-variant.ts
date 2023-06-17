import { Color, ColorMode, ColorTone, ColorVariant } from '../types';
import { createColorModifier } from './_database';
import ColorVariantHelper from '../util/ColorVariantHelper';
import { useColor } from './color';

export const resetAllColorVariantValues = createColorModifier<{
  mode: ColorMode;
}>((color, { mode }) => ColorVariantHelper.resetAllValues({ color, mode }));

export const setColorVariantValue = createColorModifier<{
  value: ColorTone;
  variant: ColorVariant;
  mode: ColorMode;
}>((color, { variant, mode, value }) =>
  ColorVariantHelper.setValue({ color, variant, mode, value })
);

export const resetColorVariantValue = createColorModifier<{
  variant: ColorVariant;
  mode: ColorMode;
}>((color, { variant, mode }) =>
  ColorVariantHelper.resetValue({ color, variant, mode })
);

export function useColorVariantValue(params: {
  id: Color['id'];
  variant: ColorVariant;
  mode: ColorMode;
}): ColorTone | undefined {
  const { id, variant, mode } = params;
  const color = useColor(id);
  return color?.variant[mode][variant].value;
}
