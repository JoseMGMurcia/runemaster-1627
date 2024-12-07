import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { finalize } from 'rxjs';
import { ModalDataGet } from '@shared/models/modal.model';
import { CombatSkill } from '@shared/models/skill.models';
import { Weapon, WeaponGroupEnum } from '@shared/models/equipment.models';
import { numberFrom } from '@shared/utils/number.utils';
import { MELEE_WEAPONS, RANGED_WEAPONS, SHIELDS } from '@shared/constants/equipment-constants';
import { InputComponent } from '@shared/components/input/input.component';
import { StatusService } from '@shared/services/status.service';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
  InputComponent,
];

@Component({
  selector: 'app-add-weapon',
  standalone: true,
  imports,
  templateUrl: './add-weapon.component.html',
  styleUrl: './add-weapon.component.scss'
})
export class AddWeaponComponent extends ModalDataGet implements OnInit {
  pj: Character | undefined = undefined;
  weaponOptions: RQGOption[] = [];
  selectedWeapon: Weapon | undefined = undefined;
  groupMode: WeaponGroupEnum = WeaponGroupEnum.MELEE;

  form = new FormGroup({
    weapon: new FormControl(STRING_EMPTY),
    skill: new FormControl<number | null>({value: null, disabled: true}),
    includeSkill: new FormControl(false),
  });

  private readonly _destroyRef = inject(DestroyRef);
  private weaponGroup: Weapon[] = MELEE_WEAPONS;

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
    private readonly statusService: StatusService,
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(MELEE_WEAPONS);
    this.getMode();
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe({
      next: (character) => {
        if (!character) {return;}
        this.pj = character;
        this.weaponOptions = this.getWeaponOptions();
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });

  }

  handleAdd(): void {
    if (!this.selectedWeapon) {return;}
    this.pj?.weapons.push(this.selectedWeapon);
    const swAddSkill = this.form.controls.includeSkill.value;
    if (swAddSkill) {
      this.addSkill();
    }
    this.statusService.setReload(true);
    this.modalService.close();
  }

  weaponChange(event: string): void {
    this.selectedWeapon = this.weaponGroup.find((weapon) => weapon.name === event);
  }

  handleCancel(): void {
    this.modalService.close();
  }

  handleIncludeSkillChange(): void {
    const value = this.form.controls.includeSkill.value;
    if (value) {
      this.form.controls.skill.enable();
      this.form.controls.skill.setValue(NUMBERS.N_5);
    } else {
      this.form.controls.skill.disable();
      this.form.controls.skill.setValue(null);
    }
  }

  private getMode(): void {
    if (!this.data || !this.data['mode']) {
      return;
    }
    const mode = this.data['mode'];
    this.groupMode = mode;
  }

  private addSkill(): void {
    if (!this.pj || !this.selectedWeapon) {return;}
    const weapon = this.selectedWeapon;
    const skillvalue = numberFrom(this.form.controls.skill.value ?? NUMBERS.N_0);

    const skill = this.pj.skills[this.groupMode].find((skill) => skill.name === weapon.name);
    if (skill) {
      skill.value = skillvalue;
    } else {
      this.pj.skills[this.groupMode].push(new CombatSkill(weapon.name, skillvalue, weapon.skillName));
    }
  }

  private getWeaponOptions(): RQGOption[] {
    this.weaponGroup = this.getWeaponGroup();
    const weaponTexts = this.translate.instant('WEAPONS');
    const weapons = this.weaponGroup.map((weapon): RQGOption => ({label: weaponTexts[weapon.name], value: weapon.name}));

    const pjWeapons = this.pj?.weapons || [];
    const filteredWeapons = weapons.filter((weapon) => !pjWeapons.find((pjWeapon) => pjWeapon.name === weapon.value));
    filteredWeapons.sort((a, b) => a.label.localeCompare(b.label));

    const firstValue = filteredWeapons[NUMBERS.N_0].value;
    this.selectedWeapon = this.weaponGroup.find((weapon) => weapon.name === firstValue);
    return filteredWeapons;
  }

  private getWeaponGroup(): Weapon[] {
    const weaponGroupMapper ={
      [WeaponGroupEnum.MELEE]: () => MELEE_WEAPONS,
      [WeaponGroupEnum.RANGED]: () => RANGED_WEAPONS,
      [WeaponGroupEnum.SHIELDS]: () => SHIELDS,
      [WeaponGroupEnum.OTHER]: () => [],
      [WeaponGroupEnum.NATURAL]: () => [],
    };
    return weaponGroupMapper[this.groupMode]();
  }
}
