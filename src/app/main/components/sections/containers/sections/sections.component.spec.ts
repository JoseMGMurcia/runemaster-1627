import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsComponent } from './sections.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from '@shared/components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsComponent } from '../locations/locations.component';

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        SectionsComponent,
        SelectComponent,
        LocationsComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
