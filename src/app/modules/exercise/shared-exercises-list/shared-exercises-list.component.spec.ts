/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedExercisesListComponent } from './shared-exercises-list.component';

describe('SharedExercisesListComponent', () => {
  let component: SharedExercisesListComponent;
  let fixture: ComponentFixture<SharedExercisesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedExercisesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
