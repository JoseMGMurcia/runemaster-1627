import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackDefenceComponent } from './attack-defence.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '@shared/components/select/select.component';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessLevelEnum } from '@shared/models/dices.model';

describe('AttackDefenceComponent', () => {
  let component: AttackDefenceComponent;
  let fixture: ComponentFixture<AttackDefenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        AttackDefenceComponent,
        SelectComponent,
        InputComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackDefenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update attack success level, result, and dodge result on attackChange', () => {
    component.actackSuccesLevel = SuccessLevelEnum.CRITICAL;
    component.defenceSuccesLevel = SuccessLevelEnum.SUCCESS;
    const attack = SuccessLevelEnum.CRITICAL;
    const expectedResult = 'RULES.ATTACK_RESULTS.CRITICAL.DEF_SUCCESS';
    const expectedDodgeResult = 'RULES.ATTACK_RESULTS.CRITICAL.DODGE_SUCCESS';

    component.attackChange(attack);

    expect(component.actackSuccesLevel).toEqual(SuccessLevelEnum.CRITICAL);
    expect(component.result).toEqual(expectedResult);
    expect(component.dodgeResult).toEqual(expectedDodgeResult);
  });

  it('should update defence success level, result, and dodge result on defenceChange', () => {
    const defence = SuccessLevelEnum.SUCCESS;
    const expectedResult = 'RULES.ATTACK_RESULTS.SUCCESS.DEF_SUCCESS';
    const expectedDodgeResult = 'RULES.ATTACK_RESULTS.SUCCESS.DODGE_SUCCESS';

    component.defenceChange(defence);

    expect(component.defenceSuccesLevel).toEqual(SuccessLevelEnum.SUCCESS);
    expect(component.result).toEqual(expectedResult);
    expect(component.dodgeResult).toEqual(expectedDodgeResult);
  });
});
