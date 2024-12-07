import { NUMBERS } from '@shared/constants/number.constants';
import { HPRatioEnum, LocationsEnum, LocRange,  RQGLocation } from '../models/location.model';

export const HUMAN_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.RIGHT_LEG, HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_4),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_LEG,  HPRatioEnum.X33, new LocRange(NUMBERS.N_5,  NUMBERS.N_8),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,   HPRatioEnum.X33, new LocRange(NUMBERS.N_9,  NUMBERS.N_11), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CHEST,     HPRatioEnum.X40, new LocRange(NUMBERS.N_12, NUMBERS.N_12), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_ARM, HPRatioEnum.X25, new LocRange(NUMBERS.N_13, NUMBERS.N_15), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_ARM,  HPRatioEnum.X25, new LocRange(NUMBERS.N_16, NUMBERS.N_18), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,      HPRatioEnum.X33, new LocRange(NUMBERS.N_19, NUMBERS.N_20), NUMBERS.N_0),
];

export const DRAGONEWT_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.TAIL,      HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_2),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_LEG, HPRatioEnum.X33, new LocRange(NUMBERS.N_3,  NUMBERS.N_5),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_LEG,  HPRatioEnum.X33, new LocRange(NUMBERS.N_6,  NUMBERS.N_8),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,   HPRatioEnum.X33, new LocRange(NUMBERS.N_9,  NUMBERS.N_11), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CHEST,     HPRatioEnum.X40, new LocRange(NUMBERS.N_12, NUMBERS.N_12), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_ARM, HPRatioEnum.X25, new LocRange(NUMBERS.N_13, NUMBERS.N_15), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_ARM,  HPRatioEnum.X25, new LocRange(NUMBERS.N_16, NUMBERS.N_18), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,      HPRatioEnum.X33, new LocRange(NUMBERS.N_19, NUMBERS.N_20), NUMBERS.N_0),
];

export const DRAGONEWT_WINGED_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.TAIL,      HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_2),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_LEG, HPRatioEnum.X33, new LocRange(NUMBERS.N_3,  NUMBERS.N_5),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_LEG,  HPRatioEnum.X33, new LocRange(NUMBERS.N_6,  NUMBERS.N_8),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,   HPRatioEnum.X33, new LocRange(NUMBERS.N_9,  NUMBERS.N_11), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CHEST,     HPRatioEnum.X40, new LocRange(NUMBERS.N_12, NUMBERS.N_12), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_WING,HPRatioEnum.X25, new LocRange(NUMBERS.N_13, NUMBERS.N_13), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_WING, HPRatioEnum.X25, new LocRange(NUMBERS.N_14, NUMBERS.N_14), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_ARM, HPRatioEnum.X25, new LocRange(NUMBERS.N_15, NUMBERS.N_16), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_ARM,  HPRatioEnum.X25, new LocRange(NUMBERS.N_17, NUMBERS.N_18), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,      HPRatioEnum.X33, new LocRange(NUMBERS.N_19, NUMBERS.N_20), NUMBERS.N_0),
];

export const QUADRUPED_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.BACK_RIGHT_LEG, HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_2),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.BACK_LEFT_LEG,  HPRatioEnum.X33, new LocRange(NUMBERS.N_3,  NUMBERS.N_4),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.BACK_QUARTER,   HPRatioEnum.X40, new LocRange(NUMBERS.N_5,  NUMBERS.N_7), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.FRONT_QUARTER,  HPRatioEnum.X40, new LocRange(NUMBERS.N_8, NUMBERS.N_10), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.FRONT_RIGHT_LEG,HPRatioEnum.X33, new LocRange(NUMBERS.N_11, NUMBERS.N_13), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.FRONT_LEFT_LEG, HPRatioEnum.X33, new LocRange(NUMBERS.N_14, NUMBERS.N_16), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,           HPRatioEnum.X33, new LocRange(NUMBERS.N_17, NUMBERS.N_20), NUMBERS.N_0),
];

