import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OntleenService } from '../services/ontleen.service';
import { Item } from '../models/item.model';
import { GebruikerItem } from '../models/gebruiker-item.model';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public loadingError: HttpErrorResponse;
  public loading: boolean;
  public ontleendeItems: GebruikerItem[];
  public ontleendeHistorieItems: GebruikerItem[];
  public ingelogdeGebruiker: Gebruiker;
  public vanafOntleendeItems: number;
  public hoeveelheidOntleendeItems: number;
  public totaalOntleendeItems: number;
  public vanafHistoriek: number;
  public hoeveelheidHistoriek: number;
  public totaalHistoriek: number;
  public errorMessage: string;

  constructor(private _ontleenService: OntleenService, private _accountService: AccountService, public translate: TranslateService) {
    this.vanafOntleendeItems = 0;
    this.hoeveelheidOntleendeItems = 10;
    this.geefOntleendeBoeken(this.vanafOntleendeItems, this.hoeveelheidOntleendeItems);

    this.vanafHistoriek = 0;
    this.hoeveelheidHistoriek = 10;
    this.geefHistorieOntleendeBoeken(this.vanafHistoriek, this.hoeveelheidHistoriek);
  }

  ngOnInit() {
    this._accountService.huidigeGebruiker.subscribe(val => {
      this.ingelogdeGebruiker = val;
    });
  }

  veranderOntleendeItemsScope(naar: number) {
    this.vanafOntleendeItems += (naar * 10);
    this.geefOntleendeBoeken(this.vanafOntleendeItems, this.hoeveelheidOntleendeItems);
  }

  veranderHistoriekScope(naar: number) {
    this.vanafHistoriek += (naar * 10);
    this.geefHistorieOntleendeBoeken(this.vanafHistoriek, this.hoeveelheidHistoriek);
  }

  geefOntleendeBoeken(vanaf: number, hoeveelheid: number) {
    this._ontleenService
      .getOntleendeBoekenVanGebruiker$(vanaf, hoeveelheid)
      .subscribe(
        val => {
          this.ontleendeItems = undefined;
          if (val) {
            this.ontleendeItems = val["gebruikerItems"];
            this.totaalOntleendeItems = val["totaal"];
          }
        },
        error => {
          this.loadingError = this.translate.instant(`${error.error}`);
        }
      );
  }

  geefHistorieOntleendeBoeken(vanaf: number, hoeveelheid: number) {
    this._ontleenService
      .getOntleenHistorieVanGebruiker$(vanaf, hoeveelheid)
      .subscribe(
        val => {
          this.ontleendeHistorieItems = undefined;
          if (val) {
            this.ontleendeHistorieItems = val["gebruikerItems"];
            this.totaalHistoriek = val["totaal"];
          }
        },
        error => {
          this.loadingError = this.translate.instant(`${error.error}`);
        }
      );
  }

}
