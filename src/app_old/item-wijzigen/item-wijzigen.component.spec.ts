import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWijzigenComponent } from './item-wijzigen.component';

describe('ItemWijzigenComponent', () => {
  let component: ItemWijzigenComponent;
  let fixture: ComponentFixture<ItemWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWijzigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
