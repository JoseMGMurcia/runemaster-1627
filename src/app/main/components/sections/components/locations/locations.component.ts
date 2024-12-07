import { Component, OnInit } from '@angular/core';
import { DRAGONEWT_LOCATIONS, DRAGONEWT_WINGED_LOCATIONS, FLYING_BIRD_LOCATIONS, FLYING_INSECT_LOCATIONS, HUMAN_LOCATIONS, NON_FLYING_BIRD_LOCATIONS,
  QUADRUPED_LOCATIONS, SNAIL_DRAGON_LOCATIONS, TWO_HEAD_SNAIL_DRAGON_LOCATIONS } from '@shared/constants/races-location.constants';
import { RQGLocation } from '@shared/models/location.model';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { NgClass, NgFor, NgIf } from '@angular/common';

const imports = [
  TranslateModule,
  NgClass,
  NgFor,
  NgIf,
  ReactiveFormsModule,
  SelectComponent,
];

@Component({
  selector: 'app-locations',
  standalone: true,
  imports,
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit {
  public form = new FormGroup({
    species: new FormControl(STRING_EMPTY),
  });

  public locations: { [key: string]: RQGLocation[] } = {
    HUMAN_LOCATIONS,
    DRAGONEWT_LOCATIONS,
    DRAGONEWT_WINGED_LOCATIONS,
    QUADRUPED_LOCATIONS,
    FLYING_INSECT_LOCATIONS,
    SNAIL_DRAGON_LOCATIONS,
    TWO_HEAD_SNAIL_DRAGON_LOCATIONS,
    FLYING_BIRD_LOCATIONS,
    NON_FLYING_BIRD_LOCATIONS,
  };
  public options: RQGOption[] = [];

  public selectedLocations: RQGLocation[] = this.locations['HUMAN_LOCATIONS'];

  constructor(
    private readonly translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.options = this.getOptions();
  }

  public raceChange(specie: string): void {
    const selectedSpecie = this.options.find( opt => opt.value === specie)?.value ?? '';
    this.selectedLocations = this.locations[`${selectedSpecie}_LOCATIONS`] ;
  }

  private getOptions(): RQGOption[] {
    return Object.keys(this.locations).map( key => {
      const species = key.substring(0, key.lastIndexOf('_'));
      return {value: species, label: this.translate.instant(`LOCATIONS.RACES_TYPES.${species}`)};
    });
  }
}
