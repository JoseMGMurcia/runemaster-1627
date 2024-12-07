import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character } from '@shared/models/chartacter.model';
import { ModalDataGet } from '@shared/models/modal.model';
import { CharactersService } from '@shared/services/character.service';
import { ModalService } from '@shared/services/modal.service';
import { cloneCharacter } from '@shared/utils/character.utils';
import { stringFrom } from '@shared/utils/string.utils';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  InputComponent,
];

@Component({
  selector: 'app-clone-character',
  standalone: true,
  imports,
  templateUrl: './clone-character.component.html',
  styleUrl: './clone-character.component.scss'
})
export class CloneCharacterComponent extends ModalDataGet implements OnInit {
  pj: Character | undefined = undefined;

  form = new FormGroup({
    name: new FormControl({ value: STRING_EMPTY, disabled: false }, [Validators.required]),
  });

  constructor(
    private readonly modalService: ModalService,
    private readonly translate: TranslateService,
    private readonly characterService: CharactersService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.data || !this.data['pj']) {
      return;
    }
    this.pj = this.data['pj'];
    const copy = this.translate.instant('COMMON.COPY');
    this.form.patchValue({ name: `${stringFrom(this.pj?.name)}_${copy}` });
  }

  handleCancel(): void {
    this.modalService.close();
  }

  clone(): void {
    if (!this.pj) { return; }
    const name = this.form.controls.name.value;
    const newPj = cloneCharacter(this.pj, stringFrom(name));
    this.characterService.updateOrAddCharacter(newPj);
    this.characterService.setCharacter(newPj);
    this.modalService.close();
  }
}
