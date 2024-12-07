import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { DayEnum, LuneEnum, RQCalendarSorceryBonus, SeasonEnum, WeekEnum } from '@shared/models/calendar.models';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
];

@Component({
  selector: 'app-sorcery-calendar',
  standalone: true,
  imports,
  templateUrl: './sorcery-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SorceryCalendarComponent implements OnInit {

  seasonOptions: RQGOption[] = [];
  weekOptions: RQGOption[] = [];
  sacredTimeWeeks: RQGOption[] = [];
  dayOptions: RQGOption[] = [];
  bonus = new RQCalendarSorceryBonus();
  lune: LuneEnum = LuneEnum.CRESCENT;

  form = new FormGroup({
    season: new FormControl(''),
    week: new FormControl(''),
    day: new FormControl(''),
  });

  private _sekectedSeason: SeasonEnum = SeasonEnum.SEA;
  private _selectedWeek: WeekEnum = WeekEnum.DISORDER;
  private _selectedDay: DayEnum = DayEnum.COLD;


 constructor(
    private readonly translate: TranslateService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.seasonOptions = this.getSeasonOptions();
    this.weekOptions = this.getWeekOptions();
    this.sacredTimeWeeks = this.getSacredTimeWeeks();
    this.dayOptions = this.getDayOptions();
    this.form.get('season')?.setValue(this._sekectedSeason);
    this.form.get('week')?.setValue(this._selectedWeek);
    this.form.get('day')?.setValue(this._selectedDay);
    this.renewBonus();
    this.cdr.markForCheck();
  }

  seasonChange(season: string): void {
    this._sekectedSeason = season as SeasonEnum;
    if(this._sekectedSeason === SeasonEnum.SACRED_TIME && this.weekOptions.length > NUMBERS.N_2) {
      this.weekOptions = this.sacredTimeWeeks;
      const week = this._selectedWeek === WeekEnum.LUCK || this._selectedWeek === WeekEnum.FATE ? this._selectedWeek : WeekEnum.LUCK;
      this.form.controls.week.setValue(week);
      this._selectedWeek = week;

    } else if (this._sekectedSeason !== SeasonEnum.SACRED_TIME && this.weekOptions.length === NUMBERS.N_2) {
      this.weekOptions = this.getWeekOptions();
      const week = this._selectedWeek === WeekEnum.LUCK || this._selectedWeek === WeekEnum.FATE ? WeekEnum.DISORDER : this._selectedWeek;
      this.form.controls.week.setValue(week);
      this._selectedWeek = week;
    }
    this.renewBonus();
  }

  weekChange(week: string): void {
    this._selectedWeek = week as WeekEnum;
    this.renewBonus();
  }

  dayChange(day: string): void {
    this._selectedDay = day as DayEnum;
    this.renewBonus();
  }

  private renewBonus(): void {
    const bonus = new RQCalendarSorceryBonus();
    const seasonMapper = this.getBonusSeasonMapper();
    const weekMapper = this.getBonusWeekMapper();
    const dayMapper = this.getDayMapper();

    seasonMapper[this._sekectedSeason](bonus);
    weekMapper[this._selectedWeek](bonus);
    dayMapper[this._selectedDay](bonus);

    this.bonus = bonus;
  }

  private getBonusSeasonMapper() {
    return {
      [SeasonEnum.SEA]: (bonus: RQCalendarSorceryBonus) => {
        bonus.water += NUMBERS.N_5;
        bonus.fire += NUMBERS.MINUS_15;
      },
      [SeasonEnum.FIRE]: (bonus: RQCalendarSorceryBonus) => {
        bonus.fire += NUMBERS.N_5;
        bonus.darkness += NUMBERS.MINUS_15;
      },
      [SeasonEnum.EARTH]: (bonus: RQCalendarSorceryBonus) => {
        bonus.earth += NUMBERS.N_5;
        bonus.wind += NUMBERS.MINUS_15;
      },
      [SeasonEnum.DARKNESS]: (bonus: RQCalendarSorceryBonus) => {
        bonus.darkness += NUMBERS.N_5;
        bonus.earth += NUMBERS.MINUS_15;
      },
      [SeasonEnum.STORM]:(bonus: RQCalendarSorceryBonus) => {
        bonus.wind += NUMBERS.N_5;
        bonus.water += NUMBERS.MINUS_15;
      },
      [SeasonEnum.SACRED_TIME]:(bonus: RQCalendarSorceryBonus) => null,
    };
  }

  private getBonusWeekMapper() {
    return {
      [WeekEnum.DISORDER]: (bonus: RQCalendarSorceryBonus) => {
        bonus.disorder += NUMBERS.N_10;
        bonus.harmony += NUMBERS.MINUS_10;
      },
      [WeekEnum.HARMONY]: (bonus: RQCalendarSorceryBonus) => {
        bonus.harmony += NUMBERS.N_10;
        bonus.disorder += NUMBERS.MINUS_10;
      },
      [WeekEnum.DEATH]: (bonus: RQCalendarSorceryBonus) => {
        bonus.death += NUMBERS.N_10;
        bonus.fertility += NUMBERS.MINUS_10;
      },
      [WeekEnum.FERTILITY]: (bonus: RQCalendarSorceryBonus) => {
        bonus.fertility += NUMBERS.N_10;
        bonus.death += NUMBERS.MINUS_10;
      },
      [WeekEnum.STASIS]: (bonus: RQCalendarSorceryBonus) => {
        bonus.stasis += NUMBERS.N_10;
        bonus.movement += NUMBERS.MINUS_10;
      },
      [WeekEnum.MOVEMENT]: (bonus: RQCalendarSorceryBonus) => {
        bonus.movement += NUMBERS.N_10;
        bonus.stasis += NUMBERS.MINUS_10;
      },
      [WeekEnum.ILLUSION]: (bonus: RQCalendarSorceryBonus) => {
        bonus.illusion += NUMBERS.N_10;
        bonus.truth += NUMBERS.MINUS_10;
      },
      [WeekEnum.TRUTH]: (bonus: RQCalendarSorceryBonus) => {
        bonus.truth += NUMBERS.N_10;
        bonus.illusion += NUMBERS.MINUS_10;
      },
      [WeekEnum.FATE]: (bonus: RQCalendarSorceryBonus) => null,
      [WeekEnum.LUCK]: (bonus: RQCalendarSorceryBonus) => null,
    };
  }

  private getDayMapper() {
    return {
      [DayEnum.COLD]: (bonus: RQCalendarSorceryBonus) => {
        bonus.darkness += NUMBERS.N_10;
        bonus.earth += NUMBERS.MINUS_10;
        this.lune = LuneEnum.CRESCENT;
      },
      [DayEnum.WATER]: (bonus: RQCalendarSorceryBonus) => {
        bonus.water += NUMBERS.N_10;
        bonus.fire += NUMBERS.MINUS_10;
        this.lune = LuneEnum.NEW;
      },
      [DayEnum.CLAY]: (bonus: RQCalendarSorceryBonus) => {
        bonus.earth += NUMBERS.N_10;
        bonus.wind += NUMBERS.MINUS_10;
        this.lune = LuneEnum.NEW;
      },
      [DayEnum.WILD]: (bonus: RQCalendarSorceryBonus) => {
        bonus.wind += NUMBERS.N_10;
        bonus.water += NUMBERS.MINUS_10;
        this.lune = LuneEnum.CRESCENT;
      },
      [DayEnum.FIRE]: (bonus: RQCalendarSorceryBonus) => {
        bonus.fire += NUMBERS.N_10;
        bonus.darkness += NUMBERS.MINUS_10;
        this.lune = LuneEnum.HALF;
      },
      [DayEnum.SAVAGE]: (bonus: RQCalendarSorceryBonus) => {
        bonus.notElemental += NUMBERS.N_10;
        this.lune = LuneEnum.FULL;
      },
      [DayEnum.HOLY]: (bonus: RQCalendarSorceryBonus) => {
        this.lune = LuneEnum.HALF;
      },
    };
  }

  private getSeasonOptions(): RQGOption[] {
    const texts = this.translate.instant('CALENDAR.SEASONS');
    return [
      {value: SeasonEnum.SEA, label: texts.SEA},
      {value: SeasonEnum.FIRE, label: texts.FIRE},
      {value: SeasonEnum.EARTH, label: texts.EARTH},
      {value: SeasonEnum.DARKNESS, label: texts.DARKNESS},
      {value: SeasonEnum.STORM, label: texts.STORM},
      {value: SeasonEnum.SACRED_TIME, label: texts.SACRED_TIME},
    ];
  }

  private getWeekOptions(): RQGOption[] {
    const texts = this.translate.instant('CALENDAR.WEENKS');
    return [
      {value: WeekEnum.DISORDER, label: texts.DISORDER},
      {value: WeekEnum.DEATH, label: texts.DEATH},
      {value: WeekEnum.FERTILITY, label: texts.FERTILITY},
      {value: WeekEnum.STASIS, label: texts.STASIS},
      {value: WeekEnum.MOVEMENT, label: texts.MOVEMENT},
      {value: WeekEnum.ILLUSION, label: texts.ILLUSION},
      {value: WeekEnum.TRUTH, label: texts.TRUTH},
    ];
  }

  private getSacredTimeWeeks(): RQGOption[] {
    const texts = this.translate.instant('CALENDAR.WEENKS');
    return [
      {value: WeekEnum.LUCK, label: texts.LUCK},
      {value: WeekEnum.FATE, label: texts.FATE},
    ];
  }

  private getDayOptions(): RQGOption[] {
    const texts = this.translate.instant('CALENDAR.DAYS');
    return [
      {value: DayEnum.COLD, label: texts.COLD},
      {value: DayEnum.WATER, label: texts.WATER},
      {value: DayEnum.CLAY, label: texts.CLAY},
      {value: DayEnum.WILD, label: texts.WILD},
      {value: DayEnum.FIRE, label: texts.FIRE},
      {value: DayEnum.SAVAGE, label: texts.SAVAGE},
      {value: DayEnum.HOLY, label: texts.HOLY},
    ];
  }
}
