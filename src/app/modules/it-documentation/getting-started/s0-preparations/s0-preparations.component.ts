import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s0-preparations',
  templateUrl: './s0-preparations.component.html',
  styleUrls: ['./s0-preparations.component.scss']
})
export class S0PreparationsComponent implements OnInit {

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
