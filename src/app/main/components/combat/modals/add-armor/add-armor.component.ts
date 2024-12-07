import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Armor } from '@shared/models/equipment.models';
import { Character } from '@shared/models/chartacter.model';
import { ModalDataGet } from '@shared/models/modal.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { finalize } from 'rxjs';
import { ARMORS } from '@shared/constants/equipment-constants';

const imports = [
  ReactiveFormsModule,
  SelectComponent ,
  TranslateModule,
];

@Component({
  selector: 'app-add-armor',
  standalone: true,
  imports,
  templateUrl: './add-armor.component.html',
  styleUrl: './add-armor.component.scss'
})
export class AddArmorComponent extends ModalDataGet implements OnInit {
  pj: Character | undefined = undefined;
  armorOptions: RQGOption[] = [];
  form = new FormGroup({
    armor: new FormControl(STRING_EMPTY),
  });
  selectedArmor: Armor | undefined = undefined;

  private readonly _destroyRef = inject(DestroyRef);
  private armorGroup: Armor[] = ARMORS;

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
  ) {
    super();
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
        this.armorOptions = this.getArmorOptions();
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });
  }

  handleCancel(): void {
    this.modalService.close();
  }

  armorChange(event: string): void {
    this.selectedArmor = this.armorGroup.find((armor) => armor.name === event);
  }

  handleAdd(): void {
    if (!this.selectedArmor) {return;}
    const armor: Armor = {
      ...this.selectedArmor,
      equipped: true,
    };
    this.pj?.armors.push(armor);
    this.modalService.close();
  }

  private getArmorOptions(): RQGOption[] {
    const armortexts = this.translate.instant('ARMORS');
    const armors: RQGOption[] = this.armorGroup.map((armor) => ({
      value: armor.name,
      label: `${armortexts.TYPES[armor.type]} - ${armortexts.MATERIALS[armor.material]} - ${armor.armorPoints} ${armortexts.AP}`,
    }));

    const pjArmors = this.pj?.armors || [];
    armors.sort((a, b) => a.label.localeCompare(b.label));
    const filteredArmors = armors.filter((armor) => !pjArmors.find((pjArmor) => pjArmor.name === armor.value));

    const firstValue = filteredArmors[NUMBERS.N_0].value;
    this.selectedArmor = this.armorGroup.find((armor) => armor.name === firstValue);
    return armors;
  }
}
