import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2TeamMembersComponent } from './w2-team-members.component';

describe('W2TeamMembersComponent', () => {
    let component: W2TeamMembersComponent;
    let fixture: ComponentFixture<W2TeamMembersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [W2TeamMembersComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(W2TeamMembersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});