import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character, CharacterRune } from '@shared/models/chartacter.model';
import { DiceRoll, SuccessLevelEnum, SuccessLevelType } from '@shared/models/dices.model';
import { DamageModTypeEnum, Weapon, WeaponBonus } from '@shared/models/equipment.models';
import { CombatSkill } from '@shared/models/skill.models';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { StatusService } from '@shared/services/status.service';
import { getDamageMod } from '@shared/utils/character-fields.utils';
import { getSuccessLevel, rollDices } from '@shared/utils/dices.utils';
import { acotateNumber, numberFrom } from '@shared/utils/number.utils';
import { rollRune } from '@shared/utils/rune.utils';
import { getSkill } from '@shared/utils/skill.utils';
import { deleteWeapon, getTotalWeaponMr, getTotalWeaponSkill, getWeaponInitialAP, rollDamage } from '@shared/utils/weapon.utils';
import { finalize } from 'rxjs';

const imports = [
  TranslateModule,
  NgClass,
  NgIf,
];

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports,
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponsComponent {
  pj: Character | undefined = undefined;
  swShowWeapons = true;
  SuccessLevelEnum = SuccessLevelEnum;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly statusService: StatusService,
    private readonly translate: TranslateService,
    private readonly cdr: ChangeDetectorRef,
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
        this.cdr.markForCheck();
       }
    });

    this.statusService.reload$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((reload) => {
      if (!reload) {return;}
      this.cdr.markForCheck();
    });
  }

  switchShowWeapons(): void {
    this.swShowWeapons = !this.swShowWeapons;
  }

  gwtRowClass(index: number): string {
    return index % 2 === 0 ? 'odd' : 'even';
  }

  getDamage(weapon: Weapon): string {
    return Weapon.getDamageString(weapon);
  }

  getTotalMR(weapon: Weapon): string {
    if (!this.pj) { return STRING_EMPTY; }
    return getTotalWeaponMr(weapon, this.pj).join('-');
  }

  detail(weapon: Weapon): void {
    weapon.swShowDetail = !weapon.swShowDetail;
  }

  handleRuneClick(weapon: Weapon): void {
    const rune = weapon.rune;
    if(!rune) { return; }
    const weaponRune = this.pj?.runes.find((r) => r.rune === rune) || new CharacterRune(rune, 0);
    rollRune(weaponRune, this.pj, this.translate, this.statusService);
  }

  getWeaponInitialAP(weapon: Weapon): number {
    return getWeaponInitialAP(weapon);
  }

  setAP(weapon: Weapon, variation: number): void {
    const initialAP = getWeaponInitialAP(weapon);
    weapon.apVariation += variation;
    weapon.apVariation = acotateNumber(weapon.apVariation, NUMBERS.N_0, -initialAP);
  }

  setTempBonusAP(weapon: Weapon, variation: number): void {
    weapon.temporalBonus.AP += variation;
  }

  setPermBonusAP(weapon: Weapon, variation: number): void {
    weapon.permanentBonus.AP += variation;
  }

  setTempBasicDamage(weapon: Weapon, variation: number): void {
    weapon.temporalBonus.basicDamagePoints += variation;
  }

  setPermBasicDamage(weapon: Weapon, variation: number): void {
    weapon.permanentBonus.basicDamagePoints += variation;
  }

  setTempDamage(weapon: Weapon, variation: number): void {
    weapon.temporalBonus.damagePoints += variation;
  }

  setPermDamage(weapon: Weapon, variation: number): void {
    weapon.permanentBonus.damagePoints += variation;
  }

  setWeaponSkill(bonus: WeaponBonus, variation: number): void {
    bonus.skillValue += variation;
  }

  setTempWeight(weapon: Weapon, variation: number): void {
    weapon.temporalBonus.weight += variation;
    weapon.temporalBonus.weight = weapon.temporalBonus.weight + weapon.weight < NUMBERS.N_0 ? -weapon.weight : weapon.temporalBonus.weight;
  }

  setPermWeight(weapon: Weapon, variation: number): void {
    weapon.permanentBonus.weight += variation;
    weapon.permanentBonus.weight = weapon.permanentBonus.weight + weapon.weight < NUMBERS.N_0 ? -weapon.weight : weapon.permanentBonus.weight;
  }

  setSkill(weapon: Weapon, variation: number): void {
    if (!this.pj) { return; }
    const skill = getSkill(weapon.name, this.pj);
    if (!skill) {
      this.pj.skills[weapon.skillGroup].push(new CombatSkill(weapon.name, NUMBERS.N_5 + variation, weapon.skillGroup));
    }
    else {
      skill.value = numberFrom(skill.value) + variation;
    }
  }

  getTotalWeaponSkill(weapon: Weapon): number {
    if (!this.pj) { return NUMBERS.N_0; }
    return getTotalWeaponSkill(weapon, this.pj);
  }

  getBaseSkill(weapon: Weapon): number {
    if (!this.pj) { return NUMBERS.N_0; }
    const skill = getSkill(weapon.name, this.pj);
    return skill ? skill.value : NUMBERS.N_0;
  }

  rollAttack(weapon: Weapon): void {
    if (!this.pj) { return; }
    const texts = this.translate.instant('COMMON');
    const weaponName = this.translate.instant(`WEAPONS.${weapon.name}`);

    const roll = rollDices(1, 100);
    const successLevel: SuccessLevelType = getSuccessLevel(this.getTotalWeaponSkill(weapon), roll);
    const slText = this.translate.instant(`DICES.SUCCES_LEVEL.${successLevel}`);
    this.statusService.setResultPending(`${this.pj.name} ${texts.WITH} ${weaponName}: ${roll} - ${slText}`);

  }

  rollDamage(weapon: Weapon, success: SuccessLevelType = SuccessLevelEnum.SUCCESS): void {
    if (!this.pj) { return; }
    const damage = rollDamage(weapon, this.pj, success);
    const texts = this.translate.instant('COMMON');
    const weaponName = this.translate.instant(`WEAPONS.${weapon.name}`);
    this.statusService.setResultPending(`${this.pj.name} ${texts.WITH} ${weaponName}: ${damage} ${texts.DAMAGE}`);
  }

  damageModifier(weapon: Weapon): string {
    if (!this.pj) { return STRING_EMPTY; }
    const damageMod = getDamageMod(this.pj);
    const sign = damageMod.dice > NUMBERS.N_0 ? '+': STRING_EMPTY;
    const damageModDice = this.getDamageModDice(weapon, damageMod.dice);
    const sides = this.getDamageMoSides(weapon, damageMod.sides);
    return damageModDice ?  ` ${sign}  ${DiceRoll.toString(new DiceRoll(damageModDice, sides))}`: STRING_EMPTY;
  }

  deleteWeapon(weapon: Weapon): void {
    if (!this.pj) { return; }
    deleteWeapon(weapon, this.pj);
  }

  resetTempBonus(weapon: Weapon): void {
    weapon.temporalBonus = new WeaponBonus();
  }

  private getDamageModDice(weapon: Weapon, dice: number): number {
    const DiceMapper = {
      [DamageModTypeEnum.FULL]: () => dice,
      [DamageModTypeEnum.HALF]: () => dice,
      [DamageModTypeEnum.NONE]: () => NUMBERS.N_0,
    }
    return DiceMapper[weapon.damageModType]();
  }

  private getDamageMoSides(weapon: Weapon, sides: number): number {
    const DiceMapper = {
      [DamageModTypeEnum.FULL]: () => sides,
      [DamageModTypeEnum.HALF]: () => (sides / 2),
      [DamageModTypeEnum.NONE]: () => NUMBERS.N_0,
    }
    return DiceMapper[weapon.damageModType]();
  }

}
