import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { Character, CharacterRune } from '@shared/models/chartacter.model';
import { RunesEnum } from '@shared/models/rune.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { finalize } from 'rxjs';
import { RuneComponent } from '../rune/rune.component';
import { NgClass } from '@angular/common';

const imports = [
  TranslateModule,
  RuneComponent,
  NgClass,
];

@Component({
  selector: 'app-runes',
  standalone: true,
  imports,
  templateUrl: './runes.component.html',
  styleUrl: './runes.component.scss'
})
export class RunesComponent implements OnInit {
  pj: Character | undefined = undefined;
  showRunes = false;
  runesEnum = RunesEnum;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
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

  switchShowDetails(): void {
    this.showRunes = !this.showRunes;
  }

  getRune(rune: RunesEnum): CharacterRune {
    return this.pj?.runes.find((r) => r.rune === rune) || new CharacterRune(rune, 0);
  }
}
