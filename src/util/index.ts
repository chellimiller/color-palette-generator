import { uniqueId } from 'lodash';
import * as tinycolor from 'tinycolor2';
import {
  Color,
  ColorPalette,
  ColorPaletteContrast,
  ColorPaletteSaturationValues,
  ColorPaletteSettings,
  ColorPaletteShade,
  ColorSettings,
  ColorShade,
  ContrastType,
  DefaultColorPaletteShadeKey,
  Override,
} from '../types';

type CalculateSaturationOptions = Partial<ColorPaletteSaturationValues> & {
  L: number;
};

export function calculateSaturation(
  options: CalculateSaturationOptions
): number {
  const { a = 0, b = 0, c = 0, L } = options;
  const saturation = a * L * L + b * L + c;
  return Math.round(saturation * 100) / 100;
}

type CreateColorShadeOptions = CalculateSaturationOptions & {
  hue: number;
  contrast?: ContrastType;
};

export function createColorShade(options: CreateColorShadeOptions): ColorShade {
  const { hue, L, contrast, ...saturationValues } = options;
  const color = tinycolor({
    h: hue,
    s: calculateSaturation({
      ...saturationValues,
      L,
    }),
    l: L,
  });

  return {
    color,
    contrast,
  };
}

type CreateColorOptions<SHADE extends string = string> =
  Partial<ColorPaletteSaturationValues> &
    ColorSettings & {
      shades: Map<SHADE, ColorPaletteShade>;
    };

export function createColor<SHADE extends string = string>(
  options: CreateColorOptions<SHADE>
): Color<SHADE> {
  const { hue, name, shades: shadeOptions, ...saturationValues } = options;

  const shades: Map<SHADE, ColorShade> = new Map();

  for (let [shade, { L, contrast }] of shadeOptions.entries()) {
    const color = createColorShade({
      ...saturationValues,
      hue,
      L,
      contrast,
    });
    shades.set(shade, color);
  }

  return {
    hue,
    name,
    shades,
  };
}

type CreateColorPaletteSettingsOptions = Override<
  Partial<ColorPaletteSettings>,
  {
    contrast?: Partial<ColorPaletteContrast>;
    saturationValues?: Partial<ColorPaletteSaturationValues>;
  }
>;

export function createColorPaletteSettings(
  options: CreateColorPaletteSettingsOptions = {}
): ColorPaletteSettings {
  const { contrast = {}, saturationValues = {} } = options;

  const {
    ratio = 4.5,
    light = tinycolor('#ffffff'),
    dark = tinycolor('#000000'),
  } = contrast;

  const { a = 0, b = 0, c = 0.8 } = saturationValues;

  return {
    contrast: {
      ratio,
      light,
      dark,
    },
    saturationValues: {
      a,
      b,
      c,
    },
  };
}

export function createDefaultColorPaletteShades(): Map<
  DefaultColorPaletteShadeKey,
  ColorPaletteShade
> {
  return new Map([
    ['050', { L: 0.05 }],
    ['100', { L: 0.1 }],
    ['200', { L: 0.2 }],
    ['300', { L: 0.3 }],
    ['400', { L: 0.4 }],
    ['500', { L: 0.5 }],
    ['600', { L: 0.6 }],
    ['700', { L: 0.7 }],
    ['800', { L: 0.8 }],
    ['900', { L: 0.9 }],
    ['950', { L: 0.95 }],
  ]);
}

type CreateColorPaletteOptions<
  COLOR extends string = string,
  SHADE extends string = string
> = {
  name: string;
  settings: ColorPaletteSettings;
  shades: Map<SHADE, ColorPaletteShade>;
  colors: Map<COLOR, ColorSettings>;
};

export function createColorPalette<
  COLOR extends string = string,
  SHADE extends string = string
>(
  options: CreateColorPaletteOptions<COLOR, SHADE>
): ColorPalette<COLOR, SHADE> {
  const { settings, name, shades, colors: colorSettings } = options;

  const colors: Map<COLOR, Color<SHADE>> = new Map();

  for (let [key, colorValues] of colorSettings.entries()) {
    const color = createColor<SHADE>({
      ...colorValues,
      shades,
      ...settings.saturationValues,
    });
    colors.set(key, color);
  }

  return {
    id: uniqueId('palette-'),
    name,
    ...settings,
    shades,
    colors,
  };
}
