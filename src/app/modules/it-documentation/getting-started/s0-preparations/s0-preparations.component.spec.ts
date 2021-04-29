import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S0PreparationsComponent } from './s0-preparations.component';

describe('S0PreparationsComponent', () => {
  let component: S0PreparationsComponent;
  let fixture: ComponentFixture<S0PreparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S0PreparationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S0PreparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
