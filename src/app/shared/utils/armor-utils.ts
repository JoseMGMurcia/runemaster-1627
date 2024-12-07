import { NUMBERS } from '@shared/constants/number.constants';
import { Armor } from '@shared/models/equipment.models';
import { Character } from '@shared/models/chartacter.model';
import { LocationsEnum } from '@shared/models/location.model';

export const getLocationArmors = (location: LocationsEnum, pj: Character): Armor[] => pj.armors.filter((armor) => armor.coveredLocations.includes(location));

export const getTotalAP = (armor: Armor): number => armor.armorPoints + armor.temporalBonus.AP + armor.permanentBonus.AP;

export const getTotalArmorWeight = (armor: Armor): number => {
  const CRG = armor.weight + armor.temporalBonus.weight + armor.permanentBonus.weight;
  return CRG > NUMBERS.N_0 ? CRG : NUMBERS.N_0;
};
