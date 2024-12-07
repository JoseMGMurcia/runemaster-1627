import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorceryCalendarComponent } from './sorcery-calendar.component';

describe('SorceryCalendarComponent', () => {
  let component: SorceryCalendarComponent;
  let fixture: ComponentFixture<SorceryCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SorceryCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SorceryCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
