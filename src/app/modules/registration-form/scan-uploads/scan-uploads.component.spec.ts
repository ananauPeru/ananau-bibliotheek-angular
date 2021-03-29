import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanUploadsComponent } from './scan-uploads.component';

describe('ScanUploadsComponent', () => {
  let component: ScanUploadsComponent;
  let fixture: ComponentFixture<ScanUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
