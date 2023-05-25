import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3InvolvedCountriesComponent } from './w3-involved-countries.component';

describe('W3InvolvedCountriesComponent', () => {
    let component: W3InvolvedCountriesComponent;
    let fixture: ComponentFixture<W3InvolvedCountriesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [W3InvolvedCountriesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(W3InvolvedCountriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});