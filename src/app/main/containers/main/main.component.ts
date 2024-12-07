import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CombatComponent } from 'app/main/components/combat/containers/combat/combat.component';
import { UtilityComponent } from 'app/main/components/utility/utility.component';

const imports = [
  TranslateModule,
  UtilityComponent,
  CombatComponent,
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports,
  standalone: true,
})
export class MainComponent {}
