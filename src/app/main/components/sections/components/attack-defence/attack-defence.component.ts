import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { SuccessLevelEnum } from '@shared/models/dices.model';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
];

@Component({
  selector: 'app-attack-defence',
  standalone: true,
  imports,
  templateUrl: './attack-defence.component.html',
  styleUrl: './attack-defence.component.scss'
})
export class AttackDefenceComponent implements OnInit {

  @ViewChild('attackComponent', { static: false }) attackComponent!: SelectComponent;

  public options: RQGOption[] = [];
  public actackSuccesLevel = SuccessLevelEnum.SUCCESS;
  public defenceSuccesLevel = SuccessLevelEnum.SUCCESS;
  public form = new FormGroup({
    attack: new FormControl(this.actackSuccesLevel),
    defence: new FormControl(this.defenceSuccesLevel),
  });

  public result = STRING_EMPTY;
  public dodgeResult = STRING_EMPTY;

  constructor(
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.options = this.getOptions();
    this.result = this.getResult();
    this.dodgeResult = this.getResult(true);
  }

  public attackChange(attack: string): void {
    this.actackSuccesLevel = attack as SuccessLevelEnum;
    this.result = this.getResult();
    this.dodgeResult = this.getResult(true);
  }

  public defenceChange(defence: string): void {
    this.defenceSuccesLevel = defence as SuccessLevelEnum;
    this.result = this.getResult();
    this.dodgeResult = this.getResult(true);
  }

  private getResult(dodge: boolean = false): string {
    return this.translate.instant(`RULES.ATTACK_RESULTS.${this.actackSuccesLevel}.${dodge ? 'DODGE_': 'DEF_'}${this.defenceSuccesLevel}`);
  }

  private getOptions(): RQGOption[] {
    return [
      { value: SuccessLevelEnum.CRITICAL, label: this.translate.instant(`DICES.SUCCES_LEVEL.${SuccessLevelEnum.CRITICAL}`) },
      { value: SuccessLevelEnum.SPECIAL, label: this.translate.instant(`DICES.SUCCES_LEVEL.${SuccessLevelEnum.SPECIAL}`) },
      { value: SuccessLevelEnum.SUCCESS, label: this.translate.instant(`DICES.SUCCES_LEVEL.${SuccessLevelEnum.SUCCESS}`), selected: true },
      { value: SuccessLevelEnum.FAILURE, label: this.translate.instant(`DICES.SUCCES_LEVEL.${SuccessLevelEnum.FAILURE}`) },
      { value: SuccessLevelEnum.FUMBLE, label: this.translate.instant(`DICES.SUCCES_LEVEL.${SuccessLevelEnum.FUMBLE}`) },
    ];
  }

}
