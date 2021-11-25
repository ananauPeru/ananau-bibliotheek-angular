import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDocumentationComponent } from './class-documentation.component';

describe('ClassDocumentationComponent', () => {
  let component: ClassDocumentationComponent;
  let fixture: ComponentFixture<ClassDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
