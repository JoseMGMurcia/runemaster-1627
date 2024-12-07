import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { getSuccessLevel, rollDices } from '@shared/utils/dices.utils';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  InputComponent,
];

@Component({
  selector: 'app-resistance',
  standalone: true,
  imports,
  templateUrl: './resistance.component.html',
  styleUrl: './resistance.component.scss'
})
export class ResistanceComponent {

  @Output() rolled = new EventEmitter<string>();

  public form = new FormGroup({
    active: new FormControl(NUMBERS.N_14),
    passive: new FormControl(NUMBERS.N_14),
  });

  constructor(
    private readonly translate: TranslateService,
  ) { }

  public gettargetNumber(): number {
    const active = Number(this.form.get('active')?.value);
    const passive = Number(this.form.get('passive')?.value);
    const target = NUMBERS.N_50 - ((passive - active) * NUMBERS.N_5);
    return target > NUMBERS.N_5 ? target : NUMBERS.N_5;
  }

  public rollResistance(): void {
    const target = this.gettargetNumber();
    const result = rollDices(1, 100);
    const success = getSuccessLevel(target, result);
    const successMeg = this.translate.instant(`DICES.SUCCES_LEVEL.${success}`);
    const message = `${result} / ${target} : ${successMeg}`;
    this.rolled.emit(message);
  }

}
