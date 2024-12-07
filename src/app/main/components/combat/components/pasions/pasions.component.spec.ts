import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasionsComponent } from './pasions.component';

describe('PasionsComponent', () => {
  let component: PasionsComponent;
  let fixture: ComponentFixture<PasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
