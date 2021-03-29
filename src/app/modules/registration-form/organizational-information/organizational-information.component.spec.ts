import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationalInformationComponent } from './organizational-information.component';

describe('OrganizationalInformationComponent', () => {
  let component: OrganizationalInformationComponent;
  let fixture: ComponentFixture<OrganizationalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
