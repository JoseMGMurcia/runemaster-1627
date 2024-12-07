import { STRING_EMPTY } from '@shared/constants/string.constants';
import { RunesEnum } from './rune.model';
import { NUMBERS } from '@shared/constants/number.constants';

export enum SpellType {
  SPIRITUAL = 'SPIRITUAL',
  RUNIC = 'RUNIC',
  SORCERY = 'SORCERY',
}

export enum SpellRange {
  SELF = 'SELF',
  TOUCH = 'TOUCH',
  DISTANCE = 'DISTANCE',
}

export enum SpellDuration {
  INSTANT = 'INSTANT',
  TEMPORAL = 'TEMPORAL',
  PERMANENT = 'PERMANENT',
  SPECIAL = 'SPECIAL',
}

export enum SpellMode {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
  FOCUS = 'FOCUS',
  VARIES = 'VARIES',
}

export enum SpiritSpellEnum {
  BEFUDDLE = 'BEFUDDLE',
  BINDING_ENCHANTMENT = 'BINDING_ENCHANTMENT',
  BLADESHARP = 'BLADESHARP',
  BLUDGEON = 'BLUDGEON',
  COMPREHENSION = 'COMPREHENSION',
  CONCEAL_ITEM = 'CONCEAL_ITEM',
  CONTROL_ENTITY = 'CONTROL_ENTITY',
  COOL = 'COOL',
  COORDINATION = 'COORDINATION',
  COUNTERMAGIC = 'COUNTERMAGIC',
  DARKWALL = 'DARKWALL',
  DEMORALIZE = 'DEMORALIZE',
  DETECT_ENEMIES = 'DETECT_ENEMIES',
  DETECT_LIFE = 'DETECT_LIFE',
  DETECT_MAGIC = 'DETECT_MAGIC',
  DETECT_SPIRIT = 'DETECT_SPIRIT',
  DETECT_SUBSTANCE = 'DETECT_SUBSTANCE',
  DETECT_TRAP = 'DETECT_TRAP',
  DETECT_UNDEAD = 'DETECT_UNDEAD',
  DISPELL_MAGIC = 'DISPELL_MAGIC',
  DISRUPTION = 'DISRUPTION',
  DISTRACTION = 'DISTRACTION',
  DULLBLADE = 'DULLBLADE',
  EXTINGISH = 'EXTINGISH',
  FACE_OF_LAMBRIL = 'FACE_OF_LAMBRIL',
  FALSE_HEALING = 'FALSE_HEALING',
  FANATISM = 'FANATISM',
  FARSEE = 'FARSEE',
  FIREARROW = 'FIREARROW',
  FIREBLADE = 'FIREBLADE',
  FOOD_SONG = 'FOOD_SONG',
  FORGET = 'FORGET',
  GLAMOUR = 'GLAMOUR',
  GLUE = 'GLUE',
  HEAL = 'HEAL',
  HEAT_METAL = 'HEAT_METAL',
  HOTFOOT = 'HOTFOOT',
  IGNITE = 'IGNITE',
  IRON_HAND = 'IRON_HAND',
  JUMPING = 'JUMPING',
  LANTERN = 'LANTERN',
  LIGHT = 'LIGHT',
  LIGHTWALL = 'LIGHTWALL',
  MAGIC_POINT_ENCHANTMENT = 'MAGIC_POINT_ENCHANTMENT',
  METEOR_SWARM = 'METEOR_SWARM',
  MOBILITY = 'MOBILITY',
  MULTIMISSILE = 'MULTIMISSILE',
  PAMALS_TOUCH = 'PAMALS_TOUCH',
  PARRY = 'PARRY',
  PRESERBE_HERBS = 'PRESERBE_HERBS',
  PROTECTION = 'PROTECTION',
  REPAIR = 'REPAIR',
  RIVEREYES = 'RIVEREYES',
  SECOND_SIGHT = 'SECOND_SIGHT',
  SEEK_SUN_DOME_TEMPLE = 'SEEK_SUN_DOME_TEMPLE',
  SHIMMER = 'SHIMMER',
  SILENCE = 'SILENCE',
  SLEEP = 'SLEEP',
  SLOW = 'SLOW',
  SNEEZE = 'SNEEZE',
  SOLACE = 'SOLACE',
  SPEEDART = 'SPEEDART',
  SPELL_MATRIX_ENCHANTMENT = 'SPELL_MATRIX_ENCHANTMENT',
  SPIRIT_BINDING = 'SPIRIT_BINDING',
  SPIRIT_SCREEN = 'SPIRIT_SCREEN',
  STRENGTH = 'STRENGTH',
  SUMMON_ENTITY = 'SUMMON_ENTITY',
  VIGOR = 'VIGOR',
  VISIBILITY = 'VISIBILITY',
}

