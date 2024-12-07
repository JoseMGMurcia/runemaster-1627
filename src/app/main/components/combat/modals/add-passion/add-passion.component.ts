import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character, PasionTypeEnum, Passion } from '@shared/models/chartacter.model';
import { ModalDataGet } from '@shared/models/modal.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { ModalService } from '@shared/services/modal.service';
import { numberFrom } from '@shared/utils/number.utils';
import { stringFrom } from '@shared/utils/string.utils';
import { finalize } from 'rxjs';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  InputComponent,
  SelectComponent,
]

@Component({
  selector: 'app-add-passion',
  standalone: true,
  imports,
  templateUrl: './add-passion.component.html',
  styleUrl: './add-passion.component.scss'
})
export class AddPassionComponent extends ModalDataGet implements OnInit {
  pj: Character | undefined = undefined;
  passionTypeOptions: RQGOption[] = [];

  selectedPassion: PasionTypeEnum | undefined = undefined;

  form = new FormGroup({
    type: new FormControl(STRING_EMPTY),
    description: new FormControl(STRING_EMPTY),
    value: new FormControl(NUMBERS.N_60),
  });

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe({
      next: (character) => {
        if (!character) {return;}
        this.pj = character;
        this.passionTypeOptions = this.getPassionOptions();
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });
  }

  handleCancel(): void {
    this.modalService.close();
  }

  weaponChange(event: string): void {
    this.selectedPassion =  event as PasionTypeEnum;
  }

  handleAdd(): void {
    if (!this.pj || !this.selectedPassion) {return;}
    const values = this.form.getRawValue();

    const passion = new Passion(this.selectedPassion, stringFrom(values.description), numberFrom(values.value));
    this.pj.passions.push(passion);
    this.modalService.close();
  }

  private getPassionOptions(): RQGOption[] {
    const texts = this.translate.instant('PASSIONS');
    return Object.values(PasionTypeEnum).map(passion => ({
    value: passion,
    label: texts[passion] || STRING_EMPTY,
  }));
  }

}
