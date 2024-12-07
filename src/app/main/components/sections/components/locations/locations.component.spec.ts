import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '@shared/components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RQGLocation, LocationsEnum } from '@shared/models/location.model';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        LocationsComponent,
        SelectComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedLocations when race is changed', () => {
    const specie = 'human';
    const location1: RQGLocation = { type: LocationsEnum.RIGHT_LEG } as RQGLocation;
    const location2: RQGLocation = { type: LocationsEnum.LEFT_LEG } as RQGLocation;
    const location3: RQGLocation = { type: LocationsEnum.FRONT_RIGHT_LEG } as RQGLocation;
    const location4: RQGLocation = { type: LocationsEnum.FRONT_LEFT_LEG } as RQGLocation;
    const location5: RQGLocation = { type: LocationsEnum.BACK_RIGHT_LEG } as RQGLocation;
    const location6: RQGLocation = { type: LocationsEnum.BACK_LEFT_LEG } as RQGLocation;


    const options = [
      { value: 'human', label: 'Human' },
      { value: 'elf', label: 'Elf' },
      { value: 'dwarf', label: 'Dwarf' }
    ];
    const locations = {
      human_LOCATIONS: [location1, location2],
      elf_LOCATIONS: [location3, location4],
      dwarf_LOCATIONS: [location5, location6]
    };

    component.options = options;
    component['locations'] = locations;

    component.raceChange(specie);

    expect(component.selectedLocations).toEqual([location1, location2]);
  });

  it('should update selectedLocations when race is changed', () => {
    const specie = 'troll';
    const location1: RQGLocation = { type: LocationsEnum.RIGHT_LEG } as RQGLocation;
    const location2: RQGLocation = { type: LocationsEnum.LEFT_LEG } as RQGLocation;
    const location3: RQGLocation = { type: LocationsEnum.FRONT_RIGHT_LEG } as RQGLocation;
    const location4: RQGLocation = { type: LocationsEnum.FRONT_LEFT_LEG } as RQGLocation;
    const location5: RQGLocation = { type: LocationsEnum.BACK_RIGHT_LEG } as RQGLocation;
    const location6: RQGLocation = { type: LocationsEnum.BACK_LEFT_LEG } as RQGLocation;


    const options = [
      { value: 'human', label: 'Human' },
      { value: 'elf', label: 'Elf' },
      { value: 'dwarf', label: 'Dwarf' }
    ];
    const locations = {
      human_LOCATIONS: [location1, location2],
      elf_LOCATIONS: [location3, location4],
      dwarf_LOCATIONS: [location5, location6]
    };

    component.options = options;
    component['locations'] = locations;

    component.raceChange(specie);

    expect(component.selectedLocations).toBeUndefined();
  });
});
