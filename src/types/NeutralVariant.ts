import { ColorTone } from './ColorTone';
import {
  ModifiableValue,
  WithContrastVariant,
  WithDepthVariants,
  WithMutedVariant,
} from './_core';

export type NeutralVariant =
  // Surface
  | 'surface'
  | 'surface--dim'
  | 'surface--bright'
  | WithDepthVariants<'surface'>
  | WithMutedVariant<'on-surface'>

  // Background
  | WithContrastVariant<'background'>
  | WithContrastVariant<'background--header'>

  // Outline
  | WithMutedVariant<'outline'>

  // Misc
  | 'overlay'
  | 'shadow';

export type NeutralVariantMapping = Record<NeutralVariant, ColorTone>;

export type NeutralVariantRecord = Record<
  NeutralVariant,
  ModifiableValue<ColorTone>
>;

export const keysNeutralVariant: NeutralVariant[] = [
  // Surface
  'surface',
  'surface--dim',
  'surface--bright',
  'surface--low',
  'surface--high',
  'on-surface',
  'on-surface--muted',

  // Background
  'background',
  'on-background',
  'background--header',
  'on-background--header',

  // Outline
  'outline',
  'outline--muted',

  // Misc
  'overlay',
  'shadow',
];

export const lightNeutralVariantMapping: NeutralVariantMapping = {
  // Surface
  surface: '97',
  'surface--dim': '95',
  'surface--bright': '100',
  'surface--high': '100',
  'surface--low': '90',
  'on-surface': '10',
  'on-surface--muted': '30',

  // Background
  background: '99',
  'on-background': '10',
  'background--header': '80',
  'on-background--header': '10',

  // Outline
  outline: '60',
  'outline--muted': '75',

  // Misc
  overlay: '70',
  shadow: '10',
};

export const darkNeutralVariantMapping: NeutralVariantMapping = {
  // Surface
  surface: '15',
  'surface--dim': '05',
  'surface--bright': '25',
  'surface--high': '20',
  'surface--low': '10',
  'on-surface': '90',
  'on-surface--muted': '80',

  // Background
  background: '00',
  'on-background': '80',
  'background--header': '30',
  'on-background--header': '90',

  // Outline
  outline: '60',
  'outline--muted': '30',

  // Misc
  overlay: '40',
  shadow: '10',
};
