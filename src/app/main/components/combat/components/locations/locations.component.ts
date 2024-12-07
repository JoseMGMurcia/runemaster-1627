import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Armor } from '@shared/models/equipment.models';
import { Character } from '@shared/models/chartacter.model';
import { RQGLocation } from '@shared/models/location.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { getLocationArmors } from '@shared/utils/armor-utils';
import { getArmor, getLocationHp } from '@shared/utils/character-fields.utils';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ArmorComponent } from '../armor/armor.component';
import { StatusService } from '@shared/services/status.service';

const imports = [
  CommonModule,
  TranslateModule,
  TooltipContainerComponent,
  ArmorComponent,
];

@Component({
  selector: 'app-pj-locations',
  standalone: true,
  imports,
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class PjLocationsComponent implements OnInit {
  pj: Character | undefined = undefined;
  swShowLocations = true;
  RQGTooltipPositionEnum = RQGTooltipPositionEnum;
  private readonly _destroyRef = inject(DestroyRef);

  get locations(): RQGLocation[] {
    return this.pj?.locations || [];
  };

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly statusService: StatusService,
  ) {}

  switchShowLocations(): void {
    this.swShowLocations = !this.swShowLocations;
  }

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

    this.statusService.reload$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((reload) => {
      if (!reload) {return;}
      this.cdr.markForCheck();
    });
  }

  setHp(location: RQGLocation, variation: number): void {
    if (!this.pj) {return;}
    location.actualHPVariation += variation;
    this.pj.actualHPVariation += variation;
  }

  setNaturalArmor(location: RQGLocation, variation: number): void {
    location.naturalArmor += variation;
    location.naturalArmor = location.naturalArmor < NUMBERS.N_0 ? NUMBERS.N_0 : location.naturalArmor;
  }

  setPermanentPA(location: RQGLocation, variation: number): void {
    location.permanentBonus.AP += variation;
  }

  setPermanentHP(location: RQGLocation, variation: number): void {
    location.permanentBonus.HP += variation;
  }

  setTemporaryPA(location: RQGLocation, variation: number): void {
    location.temporalBonus.AP += variation;
  }

  setTemporaryHP(location: RQGLocation, variation: number): void {
    location.temporalBonus.HP += variation;
  }

  detail(location: RQGLocation): void {
    location.swShowDetail = !location.swShowDetail;
  }

  softReset(location: RQGLocation): void {
    location.actualHPVariation = NUMBERS.N_0;
    location.temporalBonus.AP = NUMBERS.N_0;
    location.temporalBonus.HP = NUMBERS.N_0;
  }

  hardReset(location: RQGLocation): void {
    this.softReset(location);
    location.permanentBonus.AP = NUMBERS.N_0;
    location.permanentBonus.HP = NUMBERS.N_0;
  }

  copyValuesToAll(location: RQGLocation): void {
    this.locations.forEach((loc) => {
      if (loc.type === location.type) {return;}
      loc.naturalArmor = location.naturalArmor
      loc.permanentBonus = location.permanentBonus;
      loc.temporalBonus = location.temporalBonus;
    });
  }

  gwtRowClass(index: number): string {
    return index % 2 === 0 ? 'odd' : 'even';
  }

  getHPClass(location: RQGLocation): string {
    if (!this.pj) {return STRING_EMPTY;}
    const negative = location.actualHPVariation > this.getLocationHp(location) * NUMBERS.MINUS_1 ;
    if (location.actualHPVariation > NUMBERS.MINUS_1) {return '';}
    else if (negative) {return 'yellow strong';}
    else {return 'red strong';}
  }

  getLocationHp(location: RQGLocation): number {
    if (!this.pj) {return 0;}
    return getLocationHp(this.pj, location);
  }

  getArmor(location: RQGLocation): number {
    if(!this.pj) { return NUMBERS.N_0; }
    return getArmor(this.pj, location);
  }

  getArmors(location: RQGLocation): Armor[] {
    if (!this.pj) {return [];}
    return getLocationArmors(location.type, this.pj);
  }
}
