import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from './db.service';
import { DB_TABLES } from '../constants/db.constants';
import { Character } from '@shared/models/chartacter.model';
import { fixCharacter } from '@shared/utils/character.utils';

@Injectable({
  providedIn: 'root'
})
export class CharactersService implements OnDestroy{

  constructor(
    private readonly dbService: DatabaseService
  ) { }

  ngOnDestroy(): void {
    this.dbService.closeDatabase();
  }

  public get characters$(): Observable<Character[]> { return this.characters.asObservable();}
  public get character$(): Observable<Character> { return this.character.asObservable();}

  private readonly characters: BehaviorSubject<any> = new BehaviorSubject([]);
  private readonly character: BehaviorSubject<any> = new BehaviorSubject(null);


  public setCharacters(characters: Character[]): void {
    this.dbService.saveData(DB_TABLES.PJS, characters);
    this.characters.next(characters);
  }

  public setCharacter(character: Character): void {
    fixCharacter(character);
    this.character.next(character);
  }

  public updateOrAddCharacter(character: Character): void {
    character.lastUpdate = new Date();
    this.dbService.saveData(DB_TABLES.PJS, [character]);
    this.updateCharacters();
  }

  public deleteCharacter(character: Character): void {
    this.dbService.deleteData(DB_TABLES.PJS, character.id);
    this.updateCharacters();
  }

  private updateCharacters(): void {
    this.dbService.getAllData(DB_TABLES.PJS).then((characters: Character[]) => {
      this.setCharacters(characters);
    });
  }

  public async initDBConection() {
    await this.dbService.createDatabase();
    this.loadCharacters();
  }

  private async loadCharacters() {
    this.dbService.getAllData(DB_TABLES.PJS).then((characters: Character[]) => {
      this.setCharacters(characters);
      console.log(characters);
    });
  }
}
