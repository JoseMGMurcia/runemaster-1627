import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArmorComponent } from './add-armor.component';

describe('AddArmorComponent', () => {
  let component: AddArmorComponent;
  let fixture: ComponentFixture<AddArmorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddArmorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
