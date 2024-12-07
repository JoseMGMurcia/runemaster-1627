import { NUMBERS } from '@shared/constants/number.constants';
import { Character, CharacteristicEnum } from '@shared/models/chartacter.model';
import { getCGRMax, getDamageMod, getManipulationMod, getMRDEX, getMSIZ, getTotalCRG, getTotalStat } from './character-fields.utils';
import { DiceRoll, SuccessLevelEnum, SuccessLevelType } from '@shared/models/dices.model';
import { numberFrom } from './number.utils';
import { Skill } from '@shared/models/skill.models';
import { DamageModTypeEnum, FireRateEnum, Weapon, WeaponDMGTypeEnum, WeaponGroupEnum } from '@shared/models/equipment.models';

export const getWeaponInitialAP = (weapon: Weapon): number => {
  return weapon.ap + weapon.temporalBonus.AP + weapon.permanentBonus.AP;
};

export const getWeapoSkill = (weapon: Weapon, pj: Character): number => {
  const skills: Skill[] = [
    ...pj.skills.MELEE,
    ...pj.skills.RANGED,
    ...pj.skills.SHIELDS,
    ...pj.skills.NATURAL,
  ];
  const skill = skills.find((s) => s.name === weapon.name);
  const groupSkill = skills.find((s) => s.name === weapon.skillName);

  if (skill) {return (numberFrom(skill.value) + numberFrom(skill.temporalBonus) + numberFrom(skill.permanentBonus)); }
  if (groupSkill) { return (numberFrom(groupSkill.value) + numberFrom(groupSkill.temporalBonus) + numberFrom(groupSkill.permanentBonus)); }
  return NUMBERS.N_5;
};

export const getTotalWeaponSkill = (weapon: Weapon, pj: Character): number => {
  let weaponSkill: number = getWeapoSkill(weapon, pj);
  const str = getTotalStat(pj, CharacteristicEnum.STR);
  const dex = getTotalStat(pj, CharacteristicEnum.DEX);

  if (weapon.minSTR > str) {
    const diference: number = str - weapon.minSTR;
    weaponSkill += 5 * diference;
  }

  if (weapon.minDEX > dex) {
    const diference: number = dex - weapon.minDEX;
    weaponSkill += 5 * diference;
  }

  const manipulationMod = getManipulationMod(pj);
  const total = weaponSkill + manipulationMod;
  const penalty = getCRGPenalty(pj);
  return (total >= NUMBERS.N_5 ? total : NUMBERS.N_5) + weapon.temporalBonus.skillValue + weapon.permanentBonus.skillValue + penalty;
};

export const getCRGPenalty = (pj: Character): number => {
  const totalCRG = getTotalCRG(pj);
  const actualCRG = getCGRMax(pj);
  const excess = Math.ceil(totalCRG - actualCRG);

  return excess > NUMBERS.N_0 ? (excess*NUMBERS.MINUS_5) : NUMBERS.N_0;
};


export const rollDamage = (weapon: Weapon, pj: Character, successLevel: SuccessLevelType = SuccessLevelEnum.SUCCESS ): number => {
  const damageMod = getWeaponDamageMod(weapon, pj);
  const basicDamage: DiceRoll[] = getBasicDamage(weapon);
  const damage: DiceRoll[] = [
    ...basicDamage,
    ...weapon.permanentBonus.damageRoll,
    ...weapon.permanentBonus.basicDamageRoll,
    ...pj.temporalBonus.damage,
    ...pj.permanentBonus.damage,
  ];

  const isCrushing = weapon.damageTypes.includes(WeaponDMGTypeEnum.CRUSHING);
  const isDoubleDamage = successLevel === SuccessLevelEnum.CRITICAL || successLevel === SuccessLevelEnum.SPECIAL;
  if (isDoubleDamage) {
    damage.push(...isCrushing ? [new DiceRoll(0,0, damageMod.dice * damageMod.sides)] : basicDamage);
  }
  const totalDamage = successLevel === SuccessLevelEnum.CRITICAL ? getmaximunDamage(damage) : getTotalDamage(damage);
  const finalDamage =
    totalDamage
    + DiceRoll.roll(damageMod)
    + weapon.temporalBonus.damagePoints
    + weapon.temporalBonus.basicDamagePoints
    + weapon.permanentBonus.damagePoints
    + weapon.permanentBonus.basicDamagePoints
    + (isDoubleDamage && !isCrushing ?( weapon.temporalBonus.basicDamagePoints + weapon.permanentBonus.basicDamagePoints) : NUMBERS.N_0 );
  return finalDamage;
};

export const getWeaponDamageMod = (weapon: Weapon, pj: Character): DiceRoll => {
  const damageMod = getDamageMod(pj);
  if (weapon.damageModType === DamageModTypeEnum.HALF) { damageMod.sides = (damageMod.sides / 2); }
  if (weapon.damageModType === DamageModTypeEnum.NONE) {
    damageMod.dice = NUMBERS.N_0;
    damageMod.sides = NUMBERS.N_0;
  }
  return damageMod;
};

const getBasicDamage = (weapon: Weapon) => {
  return [
    ...weapon.damage,
    ...weapon.temporalBonus.basicDamageRoll,
    ...weapon.permanentBonus.basicDamageRoll,
  ];
};

const getTotalDamage = (damage: DiceRoll[]) => {
  return damage.reduce((acc, d) => acc + DiceRoll.roll(d), 0);
};

const getmaximunDamage = (damage: DiceRoll[]) => {
  return damage.reduce((acc, d) => acc +( d.sides*d.dice) + d.modifier, 0);
};

export const deleteWeapon = (weapon: Weapon, pj: Character): void => {
  const weapons = pj.weapons.filter((w) => w.id !== weapon.id);
  pj.weapons = weapons;
};

export const getTotalWeaponMr = (weapon: Weapon, pj: Character): number[] =>{
  const MRDES = getMRDEX(pj);
  const MRSIZ = getMSIZ(pj);
  let mrs: number[] = [getMeleeMR(weapon, MRDES, MRSIZ)];

  if(weapon.skillGroup === WeaponGroupEnum.RANGED){
    const mr = MRDES > NUMBERS.N_0 ? MRDES : NUMBERS.N_1
    mrs = [mr];
    const rapidRates = [FireRateEnum.S_MR, FireRateEnum.S_MR];
    if(weapon.fireRate && rapidRates.includes(weapon.fireRate)){
      mrs = addNextsFireMRs(mrs, MRDES);
    }
  }
  return mrs;
};

const getMeleeMR = (weapon: Weapon, MRDES: number, MRSIZ: number): number => weapon.mr + MRDES + MRSIZ;

const addNextsFireMRs = (actualMRs: number[], MRDES: number ): number[] => {
  const firstMR = actualMRs[NUMBERS.N_0];
  const secontMR = getNextMR(firstMR, MRDES);
  const thirdMR = getNextMR(secontMR, MRDES);
  const mrs: number[] = [firstMR, secontMR, thirdMR];
  return mrs.filter((mr) => mr <= NUMBERS.N_12);
}

const getNextMR = (actualMR: number, MRDES: number): number => {
  return actualMR + MRDES + NUMBERS.N_5;
}

export const getWeaponTotalCRG = (weapon: Weapon): number => {
  const weigh = weapon.weight + weapon.temporalBonus.weight + weapon.permanentBonus.weight;
  return weigh > NUMBERS.N_0 ? weigh : NUMBERS.N_0;
}
