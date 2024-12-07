import { Routes } from '@angular/router';
import { MainComponent } from './main/containers/main/main.component';
import { ROUTES } from '@shared/constants/routes.constants';


export const routes: Routes = [
  {
    path: ROUTES.HOME.path,
    component: MainComponent,
    // canActivate: [TranslationLoaderGuard],
  },
];
