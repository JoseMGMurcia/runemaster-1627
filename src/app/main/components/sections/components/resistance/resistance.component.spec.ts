import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistanceComponent } from './resistance.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ResistanceComponent', () => {
  let component: ResistanceComponent;
  let fixture: ComponentFixture<ResistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        ResistanceComponent,
        InputComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
