import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educational-app',
  templateUrl: './educational-app.component.html',
  styleUrls: ['./educational-app.component.scss']
})
export class EducationalAppComponent implements OnInit {

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
