import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjLocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: PjLocationsComponent;
  let fixture: ComponentFixture<PjLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PjLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
