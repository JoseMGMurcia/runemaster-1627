import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { NUMBERS } from '@shared/constants/number.constants';
import { Character } from '@shared/models/chartacter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { CharactersService } from '@shared/services/character.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { CommonModule } from '@angular/common';

const imports = [
  CommonModule,
  TranslateModule,
  ReactiveFormsModule,
  InputComponent,
  SelectComponent,
];

@Component({
  selector: 'app-characters',
  standalone: true,
  imports,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  form = new FormGroup({
    newCharacter: new FormControl(STRING_EMPTY),
    existingCharacter: new FormControl(STRING_EMPTY),
  });
  pjsOptions: RQGOption[] = [];

  private pjs: Character[] = [];
  private existingCharacter: Character | undefined;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly charactersService: CharactersService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.charactersService.characters$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (characters) => {
          this.pjs = characters;
          this.pjsOptions = this.getOptions();
          this.cdr.markForCheck();
        },
      });
    this.charactersService.initDBConection();
  }

  newCharacter(): void {
    const name = this.form.getRawValue().newCharacter;
    if(name) { // TODO validate name
      const pj = new Character(name);
      this.charactersService.setCharacter(pj);
      this.form.controls['newCharacter'].setValue(STRING_EMPTY);
    }
  }

  setExistingCharacter(id: string): void {
    this.existingCharacter = this.pjs.find((pj) => pj.id.toString() === id);
  }

  addExistingCharacter(): void {
    if (this.existingCharacter) {
      this.charactersService.setCharacter(this.existingCharacter);
    }
  }

  private getOptions(): RQGOption[] {
    const options: RQGOption[] =  this.pjs.map((pj) => {
      return { value: pj.id.toString(), label: pj.name };
    });
    this.setExistingCharacter(options[NUMBERS.N_0]?.value);
    return options;
  }
}
