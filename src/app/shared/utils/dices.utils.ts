import { DiceRoll, FumbleRangue, SuccessLevelEnum, SuccessLevelType } from '@shared/models/dices.model';
import { DICE_SEPARATOR, NUMBERS } from '../constants/number.constants';
import { cutDicesRolls } from './message.utils';
import { TranslateService } from '@ngx-translate/core';
import { stringFrom } from './string.utils';
import { acotateNumber } from './number.utils';

export const getTotal = (rolls: string[]): number => {

  let total = NUMBERS.N_0;
  rolls.forEach(roll => {
    const upRoll = roll.toUpperCase();
    let negative = false;
    if(upRoll.indexOf(DICE_SEPARATOR) === - NUMBERS.N_1) {
      // Not a dice
      total += Number(roll);

    } else {
      // Is a dice
      const dice = upRoll.split(DICE_SEPARATOR);
      const diceNumber = dice[NUMBERS.N_0].length === NUMBERS.N_0 ? NUMBERS.N_1 : Number(dice[NUMBERS.N_0]);
      const diceSides = Number(dice[NUMBERS.N_1]);

      total += DiceRoll.roll(new DiceRoll(diceNumber, diceSides));
    }
  });
  return total;
};

export const rollDices = (dices: number, sides: number, mod = 0): number => {
  return DiceRoll.roll(new DiceRoll(dices, sides, mod));
}

export const manageRolls = (rollsText: string): number => {
  const rolls = cutDicesRolls(rollsText);
  return getTotal(rolls);
};

export const getCritialTarget = (target: number): number => {
  if (target <= NUMBERS.N_10) { return NUMBERS.N_1; }
  return acotateNumber(Math.ceil((target -9 )/ NUMBERS.N_20), NUMBERS.N_95 ,NUMBERS.N_0);
}

export const getSuccessTarget = (target: number): number => {
  if (target <= NUMBERS.N_5) { return NUMBERS.N_5; }
  if (target <= NUMBERS.N_95) { return target; }
  return NUMBERS.N_95;
}

export const getSpecialTarget = (target: number): number => {
   if (target <= NUMBERS.N_5) { return NUMBERS.N_1; }
   return acotateNumber(Math.ceil((target -2 )/ NUMBERS.N_5), NUMBERS.N_95 ,NUMBERS.N_0);
}

export const getFumbleTarget = (target: number): number => {
  const fumbleTarget = NUMBERS.N_100 - (NUMBERS.N_3 - Math.floor((target - NUMBERS.N_11)/NUMBERS.N_20));
  return fumbleTarget > NUMBERS.N_100 ? NUMBERS.N_100 : fumbleTarget;
};

export const getSuccessLevel = (target: number, result: number): SuccessLevelType => {
  if ( result <= getCritialTarget(target))  { return SuccessLevelEnum.CRITICAL;}
  if ( result <= getSpecialTarget(target))  { return SuccessLevelEnum.SPECIAL; }
  if ( result <= getSuccessTarget(target))   { return SuccessLevelEnum.SUCCESS; }
  if ( result <  getFumbleTarget(target))   { return SuccessLevelEnum.FAILURE; }
  return SuccessLevelEnum.FUMBLE;
};

export const getFumbles = (translate: TranslateService): FumbleRangue[] => {
  const texts = translate.instant('RULES.FUMBLES');
  return [
  { minRange: 1,  maxRange: 5, text: texts.F1_5 },
  { minRange: 6,  maxRange: 10, text: texts.F6_10 },
  { minRange: 11,  maxRange: 15, text: texts.F11_15 },
  { minRange: 16,  maxRange: 20, text: texts.F16_20 },
  { minRange: 21,  maxRange: 25, text: texts.F21_25 },
  { minRange: 26,  maxRange: 30, text: texts.F26_30 },
  { minRange: 31,  maxRange: 35, text: texts.F31_35 },
  { minRange: 36,  maxRange: 40, text: texts.F36_40 },
  { minRange: 41,  maxRange: 45, text: texts.F41_45 },
  { minRange: 46,  maxRange: 50, text: texts.F46_50 },
  { minRange: 51,  maxRange: 55, text: texts.F51_55 },
  { minRange: 56,  maxRange: 60, text: texts.F56_60 },
  { minRange: 61,  maxRange: 63, text: texts.F61_63 },
  { minRange: 64,  maxRange: 67, text: texts.F64_67 },
  { minRange: 68,  maxRange: 70, text: texts.F68_70 },
  { minRange: 71,  maxRange: 72, text: texts.F71_72 },
  { minRange: 73,  maxRange: 74, text: texts.F73_74 },
  { minRange: 75,  maxRange: 78, text: texts.F75_78 },
  { minRange: 79,  maxRange: 82, text: texts.F79_82 },
  { minRange: 83,  maxRange: 86, text: texts.F83_86 },
  { minRange: 87,  maxRange: 89, text: texts.F87_89 },
  { minRange: 90,  maxRange: 91, text: texts.F90_91 },
  { minRange: 92,  maxRange: 92, text: texts.F92_92 },
  { minRange: 93,  maxRange: 95, text: texts.F93_95 },
  { minRange: 96,  maxRange: 97, text: texts.F96_97 },
  { minRange: 98,  maxRange: 98, text: texts.F98_98 },
  { minRange: 99,  maxRange: 99, text: texts.F99_99 },
  { minRange: 100,  maxRange: 100, text: texts.F100_100 },
]};

export const getFumbleText = (fumbleTarget: number, fumbles:  FumbleRangue[]): string => {
  const  text = fumbles.find(fumble => fumble.minRange <= fumbleTarget && fumbleTarget <= fumble.maxRange)?.text;
  return stringFrom(text);
};
