import { getUniqueID } from '@shared/utils/character.utils';
import { Armor, Equipment, Weapon, WeaponFactroy } from './equipment.models';
import { DiceRoll } from './dices.model';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { getInitialHumanRunes } from '@shared/utils/rune.utils';
import { acotateNumber } from '@shared/utils/number.utils';
import { RQGLocation } from './location.model';
import { HUMAN_STARTING_SKILLS, Skills } from './skill.models';
import { NUMBERS } from '@shared/constants/number.constants';
import { RunesEnum } from './rune.model';
import { HUMAN_LOCATIONS } from '../constants/races-location.constants';

export class Character {
  public id = NUMBERS.N_0;
  public name = STRING_EMPTY;
  public player = STRING_EMPTY;
  public pnj = true;
  public race: RaceTypeEnum = RaceTypeEnum.HUMAN;
  public sex: SexTypeEnum = SexTypeEnum.U;
  public age = NUMBERS.N_15;
  public height = NUMBERS.N_0;
  public weight = NUMBERS.N_0;
  public description = STRING_EMPTY;
  public stats : Characteristics = new Characteristics();
  public skills: Skills = HUMAN_STARTING_SKILLS;
  public culture: cultureTypeEnum = cultureTypeEnum.PRIMITIVE;
  public profesion = STRING_EMPTY;
  public bornIn = STRING_EMPTY;
  public country = STRING_EMPTY;
  public family = STRING_EMPTY;
  public religions: CultMember[] = [];
  public notes: string[] = [];

  public temporalBonus: CharacterBonus = new CharacterBonus();
  public permanentBonus: CharacterBonus = new CharacterBonus();
  // public spells: Spells = new Spells();
  public movement = NUMBERS.N_8;
  public markedPOW = false;
  public actualHPVariation = NUMBERS.N_0;
  public actualMPVariation = NUMBERS.N_0;

  public equipment: Equipment[] = [];
  public weapons: Weapon[] = WeaponFactroy.getInitialHumanWeapons();
  public armors: Armor[] = [];
  public locations: RQGLocation[] = HUMAN_LOCATIONS;

  public sideKidIds: string[] = [];
  public creationDate = new Date();
  public lastUpdate = new Date();
  public alive = true;
  public favorite = false;
  public runes: CharacterRune[] = getInitialHumanRunes();
  public passions: Passion[] = [];

  constructor(name: string, player = STRING_EMPTY) {
    this.id = getUniqueID(name);
    this.name = name;
    this.player = player;
    this.pnj = !!player;
  }
}

export enum SexTypeEnum {
  M = 'M',
  F = 'F',
  U = 'U'
}

export enum cultureTypeEnum {
  PRIMITIVE = 'PRIMITIVE',
  NOMAD = 'NOMAD',
  BARBARIAN = 'BARBARIAN',
  CIVILIZED = 'CIVILIZED'
}

export class Characteristics {
  public STR: Characteristic = new Characteristic(NUMBERS.N_3, CharacteristicEnum.STR);
  public DEX: Characteristic = new Characteristic(NUMBERS.N_3, CharacteristicEnum.DEX);
  public CON: Characteristic = new Characteristic(NUMBERS.N_3, CharacteristicEnum.CON);
  public INT: Characteristic = new Characteristic(NUMBERS.N_8, CharacteristicEnum.INT);
  public SIZ: Characteristic = new Characteristic(NUMBERS.N_8, CharacteristicEnum.SIZ);
  public POW: Characteristic = new Characteristic(NUMBERS.N_3, CharacteristicEnum.POW);
  public CHA: Characteristic = new Characteristic(NUMBERS.N_3, CharacteristicEnum.CHA);
}

export enum CharacteristicEnum {
  STR = 'STR',
  DEX = 'DEX',
  CON = 'CON',
  INT = 'INT',
  SIZ = 'SIZ',
  POW = 'POW',
  CHA = 'CHA'
}

