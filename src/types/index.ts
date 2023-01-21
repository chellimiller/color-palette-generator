import * as tinycolor from 'tinycolor2';

export type Override<T, U> = Omit<T, keyof U> & U;

export type ContrastType = 'light' | 'dark';

export type ColorShade = {
  color: tinycolor.Instance;
  contrast?: ContrastType;
};

export type ColorSettings = {
  name: string;
  hue: number;
};

export type Color<SHADE extends string = string> = ColorSettings & {
  shades: Map<SHADE, ColorShade>;
};

export type ColorPaletteContrast = {
  ratio: number;
  light: tinycolor.Instance;
  dark: tinycolor.Instance;
};

export type ColorPaletteSaturationValues = {
  a: number;
  b: number;
  c: number;
};

export type ColorPaletteSettings = {
  contrast: ColorPaletteContrast;
  saturationValues: ColorPaletteSaturationValues;
};

export type PartialColorPaletteSettings = Override<
  Partial<ColorPaletteSettings>,
  {
    contrast?: Partial<ColorPaletteContrast>;
    saturationValues?: Partial<ColorPaletteSaturationValues>;
  }
>;

export type ColorPaletteShade = {
  L: number;
  contrast?: ContrastType;
};

export type DefaultColorPaletteShadeKey =
  | '050'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export type ColorPalette<
  COLOR extends string = string,
  SHADE extends string = string
> = ColorPaletteSettings & {
  id: string;
  name: string;
  shades: Map<SHADE, ColorPaletteShade>;
  colors: Map<COLOR, Color<SHADE>>;
};