export enum RunicMagicEnum {
  ABSORTION = 'ABSORPTION',
  ACELERATE_GROWTH = 'ACELERATE_GROWTH',
  AFFIX_DARKNESS = 'AFFIX_DARKNESS',
  AGONY = 'AGONY',
  ALTER_CREATURE = 'ALTER_CREATURE',
  ALTER_SPIRIT_OF_DISEASE = 'ALTER_SPIRIT_OF_DISEASE',
  ANALICE_MAGIC = 'ANALICE_MAGIC',
  ANIMATE_WAR_TREE = 'ANIMATE_WAR_TREE',
  ANTLERS = 'ANTLERS',
  APPEASE_EARTH = 'APPEASE_EARTH',
  AROUSE_PASSION = 'AROUSE_PASSION',
  ARROW_OF_LIGHT = 'ARROW_OF_LIGHT',
  ARROW_TRANCE = 'ARROW_TRANCE',
  ASRELIA_S_CAVE = 'ASRELIA_S_CAVE',
  ATTACK_SOUL = 'ATTACK_SOUL',
  ATTRACT_ATTENTION = 'ATTRACT_ATTENTION',
  AURORA = 'AURORA',
  AWAKEN_LOON = 'AWAKEN_LOON',
  AXE_TRANCE = 'AXE_TRANCE',
  AXIS_MUNDI = 'AXIS_MUNDI',
  BAN = 'BAN',
  BAT_WINGS = 'BAT_WINGS',
  BEAR_SKIN = 'BEAR_SKIN',
  BEAR_STRENGTH = 'BEAR_STRENGTH',
  BEASTMASTER = 'BEASTMASTER',
  BECOME_HAWK = 'BECOME_HAWK',
  BECOME_OTHER_SHAPE = 'BECOME_OTHER_SHAPE',
  BECOME_OTHER = 'BECOME_OTHER',
  BENISON = 'BENISON',
  BERSERKER = 'BERSERKER',
  BIND_WIND = 'BIND_WIND',
  BINDING_ENCHANTMENT = 'BINDING_ENCHANTMENT',
  BIND_GOST = 'BIND_GOST',
  BIRTHING = 'BIRTHING',
  BLACK_BREATH = 'BLACK_BREATH',
  BLAST_EARTH = 'BLAST_EARTH',
  BLESS_ANIMALS = 'BLESS_ANIMALS',
  BLESS_CHAMPION = 'BLESS_CHAMPION',
  BLESS_CROPS = 'BLESS_CROPS',
  BLESS_GRAVE = 'BLESS_GRAVE',
  BLESS_HOME = 'BLESS_HOME',
  BLESS_PREGNANCY = 'BLESS_PREGNANCY',
  BLESS_THUNDERSTONE = 'BLESS_THUNDERSTONE',
  BLESS_WOAD = 'BLESS_WOAD',
  BLESS_WORSHIPERS = 'BLESS_WORSHIPERS',
  BLINDING = 'BLINDING',
  BLOOD_FEAST = 'BLOOD_FEAST',
  BLOOD_RED = 'BLOOD_RED',
  BOAR_HIDE = 'BOAR_HIDE',
  BOAR_STRENGTH = 'BOAR_STRENGTH',
  BOAR_TUSKS = 'BOAR_TUSKS',
  BOUNTY = 'BOUNTY',
  BREATHE_AIR_WATER = 'BREATHE_AIR_WATER',
  BREATHE_LIFE_INTO_ART = 'BREATHE_LIFE_INTO_ART',
  BREW = 'BREW',
  BUTTERFLIGHT = 'BUTTERFLIGHT',
  CALL_FOUNDER = 'CALL_FOUNDER',
  CALL_MONSTER = 'CALL_MONSTER',
  CALL_ON_STARS = 'CALL_ON_STARS',
  CALL_SHANASSE = 'CALL_SHANASSE',
  CALM_WATERS = 'CALM_WATERS',
  CANCEL_LIGHT = 'CANCEL_LIGHT',
  CAPTAIN_SOULS = 'CAPTAIN_SOULS',
  CAPRARACE_BAGOG_VARIANMT = 'CAPRARACE_BAGOG_VARIANMT',
  CARPARACE_GORAKIKI_VARIANT = 'CARPARACE_GORAKIKI_VARIANT',
  CARRY_DISEASE = 'CARRY_DISEASE',
  CATSEYE = 'CATSEYE',
  CAUSE_DISEASE = 'CAUSE_DISEASE',
  CAUSE_PLAGUE = 'CAUSE_PLAGUE',
  CHAMELEON = 'CHAMELEON',
  CHAOS_FEATURE = 'CHAOS_FEATURE',
  CHAOS_GIFT = 'CHAOS_GIFT',
  CHAOS_SPAWN = 'CHAOS_SPAWN',
  CHARISMA = 'CHARISMA',
  CHILL = 'CHILL',
  CHOMPING = 'CHOMPING',
  CITY_HARMONY = 'CITY_HARMONY',
  CLAIRBOYANCE = 'CLAIRBOYANCE',
  CLAWS = 'CLAWS',
  CLAWS_BAGOG_VARIANT = 'CLAWS_BAGOG_VARIANT',
  CLEAR_SIGHT = 'CLEAR_SIGHT',
  CLEVER_TONGUE = 'CLEVER_TONGUE',
  CLOUD_CALL = 'CLOUD_CALL',
  CLOUD_CLEAR = 'CLOUD_CLEAR',
  COIN_WHEEL = 'COIN_WHEEL',
  COMFORT_SONG = 'COMFORT_SONG',
  COMMAND_CULT_SPIRIT = 'COMMAND_CULT_SPIRIT',
  COMMAND_GHOST = 'COMMAND_GHOST',
  COMMAND_PRIESTS = 'COMMAND_PRIESTS',
  COMMAND_SPECIES = 'COMMAND_SPECIES',
  COMMAND_WORSHIPERS = 'COMMAND_WORSHIPERS',
  COMMUNITY = 'COMMUNITY',
  CONQUER_BEAST = 'CONQUER_BEAST',
  CONSUME = 'CONSUME',
  CONSUME_MIND = 'CONSUME_MIND',
  CONTROL_FLOOD = 'CONTROL_FLOOD',
  CONVERSION_OF_OF_CHAOS = 'CONVERSION_OF_OF_CHAOS',
  CORRUPTION = 'CORRUPTION',
  COUNTER_CHAOS = 'COUNTER_CHAOS',
  COUVADE = 'COUVADE',
  CRACK = 'CRACK',
  CREATE_BONFIRE = 'CREATE_BONFIRE',
  CREATE_BRIDGE = 'CREATE_BRIDGE',
  CREATE_FISSURE = 'CREATE_FISSURE',
  CREATE_FLIPPERS = 'CREATE_FLIPPERS',
  CREATE_FOE_CURSER = 'CREATE_FOE_CURSER',
  CREATE_GHOST = 'CREATE_GHOST',
  CREATE_GREAT_MATKET = 'CREATE_GREAT_MATKET',
  CREATE_HEAD = 'CREATE_HEAD',
  CREATE_MARKET_CREATE_NEUTRAL_GROUND = 'CREATE_MARKET_CREATE_NEUTRAL_GROUND',
  CREATE_REVENANT = 'CREATE_REVENANT',
  CREATE_SHADOW = 'CREATE_SHADOW',
  CREATE_SKELETON = 'CREATE_SKELETON',
  CREATE_WAR_TREE = 'CREATE_WAR_TREE',
  CREATE_WHIRLVISH = 'CREATE_WHIRLVISH',
  CREATE_WILDFIRE = 'CREATE_WILDFIRE',
  CREATE_ZOMBIE = 'CREATE_ZOMBIE',
  CREMATE_DEAD = 'CREMATE_DEAD',
  CRUSH = 'CRUSH',
  CURE_ALL_DISEASE = 'CURE_ALL_DISEASE',
  CURE_CHAOS_WOUND = 'CURE_CHAOS_WOUND',
  CURE_IRON_BURN = 'CURE_IRON_BURN',
  CURE_POISON = 'CURE_POISON',
  CURSE_OF_THED = 'CURSE_OF_THED',
  CYCLICAL_CHARACTERISTIC = 'CYCLICAL_CHARACTERISTIC',
  DARKLIGHT = 'DARKLIGHT',
  DARK_WALK = 'DARK_WALK',
  DARKSEE = 'DARKSEE',
  DAUGHTER_ROAD = 'DAUGHTER_ROAD',
  DEAD_PLACE_FERRY = 'DEAD_PLACE_FERRY',
  //TODO add the rest of the enum
};

