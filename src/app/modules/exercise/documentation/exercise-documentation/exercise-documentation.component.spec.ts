import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDocumentationComponent } from './exercise-documentation.component';

describe('ExerciseDocumentationComponent', () => {
  let component: ExerciseDocumentationComponent;
  let fixture: ComponentFixture<ExerciseDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
