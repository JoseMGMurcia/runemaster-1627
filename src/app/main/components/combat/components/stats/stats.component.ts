import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { NUMBERS } from '@shared/constants/number.constants';
import { Character, Characteristic } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { RunesComponent } from '../runes/runes.component';
import { PasionsComponent } from '../pasions/pasions.component';

const imports = [
  TranslateModule,
  TooltipContainerComponent,
  RunesComponent,
  PasionsComponent,
];

@Component({
  selector: 'pj-stats',
  standalone: true,
  imports,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  public pj: Character | undefined = undefined;

  public stats: Characteristic[] = [];
  public RQGTooltipPositionEnum = RQGTooltipPositionEnum;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe({
      next: (character) => {
        if (!character) { return; }
        this.pj = character;
        this.stats = this.getCharacteristicsAsArray();
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });
  }

  setTempStat(stat: Characteristic, increment: number): void {
    stat.tempBonus = stat.tempBonus + increment;

  }

  setPermStat(stat: Characteristic, increment: number): void {
    stat.permBonus  = stat.permBonus + increment;
  }

  setStat(stat: Characteristic, increment: number): void {
    stat.value = stat.value + increment > NUMBERS.N_0 ? stat.value + increment : NUMBERS.N_0;
  }

  detail(stat: Characteristic): void {
    stat.swShowDetail = !stat.swShowDetail;
  }

  private getCharacteristicsAsArray(): Characteristic[] {
    return this.pj ? Object.values(this.pj.stats) : [];
  }
}
