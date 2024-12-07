import { NUMBERS } from '@shared/constants/number.constants';
import { LocationsEnum } from './location.model';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { DiceRoll } from './dices.model';
import { RunesEnum } from './rune.model';

export class Equipment {
  public id = NUMBERS.N_0;
  public name = STRING_EMPTY;
  public description = STRING_EMPTY;
  public weight = NUMBERS.N_0;
  public price = NUMBERS.N_0;
  public quantity = NUMBERS.N_1;
  public inCombat = false;
  public visible = true;
  public temporalBonus = new EquipmentBonus();
  public permanentBonus = new EquipmentBonus();

  constructor(name: string) {
    this.id = getUniqueID(name);
    this.name = name;
  }
}

const getUniqueID = (name: string): number => {
  return Number(new Date().getTime()) + Math.floor(Math.random() * 1000);
};

export class EquipmentBonus {
  public weight = NUMBERS.N_0;
  public AP = NUMBERS.N_0;
  public skills: SkillValueBonus[] = [];
}

export class WeaponBonus extends EquipmentBonus {
  public damageRoll: DiceRoll[] = [];
  public basicDamageRoll: DiceRoll[] = [];
  public damagePoints = NUMBERS.N_0;
  public basicDamagePoints = NUMBERS.N_0;
  public MR = NUMBERS.N_0;
  public damageTypes: WeaponDMGTypeEnum[] = [];
  public minSTR = NUMBERS.N_0;
  public minDEX = NUMBERS.N_0;
  public rangue = NUMBERS.N_0;
  public skillValue = NUMBERS.N_0;
  public newFirerate: FireRateEnum | undefined = undefined;
  public runes: RunesEnum[] = [];
}

export class SkillValueBonus {
  skillName = STRING_EMPTY;
  value = NUMBERS.N_0;
}

export class Weapon extends Equipment {
  public damage: DiceRoll[] = [];
  public skillGroup: WeaponGroupEnum = WeaponGroupEnum.MELEE;
  public skillName = STRING_EMPTY;
  public ap = NUMBERS.N_0;
  public apVariation = NUMBERS.N_0;
  public mr = NUMBERS.N_0;
  public damageTypes: WeaponDMGTypeEnum[] = [WeaponDMGTypeEnum.SLASHING];
  public rune?: RunesEnum;
  public minSTR = NUMBERS.N_0;
  public minDEX = NUMBERS.N_0;
  public twoHanded = false;
  public rangue = NUMBERS.N_0;
  public fireRate: FireRateEnum | undefined = undefined;
  public swShowDetail = false;
  public damageModType: DamageModTypeEnum = DamageModTypeEnum.FULL;
  public override temporalBonus: WeaponBonus;
  public override permanentBonus: WeaponBonus;

  constructor(
    name: string,
  ) {
    super(name);
    this.temporalBonus = new WeaponBonus();
    this.permanentBonus = new WeaponBonus();
  }

  public static getDamageString(weapon: Weapon): string {
    return weapon.damage.map((d) => DiceRoll.toString(d)).join(' + ');
  }
}

export interface WeaponParams {
  name: string,
  damage?: DiceRoll[],
  skillGroup?: WeaponGroupEnum,
  skillName?: string,
  ap?: number,
  mr?: number,
  damageTypes?: WeaponDMGTypeEnum[],
  rune?: RunesEnum;
  minSTR?: number;
  minDEX?: number;
  twoHanded?: boolean;
  rangue?: number;
  fireRate?: FireRateEnum;
  weight?: number;
  price?: number;
  damageModType? : DamageModTypeEnum;
}


export class WeaponFactroy {
  public static createWeapon(weaponParams: WeaponParams): Weapon {
    const weapon: Weapon = {
      id: getUniqueID(weaponParams.name),
      damage: weaponParams.damage || [new DiceRoll(1, 6)],
      skillGroup: weaponParams.skillGroup || WeaponGroupEnum.MELEE,
      skillName: weaponParams.skillName || STRING_EMPTY,
      ap: weaponParams.ap || NUMBERS.N_8,
      apVariation: NUMBERS.N_0,
      mr: weaponParams.mr || NUMBERS.N_3,
      damageTypes: weaponParams.damageTypes || [WeaponDMGTypeEnum.CUT_AND_THRUSH],
      rune: weaponParams.rune || undefined,
      minSTR: weaponParams.minSTR || NUMBERS.N_0,
      minDEX: weaponParams.minDEX || NUMBERS.N_0,
      twoHanded: weaponParams.twoHanded || false,
      rangue: weaponParams.rangue || NUMBERS.N_0,
      fireRate: weaponParams.fireRate || undefined,
      name: weaponParams.name,
      description: weaponParams.name,
      weight: weaponParams.weight || NUMBERS.N_1,
      price: weaponParams.price || NUMBERS.N_20,
      quantity: 1,
      inCombat: true,
      visible: true,
      temporalBonus: new WeaponBonus(),
      permanentBonus: new WeaponBonus(),
      swShowDetail: false,
      damageModType: weaponParams.damageModType || DamageModTypeEnum.FULL,
    };

    return weapon;
  }

