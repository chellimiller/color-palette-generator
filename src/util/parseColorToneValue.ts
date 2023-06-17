import { ColorTone, ColorToneValue } from '../types';

function parseColorToneValue(params: { tone: ColorTone }): number {
  const { tone } = params;
  return ColorToneValue[tone];
}

export default parseColorToneValue;
