import tinycolor from 'tinycolor2';
import parseColorToneValue from './parseColorToneValue';
import { ColorSource, ColorTone } from '../types';

function calculateColorToneHex(params: {
  source: ColorSource;
  tone: ColorTone;
}): string {
  const { source, tone } = params;
  const numericValue = parseColorToneValue({ tone });

  if (numericValue <= 0) return tinycolor('black').toHexString();
  if (numericValue >= 100) return tinycolor('white').toHexString();

  const sourceNumericValue = parseColorToneValue({ tone: source.tone });
  const { value: sourceHex } = source;

  if (numericValue > sourceNumericValue) {
    const mixPercentage = (100 - numericValue) / (100 - sourceNumericValue);
    const mixAmount = mixPercentage * 100;
    return tinycolor.mix('white', sourceHex, mixAmount).toHexString();
  }

  if (numericValue < sourceNumericValue) {
    const mixPercentage = numericValue / sourceNumericValue;
    const mixAmount = mixPercentage * 100;
    return tinycolor.mix('black', sourceHex, mixAmount).toHexString();
  }

  return sourceHex;
}

export default calculateColorToneHex;
