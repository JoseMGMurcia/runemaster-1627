import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RQGOption, SelectComponent } from '@shared/components/select/select.component';
import { LocationDamageEnum, LocationsEnum } from '@shared/models/location.model';

const legLocationGroup = [
  LocationsEnum.RIGHT_LEG,
  LocationsEnum.LEFT_LEG,
  LocationsEnum.FRONT_RIGHT_LEG,
  LocationsEnum.FRONT_LEFT_LEG,
  LocationsEnum.CENTRAL_RIGHT_LEG,
  LocationsEnum.CENTRAL_LEFT_LEG,
  LocationsEnum.BACK_RIGHT_LEG,
  LocationsEnum.BACK_LEFT_LEG,
];
const abdomenGroup = [
  LocationsEnum.ABDOMEN,
  LocationsEnum.BACK_QUARTER,
  LocationsEnum.SNAIL_DRAGON_BODY,
];
const chestGroup = [
  LocationsEnum.CHEST,
  LocationsEnum.TORAX,
  LocationsEnum.FRONT_QUARTER,
  LocationsEnum.SNAIL_DRAGON_SHELL,
];
const armGroup = [
  LocationsEnum.RIGHT_ARM,
  LocationsEnum.LEFT_ARM,
  LocationsEnum.RIGHT_WING,
  LocationsEnum.LEFT_WING,
  LocationsEnum.TAIL,
];

const headGroup = [
  LocationsEnum.HEAD,
  LocationsEnum.LEFT_HEAD,
  LocationsEnum.RIGHT_HEAD,
];

const imports = [
  TranslateModule,
  ReactiveFormsModule,
  SelectComponent,
];

@Component({
  selector: 'app-location-damages',
  standalone: true,
  imports,
  templateUrl: './location-damages.component.html',
  styleUrl: './location-damages.component.scss'
})
export class LocationDamagesComponent implements OnInit {

  public form = new FormGroup({
    locations: new FormControl(''),
    damage: new FormControl(''),
  });
  public locationOptions: RQGOption[] = [];
  public damageOptions: RQGOption[] = [];
  public resultText = '';
  private selectedLocation : LocationsEnum = LocationsEnum.TAIL;
  private selectedDamage : LocationDamageEnum = LocationDamageEnum.EQUAL_OR_MORE_THAN_HP;

  constructor(
    private readonly translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.locationOptions = this.getLocationOptions();
    this.damageOptions = this.getDamageOptions();
  }

  public locChange(location: string): void {
    this.selectedLocation = location as LocationsEnum;
  }

  public dmgChange(damage: string): void {
    this.selectedDamage = damage as LocationDamageEnum;
  }

  public getResult(): string {
    let location: string = legLocationGroup.includes(this.selectedLocation) ? 'LEG' : '';
    location = abdomenGroup.includes(this.selectedLocation) ? 'ABDOMEN' : location;
    location = chestGroup.includes(this.selectedLocation) ? 'CHEST' : location;
    location = armGroup.includes(this.selectedLocation) ? 'ARM' : location;
    location = headGroup.includes(this.selectedLocation) ? 'HEAD' : location;
    return this.translate.instant(`RULES.DAMAGE.${this.selectedDamage}.${location}`);
  }


  private getLocationOptions(): RQGOption[] {
    return Object.keys(LocationsEnum).map( key => {
      return {value: key, label: this.translate.instant(`PJ.LOCATIONS.${key}`)};
    });
  }

  private getDamageOptions(): RQGOption[] {
    return [
      {value: LocationDamageEnum.EQUAL_OR_MORE_THAN_HP, label: this.translate.instant('RULES.DAMAGE.TYPES.EQUAL_OR_MORE_THAN_HP')},
      {value: LocationDamageEnum.EQUAL_OR_MORE_THAN_DOUBLE_HP, label: this.translate.instant('RULES.DAMAGE.TYPES.EQUAL_OR_MORE_THAN_DOUBLE_HP')},
      {value: LocationDamageEnum.EQUAL_OR_MORE_THAN_TRIPLE_HP, label: this.translate.instant('RULES.DAMAGE.TYPES.EQUAL_OR_MORE_THAN_TRIPLE_HP')},

    ];
  }

}
