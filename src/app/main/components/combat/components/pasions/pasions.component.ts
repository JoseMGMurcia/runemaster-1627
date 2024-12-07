import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { Character, Passion } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { finalize } from 'rxjs';
import { DEFAULT_MODAL_OPTIONS } from '@shared/models/modal.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { getSuccessLevel, rollDices } from '@shared/utils/dices.utils';
import { SuccessLevelType } from '@shared/models/dices.model';
import { StatusService } from '@shared/services/status.service';
import { NgClass, NgIf } from '@angular/common';
import { AddPassionComponent } from '../../modals/add-passion/add-passion.component';

const imports = [
  TooltipContainerComponent,
  TranslateModule,
  NgClass,
  NgIf,
];

@Component({
  selector: 'app-pasions',
  standalone: true,
  imports,
  templateUrl: './pasions.component.html',
  styleUrl: './pasions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasionsComponent {
  pj: Character | undefined = undefined;
  swShowPasions = false;
  RQGTooltipPositionEnum = RQGTooltipPositionEnum;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modal: ModalService,
    private readonly translate: TranslateService,
    private readonly statusService: StatusService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe((character) => {
      this.pj = character;
      this.loading.hide(); // TODO: Remove this line when the loading service is working
    });

    this.statusService.reload$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((reload) => {
      if (!reload) {return;}
      this.cdr.markForCheck();
    });
  }

  switchShowDetails(): void {
    this.swShowPasions = !this.swShowPasions;
  }

  gwtRowClass(index: number): string {
    return index % 2 === 0 ? 'odd' : 'even';
  }

  addNewPasion(): void {
    this.modal.open(AddPassionComponent, {
      ...DEFAULT_MODAL_OPTIONS,
      data: { pj: this.pj },
      prevenCloseOutside: true,
    });
  }

  removePassion(pasion: Passion): void {
    if (!this.pj) {return;}
    this.pj.passions = this.pj.passions.filter((p) => p.id !== pasion.id );
  }

  rollAttack(pasion: Passion): void {
    if (!this.pj) { return; }
    const passionName = this.translate.instant(`PASSIONS.${pasion.type}`);

    const roll = rollDices(1, 100);
    const successLevel: SuccessLevelType = getSuccessLevel(pasion.value, roll);
    const slText = this.translate.instant(`DICES.SUCCES_LEVEL.${successLevel}`);
    this.statusService.setResultPending(`${this.pj.name}, ${passionName}: ${roll} - ${slText}`);

  }

}
