import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, of, throwError } from 'rxjs';
import { GebruikerItem } from '../models/gebruiker-item.model';
import { map, catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class OntleenService {

  constructor(private router: Router, private http: HttpClient, private accountService: AccountService, public translate: TranslateService) { }

  getOntleendeBoekenVanGebruiker$(vanaf: number, hoeveelheid: number): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/ontleen/GetOntleendeBoekenVanGebruiker?vanaf=${vanaf}&hoeveelheid=${hoeveelheid}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });;
                   
        }
        return throwError(error);;
      }),
      map((list: any[]): any[] => {
        list["gebruikerItems"] = list["gebruikerItems"].map(GebruikerItem.fromJSON)
        return list;
      })
    );
  }

  public scanItemIn$(id: string): Observable<{}> {
    return this.http.post(`${environment.apiUrl}/Ontleen/scan?id=${id}`, id);
  }

  getOntleenHistorieVanGebruiker$(vanaf: number, hoeveelheid: number): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/ontleen/GetOntleenHistorieVanGebruiker?vanaf=${vanaf}&hoeveelheid=${hoeveelheid}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });
                   
        }
        return throwError(error);;
      }),
      map((list: any[]): any[] => {
        list["gebruikerItems"] = list["gebruikerItems"].map(GebruikerItem.fromJSON)
        return list;
      })
    );
  }
}
