import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';

export enum LocationsEnum  {
  TAIL = 'TAIL',
  RIGHT_LEG = 'RIGHT_LEG',
  LEFT_LEG = 'LEFT_LEG',
  ABDOMEN = 'ABDOMEN',
  TORAX = 'TORAX',
  CHEST = 'CHEST',
  SNAIL_DRAGON_BODY = 'SNAIL_DRAGON_BODY',
  SNAIL_DRAGON_SHELL = 'SNAIL_DRAGON_SHELL',
  RIGHT_ARM = 'RIGHT_ARM',
  LEFT_ARM = 'LEFT_ARM',
  RIGHT_WING = 'RIGHT_WING',
  LEFT_WING = 'LEFT_WING',
  HEAD = 'HEAD',
  LEFT_HEAD = 'LEFT_HEAD',
  RIGHT_HEAD = 'RIGHT_HEAD',
  FRONT_RIGHT_LEG = 'FRONT_RIGHT_LEG',
  FRONT_LEFT_LEG = 'FRONT_LEFT_LEG',
  CENTRAL_RIGHT_LEG = 'CENTRAL_RIGHT_LEG',
  CENTRAL_LEFT_LEG = 'CENTRAL_LEFT_LEG',
  BACK_RIGHT_LEG = 'BACK_RIGHT_LEG',
  BACK_LEFT_LEG = 'BACK_LEFT_LEG',
  FRONT_QUARTER = 'FRONT_QUARTER',
  BACK_QUARTER = 'BACK_QUARTER',
};

export enum HPRatioEnum {
  X16 = 0.16,
  X33 = 0.33,
  X40 = 0.40,
  X25 = 0.25
}

export type HPRatioType =
  HPRatioEnum.X33 |
  HPRatioEnum.X40 |
  HPRatioEnum.X25 |
  HPRatioEnum.X16;

export enum armorWeightRatioEnum {
  x1 = 1,
  x2 = 2,
}

export type armorWeightRatioType =
  armorWeightRatioEnum.x1 |
  armorWeightRatioEnum.x2;

export class LocRange {
  public min = NUMBERS.N_0;
  public max = NUMBERS.N_0;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}

export enum LocationDamageEnum {
  EQUAL_OR_MORE_THAN_HP = 'EQUAL_OR_MORE_THAN_HP',
  EQUAL_OR_MORE_THAN_DOUBLE_HP = 'EQUAL_OR_MORE_THAN_DOUBLE_HP',
  EQUAL_OR_MORE_THAN_TRIPLE_HP = 'EQUAL_OR_MORE_THAN_TRIPLE_HP',
}

export class LocationBonus {
  public AP = NUMBERS.N_0;
  public HP = NUMBERS.N_0;
}

export class RQGLocation {
  public type: LocationsEnum = LocationsEnum.RIGHT_LEG;
  public hitpointsRatio: HPRatioType = HPRatioEnum.X33;
  public naturalArmor = NUMBERS.N_0;
  public naturalArmorName = STRING_EMPTY;
  public rangue = new LocRange(NUMBERS.N_0, NUMBERS.N_0);
  public actualHPVariation = NUMBERS.N_0;
  public swShowDetail = false;

  public temporalBonus = new LocationBonus();
  public permanentBonus = new LocationBonus();

  constructor(
    type: LocationsEnum,
    hitpointsRatio: HPRatioType,
    rangue: LocRange,
    armorPoints: number = NUMBERS.N_0,
  ) {
    this.type = type;
    this.hitpointsRatio = hitpointsRatio;
    this.rangue = rangue;
    this.naturalArmor = armorPoints;
  }
}


