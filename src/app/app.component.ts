import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from '@shared/services/loading.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

const imports = [
  CommonModule,
  RouterOutlet,
  TranslateModule,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  loading = true;
  translationsLoaded = false;
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private readonly loadingService: LoadingService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.fetch();
  }

  // Subscribe to the loading status and changing the rendering
  private setLoagingStatus(): void {
    this.loadingService.loading$
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((loading: boolean) => {
      this.loading = loading;
      this.changeDetectorRef.markForCheck();
    });
  }

  private async fetch() {
    await firstValueFrom(this.translate.get('_'));
    this.translationsLoaded = true;
    this.setLoagingStatus();
    this.loadingService.hide();

  }
}
