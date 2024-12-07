import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PjUtilityComponent } from './utility.component';

describe('UtilityComponent', () => {
  let component: PjUtilityComponent;
  let fixture: ComponentFixture<PjUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PjUtilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PjUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
