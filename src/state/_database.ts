import Dexie, { Table } from 'dexie';
import { Color } from '../types';

export type DatabaseColor = Omit<Color, 'base'> & {
  base: string;
};

export class DexieDatabase extends Dexie {
  colors!: Table<DatabaseColor, string>;

  constructor() {
    super('color-palette-generator');
    this.version(1).stores({
      colors: '++label',
    });
  }
}

const database = new DexieDatabase();

export default database;
