import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-w1-projects',
    templateUrl: './w1-projects.component.html',
    styleUrls: ['./w1-projects.component.scss']
})
export class W1ProjectsComponent implements OnInit {

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