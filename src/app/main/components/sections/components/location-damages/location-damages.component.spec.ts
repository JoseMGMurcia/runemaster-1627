import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDamagesComponent } from './location-damages.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '@shared/components/select/select.component';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationDamageEnum, LocationsEnum } from '@shared/models/location.model';

describe('LocationDamagesComponent', () => {
  let component: LocationDamagesComponent;
  let fixture: ComponentFixture<LocationDamagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        LocationDamagesComponent,
        SelectComponent,
        InputComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationDamagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getResult', () => {
    it('should return the correct result for LEG location', () => {
      component['selectedLocation'] = LocationsEnum.RIGHT_LEG;
      component['selectedDamage'] = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

      const result = component.getResult();

      expect(result).toBe('RULES.DAMAGE.EQUAL_OR_MORE_THAN_HP.LEG');
    });

    it('should return the correct result for ABDOMEN location', () => {
      component['selectedLocation'] = LocationsEnum.ABDOMEN;
      component['selectedDamage'] = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

      const result = component.getResult();

      expect(result).toBe('RULES.DAMAGE.EQUAL_OR_MORE_THAN_HP.ABDOMEN');
    });

    it('should return the correct result for CHEST location', () => {
      component['selectedLocation'] = LocationsEnum.CHEST;
      component['selectedDamage'] = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

      const result = component.getResult();

      expect(result).toBe('RULES.DAMAGE.EQUAL_OR_MORE_THAN_HP.CHEST');
    });

    it('should return the correct result for ARM location', () => {
      component['selectedLocation'] = LocationsEnum.LEFT_ARM;
      component['selectedDamage'] = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

      const result = component.getResult();

      expect(result).toBe('RULES.DAMAGE.EQUAL_OR_MORE_THAN_HP.ARM');
    });

    it('should return the correct result for HEAD location', () => {
      component['selectedLocation'] = LocationsEnum.HEAD;
      component['selectedDamage'] = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

      const result = component.getResult();

      expect(result).toBe('RULES.DAMAGE.EQUAL_OR_MORE_THAN_HP.HEAD');
    });

    it('should update selectedLocation with the provided location', () => {
      const location = LocationsEnum.RIGHT_LEG;
      component.locChange(location);

      expect(component['selectedLocation']).toBe(location);
    });

    it('should update selectedDamage with the provided damage', () => {
      const damage = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;
      component.dmgChange(damage);

      expect(component['selectedDamage']).toBe(damage);
    });

  });
});
