import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  public get loading$(): Observable<boolean> { return this.loading.asObservable();}
  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public show(): void {
    this.loading.next(true);
  }

  public hide(): void {
    this.loading.next(false);
  }
}
