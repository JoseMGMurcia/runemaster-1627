import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character } from '@shared/models/chartacter.model';
import { RQGLocation } from '@shared/models/location.model';
import { DRAGONEWT_LOCATIONS, DRAGONEWT_WINGED_LOCATIONS, FLYING_INSECT_LOCATIONS, HUMAN_LOCATIONS, QUADRUPED_LOCATIONS, SNAIL_DRAGON_LOCATIONS,
  TWO_HEAD_SNAIL_DRAGON_LOCATIONS } from '@shared/constants/races-location.constants';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { finalize } from 'rxjs';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
];

@Component({
  selector: 'app-change-body',
  standalone: true,
  imports,
  templateUrl: './change-body.component.html',
  styleUrl: './change-body.component.scss'
})
export class ChangeBodyComponent implements OnInit {
  pj: Character | undefined = undefined;
  public form = new FormGroup({
    species: new FormControl(STRING_EMPTY),
  });

  public locations: { [key: string]: RQGLocation[] } = {
    HUMAN_LOCATIONS,
    DRAGONEWT_LOCATIONS,
    DRAGONEWT_WINGED_LOCATIONS,
    QUADRUPED_LOCATIONS,
    FLIYING_INSECT_LOCATIONS: FLYING_INSECT_LOCATIONS,
    SNAIL_DRAGON_LOCATIONS,
    TWO_HEAD_SNAIL_DRAGON_LOCATIONS,
  };
  public options: RQGOption[] = this.getOptions();
  public selectedLocations: RQGLocation[] = this.locations['HUMAN_LOCATIONS'];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe({
      next: (character) => {
        if (!character) {return;}
        this.pj = character;
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });
  }

  handleCancel(): void {
    this.modalService.close();
  }

  raceChange(specie: string): void {
    const selectedSpecie = this.options.find( opt => opt.value === specie)?.value ?? '';
    this.selectedLocations = this.locations[`${selectedSpecie}_LOCATIONS`] ;
  }

  handleAdd(): void {
    if(!this.pj) {return;}
    this.pj.locations = this.selectedLocations;
    this.modalService.close();
  }

  private getOptions(): RQGOption[] {
    return Object.keys(this.locations).map( key => {
      const species = key.substring(0, key.lastIndexOf('_'));
      return {value: species, label: this.translate.instant(`LOCATIONS.RACES_TYPES.${species}`)};
    });
  }

}
