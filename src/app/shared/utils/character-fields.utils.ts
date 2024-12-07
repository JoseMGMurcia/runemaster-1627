import { NUMBERS } from '@shared/constants/number.constants';
import { Character, CharacteristicEnum } from '@shared/models/chartacter.model';
import { DiceRoll } from '@shared/models/dices.model';
import { HPRatioType, HPRatioEnum, RQGLocation } from '@shared/models/location.model';
import { getTotalAP, getTotalArmorWeight } from './armor-utils';
import { getWeaponTotalCRG } from './weapon.utils';

export const getHP = (pj: Character): number => {
  const con = getTotalStat(pj, CharacteristicEnum.CON);
  const tam = getTotalStat(pj, CharacteristicEnum.SIZ);
  const pod = getTotalStat(pj, CharacteristicEnum.POW);
  return con + getSizHPMod(tam) + getPowHPMod(pod) + pj.permanentBonus.hp + pj.temporalBonus.hp;
};

export const getMP = (pj: Character): number => {
  const pow = getTotalStat(pj, CharacteristicEnum.POW);
  return pow + pj.permanentBonus.mp + pj.permanentBonus.mp;
};

export const getMRDEX = (pj: Character): number => {
  const dex = getTotalStat(pj, CharacteristicEnum.DEX);
  if (dex < 6) return NUMBERS.N_5;
  if (dex < 9) return NUMBERS.N_4;
  if (dex < 13) return NUMBERS.N_3;
  if (dex < 16) return NUMBERS.N_2;
  if (dex < 19) return NUMBERS.N_1;
  return NUMBERS.N_0;
};

export const getMSIZ = (pj: Character): number => {
  const dex = getTotalStat(pj, CharacteristicEnum.SIZ);
  if (dex < 7) return NUMBERS.N_3;
  if (dex < 15) return NUMBERS.N_2;
  if (dex < 22) return NUMBERS.N_1;
  return NUMBERS.N_0;
};

export const getHealingRate = (pj: Character): number => {
  const con = getTotalStat(pj, CharacteristicEnum.CON);
  return Math.ceil(con / 6);
};

export const getTotalStat = ( pj: Character, stat: CharacteristicEnum): number => {
  return pj.stats[stat].permBonus + pj.stats[stat].value + pj.stats[stat].tempBonus;
};

export const getSizHPMod = (value: number): number => {
  return Math.floor((value + NUMBERS.MINUS_1) / NUMBERS.N_4) - NUMBERS.N_2;
};

export const getPowHPMod = (value: number): number => {
  if (value <= NUMBERS.N_4) return NUMBERS.MINUS_1;
  if (value <= NUMBERS.N_16) return NUMBERS.N_0;
  return Math.floor((value - NUMBERS.N_1) / NUMBERS.N_4) - NUMBERS.N_3;
};

export const getLocationHp = (pj: Character, location: RQGLocation): number => {
  const pjHp = getHP(pj);
  const oneThird = Math.ceil(pjHp / NUMBERS.N_3);

  return getHpByLocType(oneThird, location.hitpointsRatio) + location.permanentBonus.HP + location.temporalBonus.HP;
};

export const getHpByLocType = (hps: number, locType: HPRatioType): number => {
  const mapper = {
    [HPRatioEnum.X16]: () => hps - NUMBERS.N_2,
    [HPRatioEnum.X25]: () => hps - NUMBERS.N_1,
    [HPRatioEnum.X33]: () => hps,
    [HPRatioEnum.X40]: () => hps + NUMBERS.N_1,
  };
  return mapper[locType]();
};

export const getArmor = (pj: Character, location: RQGLocation): number => {
  const equipedArmors = pj.armors.filter(armor => armor.equipped);
  const locationArmors = equipedArmors.filter(armor => armor.coveredLocations.includes(location.type));
  const armorPoints =  locationArmors.reduce((acc, armor) => acc + getTotalAP(armor), NUMBERS.N_0);
  const totalArmor = location.naturalArmor + location.permanentBonus.AP + location.temporalBonus.AP + armorPoints;
  return totalArmor;
};

export const getDamageMod = (pj: Character): DiceRoll => {
  const str = getTotalStat(pj, CharacteristicEnum.STR);
  const siz = getTotalStat(pj, CharacteristicEnum.SIZ);

  const value = str + siz;
  if (value <= 12) return new DiceRoll(-1, 4);
  if (value <= 24) return new DiceRoll(0, 0);
  if (value <= 32) return new DiceRoll(1, 4);
  if (value <= 40) return new DiceRoll(1, 6);
  if (value <= 56) return new DiceRoll(2, 6);
  return new DiceRoll(Math.floor((value -57) / 16) + 3, 6);
};

