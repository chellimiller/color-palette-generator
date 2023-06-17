import { ColorTone } from './ColorTone';
import { ModifiableValue, WithContrastVariant } from './_core';

type ColorVariantGroup<NAME extends string> =
  | WithContrastVariant<NAME>
  | WithContrastVariant<`${NAME}--hover`>
  | WithContrastVariant<`${NAME}--active`>;

export type ColorVariant =
  | ColorVariantGroup<'main'>
  | ColorVariantGroup<'container'>
  | ColorVariantGroup<'attention'>;

export type ColorVariantMapping = Record<ColorVariant, ColorTone>;

export type ColorVariantRecord = Record<
  ColorVariant,
  ModifiableValue<ColorTone>
>;

export const keysColorVariant: ColorVariant[] = [
  // Main
  'main',
  'on-main',
  'main--hover',
  'on-main--hover',
  'main--active',
  'on-main--active',
  // Container
  'container',
  'on-container',
  'container--hover',
  'on-container--hover',
  'container--active',
  'on-container--active',
  // Attention
  'attention',
  'on-attention',
  'attention--hover',
  'on-attention--hover',
  'attention--active',
  'on-attention--active',
];

export const lightColorVariantMapping: ColorVariantMapping = {
  main: '40',
  'main--hover': '30',
  'main--active': '20',
  'on-main': '97',
  'on-main--hover': '100',
  'on-main--active': '100',

  container: '90',
  'container--hover': '90',
  'container--active': '70',
  'on-container': '20',
  'on-container--hover': '10',
  'on-container--active': '05',

  attention: '50',
  'attention--hover': '40',
  'attention--active': '30',
  'on-attention': '100',
  'on-attention--hover': '100',
  'on-attention--active': '100',
};

export const darkColorVariantMapping: ColorVariantMapping = {
  main: '80',
  'main--hover': '80',
  'main--active': '95',
  'on-main': '20',
  'on-main--hover': '30',
  'on-main--active': '40',

  container: '30',
  'container--hover': '25',
  'container--active': '20',
  'on-container': '90',
  'on-container--hover': '99',
  'on-container--active': '99',

  attention: '60',
  'attention--hover': '60',
  'attention--active': '50',
  'on-attention': '100',
  'on-attention--hover': '70',
  'on-attention--active': '100',
};
