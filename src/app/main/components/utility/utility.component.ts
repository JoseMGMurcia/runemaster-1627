import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getTotal, rollDices } from '@shared/utils/dices.utils';
import { NUMBERS } from '@shared/constants/number.constants';
import { cutDicesRolls } from '@shared/utils/message.utils';
import { RQGOption } from '@shared/components/select/select.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionEnum } from './utility.model';
import { stringFrom } from '@shared/utils/string.utils';
import { StatusService } from '@shared/services/status.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputComponent } from '@shared/components/input/input.component';
import { NgClass, NgFor } from '@angular/common';
import { SectionsComponent } from '../sections/containers/sections/sections.component';

const imports = [
  NgClass,
  ReactiveFormsModule,
  TranslateModule,
  InputComponent,
  NgFor,
  SectionsComponent,
];

@Component({
  selector: 'app-utility',
  standalone: true,
  imports,
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss'
})
export class UtilityComponent implements OnInit {

  public form = this.getForm();
  public results: string[] = [];
  public options: RQGOption[] =[];
  public section = SectionEnum.Locations;
  public SectionEnum = SectionEnum;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly translate: TranslateService,
    private readonly statusService: StatusService,
  ) {}

  ngOnInit(): void {
    this.subscribeToStatusResults();
    this.options = this.getOptions()
  }

  public rollDices(): void {
    const cuttedRolls = cutDicesRolls(stringFrom(this.form.controls.diceRoll.value));
    this.addResults(getTotal(cuttedRolls).toString());
  }

  public rollD4(): void {
    this.addResults(rollDices(1, 4));
  }

  public rollD6(): void {
    this.addResults(rollDices(1, 6));
  }

  public rollD8(): void {
    this.addResults(rollDices(1, 8));
  }

  public rollD10(): void {
    this.addResults(rollDices(1, 10));
  }

  public rollD20(): void {
    this.addResults(rollDices(1, 20));
  }

  public rollD100(): void {
    this.addResults(rollDices(1, 100));
  }

  public sectionChange(section: string): void {
    this.section = section as SectionEnum;
  }

  public addResults(result: string | number): void {
    this.results.push(result.toString());
    if (this.results.length > NUMBERS.N_5) {
      this.results.splice(NUMBERS.N_0, NUMBERS.N_1);
    }
  }

  private subscribeToStatusResults(): void {
    this.statusService.resultPending$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (result) => {
        this.addResults(result);
      }
    });
  }

  private getOptions(): RQGOption[] {
    return [
      { label: this.translate.instant('UTILITY.SECTIONS.LOCATIONS'), value: SectionEnum.Locations },
      { label: this.translate.instant('UTILITY.SECTIONS.RESISTANCES'), value: SectionEnum.Resistances },
      { label: this.translate.instant('UTILITY.SECTIONS.ATACK_DEFENCE'), value: SectionEnum.AtackDefence },
      { label: this.translate.instant('UTILITY.SECTIONS.FUMBLES'), value: SectionEnum.Fumbles },
      { label: this.translate.instant('UTILITY.SECTIONS.LOCATION_DAMAGES'), value: SectionEnum.LocationDamages },
    ];
  }

  private getForm() {
    return new FormGroup({
      diceRoll: new FormControl('d8+1'),
    });
  }

}
