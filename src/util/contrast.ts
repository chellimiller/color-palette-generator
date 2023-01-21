import * as tinycolor from 'tinycolor2';
import { Color, ColorVariant, ColorVariantKey } from '../types';
import { toColorVariantKey } from './color-variant';

type GetContrastColorVariantKeyProps = {
  variantKey: ColorVariantKey;
  steps: number;
};

export function getContrastColorVariantKey(
  props: GetContrastColorVariantKeyProps
): ColorVariantKey | null {
  const { variantKey, steps: constrastSteps } = props;
  const contrastVariantKey = variantKey + constrastSteps;
  if (contrastVariantKey < 0 || contrastVariantKey > 100) return null;
  return toColorVariantKey(contrastVariantKey);
}

export type GetContrastProps = {
  variant: ColorVariant;
  color: Color;
  steps: number;
  minimumRatio: number;
};

export type Contrast = {
  variant: ColorVariant;
  ratio: number;
  minimumRatio: number;
  belowMinimumRatio: boolean;
};

export function getContrast(props: GetContrastProps): Contrast | null {
  const { variant: originalVariant, color, steps, minimumRatio } = props;

  const contrastVariantKey = getContrastColorVariantKey({
    variantKey: originalVariant.key,
    steps,
  });

  if (contrastVariantKey === null) return null;

  const contrastVariant = color.variants.get(contrastVariantKey);

  if (!contrastVariant) return null;

  const ratio = tinycolor.readability(
    originalVariant.value,
    contrastVariant.value
  );

  return {
    ratio,
    variant: contrastVariant,
    minimumRatio,
    belowMinimumRatio: ratio < minimumRatio,
  };
}
