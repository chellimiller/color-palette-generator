import * as tinycolor from 'tinycolor2';
import { ColorVariantKey, ColorVariant, Color } from '../types';

export function toColorVariantKey(value: number): ColorVariantKey {
  if (value <= 0) return 0;
  if (value >= 100) return 100;

  return Math.min(
    Math.max(Math.round(value / 10) * 10, 10),
    90
  ) as ColorVariantKey;
}

type GenerateColorVariantProps = Omit<Color, 'variants'> & {
  variantKey: ColorVariantKey;
};

export function generateColorVariant(
  props: GenerateColorVariantProps
): ColorVariant {
  const { base, mainVariant, variantKey, label: colorLabel } = props;

  const label = `${colorLabel}-${variantKey}`.toLowerCase();

  if (mainVariant === variantKey) {
    return { label, value: base.toHexString(), key: variantKey };
  }

  if (variantKey === 0) {
    return { label, value: tinycolor('white').toHexString(), key: variantKey };
  }
  if (variantKey === 100) {
    return { label, value: tinycolor('black').toHexString(), key: variantKey };
  }

  if (variantKey > mainVariant) {
    const mixPercentage = (100 - variantKey) / (100 - mainVariant);
    const mixAmount = mixPercentage * 100;
    const hex = tinycolor
      .mix('black', base.toHexString(), mixAmount)
      .toHexString();

    return {
      label,
      value: hex,
      key: variantKey,
    };
  }

  // This is the only case left, so the if statement is unneeded.
  // Kept this here for clarity.
  // if (variantKey < mainVariantKey)

  const mixPercentage = variantKey / mainVariant;
  const mixAmount = mixPercentage * 100;
  const hex = tinycolor
    .mix('white', base.toHexString(), mixAmount)
    .toHexString();

  return {
    label,
    value: hex,
    key: variantKey,
  };
}
