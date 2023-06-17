import { ModifiableValue } from './_core';

export type ColorTone =
  | '00'
  | '05'
  | '10'
  | '15'
  | '20'
  | '25'
  | '30'
  | '35'
  | '40'
  | '45'
  | '50'
  | '55'
  | '60'
  | '65'
  | '70'
  | '75'
  | '80'
  | '85'
  | '90'
  | '95'
  | '97'
  | '99'
  | '100';

export const ColorToneValue: Record<ColorTone, number> = {
  '00': 0,
  '05': 5,
  '10': 10,
  '15': 15,
  '20': 20,
  '25': 25,
  '30': 30,
  '35': 35,
  '40': 40,
  '45': 45,
  '50': 50,
  '55': 55,
  '60': 60,
  '65': 65,
  '70': 70,
  '75': 75,
  '80': 80,
  '85': 85,
  '90': 90,
  '95': 95,
  '97': 97,
  '99': 99,
  '100': 100,
};

export const keysColorTone: ColorTone[] = Object.keys(
  ColorToneValue
).sort() as ColorTone[];

export type ColorToneHexValue = ModifiableValue<string>;

export type ColorToneRecord = Record<ColorTone, ColorToneHexValue>;
