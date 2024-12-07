import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { Character, CharacterRune } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { StatusService } from '@shared/services/status.service';
import { rollRune } from '@shared/utils/rune.utils';
import { finalize } from 'rxjs';

const imports = [
  NgIf,
  TranslateModule,
  TooltipContainerComponent,
];

@Component({
  selector: 'app-rune',
  standalone: true,
  imports,
  templateUrl: './rune.component.html',
  styleUrl: './rune.component.scss'
})
export class RuneComponent implements OnInit {
  @Input() rune!: CharacterRune;
  @Input() elementalRune = false;
  RQGTooltipPositionEnum = RQGTooltipPositionEnum;

  pj: Character | undefined = undefined;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly statusService: StatusService,
    private readonly translate: TranslateService,
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
  }

  rollRune(rune: CharacterRune): void {
    rollRune(rune, this.pj, this.translate, this.statusService);
  }

  setRune(rune: CharacterRune, variation: number): void {
    CharacterRune.improveValue(rune, variation);
  }
}
