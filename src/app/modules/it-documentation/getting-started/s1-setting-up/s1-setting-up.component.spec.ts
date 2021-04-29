import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S1SettingUpComponent } from './s1-setting-up.component';

describe('S1SettingUpComponent', () => {
  let component: S1SettingUpComponent;
  let fixture: ComponentFixture<S1SettingUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S1SettingUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S1SettingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
