import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { RunesEnum } from './rune.model';

export class Skills {
  public AGILITY: Skill[] = [];
  public COMUNICATION: Skill[] = [];
  public MANIPULATION: Skill[] = [];
  public STEALTH: Skill[] = [];
  public KNOWLEDGE: Skill[] = [];
  public PERCEPTION: Skill[] = [];
  public MAGICAL: Skill[] = [];

  public MELEE: CombatSkill[] = [];
  public RANGED: CombatSkill[] = [];
  public SHIELDS: CombatSkill[] = [];
  public NATURAL: CombatSkill[] = [];
  public OTHER: Skill[] = [];
}

export class Skill {
  public id = NUMBERS.N_0;
  public name = STRING_EMPTY;
  public speciality = STRING_EMPTY;
  public value = NUMBERS.N_0;
  public modifier = STRING_EMPTY; //ie CARx5
  public markable = false;
  public marked = false;
  public rune?: RunesEnum;
  public temporalBonus = NUMBERS.N_0;
  public permanentBonus = NUMBERS.N_0;

  constructor(name: string, value: number, speciality = STRING_EMPTY) {
    this.id = getUniqueID(name);
    this.name = name;
    this.value = value;
    this.speciality = speciality;
  }
}

const getUniqueID = (name: string): number => {
  return Number(new Date().getTime()) + Math.floor(Math.random() * 1000);
};

export class CombatSkill extends Skill {
  public skillGruop: string = STRING_EMPTY;

  constructor(name: string, value: number, skillGruop: string, speciality = STRING_EMPTY) {
    super(name, value, speciality);
    this.skillGruop = skillGruop;
  }
}

