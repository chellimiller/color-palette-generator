import { useLiveQuery } from 'dexie-react-hooks';
import { Color, NeutralColor } from '../types';
import database from './_database';
import ColorHelper from '../util/ColorHelper';

const defaultNeutralColor = ColorHelper.createNeutralColor();

async function getColor<C extends Color>(id: C['id']): Promise<C | undefined> {
  return (await database.colors.get(id)) as C;
}

async function getAllColors(): Promise<Color[]> {
  return await database.colors.toArray();
}

async function getNeutralColor(): Promise<NeutralColor | undefined> {
  return await getColor<NeutralColor>('neutral');
}

export async function setColor<C extends Color>(data: C): Promise<C['id']> {
  return await database.colors.put(data, data.id);
}

export async function removeColor(data: Pick<Color, 'id'>): Promise<void> {
  return await database.colors.delete(data.id);
}

export function useColor(id: Color['id']): Color | undefined {
  return useLiveQuery(() => getColor(id), [id]);
}

export function useColors(): Color[] {
  return useLiveQuery(getAllColors) || [];
}

export function useNeutralColor(): NeutralColor {
  const neutralColor = useLiveQuery(getNeutralColor);
  return neutralColor ?? defaultNeutralColor;
}
