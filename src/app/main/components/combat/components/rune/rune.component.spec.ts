import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneComponent } from './rune.component';

describe('RuneComponent', () => {
  let component: RuneComponent;
  let fixture: ComponentFixture<RuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
