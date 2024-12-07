import { Character, Characteristic } from '@shared/models/chartacter.model';
import { Armor, Weapon } from '@shared/models/equipment.models';
import { RQGLocation } from '@shared/models/location.model';
import { Skill } from '@shared/models/skill.models';
import { getAllSkill } from './skill.utils';

export const getUniqueID = (name: string): number => {
  return Number(new Date().getTime()) + Math.floor(Math.random() * 1000);
};

export const cloneCharacter = (pj: Character, name: string ): Character => {
  const clone = { ...pj };
  clone.id = getUniqueID(name);
  clone.name = name;
  return clone;
};

export const fixCharacter = (pj: Character): Character => {
  pj.id = pj.id ? pj.id : getUniqueID(pj.name);
  pj.weapons.forEach((weapon) => fixWeapon(weapon));
  pj.armors.forEach((armor) => fixArmor(armor));
  pj.locations.forEach((location) => fixLocation(location));
  fixstats(pj);
  const skills = getAllSkill(pj);
  skills.forEach((skill) => fixSkill(skill));
  return pj;
};

export const fixSkill = (skill: Skill): void => {

}

export const fixstats = (pj: Character): void => {
  Object.values(pj.stats).forEach(stat => fixStat(stat));
};

export const fixLocation = (location: RQGLocation): void => {

}

export const fixStat = (stat: Characteristic): void => {

}

export const fixWeapon = (weapon: Weapon): void => {
};

export const fixArmor = (armor: Armor): void => {

};
