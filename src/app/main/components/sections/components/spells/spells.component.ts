import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { RunicMagicEnum, SorceryEnum, SpellEnum, SpellType, SpiritSpellEnum } from '@shared/models/spell.models';
import { SpellComponent } from '../spell/spell.component';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
  SpellComponent,
];

@Component({
  selector: 'app-spells',
  standalone: true,
  imports,
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  spellTypesOption: RQGOption[] = this.getSpellTypeOptions();
  spellNamesOption: RQGOption[] = this.getSpellNamesOptions();
  selectedType: SpellType = SpellType.SPIRITUAL;
  selectedSpell: SpellEnum = SpiritSpellEnum.HEAL;

  public form = new FormGroup({
    spellType: new FormControl<SpellType>(SpellType.SPIRITUAL),
    spellName: new FormControl<string>(SpiritSpellEnum.HEAL),
  });

  constructor(
    private readonly translate: TranslateService,
  ) {}


  typeChange(newType: string): void {
    this.selectedType = newType as SpellType;
    this.spellNamesOption = this.getSpellNamesOptions();
    this.selectedSpell = this.spellNamesOption[0].value as SpiritSpellEnum | RunicMagicEnum | SorceryEnum;
  }

  getSpellNamesOptions(): RQGOption[] {
    const typeMapper = {
      [SpellType.SPIRITUAL]: () => SpiritSpellEnum,
      [SpellType.RUNIC]: () => RunicMagicEnum,
      [SpellType.SORCERY]: () => SorceryEnum,
    }
    const selectedType = typeMapper[this.selectedType] ? typeMapper[this.selectedType]() : SpiritSpellEnum;
    const options =  Object.keys(selectedType).map( key => {
      return {value: key, label: this.translate.instant(`SPELLS.NAMES.${key}`)};
    });
    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  }

  nameChange(name: string): void {
    this.selectedSpell = name as SpiritSpellEnum | RunicMagicEnum | SorceryEnum;
  }

  getSpellTypeOptions(): RQGOption[] {
    const options = Object.keys(SpellType).map( key => {
      return {value: key, label: this.translate.instant(`SPELLS.TYPES.${key}`)};
    });
    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  }

}
