import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NUMBERS } from '@shared/constants/number.constants';
import { Character } from '@shared/models/chartacter.model';
import { DialogOptions } from '@shared/models/modal.model';
import { CharactersService } from '@shared/services/character.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { stringFrom } from '@shared/utils/string.utils';
import { ModalService } from '@shared/services/modal.service';
import { PjLocationsComponent } from '../../components/locations/locations.component';
import { numberFrom } from '@shared/utils/number.utils';
import { BriefingComponent } from '../../components/briefing/briefing.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { PjUtilityComponent } from '../../components/utility/utility.component';
import { NotesComponent } from '../../components/notes/notes.component';
import { WeaponsComponent } from '../../components/weapons/weapons.component';

const imports = [
  TranslateModule,
  StatsComponent,
  PjLocationsComponent,
  BriefingComponent,
  PjUtilityComponent,
  NotesComponent,
  WeaponsComponent,
];

@Component({
  selector: 'app-combat',
  standalone: true,
  imports,
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent implements OnInit {

  public pnjs: Character[] = [];
  public pnj: Character | undefined = undefined;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((character) => {
      this.checkNewCharacter(character);
    });
  }

  public swichCharacterIndex(variation: number): void {
    const index = this.pnjs.findIndex((character) => character.id === this.pnj?.id);
    if (!this.pnjs.length || index === undefined) { return; }

    let newIndex = numberFrom(index) + variation;
    newIndex = newIndex < NUMBERS.N_0 ? this.pnjs.length - 1 : newIndex;
    newIndex = newIndex >= this.pnjs.length ? NUMBERS.N_0 : newIndex;

    this.pnj = this.pnjs[newIndex];
    this.characterService.setCharacter(this.pnj);
  }

   public close(): void {
    if (!this.pnj) { return; }
     const dialog: DialogOptions = {
      title: this.translate.instant('UTILITY.ACTIONS.REMOVE_PJ.TITLE'),
      message: this.translate.instant('UTILITY.ACTIONS.REMOVE_PJ.MESSAGE', { pj: stringFrom(this.pnj?.name) }),
      buttons: [
        { label: this.translate.instant('COMMON.CANCEL')},
        {
          label: this.translate.instant('COMMON.ACCEPT'),
          action: () => {
            if ( !this.pnj ) { return; }
            this.pnjs = this.pnjs.filter((character) => character.id !== this.pnj?.id);
            this.swichCharacterIndex(NUMBERS.N_0);
          },
          className: 'primary-button'
        }
      ]
    };
    this.modalService.easyDialog(dialog);
  }

  public save(): void {
    const dialog: DialogOptions = {
      title: this.translate.instant('UTILITY.ACTIONS.SAVE_PJ.TITLE'),
      message: this.translate.instant('UTILITY.ACTIONS.SAVE_PJ.MESSAGE', { pj: stringFrom(this.pnj?.name) }),
      buttons: [
        { label: this.translate.instant('COMMON.CANCEL') },
        {
          label: this.translate.instant('COMMON.ACCEPT'),
          action: () => {
            if ( !this.pnj ) { return; }
            this.characterService.updateOrAddCharacter(this.pnj);
          },
          className: 'primary-button'
        }
      ]
    };
    this.modalService.easyDialog(dialog);
  }

  public deleteCharacter(): void {
    const dialog: DialogOptions = {
      title: this.translate.instant('UTILITY.ACTIONS.DELETE_PJ.TITLE'),
      message: this.translate.instant('UTILITY.ACTIONS.DELETE_PJ.MESSAGE', { pj: stringFrom(this.pnj?.name) }),
      buttons: [
        { label: this.translate.instant('COMMON.CANCEL') },
        {
          label: this.translate.instant('COMMON.ACCEPT'),
          action: () => {
            if ( !this.pnj ) { return; }
            this.characterService.deleteCharacter(this.pnj);
            this.pnjs = this.pnjs.filter((character) => character.id !== this.pnj?.id);
            this.swichCharacterIndex(NUMBERS.N_0);
          },
          className: 'primary-button'
        }
      ]
    };
    this.modalService.easyDialog(dialog);
  }


  private checkNewCharacter(pj: Character | undefined): void {
    // If the character is undefined, do nothing
    if(!pj || this.pnjs.find((character) => character.id === pj.id)) {
      return;
    }

    // Add the new character to the list
    this.pnjs.push(pj);
    this.pnj = pj;
  }
}
