import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { RQGTooltipPositionEnum, TooltipContainerComponent } from '@shared/components/tooltip-container/tooltip-container.component';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { Character } from '@shared/models/chartacter.model';
import { CharactersService } from '@shared/services/character.service';
import { LoadingService } from '@shared/services/loading.service';
import { StatusService } from '@shared/services/status.service';
import { stringFrom } from '@shared/utils/string.utils';
import { finalize } from 'rxjs';

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  NgIf,
  NgClass,
  InputComponent,
  TooltipContainerComponent,
];

@Component({
  selector: 'app-notes',
  standalone: true,
  imports,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  pj: Character | undefined = undefined;
  swShowDetail = false;
  swShowNewNote = false;
  RQGTooltipPositionEnum = RQGTooltipPositionEnum;
  get notes(): string[] {
    return this.pj?.notes ?? [];
  }

  form = new FormGroup({
    newNote: new FormControl(STRING_EMPTY)
  });

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly characterService: CharactersService,
    private readonly loading: LoadingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly statusService: StatusService,
  ) {}

  ngOnInit(): void {
    this.loading.show();
    this.characterService.character$
    .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => { this.loading.hide(); }))
    .subscribe({
      next: (character) => {
        if (!character) {return;}
        this.pj = character;
        this.loading.hide(); // TODO: Remove this line when the loading service is working
       }
    });

    this.statusService.reload$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((reload) => {
      if (!reload) {return;}
      this.cdr.markForCheck();
    });
  }

  switchShowDetail(): void {
    this.swShowDetail = !this.swShowDetail;
  }

  addNote(): void {
    if (!this.pj) {return;}
    this.swShowNewNote = true;
  }

  removeNote(note: string): void {
    if (!this.pj) {return;}
    this.pj.notes = this.pj.notes.filter((n) => n !== note);
  }

  newNote(): void {
    const control = this.form.controls.newNote;
    this.swShowNewNote = false;
    if (!control.value || !this.pj) {return;}
    this.pj.notes.push( stringFrom(control.value));
    control.setValue(STRING_EMPTY);
    this.swShowDetail = true;
  }
}
