import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S2BestPracticesComponent } from './s2-best-practices.component';

describe('S2BestPracticesComponent', () => {
  let component: S2BestPracticesComponent;
  let fixture: ComponentFixture<S2BestPracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S2BestPracticesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S2BestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
