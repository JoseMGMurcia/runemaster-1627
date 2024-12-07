import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DB_DEFINITION, DB_NAME } from '../constants/db.constants';
import { NUMBERS } from '../constants/number.constants';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  static swConected = false;
  private readonly db = new Dexie(DB_NAME);

  async createDatabase() {
    this.closeDatabase();
    // Declare tables, IDs and indexes
    this.db.version(NUMBERS.N_3).stores(DB_DEFINITION);

    this.db.open().catch((error) => {
      DatabaseService.swConected = false;
      console.error('Failed to open database: ' + error);
      //TODO Status service and icon in the header
    }).then(() => {
      DatabaseService.swConected = true;
    });
  }

  async closeDatabase() {
    this.db.close();
  }

  async saveData(table: string, data: any[]) {
    data.forEach((element) => {
      this.db.table(table).put(element);
    });
  }

  async getData(table: string, id: number | string) {
    return this.db.table(table).get(id);
  }

  async getAllData(table: string) {
    return this.db.table(table).toArray();
  }

  async deleteData(table: string, id: number | string) {
    return this.db.table(table).delete(id);
  }

  async deleteAllData(table: string) {
    return this.db.table(table).clear();
  }

  async exportData() {
    // const blob = await this.db.export();
  }
}
