import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsBeherenComponent } from './items-beheren.component';

describe('ItemsBeherenComponent', () => {
  let component: ItemsBeherenComponent;
  let fixture: ComponentFixture<ItemsBeherenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsBeherenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsBeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
