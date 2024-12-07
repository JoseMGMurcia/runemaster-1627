import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '.input-type-number',

})
export class NumberInputDirective {
  readonly allowedKeys = new Set<string>([
    'Backspace',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    ',',
  ]);

  @HostListener('keypress', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    // only allow numeric keys, backspace, dot, or comma
    if (!this.allowedKeys.has(event.key)) {
      event.preventDefault();
    }
  }
}
