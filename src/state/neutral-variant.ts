import { ColorMode, ColorTone, NeutralVariant } from '../types';
import { createNeutralColorModifier } from './_database';
import NeutralVariantHelper from '../util/NeutralVariantHelper';
import { useNeutralColor } from './color';

export const resetAllNeutralVariantValues = createNeutralColorModifier<{
  mode: ColorMode;
}>((color, { mode }) => NeutralVariantHelper.resetAllValues({ color, mode }));

export const setNeutralVariantValue = createNeutralColorModifier<{
  value: ColorTone;
  variant: NeutralVariant;
  mode: ColorMode;
}>((color, { variant, mode, value }) =>
  NeutralVariantHelper.setValue({ color, variant, mode, value })
);

export const resetNeutralVariantValue = createNeutralColorModifier<{
  variant: NeutralVariant;
  mode: ColorMode;
}>((color, { variant, mode }) =>
  NeutralVariantHelper.resetValue({ color, variant, mode })
);

export function useNeutralVariantValue(params: {
  variant: NeutralVariant;
  mode: ColorMode;
}): ColorTone {
  const { variant, mode } = params;
  const color = useNeutralColor();
  return color.neutral[mode][variant].value;
}
