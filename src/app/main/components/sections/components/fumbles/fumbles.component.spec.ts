import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FumblesComponent } from './fumbles.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiceRoll } from '@shared/models/dices.model';

describe('FumblesComponent', () => {
  let component: FumblesComponent;
  let fixture: ComponentFixture<FumblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        FumblesComponent,
        InputComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FumblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should roll a fumble', () => {
    const diceRollSpy = spyOn(DiceRoll.prototype, 'roll').and.returnValue(42);
    component.rollFumble();
    expect(diceRollSpy).toHaveBeenCalled();
    expect(component.form.get('fumble')?.value).toEqual(42);
  });
});
