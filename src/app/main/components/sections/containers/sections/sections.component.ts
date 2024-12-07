import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { SectionEnum } from '../../../utility/utility.model';
import { CommonModule } from '@angular/common';
import { FumblesComponent } from '../../components/fumbles/fumbles.component';
import { LocationsComponent } from '../../components/locations/locations.component';
import { ResistanceComponent } from '../../components/resistance/resistance.component';
import { AttackDefenceComponent } from '../../components/attack-defence/attack-defence.component';
import { LocationDamagesComponent } from '../../components/location-damages/location-damages.component';
import { SorceryCalendarComponent } from '../../components/sorcery-calendar/sorcery-calendar.component';
import { SpellsComponent } from '../../components/spells/spells.component';
import { CharactersComponent } from '../../components/characters/characters.component';

const imports = [
  CommonModule,
  TranslateModule,
  ReactiveFormsModule,
  AttackDefenceComponent,
  SelectComponent,
  FumblesComponent,
  LocationsComponent,
  LocationDamagesComponent,
  ResistanceComponent,
  SorceryCalendarComponent,
  SpellsComponent,
  CharactersComponent,
];

@Component({
  selector: 'app-sections',
  standalone: true,
  imports,
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss'
})
export class SectionsComponent implements OnInit{

  @Input() section: SectionEnum = SectionEnum.Locations;

  @Output() results = new EventEmitter<string>();

  public form = this.getForm();
  public options: RQGOption[] = [];
  public SectionEnum = SectionEnum;

  constructor(
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.options = this.getOptions();
    this.form.controls.section.setValue(this.section);
  }

  public sectionChange(section: string): void {
    this.section = section as SectionEnum;
  }

  private getOptions(): RQGOption[] {
    return [
      { label: this.translate.instant('UTILITY.SECTIONS.LOCATIONS'), value: SectionEnum.Locations, selected: this.section === SectionEnum.Locations },
      { label: this.translate.instant('UTILITY.SECTIONS.RESISTANCES'), value: SectionEnum.Resistances, selected: this.section === SectionEnum.Resistances },
      { label: this.translate.instant('UTILITY.SECTIONS.ATACK_DEFENCE'), value: SectionEnum.AtackDefence, selected: this.section === SectionEnum.AtackDefence },
      { label: this.translate.instant('UTILITY.SECTIONS.FUMBLES'), value: SectionEnum.Fumbles, selected: this.section === SectionEnum.Fumbles },
      { label: this.translate.instant('UTILITY.SECTIONS.LOCATION_DAMAGES'), value: SectionEnum.LocationDamages, selected: this.section === SectionEnum.LocationDamages },
      { label: this.translate.instant('UTILITY.SECTIONS.CHARACTERS'), value: SectionEnum.Characters, selected: this.section === SectionEnum.Characters },
      { label: this.translate.instant('UTILITY.SECTIONS.SORCERY_CALENDAR'), value: SectionEnum.SorceryCalendar, selected: this.section === SectionEnum.SorceryCalendar },
      { label: this.translate.instant('UTILITY.SECTIONS.SPELLS'), value: SectionEnum.Spells, selected: this.section === SectionEnum.Spells },
    ];
  }

  private getForm() {
    return new FormGroup({
      section: new FormControl(this.section),
    });
  }

  public addResults(result: string | number): void {
    this.results.emit(result.toString());
  }
}
