import { DatabaseService } from '../db.service';

class dbServiceStub {
  createDatabase() { return Promise.resolve(); }
  closeDatabase() { return Promise.resolve(); }
  saveData() { return Promise.resolve(); }
  getData() { return Promise.resolve(); }
  getAllData() { return Promise.resolve(); }
  deleteData() { return Promise.resolve(); }
  deleteAllData() { return Promise.resolve(); }

}

export const dbServiceMock = {
  provide: DatabaseService,
  useClass: dbServiceStub
};
