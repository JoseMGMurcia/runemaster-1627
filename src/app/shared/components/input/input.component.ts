import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXT_AREA_MAX_LENGTH = 250;
const imports = [CommonModule, FormsModule];


@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})

export class InputComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public placeholder = '';
  @Input() public value = '';
  @Input() public area = false;
  @Input() public maxTexAreaLength = TEXT_AREA_MAX_LENGTH;
  @Input({required: true}) public control!: FormControl;

  writeValue(obj: any): void {
    this.value = obj;
  }
  // [ngClass]="type === 'number' ? 'input-type-number' : null"


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  getClass(): string {
    return 'input-type-' + this.type;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  propagateChange = (_: any) => {};
  propagateTouched = () => {};

  getErrors(): string[] {
    const errors = this.control.errors;
    if (!errors) {
      return [];
    }
    return Object.keys(errors).map((key) => {
      return errors[key] ? key : '';
    });

  }
}
