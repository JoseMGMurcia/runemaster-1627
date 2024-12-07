import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatComponent } from './combat.component';
import { TranslateModule } from '@ngx-translate/core';
import { StatsComponent } from '@modules/+character/stats/stats.component';
import { Character } from '@shared/models/chartacter.model';
import { DialogOptions } from '@shared/models/modal.model';
import { TEST } from '@shared/constants/test.constant';

describe('CombatComponent', () => {
  let component: CombatComponent;
  let fixture: ComponentFixture<CombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [
        CombatComponent,
        StatsComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('swichCharacterIndex', () => {
    it('should switch character index correctly', () => {
      const order = 1;
      const initialIndex = 0;
      const newIndex = 1;
      const pnj = new Character('PNJ');
      const pnjs = [pnj];
      component.pnjs = pnjs;
      component.pnj = pnj;

      component.swichCharacterIndex(order);

      expect(component.pnj).toBe(pnjs[initialIndex]);
    });

    it('should wrap around to the last character when reaching the beginning', () => {
      const order = -1;
      const initialIndex = 0;
      const newIndex = 0;
      const pnj = new Character('PNJ');
      const pnjs = [pnj];
      component.pnjs = pnjs;
      component.pnj = pnj;

      component.swichCharacterIndex(order);

      expect(component.pnj).toBe(pnjs[newIndex]);
    });

    it('should wrap around to the first character when reaching the end', () => {
      const order = 1;
      const initialIndex = 0;
      const newIndex = 0;
      const pnj = new Character('PNJ');
      const pnjs = [pnj];
      component.pnjs = pnjs;
      component.pnj = pnj;

      component.swichCharacterIndex(order);

      expect(component.pnj).toBe(pnjs[newIndex]);
    });
  });

  describe('checkNewCharacter', () => {
    it('should do nothing if the character is undefined', () => {
      const pj: Character | undefined = undefined;
      const initialPnjs = [new Character('PNJ')];
      component.pnjs = initialPnjs;

      component['checkNewCharacter'](pj);

      expect(component.pnjs).toEqual(initialPnjs);
    });

    it('should do nothing if the character already exists in pnjs', () => {
      const pj = new Character('PNJ');
      const initialPnjs = [pj];
      component.pnjs = initialPnjs;

      component['checkNewCharacter'](pj);

      expect(component.pnjs).toEqual(initialPnjs);
    });

    it('should remove the default character if it is the only character and the new character has a name', () => {
      const pj = new Character('New Character');
      component.pnjs = [];
      component.pnj = new Character('');

      component['checkNewCharacter'](pj);

      expect(component.pnjs).toEqual([pj]);
      expect(component.pnj).toBe(pj);
    });
  });

  it('should remove the character and switch character index when close is called', () => {
    const spy = spyOn(component['modalService'], 'easyDialog');
    component.pnj = new Character(TEST);

    component.close();

    expect(spy).toHaveBeenCalledWith({
      title: 'UTILITY.ACTIONS.REMOVE_PJ.TITLE',
      message: 'UTILITY.ACTIONS.REMOVE_PJ.MESSAGE',
      buttons: [
        { label: 'COMMON.CANCEL' },
        {
          label: 'COMMON.ACCEPT',
          action: jasmine.any(Function),
          className: 'primary-button'
        }
      ]
    });
  });

  it('should remove the save characte', () => {
    const spy = spyOn(component['modalService'], 'easyDialog');
    component.pnj = new Character(TEST);

    component.save();

    expect(spy).toHaveBeenCalledWith({
      title: 'UTILITY.ACTIONS.SAVE_PJ.TITLE',
      message: 'UTILITY.ACTIONS.SAVE_PJ.MESSAGE',
      buttons: [
        { label: 'COMMON.CANCEL' },
        {
          label: 'COMMON.ACCEPT',
          action: jasmine.any(Function),
          className: 'primary-button'
        }
      ]
    });
  });
});
