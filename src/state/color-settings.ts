import { useMemo } from 'react';
import { Color, ColorSettings, ColorSource, ColorTone } from '../types';
import ColorToneHelper from '../util/ColorToneHelper';
import createColorTones from '../util/createColorToneRecord';
import { useColor } from './color';
import { createColorModifier } from './_database';

export const setColorLabel = createColorModifier<{ label: string }>(
  (color, { label }) => {
    if (color.label === label) return color;
    return { ...color, label };
  }
);

export const setColorSourceValue = createColorModifier<{ sourceValue: string }>(
  (color, { sourceValue }) => {
    if (color.source.value === sourceValue) return color;
    const source: ColorSource = { ...color.source, value: sourceValue };
    return ColorToneHelper.setAllDefaultValues({
      color: { ...color, source },
      tones: createColorTones({ source }),
    });
  }
);

export const setColorSourceTone = createColorModifier<{
  sourceTone: ColorTone;
}>((color, { sourceTone }) => {
  if (color.source.value === sourceTone) return color;
  const source: ColorSource = { ...color.source, tone: sourceTone };
  return ColorToneHelper.setAllDefaultValues({
    color: { ...color, source },
    tones: createColorTones({ source }),
  });
});

export function useColorSettings(id: Color['id']): ColorSettings | undefined {
  const { source, label } = useColor(id) ?? {};

  const settings = useMemo(() => {
    if (!source) return undefined;
    return { label, source } as ColorSettings;
  }, [source, label]);

  return settings;
}
