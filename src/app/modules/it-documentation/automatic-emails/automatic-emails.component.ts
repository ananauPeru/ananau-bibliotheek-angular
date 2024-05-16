import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-automatic-emails',
    templateUrl: './automatic-emails.component.html',
    styleUrls: ['./automatic-emails.component.scss']
})
export class AutomaticEmailsComponent implements OnInit {

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
