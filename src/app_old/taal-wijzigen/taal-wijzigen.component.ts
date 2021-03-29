import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-taal-wijzigen',
  templateUrl: './taal-wijzigen.component.html',
  styleUrls: ['./taal-wijzigen.component.scss']
})
export class TaalWijzigenComponent implements OnInit {

  /**
   *
   */
  constructor(public translate: TranslateService) {

  }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    localStorage.setItem("language", language);
    this.translate.use(language);
  }

}
