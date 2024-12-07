import { TranslateService } from '@ngx-translate/core';
import { Character, CharacterRune } from '@shared/models/chartacter.model';
import { SuccessLevelType } from '@shared/models/dices.model';
import { RunesEnum } from '@shared/models/rune.model';
import { getSuccessLevel, rollDices } from './dices.utils';
import { StatusService } from '@shared/services/status.service';

export const getInitialHumanRunes = (): CharacterRune[] => [
  new CharacterRune( RunesEnum.AIR, 0),
  new CharacterRune( RunesEnum.EARTH, 0),
  new CharacterRune( RunesEnum.FIRE, 0),
  new CharacterRune( RunesEnum.WATER, 0),
  new CharacterRune( RunesEnum.DARKNESS, 0),
  new CharacterRune( RunesEnum.MOON, 0),

  ...getPairedRunes(
    new CharacterRune( RunesEnum.FERTILITY, 50),
    new CharacterRune( RunesEnum.DEATH, 50)
  ),
  ...getPairedRunes(
    new CharacterRune( RunesEnum.HARMONY, 50),
    new CharacterRune( RunesEnum.DISORDER, 50)
  ),
  ...getPairedRunes(
    new CharacterRune( RunesEnum.ILLUSION, 50),
    new CharacterRune( RunesEnum.TRUTH, 50)
  ),
  ...getPairedRunes(
    new CharacterRune( RunesEnum.EXTAXIS, 50),
    new CharacterRune( RunesEnum.MOVEMENT, 50)
  ),
  ...getPairedRunes(
    new CharacterRune( RunesEnum.MAN, 50),
    new CharacterRune( RunesEnum.BEAST, 50)
  ),
];

export const getPairedRunes = (firstRune: CharacterRune, secondRune: CharacterRune): CharacterRune[] => {
  firstRune.pairedCharacterRune = secondRune;
  secondRune.pairedCharacterRune = firstRune;
  return [firstRune, secondRune];
};

export const rollRune = (
  rune: CharacterRune,
  pj: Character | undefined,
  translate: TranslateService,
  statusService: StatusService,
): void => {
  if (!pj) { return; }
  const runeName = translate.instant(`RUNES.${rune.rune}`);

  const roll = rollDices(1, 100);
  const successLevel: SuccessLevelType = getSuccessLevel(rune.value, roll);
  const slText = translate.instant(`DICES.SUCCES_LEVEL.${successLevel}`);
  statusService.setResultPending(`${pj.name} ${runeName}: ${roll} - ${slText}`);
}
