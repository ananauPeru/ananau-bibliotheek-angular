import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToevoegenComponent } from './item-toevoegen.component';

describe('ItemToevoegenComponent', () => {
  let component: ItemToevoegenComponent;
  let fixture: ComponentFixture<ItemToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
