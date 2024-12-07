import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Character } from '@shared/models/chartacter.model';
import { DEFAULT_MODAL_OPTIONS } from '@shared/models/modal.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { finalize } from 'rxjs';
import { EquipmentBonus, WeaponBonus, WeaponGroupEnum } from '@shared/models/equipment.models';
import { TranslateModule } from '@ngx-translate/core';
import { AddArmorComponent } from '../../modals/add-armor/add-armor.component';
import { AddWeaponComponent } from '../../modals/add-weapon/add-weapon.component';
import { CloneCharacterComponent } from '../../modals/clone-character/clone-character.component';
import { ChangeBodyComponent } from '../../modals/change-body/change-body.component';
import { TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';

const imports = [
  TranslateModule,
  TooltipContainerComponent,
]

@Component({
  selector: 'app-pj-utility',
  standalone: true,
  imports,
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss'
})
export class PjUtilityComponent {
  pj: Character | undefined = undefined;
  WeaponGroupEnum = WeaponGroupEnum;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modal: ModalService,
  ) {}

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

  addWeapon(mode: WeaponGroupEnum): void {
    this.modal.open(AddWeaponComponent, {
      ...DEFAULT_MODAL_OPTIONS,
      data: { mode },
      prevenCloseOutside: true,
    });
  }

  addArmor(): void {
    this.modal.open(AddArmorComponent, {
      ...DEFAULT_MODAL_OPTIONS,
      prevenCloseOutside: true,
    });
  }

  resetTemporals(): void {
    if (!this.pj) { return; }
    Object.values(this.pj.stats).forEach((stat) => stat.tempBonus = 0);
    this.pj.locations.forEach((location) => {
      location.temporalBonus.AP = 0;
      location.temporalBonus.HP = 0;
    });
    this.pj.armors.forEach((armor) => armor.temporalBonus = new EquipmentBonus());
    this.pj.weapons.forEach((weapon) => weapon.temporalBonus = new WeaponBonus());
  }

  cloneCharacter(): void {
    if (!this.pj) { return; }
    this.modal.open(CloneCharacterComponent, {
      ...DEFAULT_MODAL_OPTIONS,
      data: { pj: this.pj },
      prevenCloseOutside: true,
    });
  }

  changeBody(): void {
    this.modal.open(ChangeBodyComponent, {
      ...DEFAULT_MODAL_OPTIONS,
      prevenCloseOutside: true,
    });
  }
}
