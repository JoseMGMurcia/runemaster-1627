import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { Armor } from '@shared/models/equipment.models';
import { Character } from '@shared/models/chartacter.model';
import { getTotalArmorWeight } from '@shared/utils/armor-utils';
import { TranslateModule } from '@ngx-translate/core';
import { StatusService } from '@shared/services/status.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  TooltipContainerComponent,
];

@Component({
  selector: 'app-armor',
  standalone: true,
  imports,
  templateUrl: './armor.component.html',
  styleUrl: './armor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArmorComponent implements OnInit {
  @Input({ required: true }) armor: Armor | undefined = undefined;
  @Input({ required: true }) pj: Character | undefined = undefined;

  RQGTooltipPositionEnum = RQGTooltipPositionEnum;
  form = new FormGroup({
    equipped: new FormControl(!!this.armor?.equipped),
  });

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly statusService: StatusService,
  ) {}

  ngOnInit(): void {
    this.form.controls.equipped.setValue(!!this.armor?.equipped, { emitEvent: false });

    this.statusService.reload$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((reload) => {
      if (!reload) {return;}
      this.cdr.markForCheck();
    });
  }

  detail(): void {
    if (!this.armor) {return;}
    this.armor.swDetail = !this.armor.swDetail;
  }

  handleEquippedChange(): void {
    if (!this.armor) {return;}
    this.armor.equipped = !this.armor.equipped;
  }

  removeArmor(): void {
    if (!this.armor || !this.pj) {return;}
    this.pj.armors = this.pj.armors.filter((a) => a.id !== this.armor?.id);
  }

  setTempAPMod(variation: number): void {
    if (!this.armor) {return;}
    this.armor.temporalBonus.AP += variation;
  }

  setPermanentAPMod(variation: number): void {
    if (!this.armor) {return;}
    this.armor.permanentBonus.AP += variation;
  }

  setTempCRGMod(variation: number): void {
    if (!this.armor) {return;}
    this.armor.temporalBonus.weight += variation;
  }

  setPermanentCRGMod(variation: number): void {
    if (!this.armor) {return;}
    this.armor.permanentBonus.weight += variation;
  }

  getTotalArmorWeight(): number {
    if (!this.armor) {return 0;}
    return getTotalArmorWeight(this.armor);
  }


}
