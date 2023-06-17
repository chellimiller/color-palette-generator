import { Color, ColorTone } from '../types';
import { createColorModifier } from './_database';
import ColorToneHelper from '../util/ColorToneHelper';
import { useColor } from './color';

export const resetAllColorToneValues = createColorModifier((color) =>
  ColorToneHelper.resetAllValues({ color })
);

export const setColorToneValue = createColorModifier<{
  value: string;
  tone: ColorTone;
}>((color, { tone, value }) =>
  ColorToneHelper.setValue({ color, tone, value })
);

export const resetColorToneValue = createColorModifier<{
  tone: ColorTone;
}>((color, { tone }) => ColorToneHelper.resetValue({ color, tone }));

export function useColorToneValue(params: {
  id: Color['id'];
  tone: ColorTone;
}): string | undefined {
  const { id, tone } = params;
  const color = useColor(id);
  return color?.tone[tone].value;
}
