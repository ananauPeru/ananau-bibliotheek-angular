import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OverviewBookComponent } from './overview-book.component'

describe('OverviewBookComponent', () => {
  let component: OverviewBookComponent
  let fixture: ComponentFixture<OverviewBookComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewBookComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewBookComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
