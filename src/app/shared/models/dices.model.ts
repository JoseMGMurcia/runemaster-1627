import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';

export class DiceRoll {
  public dice: number;
  public sides: number;
  public modifier: number;

  constructor(dice: number, sides: number, modifier = 0) {
    this.dice = dice;
    this.sides = sides;
    this.modifier = modifier;
  }

  public static roll(roll: DiceRoll): number {
    let result = NUMBERS.N_0;
    const negative = roll.dice < NUMBERS.N_0;
    for (let i = 0; i < Math.abs(roll.dice); i++) {
      if ( negative ) {
        result -=  Math.floor(Math.random() * Math.abs(roll.sides)) + 1;
      } else {
        result +=  Math.floor(Math.random() * roll.sides) + 1;
      }
    }
    result += roll.modifier;
    return result;
  }

  public static toString(roll: DiceRoll | undefined): string {
    if (roll && roll.dice === NUMBERS.N_0) { return `${roll.modifier}`; }
    if (!roll) { return STRING_EMPTY; }
    const modifier = roll.modifier ? `${roll.modifier}` : STRING_EMPTY;
    const sign = roll.modifier > NUMBERS.N_0 ? '+' : roll.modifier < NUMBERS.N_0 ? STRING_EMPTY : STRING_EMPTY;
    return `${roll.dice}D${roll.sides}${sign}${modifier}`;
  }
}

export enum SuccessLevelEnum  {
  CRITICAL = 'CRITICAL',
  SPECIAL = 'SPECIAL',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  FUMBLE = 'FUMBLE'
};

export type SuccessLevelType =
  SuccessLevelEnum.CRITICAL |
  SuccessLevelEnum.SPECIAL |
  SuccessLevelEnum.SUCCESS |
  SuccessLevelEnum.FAILURE |
  SuccessLevelEnum.FUMBLE;

export class FumbleRangue {
  public minRange: number;
  public maxRange: number;
  public text: string;

  constructor(minRange: number, maxRange: number, text: string) {
    this.minRange = minRange;
    this.maxRange = maxRange;
    this.text = text;
  }
}