export const FLYING_INSECT_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.BACK_RIGHT_LEG,    HPRatioEnum.X16, new LocRange(NUMBERS.N_1,  NUMBERS.N_1),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CENTRAL_RIGHT_LEG, HPRatioEnum.X16, new LocRange(NUMBERS.N_2,  NUMBERS.N_2),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.BACK_LEFT_LEG,     HPRatioEnum.X16, new LocRange(NUMBERS.N_3,  NUMBERS.N_3),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CENTRAL_LEFT_LEG,  HPRatioEnum.X16, new LocRange(NUMBERS.N_4,  NUMBERS.N_4),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,           HPRatioEnum.X40, new LocRange(NUMBERS.N_5,  NUMBERS.N_8), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.TORAX,             HPRatioEnum.X40, new LocRange(NUMBERS.N_9, NUMBERS.N_10), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_WING,        HPRatioEnum.X25, new LocRange(NUMBERS.N_11, NUMBERS.N_12), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_WING,         HPRatioEnum.X25, new LocRange(NUMBERS.N_13, NUMBERS.N_14), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.FRONT_RIGHT_LEG,   HPRatioEnum.X16, new LocRange(NUMBERS.N_15, NUMBERS.N_16), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.FRONT_LEFT_LEG,    HPRatioEnum.X16, new LocRange(NUMBERS.N_17, NUMBERS.N_18), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,              HPRatioEnum.X33, new LocRange(NUMBERS.N_19, NUMBERS.N_20), NUMBERS.N_0),
];

export const SNAIL_DRAGON_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.SNAIL_DRAGON_SHELL,    HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_8), NUMBERS.N_8),
  new RQGLocation(LocationsEnum.SNAIL_DRAGON_BODY,     HPRatioEnum.X40, new LocRange(NUMBERS.N_9, NUMBERS.N_14), NUMBERS.N_4),
  new RQGLocation(LocationsEnum.HEAD,                  HPRatioEnum.X33, new LocRange(NUMBERS.N_15, NUMBERS.N_20), NUMBERS.N_0),
];

export const TWO_HEAD_SNAIL_DRAGON_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.SNAIL_DRAGON_SHELL,    HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_7), NUMBERS.N_8),
  new RQGLocation(LocationsEnum.SNAIL_DRAGON_BODY,     HPRatioEnum.X40, new LocRange(NUMBERS.N_8, NUMBERS.N_12), NUMBERS.N_4),
  new RQGLocation(LocationsEnum.RIGHT_HEAD,            HPRatioEnum.X33, new LocRange(NUMBERS.N_13, NUMBERS.N_16), NUMBERS.N_4),
  new RQGLocation(LocationsEnum.LEFT_HEAD,             HPRatioEnum.X33, new LocRange(NUMBERS.N_17, NUMBERS.N_20), NUMBERS.N_4),
];

export const FLYING_BIRD_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.TAIL,       HPRatioEnum.X16, new LocRange(NUMBERS.N_1,  NUMBERS.N_1),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_LEG,  HPRatioEnum.X25, new LocRange(NUMBERS.N_2,  NUMBERS.N_4),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_LEG,   HPRatioEnum.X25, new LocRange(NUMBERS.N_5,  NUMBERS.N_7),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,    HPRatioEnum.X33, new LocRange(NUMBERS.N_8,  NUMBERS.N_9),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CHEST,      HPRatioEnum.X40, new LocRange(NUMBERS.N_10, NUMBERS.N_12), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_WING, HPRatioEnum.X33, new LocRange(NUMBERS.N_13, NUMBERS.N_14), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_WING,  HPRatioEnum.X33, new LocRange(NUMBERS.N_15, NUMBERS.N_16), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,       HPRatioEnum.X33, new LocRange(NUMBERS.N_17, NUMBERS.N_20), NUMBERS.N_0),
];

export const NON_FLYING_BIRD_LOCATIONS: RQGLocation[] = [
  new RQGLocation(LocationsEnum.RIGHT_LEG,  HPRatioEnum.X33, new LocRange(NUMBERS.N_1,  NUMBERS.N_4),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_LEG,   HPRatioEnum.X33, new LocRange(NUMBERS.N_5,  NUMBERS.N_8),  NUMBERS.N_0),
  new RQGLocation(LocationsEnum.ABDOMEN,    HPRatioEnum.X33, new LocRange(NUMBERS.N_9,  NUMBERS.N_10), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.CHEST,      HPRatioEnum.X40, new LocRange(NUMBERS.N_11, NUMBERS.N_13), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.RIGHT_WING, HPRatioEnum.X25, new LocRange(NUMBERS.N_14, NUMBERS.N_15), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.LEFT_WING,  HPRatioEnum.X25, new LocRange(NUMBERS.N_16, NUMBERS.N_17), NUMBERS.N_0),
  new RQGLocation(LocationsEnum.HEAD,       HPRatioEnum.X33, new LocRange(NUMBERS.N_18, NUMBERS.N_20), NUMBERS.N_0),
];
