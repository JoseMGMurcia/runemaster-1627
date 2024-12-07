import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CharactersComponent } from './characters.component';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { dbServiceMock } from '@shared/services/spec/db.mock';
import { Character } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { TEST } from '@shared/constants/test.constant';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let charactersService: CharactersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        CharactersComponent,
        SelectComponent,
        InputComponent,
      ],
      providers: [
        dbServiceMock,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    charactersService = TestBed.inject(CharactersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new character',fakeAsync(() => {
    component.form.controls['newCharacter'].setValue(TEST);

    component.newCharacter();

    tick();

    component['charactersService'].character$.subscribe((character: Character) => {
      expect(character.name).toEqual(TEST);
    });
  }));

  it('should set existing character', () => {
    const id = '1';
    const existingCharacter = { id: 1, name: TEST };
    component['pjs'] = [
      { id: 1, name: TEST } as Character,
      { id: 2, name: TEST } as Character,
    ];

    component.setExistingCharacter(id);

    expect(component['existingCharacter']).toEqual(existingCharacter as Character);
  });

  it('should not set existing character if id is not found', () => {
    const id = '3';
    component['pjs'] = [
      { id: 1, name: TEST } as Character,
      { id: 2, name: TEST } as Character,
    ];

    component.setExistingCharacter(id);

    expect(component['existingCharacter']).toBeUndefined();
  });

  it('should add existing character', () => {
    component['existingCharacter'] = { id: 1, name: TEST } as Character;
    const setCharacterSpy = spyOn(component['charactersService'], 'setCharacter');

    component.addExistingCharacter();

    expect(setCharacterSpy).toHaveBeenCalledWith({ id: 1, name: TEST } as Character);
  });

  it('should not add existing character', () => {
    component['existingCharacter'] = undefined;
    const setCharacterSpy = spyOn(component['charactersService'], 'setCharacter');

    component.addExistingCharacter();

    expect(setCharacterSpy).not.toHaveBeenCalled();
  });

  it('should get options', () => {
    const mockPjs = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ];
    component['pjs'] = mockPjs as Character[];

    const expectedOptions: RQGOption[] = [
      { value: '1', label: 'Character 1' },
      { value: '2', label: 'Character 2' },
    ];

    const options = component['getOptions']();

    expect(options).toEqual(expectedOptions);
  });

  it('should set existing character with the first option', () => {
    const mockPjs = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ];
    component['pjs'] = mockPjs as Character[];

    const expectedExistingCharacter = { id: 1, name: 'Character 1' } as Character;

    component['getOptions']();

    expect(component['existingCharacter']).toEqual(expectedExistingCharacter);
  });

  it('should not set existing character if there are no options', () => {
    const mockPjs: Character[] = [];
    component['pjs'] = mockPjs;

    component['getOptions']();

    expect(component['existingCharacter']).toBeUndefined();
  });
});
