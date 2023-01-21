import * as tinycolor from 'tinycolor2';
import { useLiveQuery } from 'dexie-react-hooks';
import { Color, ColorInit, ColorVariantKey } from '../types';
import { generateColor } from '../util';
import database, { DatabaseColor } from './_database';

function fromDatabaseColor(color: DatabaseColor): Color {
  return { ...color, base: tinycolor(color.base) };
}
function toDatabaseColor(color: Color): DatabaseColor {
  return { ...color, base: color.base.toHexString() };
}

export async function getColorByLabel(
  label: string
): Promise<Color | undefined> {
  const color = await database.colors.get(label);
  return !color ? undefined : fromDatabaseColor(color);
}

export async function getColors(): Promise<Color[]> {
  return await (await database.colors.toArray()).map(fromDatabaseColor);
}

export async function setColor(data: Color): Promise<string> {
  return await database.colors.put(toDatabaseColor(data), data.label);
}

type SetColorVariantProps = {
  label: string;
  key: ColorVariantKey;
  value: string;
};

export async function setColorVariant(
  props: SetColorVariantProps
): Promise<string> {
  const color = await getColorByLabel(props.label);
  if (!color) throw new Error(`Cannot find color with label "${props.label}"`);
  const { key, value } = props;
  const variant = color.variants.get(key);

  if (!variant)
    throw new Error(
      `Cannot find variant ${key} on color with label "${props.label}"`
    );

  const variants = new Map(color.variants);
  variants.set(key, { ...variant, value });

  return await setColor({ ...color, variants });
}
type SetColorSettingsProps = {
  label: string;
  base?: string;
  mainVariant?: ColorVariantKey;
};

export async function setColorSettings(
  props: SetColorSettingsProps
): Promise<string> {
  const color = await getColorByLabel(props.label);
  if (!color) throw new Error(`Cannot find color with label "${props.label}"`);

  const {
    label,
    base = color.base.toHexString(),
    mainVariant = color.mainVariant,
  } = props;

  return await setColor(generateColor({ label, base, mainVariant }));
}

export async function createColor(init: ColorInit): Promise<string> {
  return await setColor(generateColor(init));
}

export async function removeColor(label: string): Promise<void> {
  return await database.colors.delete(label);
}

export function useColorByLabel(label: string): Color | undefined {
  return useLiveQuery(async () => await getColorByLabel(label), [label]);
}

export function useColors(): Color[] {
  return useLiveQuery(getColors) || [];
}
