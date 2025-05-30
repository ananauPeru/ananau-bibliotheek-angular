import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalAppComponent } from './educational-app.component';

describe('EducationalAppComponent', () => {
  let component: EducationalAppComponent;
  let fixture: ComponentFixture<EducationalAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
