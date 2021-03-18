import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaalWijzigenComponent } from './taal-wijzigen.component';

describe('TaalWijzigenComponent', () => {
  let component: TaalWijzigenComponent;
  let fixture: ComponentFixture<TaalWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaalWijzigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaalWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