export const HUMAN_STARTING_SKILLS: Skills = {
  AGILITY: [
    new Skill('DRIVE', NUMBERS.N_5, 'CART'),
    new Skill('DODGE', NUMBERS.N_6),
    new Skill('RIDE', NUMBERS.N_5, 'HORSE'),
    new Skill('SWIM', NUMBERS.N_15),
    new Skill('ROW', NUMBERS.N_5),
    new Skill('JUMP', NUMBERS.N_9),
    new Skill('CLIMB', NUMBERS.N_40),
  ],
  COMUNICATION: [
    new Skill('ACT', NUMBERS.N_5),
    new Skill('ART', NUMBERS.N_5),
    new Skill('BARGAIN', NUMBERS.N_5),
    new Skill('CHARM', NUMBERS.N_15),
    new Skill('DANCE', NUMBERS.N_10),
    new Skill('DISGUISE', NUMBERS.N_5),
    new Skill('FAST_TALK', NUMBERS.N_5),
    new Skill('INTIMIDATE', NUMBERS.N_15),
    new Skill('INTRIGUE', NUMBERS.N_5),
    new Skill('ORATE', NUMBERS.N_10),
    new Skill('SING', NUMBERS.N_10),
    new Skill('SPEAK', NUMBERS.N_50, 'OWN'),

  ],
  MANIPULATION: [
    new Skill('CONCEAL', NUMBERS.N_5),
    new Skill('CRAFT', NUMBERS.N_10),
    new Skill('DEVISE', NUMBERS.N_5),
    new Skill('PLAY_INSTRUMENT', NUMBERS.N_5),
    new Skill('SLEIGHT', NUMBERS.N_5),
  ],
  STEALTH: [
    new Skill('HIDE', NUMBERS.N_10),
    new Skill('MOVE_QUIETLY', NUMBERS.N_10),
  ],
  KNOWLEDGE: [
    new Skill('ALCHEMY', NUMBERS.N_0),
    new Skill('ANIMAL_LORE', NUMBERS.N_5),
    new Skill('BATTE', NUMBERS.N_10),
    new Skill('BUREUCRACY', NUMBERS.N_0),
    new Skill('CELESTIAL_LORE', NUMBERS.N_5),
    new Skill('CULT_LORE', NUMBERS.N_5, 'OWN_CULT'),
    new Skill('CUSTOMS', NUMBERS.N_25, 'OWN'),
    new Skill('ELDER_RACE_LORE', NUMBERS.N_5, 'SPECIFIC_ELDER_RACE'),
    new Skill('EVALUATE', NUMBERS.N_10),
    new Skill('FARM', NUMBERS.N_10),
    new Skill('FIST_AID', NUMBERS.N_10),
    new Skill('GAME', NUMBERS.N_15),
    new Skill('HERD', NUMBERS.N_5),
    new Skill('HOMELAND_CULTURE', NUMBERS.N_30, 'LOCAL'),
    new Skill('LIBRARY_USE', NUMBERS.N_0),
    new Skill('MANAGE_HOUSEHOLD', NUMBERS.N_10),
    new Skill('MINERAL_LORE', NUMBERS.N_5),
    new Skill('PEACEFUL_CUT', NUMBERS.N_10),
    new Skill('PLAN_LORE', NUMBERS.N_5),
    new Skill('READ_WRITE', NUMBERS.N_0, 'OWN'),
    new Skill('SHIPHANDLING', NUMBERS.N_0),
    new Skill('SURVIVAL', NUMBERS.N_15),
    new Skill('TREAT_DISEASE', NUMBERS.N_5),
    new Skill('TREAT_POISON', NUMBERS.N_5),
  ],
  PERCEPTION: [
    new Skill('INSIGHT', NUMBERS.N_20, 'OWN'),
    new Skill('LISTEN', NUMBERS.N_25),
    new Skill('SCAN', NUMBERS.N_25),
    new Skill('SEARCH', NUMBERS.N_25),
    new Skill('TRACK', NUMBERS.N_10),
  ],
  MAGICAL: [
    new Skill('MEDITATE', NUMBERS.N_0),
    new Skill('PREPARE_CORPSE', NUMBERS.N_10),
    new Skill('SENSE_ASSASSIN', NUMBERS.N_0),
    new Skill('SENSE_CHAOS', NUMBERS.N_0),
    new Skill('SPIRIT_COMBAT', NUMBERS.N_20),
    new Skill('SPIRIT_DANCE', NUMBERS.N_0),
    new Skill('SPIRIT_LORE', NUMBERS.N_0),
    new Skill('SPIRIT_TRAVEL', NUMBERS.N_10),
    new Skill('UNDERSTAND_HERD_BEAST', NUMBERS.N_0),
    new Skill('WORSHIP', NUMBERS.N_5, 'OWN_DEITY'),
  ],
  MELEE: [
    new CombatSkill('1H_AXE', NUMBERS.N_10, '1H_AXE' ),
    new CombatSkill('2H_AXE', NUMBERS.N_5, '2H_AXE'),
    new CombatSkill('BROADSWORD', NUMBERS.N_10, 'BROADSWORD'),
    new CombatSkill('DAGGER', NUMBERS.N_15, 'DAGGER'),
    new CombatSkill('1H_HAMMER', NUMBERS.N_10, '1H_HAMMER'),
    new CombatSkill('2H_HAMMER', NUMBERS.N_5, '2H_HAMMER'),
    new CombatSkill('KOPIS', NUMBERS.N_10, 'KOPIS'),
    new CombatSkill('1H_MACE', NUMBERS.N_15, '1H_MACE'),
    new CombatSkill('2H_MACE', NUMBERS.N_10, '2H_MACE'),
    new CombatSkill('PIKE', NUMBERS.N_15, 'PIKE'),
    new CombatSkill('QUARTERSTAFF', NUMBERS.N_15, 'QUARTERSTAFF'),
    new CombatSkill('RAPIER', NUMBERS.N_5, 'RAPIER'),
    new CombatSkill('SHORT_SWORD', NUMBERS.N_10, 'SHORT_SWORD'),
    new CombatSkill('1H_SPEAR', NUMBERS.N_5, '1H_SPEAR'),
    new CombatSkill('2H_SPEAR', NUMBERS.N_15, '2H_SPEAR'),
  ],
  RANGED: [
    new CombatSkill('ARBALEST', NUMBERS.N_10, 'ARBALEST'),
    new CombatSkill('AXE_THROWING', NUMBERS.N_10, 'AXE_THROWING'),
    new CombatSkill('COMPOSITE_BOW', NUMBERS.N_5, 'COMPOSITE_BOW'),
    new CombatSkill('CROSSBOW', NUMBERS.N_25, 'CROSSBOW'),
    new CombatSkill('DAGGER_THROWING', NUMBERS.N_5, 'DAGGER_THROWING'),
    new CombatSkill('ELF_BOW', NUMBERS.N_5, 'ELF_BOW'),
    new CombatSkill('JAVELING', NUMBERS.N_10, 'JAVELING'),
    new CombatSkill('POLE_LASSO', NUMBERS.N_5, 'POLE_LASSO'),
    new CombatSkill('ROCK', NUMBERS.N_15, 'ROCK'),
    new CombatSkill('SELF_BOW', NUMBERS.N_5, 'SELF_BOW'),
    new CombatSkill('SLING', NUMBERS.N_5, 'SLING'),
    new CombatSkill('STAFF_SLING', NUMBERS.N_10, 'STAFF_SLING'),
  ],
  SHIELDS: [
    new CombatSkill('LARGE_SHILED', NUMBERS.N_15, 'LARGE_SHILED'),
    new CombatSkill('MEDIUM_SHILED', NUMBERS.N_15, 'MEDIUM_SHILED'),
    new CombatSkill('SMALL_SHILED', NUMBERS.N_15, 'SMALL_SHILED'),
  ],
  NATURAL: [
    new CombatSkill('FIST', NUMBERS.N_25, 'FIST'),
    new CombatSkill('GRAPPLE', NUMBERS.N_25, 'GRAPPLE'),
    new CombatSkill('KICK', NUMBERS.N_15, 'KICK'),
  ],
  OTHER: []
};
