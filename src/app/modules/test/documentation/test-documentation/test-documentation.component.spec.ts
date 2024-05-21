import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDocumentationComponent } from './test-documentation.component';

describe('TestDocumentationComponent', () => {
  let component: TestDocumentationComponent;
  let fixture: ComponentFixture<TestDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
