import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RUNIC_SPELLS, RunicMagicEnum, RunicSpell, SORCERY_SPELLS, SorceryEnum, SorcerySpell, Spell, SpellDuration, SpellMode, SpellRange, SpellType,
  SpiritSpellEnum, SPIRITUAL_SPELLS, SpiritualSpell } from '@shared/models/spell.models';

const imports = [
  TranslateModule,
  NgIf,
];

@Component({
  selector: 'app-spell',
  standalone: true,
  imports,
  templateUrl: './spell.component.html',
  styleUrl: './spell.component.scss'
})
export class SpellComponent {
  @Input() selectedType: SpellType = SpellType.SPIRITUAL;
  @Input() selectedSpell: SpiritSpellEnum | RunicMagicEnum | SorceryEnum = SpiritSpellEnum.BEFUDDLE;

  SpellRange = SpellRange;
  SpellDuration = SpellDuration;
  SpellMode = SpellMode;

  get spell(): Spell {
    if (this.selectedType === SpellType.SPIRITUAL) {
      return SPIRITUAL_SPELLS.find(spell => spell.name === this.selectedSpell) as SpiritualSpell;
    }
    if (this.selectedType === SpellType.RUNIC) {
      return RUNIC_SPELLS.find(spell => spell.name === this.selectedSpell) as RunicSpell;
    }
    return SORCERY_SPELLS.find(spell => spell.name === this.selectedSpell) as SorcerySpell;
  }
}
