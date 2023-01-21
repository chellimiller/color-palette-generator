import { useLiveQuery } from 'dexie-react-hooks';
import { ColorPalette, PartialColorPaletteSettings } from '../types';
import database from './_database';

export async function getColorPaletteById(
  id: string
): Promise<ColorPalette | undefined> {
  return await database.colors.get(id);
}

export async function getColorPalettes(): Promise<ColorPalette[]> {
  return await database.colors.toArray();
}

export async function setColorPalette(data: ColorPalette): Promise<string> {
  return await database.colors.put(data, data.id);
}

export async function removeColorPalette(id: string): Promise<void> {
  return await database.colors.delete(id);
}

export async function modifyColorPaletteSettings(
  id: string,
  settings: PartialColorPaletteSettings
): Promise<string> {
  const { contrast = {}, saturationValues = {} } = settings;
  const prev = await getColorPaletteById(id);

  if (!prev) {
    throw new Error(
      `Palette "${id}" cannot be modified because it does not exist.`
    );
  }

  const next: ColorPalette = {
    ...prev,
    contrast: {
      ...prev.contrast,
      ...contrast,
    },
    saturationValues: {
      ...prev.saturationValues,
      ...saturationValues,
    },
  };

  return await setColorPalette(next);
}

export function useColorPaletteById(id: string): ColorPalette | undefined {
  return useLiveQuery(async () => await getColorPaletteById(id), [id]);
}

export function useColorPalettes(): ColorPalette[] {
  return useLiveQuery(getColorPalettes) || [];
}