export enum SorceryEnum {};

export type SpellEnum = SpiritSpellEnum | RunicMagicEnum | SorceryEnum;

export abstract class Spell {
  public name = STRING_EMPTY;
  public speciality = STRING_EMPTY;
  public needSpeciality = false;
  public points = 0
  public type: SpellType = SpellType.SPIRITUAL;
  public range: SpellRange = SpellRange.SELF;
  public duration: SpellDuration = SpellDuration.INSTANT;
  public ritual = false;
  public mode: SpellMode = SpellMode.ACTIVE;
  public enchantment = false;

  constructor(options?: SpellOptions) {
    if (options) {
      this.points = options.points ?? this.points;
      this.type = options.type ?? this.type;
      this.range = options.range ?? this.range;
      this.duration = options.duration ?? this.duration;
      this.ritual = options.ritual ?? this.ritual;
      this.enchantment = options.enchantment ?? this.enchantment;
      this.mode = options.mode ?? this.mode
      this.speciality = options.speciality ?? this.speciality;
      this.needSpeciality = !!this.speciality;
      this.duration = this.enchantment ? SpellDuration.PERMANENT : this.duration;
    }
  }
}

export class SpellOptions {
  public points?: number;
  public type?: SpellType;
  public range?: SpellRange;
  public duration?: SpellDuration;
  public ritual?: boolean;
  public enchantment?: boolean;
  public stackable?: boolean;
  public runes?: RunesEnum[];
  public oneUse?: boolean;
  public mode?: SpellMode;
  public speciality?: string;
}

