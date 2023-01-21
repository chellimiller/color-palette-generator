import Dexie, { Table } from 'dexie';
import { ColorPalette } from '../types';

export class DexieDatabase extends Dexie {
  colors!: Table<ColorPalette, string>;

  constructor() {
    super('color-palette-generator');
    this.version(1).stores({
      colors: '++id, name',
    });
  }
}

const database = new DexieDatabase();

export default database;
