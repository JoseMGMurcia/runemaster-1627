import { NUMBERS } from '@shared/constants/number.constants';

export enum SeasonEnum {
  SEA = 'SEA',
  FIRE = 'FIRE',
  EARTH = 'EARTH',
  DARKNESS = 'DARKNESS',
  STORM = 'STORM',
  SACRED_TIME = 'SACRED_TIME',
}

export enum WeekEnum {
  DISORDER = 'DISORDER',
  HARMONY = 'ARMONY',
  DEATH = 'DEATH',
  FERTILITY = 'FERTILITY',
  STASIS = 'STASIS',
  MOVEMENT = 'MOVEMENT',
  ILLUSION = 'ILLUSION',
  TRUTH = 'TRUTH',
  FATE = 'FATE',
  LUCK = 'LUCK',
}

export enum DayEnum {
  COLD = 'COLD',
  WATER = 'WATER',
  CLAY = 'CLAY',
  WILD = 'WILD',
  FIRE = 'FIRE',
  SAVAGE = 'SAVAGE',
  HOLY = 'HOLY',
}

export enum LuneEnum {
  FULL = 'FULL',
  CRESCENT = 'CRESCENT',
  HALF = 'HALF',
  NEW = 'NEW',
}

export class RQCalendarSorceryBonus {
  water = NUMBERS.N_0;
  earth = NUMBERS.N_0;
  fire = NUMBERS.N_0;
  darkness = NUMBERS.N_0;
  wind = NUMBERS.N_0;
  disorder = NUMBERS.N_0;
  harmony = NUMBERS.N_0;
  death = NUMBERS.N_0;
  fertility = NUMBERS.N_0;
  stasis = NUMBERS.N_0;
  movement = NUMBERS.N_0;
  illusion = NUMBERS.N_0;
  truth = NUMBERS.N_0;
  notElemental = NUMBERS.N_0;
}
