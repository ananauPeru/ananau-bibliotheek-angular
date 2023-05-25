import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class AutomaticEmails implements OnInit {

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
