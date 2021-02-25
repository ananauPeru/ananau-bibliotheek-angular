import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UitgeleendeBoekenTabelComponent } from './uitgeleende-boeken-tabel.component';

describe('UitgeleendeBoekenTabelComponent', () => {
  let component: UitgeleendeBoekenTabelComponent;
  let fixture: ComponentFixture<UitgeleendeBoekenTabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UitgeleendeBoekenTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UitgeleendeBoekenTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
