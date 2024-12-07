import { Character } from '@shared/models/chartacter.model';
import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
  characters!: Table<Character, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      characters: '++id',
    });
    this.open();
  }




}

export const db = new AppDB();
