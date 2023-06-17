import { ColorSource, ColorTone, keysColorTone } from '../types';
import calculateColorToneHex from './calculateColorToneHex';

function createColorTones(params: {
  source: ColorSource;
}): Record<ColorTone, string> {
  const { source } = params;

  return toObject({
    array: keysColorTone,
    mapper: (tone) => calculateColorToneHex({ source, tone }),
  });
}

export default createColorTones;
