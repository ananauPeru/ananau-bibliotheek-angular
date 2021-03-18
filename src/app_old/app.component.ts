import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    var taal = localStorage.getItem("language");
    if (taal == null) {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|es|nl/) ? browserLang : 'en');
      localStorage.setItem("language", this.translate.getBrowserLang());
    } else {
      translate.use(taal);
    }
    translate.setDefaultLang('en');
  }
}
