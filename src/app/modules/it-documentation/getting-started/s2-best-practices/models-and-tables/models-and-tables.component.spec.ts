import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsAndTablesComponent } from './models-and-tables.component';

describe('ModelsAndTablesComponent', () => {
  let component: ModelsAndTablesComponent;
  let fixture: ComponentFixture<ModelsAndTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsAndTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsAndTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
