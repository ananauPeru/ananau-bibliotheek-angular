import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticEmails } from './email.component';

describe('S0PreparationsComponent', () => {
    let component: AutomaticEmails;
    let fixture: ComponentFixture<AutomaticEmails>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AutomaticEmails]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AutomaticEmails);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
