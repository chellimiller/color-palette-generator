import Dexie, { Table } from 'dexie';
import { Color, NeutralColor } from '../types';

export class DexieDatabase extends Dexie {
  colors!: Table<Color, Color['id']>;

  constructor() {
    super('color-palette-generator');
    this.version(1).stores({
      colors: '++id',
    });
  }
}

const database = new DexieDatabase();

type ColorModifierParams<
  P extends Record<string, unknown>,
  C extends Color
> = P & {
  color: C;
};

interface ColorModifier<P extends Record<string, unknown>> {
  <C extends Color>(params: ColorModifierParams<P, C>): Promise<C['id']>;
}

export function createColorModifier<P extends Record<string, unknown>>(
  modifier: <C extends Color>(
    color: C,
    params: Omit<ColorModifierParams<P, C>, 'color'>
  ) => C
): ColorModifier<P> {
  return async <C extends Color>({
    color,
    ...params
  }: ColorModifierParams<P, C>): Promise<C['id']> => {
    const next = modifier<C>(color, params);
    console.log({ color, next });
    if (color === next) return color.id;
    console.log('asdf');
    return await database.colors.put({ ...next, id: color.id }, color.id);
  };
}

interface NeutralColorModifier<P extends Record<string, unknown>> {
  (params: ColorModifierParams<P, NeutralColor>): Promise<NeutralColor['id']>;
}

export function createNeutralColorModifier<P extends Record<string, unknown>>(
  modifier: (
    color: NeutralColor,
    params: Omit<ColorModifierParams<P, NeutralColor>, 'color'>
  ) => NeutralColor
): NeutralColorModifier<P> {
  return createColorModifier<P>(modifier as any) as NeutralColorModifier<P>;
}

export default database;