export class Characteristic {
  public statType: CharacteristicEnum = CharacteristicEnum.STR;
  public value = NUMBERS.N_0;
  public initialValue = NUMBERS.N_0;
  public permBonus = NUMBERS.N_0;
  public tempBonus = NUMBERS.N_0;
  public swShowDetail = false;
  public notInrace = false;

  constructor(value: number, stat: CharacteristicEnum,  initialValue = NUMBERS.N_0) {
    this.value = value;
    this.statType = stat;
    this.initialValue = initialValue || value;
  }
}

export enum cultMemberTypeEnum {
  LAIC = 'LAIC',
  INITIATE = 'INITIATE',
  ACOLITE = 'ACOLITE',
  PRIEST = 'PRIEST',
  RUNE_LORD = 'RUNE_LORD',
  RUNE_PRIEST = 'RUNE_PRIEST',
  SHAMAN = 'SHAMAN'
}

export class CultMember {
  public deity = STRING_EMPTY;
  public memberType: cultMemberTypeEnum = cultMemberTypeEnum.LAIC;
  public phanteon = STRING_EMPTY;
  public runePoints = NUMBERS.N_0;
  public runes: RunesEnum[] = [];

  constructor(deity: string, memberType: cultMemberTypeEnum, phanteon = STRING_EMPTY) {
    this.deity = deity;
    this.memberType = memberType;
    this.phanteon = phanteon;
  }
}

export class CharacterRune {
  public rune: RunesEnum = RunesEnum.AIR;
  public value = NUMBERS.N_0;
  public used = false;
  public marked = false;
  public swElemental = false;
  public pairedCharacterRune?: CharacterRune;

  constructor(rune: RunesEnum, value: number, swElemental = false) {
    this.rune = rune;
    this.value = value;
  }

  public static improveValue(rune: CharacterRune, variation: number): void {
    rune.value += variation;
    rune.value = rune.value < NUMBERS.N_0 ? NUMBERS.N_0 : rune.value;
    if (rune.pairedCharacterRune) {
      rune.pairedCharacterRune.value -= variation;
      rune.pairedCharacterRune.value = acotateNumber(rune.pairedCharacterRune.value, NUMBERS.N_100, NUMBERS.N_0);
      rune.value = acotateNumber(rune.value, NUMBERS.N_100, NUMBERS.N_0);
    }
  }
}

export class CharacterBonus {
  public hp = NUMBERS.N_0;
  public mp = NUMBERS.N_0;
  public ap = NUMBERS.N_0;
  public damage: DiceRoll[] = [];
}

export enum PasionTypeEnum {
  HONOR = 'HONOR',
  LOVE = 'LOVE',
  DEVOTION = 'DEVOTION',
  LOYALTY = 'LOYALTY',
  FEAR = 'FEAR',
  HATE = 'HATE',
  OTHER = 'OTHER'
}

export class Passion {
  public id = NUMBERS.N_0;
  public type: PasionTypeEnum = PasionTypeEnum.OTHER;
  public value = NUMBERS.N_60;
  public description = STRING_EMPTY;

  constructor(type: PasionTypeEnum, description = STRING_EMPTY, value = NUMBERS.N_60) {
    this.id = getUniqueID(type);
    this.type = type;
    this.value = value;
    this.description = description
  }
}

export const STARTING_HUMMAN_PASSIONS: Passion[] = [
  new Passion(PasionTypeEnum.HONOR, STRING_EMPTY, NUMBERS.N_0),
];

export enum RaceTypeEnum {
  AGIMORI = 'AGIMORI',
  BROO = 'BROO',
  DUCK = 'DUCK',
  DRAGON = 'DRAGON',
  HUMAN = 'HUMAN',
  MOROCATH = 'MOROCATH',
  NEWLING = 'NEWLING',
  TUSK_RIDER = 'TUSK_RIDER',
}