export interface stackable {
  stackable: boolean;
}

export interface Runed {
  runes: RunesEnum[];
}

export class SpiritualSpell extends Spell implements stackable{
  public stackable = false;
  public override name: SpiritSpellEnum = SpiritSpellEnum.BEFUDDLE;
  constructor( name: SpiritSpellEnum, options?: SpellOptions) {
    super(options);
    this.name = name;
    this.stackable = options?.stackable ?? this.stackable;
    this.type = SpellType.SPIRITUAL;
  }
}

export class RunicSpell extends Spell implements stackable, Runed {
  public stackable = false;
  public runes: RunesEnum[] = [];
  public oneUse = false;

  constructor(name: string, options?: SpellOptions) {
    super(options);
    this.name = name;
    this.type = SpellType.RUNIC;
    this.stackable = options?.stackable ?? this.stackable;
    this.oneUse = options?.oneUse ?? this.oneUse;
    this.runes = options?.runes ?? this.runes;
  }
}

export class SorcerySpell extends Spell implements Runed{
  public runes: RunesEnum[] = [];

  constructor( name: string, options?: SpellOptions) {
    super(options);
    this.name = name;
    this.type = SpellType.SORCERY;
    this.runes = options?.runes ?? this.runes;
  }
}


export const SPIRITUAL_SPELLS: SpiritualSpell[] = [
  new SpiritualSpell( SpiritSpellEnum.BEFUDDLE, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.BINDING_ENCHANTMENT, { points: 1, ritual: true, enchantment: true }),
  new SpiritualSpell( SpiritSpellEnum.BLADESHARP, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.BLUDGEON, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.COMPREHENSION, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.CONCEAL_ITEM, { points: 1, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.CONTROL_ENTITY, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.VARIES }),
  new SpiritualSpell( SpiritSpellEnum.COOL, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.SPECIAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.COORDINATION, { points: 2, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.COUNTERMAGIC, {  stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.DARKWALL, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.VARIES }),
  new SpiritualSpell( SpiritSpellEnum.DEMORALIZE, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_ENEMIES, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_LIFE, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_MAGIC, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_SPIRIT, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_SUBSTANCE, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_TRAP, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DETECT_UNDEAD, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DISPELL_MAGIC, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DISRUPTION, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DISTRACTION, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.DULLBLADE, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.EXTINGISH, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.FACE_OF_LAMBRIL, { points: 2, range: SpellRange.SELF, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.FALSE_HEALING, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.FANATISM, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.FARSEE, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.FIREARROW, { points: 2, range: SpellRange.TOUCH, duration: SpellDuration.INSTANT, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.FIREBLADE, { points: 4, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.ACTIVE }),
  new SpiritualSpell( SpiritSpellEnum.FOOD_SONG, { points: 1, range: SpellRange.TOUCH, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.FORGET, { points: 3, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.GLAMOUR, { points: 2, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.GLUE, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.HEAL, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.HEAT_METAL, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.HOTFOOT, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.IGNITE, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.IRON_HAND, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.JUMPING, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.LANTERN, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.LIGHT, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.LIGHTWALL, { points: 4, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.VARIES }),
  new SpiritualSpell( SpiritSpellEnum.MAGIC_POINT_ENCHANTMENT, { points: 1, ritual: true, enchantment: true }),
  new SpiritualSpell( SpiritSpellEnum.METEOR_SWARM, { points: 6, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.MOBILITY, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.MULTIMISSILE, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.PAMALS_TOUCH, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.PARRY, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.PRESERBE_HERBS, { points: 1, range: SpellRange.TOUCH, duration: SpellDuration.SPECIAL }),
  new SpiritualSpell( SpiritSpellEnum.PROTECTION, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.REPAIR, { stackable: true, range: SpellRange.TOUCH, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.RIVEREYES, { points: 1, range: SpellRange.SELF, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SECOND_SIGHT, { points: 3, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SEEK_SUN_DOME_TEMPLE, { points: 3, range: SpellRange.SELF, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.SHIMMER, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SILENCE, { points: 1, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SLEEP, { points: 3, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SLOW, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SNEEZE, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SOLACE, { points: 3, range: SpellRange.DISTANCE, duration: SpellDuration.SPECIAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SPEEDART, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SPELL_MATRIX_ENCHANTMENT, { points: 1, ritual: true, enchantment: true }),
  new SpiritualSpell( SpiritSpellEnum.SPIRIT_BINDING, { points: 1, range: SpellRange.DISTANCE, duration: SpellDuration.INSTANT }),
  new SpiritualSpell( SpiritSpellEnum.SPIRIT_SCREEN, { stackable: true, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.STRENGTH, { points: 2, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.SUMMON_ENTITY, { stackable: true, ritual: true, mode: SpellMode.VARIES }),
  new SpiritualSpell( SpiritSpellEnum.VIGOR, { points: 2, range: SpellRange.TOUCH, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
  new SpiritualSpell( SpiritSpellEnum.VISIBILITY, { points: 2, range: SpellRange.DISTANCE, duration: SpellDuration.TEMPORAL, mode: SpellMode.PASSIVE }),
];

export const RUNIC_SPELLS: RunicSpell[] = [
];

export const SORCERY_SPELLS: SorcerySpell[] = [];
