import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { STRING_EMPTY } from '@shared/constants/string.constants';

const imports = [
  TranslateModule,
  NgClass,
];

@Component({
  selector: 'div-tooltip',
  standalone: true,
  imports,
  templateUrl: './tooltip-container.component.html',
  styleUrl: './tooltip-container.component.scss'
})
export class TooltipContainerComponent {
  @Input() tooltipText: string = STRING_EMPTY;
  @Input() tooltipPosition: RQGTooltipPositionEnum = RQGTooltipPositionEnum.TOP;
}

export enum RQGTooltipPositionEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}
