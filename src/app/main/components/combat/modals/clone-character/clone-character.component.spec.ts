import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneCharacterComponent } from './clone-character.component';

describe('CloneCharacterComponent', () => {
  let component: CloneCharacterComponent;
  let fixture: ComponentFixture<CloneCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloneCharacterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloneCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
