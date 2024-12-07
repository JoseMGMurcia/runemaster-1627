import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { FumbleRangue } from '@shared/models/dices.model';
import { getFumbleText, getFumbles, rollDices } from '@shared/utils/dices.utils';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  InputComponent,
]

@Component({
  selector: 'app-fumbles',
  standalone: true,
  imports,
  templateUrl: './fumbles.component.html',
  styleUrl: './fumbles.component.scss'
})
export class FumblesComponent implements OnInit {
  public form = new FormGroup({
    fumble: new FormControl(NUMBERS.N_50),
  });

  private FUMBLES: FumbleRangue[] = [];

  constructor(
    private readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.FUMBLES = getFumbles(this.translate);
  }

  public rollFumble(): void {
    const result = rollDices(1, 100);
    this.form.get('fumble')?.setValue(result);
  }

  public getFumble(): string {
    const fumbleTarget = this.form.get('fumble')?.value || NUMBERS.N_0;
    return fumbleTarget > NUMBERS.N_0 && fumbleTarget <= NUMBERS.N_100 ? getFumbleText(fumbleTarget, this.FUMBLES) : '';
  }
}
