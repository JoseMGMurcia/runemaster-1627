import { Injectable } from '@angular/core';
import { STRING_EMPTY } from '@shared/constants/string.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StatusService {
  public get resultPending$(): BehaviorSubject<string> { return this._resultPending; }
  public get reload$(): BehaviorSubject<boolean> { return this._reload; }

  private readonly _resultPending: BehaviorSubject<string> = new BehaviorSubject(STRING_EMPTY);
  private readonly _reload: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setResultPending(value: string): void {
    this._resultPending.next(value);
  }

  public setReload(value: boolean): void {
    this._reload.next(value);
  }
}
