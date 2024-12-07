import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityComponent } from './utility.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { SectionsComponent } from '../sections/containers/sections/sections.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SectionEnum } from './utility.model';

describe('UtilityComponent', () => {
  let component: UtilityComponent;
  let fixture: ComponentFixture<UtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        UtilityComponent,
        InputComponent,
        SectionsComponent,
        SelectComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addResults', () => {
    it('should add the result to the results array', () => {
      const result = '42';
      component.addResults(result);
      expect(component.results).toContain(result);
    });

    it('should convert the result to a string before adding it to the array', () => {
      const result = 42;
      component.addResults(result);
      expect(component.results).toContain(result.toString());
    });

    it('should remove the first element from the results array if it exceeds the maximum length', () => {
      component.results = ['1', '2', '3'];
      const result = '4';
      component.addResults(result);
      expect(component.results).toEqual(['2', '3', '4']);
    });

    it('should not remove any element from the results array if it does not exceed the maximum length', () => {
      component.results = ['1', '2'];
      const result = '3';
      component.addResults(result);
      expect(component.results).toEqual(['1', '2', '3']);
    });
  });


  describe('rollDices', () => {
    it('should add the total of cutted dice rolls to the results array', () => {
      const diceRoll = '13+2';
      const total = 15;
      component.form.controls['diceRoll'].setValue(diceRoll);
      spyOn(component, 'addResults');

      component.rollDices();

      expect(component.addResults).toHaveBeenCalledWith(total.toString());
    });
  });

  it('should add the result of a d20 roll to the results array', () => {
    const spy = spyOn(component, 'addResults');
    spyOn<any>(component['d20Roll'], 'roll').and.returnValue(20);

    component.rollD20();

    expect(spy).toHaveBeenCalledWith(20);
  });

  it('should add the result of a d20 roll to the results array', () => {
    const spy = spyOn(component, 'addResults');
    spyOn<any>(component['d100Roll'], 'roll').and.returnValue(100);

    component.rollD100();

    expect(spy).toHaveBeenCalledWith(100);
  });

  it('should update the section property with the provided section', () => {
    const section = 'section1';
    component.sectionChange(section);
    expect(component.section).toEqual(section);
  });

});
