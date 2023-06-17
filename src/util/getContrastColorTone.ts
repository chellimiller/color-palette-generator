import { ColorTone } from '../types';
import parseColorToneValue from './parseColorToneValue';
import toColorTone from './toColorTone';

function getContrastColorTone(params: {
  contrastSteps: number;
  tone: ColorTone;
}): ColorTone | null {
  const { contrastSteps, tone } = params;
  const toneValue = parseColorToneValue({ tone });
  const contrastToneValue = toneValue + contrastSteps;
  if (contrastToneValue < 0 || contrastToneValue > 100) return null;
  return toColorTone(contrastToneValue);
}

export default getContrastColorTone;
