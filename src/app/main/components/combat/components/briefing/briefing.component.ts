import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { NUMBERS } from '@shared/constants/number.constants';
import { Character } from '@shared/models/chartacter.model';
import { DiceRoll } from '@shared/models/dices.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { getCGRMax as getCRGMax, getDamageMod, getHealingRate, getHP, getMP, getMRDEX, getMSIZ, getSpiritualDMGModifier,
  getTotalCRG } from '@shared/utils/character-fields.utils';
import { finalize } from 'rxjs';

const imports = [
  TranslateModule,
  NgIf,
];

@Component({
  selector: 'app-briefing',
  standalone: true,
  imports,
  templateUrl: './briefing.component.html',
  styleUrl: './briefing.component.scss'
})
export class BriefingComponent implements OnInit {

  pj: Character | undefined = undefined;
  swShowBriefing = true;

  private readonly _destroyRef = inject(DestroyRef);

  get damageModifier(): DiceRoll {
    if (!this.pj) { return new DiceRoll(0, 0); }
    return getDamageMod(this.pj);
  }

  get spiritDMGMod(): DiceRoll {
    if (!this.pj) { return new DiceRoll(0, 0); }
    return getSpiritualDMGModifier(this.pj);
  }

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService
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

  switchShowBriefing(): void {
    this.swShowBriefing = !this.swShowBriefing;
  }

  getHP(): number {
    if (!this.pj) { return 0; }
    return getHP(this.pj);
  }

  getMP(): number {
    if (!this.pj) { return 0; }
    return getMP(this.pj);
  }

  setHP(variation: number): void {
    if (!this.pj) { return; }
    this.pj.actualHPVariation += variation;
  }

  setMP(variation: number): void {
    if (!this.pj) { return; }
    this.pj.actualMPVariation += variation;
  }

  resetHP(): void {
    if (!this.pj) { return; }
    this.pj.actualHPVariation = NUMBERS.N_0;
    this.pj.locations.forEach((location) => location.actualHPVariation = NUMBERS.N_0);
  }

  resetMP(): void {
    if (!this.pj) { return; }
    this.pj.actualMPVariation = NUMBERS.N_0;
  }

  getMRDEX(): number {
    if (!this.pj) { return 0; }
    return getMRDEX(this.pj);
  }

  getMSIZ(): number {
    if (!this.pj) { return 0; }
    return getMSIZ(this.pj);
  }

  getHealingRate(): number {
    if (!this.pj) { return 0; }
    return getHealingRate(this.pj);
  }

  getCRG(): number {
    if (!this.pj) { return 0; }
    return getTotalCRG(this.pj);
  }

  getMaxCRG(): number {
    if (!this.pj) { return 0; }
    return getCRGMax(this.pj);
  }
}
