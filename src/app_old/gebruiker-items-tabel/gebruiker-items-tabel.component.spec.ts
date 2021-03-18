import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerItemsTabelComponent } from './gebruiker-items-tabel.component';

describe('GebruikerItemsTabelComponent', () => {
  let component: GebruikerItemsTabelComponent;
  let fixture: ComponentFixture<GebruikerItemsTabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerItemsTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerItemsTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