export const getSpiritualDMGModifier = (pj: Character): DiceRoll => {
  const pow = getTotalStat(pj, CharacteristicEnum.POW);
  const cha = getTotalStat(pj, CharacteristicEnum.CHA);

  const value = pow + cha;
  if (value <= 12) return new DiceRoll(1, 3);
  if (value <= 24) return new DiceRoll(1, 6);
  if (value <= 32) return new DiceRoll(1, 6, 1);
  if (value <= 40) return new DiceRoll(1, 6, 3);
  if (value <= 56) return new DiceRoll(2, 6, 3);
  const coeficient = Math.floor((value -57) / 16);
  return new DiceRoll(coeficient +3, 6, coeficient +4);
};

const getPrimaryMod = (value: number): number => Math.ceil((value / 4) - 1) * 5 - 10;
const getNegPrimaryMod = (value: number): number => Math.ceil((value / 4) - 1) * -5 + 10;

const getSecondaryMod = (value: number): number => {
  if (value <= 4) return -5;
  if (value <= 12) return 0;
  return Math.ceil((value / 4) - 1) * 5 - 15;
};

const getNegSecondaryMod = (value: number): number => {
  if (value <= 4) return 5;
  if (value <= 12) return 0;
  return Math.ceil((value / 4) - 1) * -5 + 15;
};

export const getManipulationMod = (pj: Character): number => {
  const dex = getTotalStat(pj, CharacteristicEnum.DEX);
  const int = getTotalStat(pj, CharacteristicEnum.INT);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);
  const str = getTotalStat(pj, CharacteristicEnum.STR);

  return getPrimaryMod(dex) + getPrimaryMod(int) + getSecondaryMod(pow) + getSecondaryMod(str);
};

export const getAgilityMod = (pj: Character): number => {
  const dex = getTotalStat(pj, CharacteristicEnum.DEX);
  const siz = getTotalStat(pj, CharacteristicEnum.SIZ);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);
  const str = getTotalStat(pj, CharacteristicEnum.STR);

  return getPrimaryMod(dex) + getNegSecondaryMod(siz) + getSecondaryMod(pow) + getSecondaryMod(str);
};

export const getComunicationMod = (pj: Character): number => {
  const int = getTotalStat(pj, CharacteristicEnum.INT);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);
  const cha = getTotalStat(pj, CharacteristicEnum.CHA);

  return getSecondaryMod(int) + getSecondaryMod(pow) + getPrimaryMod(cha);
};

export const getKnowledgeMod = (pj: Character): number => {
  const int = getTotalStat(pj, CharacteristicEnum.INT);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);

  return getPrimaryMod(int) + getSecondaryMod(pow);
};

export const getMagicMod = (pj: Character): number => {
  const cha = getTotalStat(pj, CharacteristicEnum.CHA);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);

  return getPrimaryMod(pow) + getSecondaryMod(cha);
};

export const getPerceptionMod = (pj: Character): number => {
  return getKnowledgeMod(pj);
};

export const getStealthMod = (pj: Character): number => {
  const siz = getTotalStat(pj, CharacteristicEnum.SIZ);
  const dex = getTotalStat(pj, CharacteristicEnum.DEX);
  const int = getTotalStat(pj, CharacteristicEnum.INT);
  const pow = getTotalStat(pj, CharacteristicEnum.POW);

  return getNegPrimaryMod(siz) + getPrimaryMod(dex) + getPrimaryMod(int) + getNegSecondaryMod(pow);
};

export const getTotalCRG = (pj: Character): number => {
  const armorCRG = pj.armors.reduce((acc, armor) => acc + getTotalArmorWeight(armor), NUMBERS.N_0);
  const weaponCRG = pj.weapons.reduce((acc, weapon) => acc + getWeaponTotalCRG(weapon), NUMBERS.N_0);
  const equipmentCRG = pj.equipment.reduce((acc, equipment) => acc + equipment.weight, NUMBERS.N_0);

  return armorCRG + weaponCRG + equipmentCRG;
};

export const getCGRMax = (pj: Character): number => {
  const str = getTotalStat(pj, CharacteristicEnum.STR);
  const con = getTotalStat(pj, CharacteristicEnum.CON);

  const media =  Math.ceil( (str + con) / NUMBERS.N_2 );
  return Math.min(media, str);
};
