import * as tinycolor from 'tinycolor2';
import { Color, ColorInit, ColorVariant, ColorVariantKey } from '../types';
import { generateColorVariant } from './color-variant';

export function generateColor(init: ColorInit = {}): Color {
  const { label = 'color', base: baseHex = '#777', mainVariant = 50 } = init;

  const base = tinycolor(baseHex);

  const variants: Color['variants'] = new Map();

  const addVariant = (variantKey: ColorVariantKey) => {
    variants.set(
      variantKey,
      generateColorVariant({
        variantKey,
        mainVariant,
        base,
        label,
      })
    );
  };

  addVariant(0);
  addVariant(10);
  addVariant(20);
  addVariant(30);
  addVariant(40);
  addVariant(50);
  addVariant(60);
  addVariant(70);
  addVariant(80);
  addVariant(90);
  addVariant(100);

  return {
    mainVariant,
    base,
    label,
    variants,
  };
}

type SelectColorVariantProps = {
  color: Color;
  variantKey: ColorVariantKey;
};

export function selectColorVariant(
  props: SelectColorVariantProps
): ColorVariant | null {
  return props.color.variants.get(props.variantKey) || null;
}

type SelectMainColorVariantProps = {
  color: Color;
};

export function selectMainColorVariant(
  props: SelectMainColorVariantProps
): ColorVariant | null {
  return props.color.variants.get(props.color.mainVariant) || null;
}
