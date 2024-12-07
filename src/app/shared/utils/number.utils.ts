import { NUMBERS } from "@shared/constants/number.constants";

export const acotateNumber = (number: number, max: number, min: number): number => number > max ? max : number < min ? min : number;

export const numberFrom = (value: number | string | undefined | null): number => value ? Number(value) : NUMBERS.N_0;

