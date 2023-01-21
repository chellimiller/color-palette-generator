import * as tinycolor from 'tinycolor2';
import { ColorVariantKey, ColorVariant } from './ColorVariant';

export type Color = {
  label: string;
  base: tinycolor.Instance;
  mainVariant: ColorVariantKey;
  variants: Map<ColorVariantKey, ColorVariant>;
};

export type ColorInit = {
  label?: string;
  base?: string;
  mainVariant?: ColorVariantKey;
};
