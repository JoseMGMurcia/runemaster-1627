import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBodyComponent } from './change-body.component';

describe('ChangeBodyComponent', () => {
  let component: ChangeBodyComponent;
  let fixture: ComponentFixture<ChangeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