  public static getInitialHumanWeapons(): Weapon[] {
    return [
      WeaponFactroy.createWeapon({ name: 'FIST',    skillName: 'FIST',    mr: 4, ap: 0, damage:[new DiceRoll(1, 3)],  damageTypes: [WeaponDMGTypeEnum.HAND_TO_HAND], weight: 0, minDEX: 0, minSTR: 0 }),
      WeaponFactroy.createWeapon({ name: 'GRAPPLE', skillName: 'GRAPPLE', mr: 4, ap: 0, damage:[],                    damageTypes: [WeaponDMGTypeEnum.HAND_TO_HAND], weight: 0, minDEX: 0, minSTR: 0 }),
      WeaponFactroy.createWeapon({ name: 'KICK',    skillName: 'KICK',    mr: 4, ap: 0, damage:[new DiceRoll(1, 6)],  damageTypes: [WeaponDMGTypeEnum.HAND_TO_HAND], weight: 0, minDEX: 0, minSTR: 0 }),
    ];
  }
}

export class Armor extends Equipment {
  public type: ArmorTypes = ArmorTypes.HOOD;
  public material: ArmorMat = ArmorMat.LEATHER;
  public armorPoints = NUMBERS.N_0;
  public coveredLocations: LocationsEnum[] = [];
  public equipped = false;
  public stealthMalus = NUMBERS.N_0;
  public races: string[] = [];
  public swDetail = false;

  constructor(
    material: ArmorMat,
    type: ArmorTypes,
    locations: LocationsEnum[],
    armorPoints: number,
    enc: number,
    cost: number,
    stealthMalus: number,
    races: string[] = [],
  )
  {
    super(`${material}-${type}`);
    this.material = material;
    this.type = type;
    this.armorPoints = armorPoints;
    this.coveredLocations = locations;
    this.weight = enc;
    this.price = cost;
    this.inCombat = true;
    this.stealthMalus = stealthMalus;
    this.races = races;
  }
}

export enum WeaponGroupEnum {
  MELEE = 'MELEE',
  RANGED = 'RANGED',
  SHIELDS = 'SHIELDS',
  NATURAL = 'NATURAL',
  OTHER = 'OTHER'
}

export enum WeaponDMGTypeEnum {
  SLASHING = 'SLASHING',
  IMPALING = 'IMPALING',
  CRUSHING = 'CRUSHING',
  CUT_AND_THRUSH = 'CUT_AND_THRUSH',
  HAND_TO_HAND = 'HAND_TO_HAND'
}

export enum FireRateEnum {
  S_MR = 'S/MR',
  E_5R = '1/5R',
  E_3R = '1/3R',
  E_2R = '1/2R',
  E_MR = '1/1R',
}

export enum DamageModTypeEnum {
  FULL = 'FULL',
  HALF = 'HALF',
  NONE = 'NONE'
}

export enum ArmorMat {
  LEATHER = 'LEATHER',
  HEAVY_LEATHER = 'HEAVY_LEATHER',
  STUDDED_LEATHER = 'STUDDED_LEATHER',
  PLATE = 'PLATE',
  RHINO_HIDE = 'RHINO_HIDE',
  LIGTH_SCALE = 'LIGTH_SCALE',
  HEAVY_SCALE = 'HEAVY_SCALE',
  CUIRBOILLI = 'CUIRBOILLI',
  BRONCE_PLATE = 'BRONCE_PLATE',
  RING_MAIL = 'RING_MAIL',
  TURTLESHELL = 'TURTLESHELL',
  INSECT_CAPARACE = 'INSECT_CAPARACE',
  DISK_PLATE = 'DISK_PLATE',
  QUILTED = 'QUILTED',
  LINEN = 'LINEN',
  ELF_BARK = 'ELF_BARK',
  LEAD_PLATE = 'LEAD_PLATE',
}

export enum ArmorTypes {
  HOOD = 'HOOD',
  BROAD_BRIMMED_HAT = 'BROAD_BRIMMED_HAT',
  CAP = 'CAP',
  COMPOSITE_HELM = 'COMPOSITE_HELM',
  OPEN_HELM = 'OPEN_HELM',
  CLOSED_HELM = 'CLOSED_HELM',
  FULL_HELM = 'FULL_HELM',
  SLEEVES = 'SLEEVES',
  VAMBRACES = 'VAMBRACES',
  CUIRASS = 'CUIRASS',
  LINOTORAX = 'LINOTORAX',
  HAUBERK = 'HAUBERK',
  SEGMENTED_BRONCE = 'SEGMENTED_BRONCE',
  SKIRTS = 'SKIRTS',
  PANTS = 'PANTS',
  TREWS = 'TREWS',
  GREAVES = 'GREAVES',
}
