import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-w2-team-members',
    templateUrl: './w2-team-members.component.html',
    styleUrls: ['./w2-team-members.component.scss']
})
export class W2TeamMembersComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    scrollToElement($element): void {
        var elementPosition = $element.getBoundingClientRect().top;
        var offsetPosition = elementPosition - 150;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

}