import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-w3-involved-countries',
    templateUrl: './w3-involved-countries.component.html',
    styleUrls: ['./w3-involved-countries.component.scss']
})
export class W3InvolvedCountriesComponent implements OnInit {

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