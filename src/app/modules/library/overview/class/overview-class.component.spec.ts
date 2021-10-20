import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewClassComponent } from './overview-class.component';

describe('OverviewClassComponent', () => {
  let component: OverviewClassComponent;
  let fixture: ComponentFixture<OverviewClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
