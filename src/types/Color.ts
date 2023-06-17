import { ColorVariantRecord } from './ColorVariant';
import { ColorTone, ColorToneRecord } from './ColorTone';
import { NeutralVariantRecord } from './NeutralVariant';

export interface ColorSource {
  value: string;
  tone: ColorTone;
}

export type ColorMode = 'light' | 'dark';

export interface ColorSettings {
  label: string;
  source: ColorSource;
}

export interface Color extends ColorSettings {
  id: string;
  tone: ColorToneRecord;
  variant: Record<ColorMode, ColorVariantRecord>;
}

export interface StandardColor extends Color {
  neutral?: undefined;
}

export interface NeutralColor extends Color {
  id: 'neutral';
  neutral: Record<ColorMode, NeutralVariantRecord>;
}

export interface ColorInit {
  label: string;
  sourceValue?: string;
  sourceTone?: ColorTone;
}

export type NeutralColorInit = Partial<ColorInit>;
