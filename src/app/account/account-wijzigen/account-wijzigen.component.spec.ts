import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWijzigenComponent } from './account-wijzigen.component';

describe('AccountWijzigenComponent', () => {
  let component: AccountWijzigenComponent;
  let fixture: ComponentFixture<AccountWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountWijzigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
