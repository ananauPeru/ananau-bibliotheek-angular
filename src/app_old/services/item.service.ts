import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private router: Router, private accountService: AccountService, private http: HttpClient, public translate: TranslateService) { }

  getItemById$(id: string): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/byId/${id}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });;

        }
        return throwError(error);;
      }),
      map((item: any): Item => {
        item = Item.fromJSON(item);
        return item;
      })
    );
  }

  getItemByName$(naam: string): Observable<Item> {
    return this.http.get(`${environment.apiUrl}/Item/byName/${naam}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });;
        }
        return throwError(error);;
      }),
      map((item: any): Item => {
        return Item.fromJSON(item);
      })
    );
  }

  deleteItem$(item: Item): Observable<Item> {
    return this.http.delete(`${environment.apiUrl}/Item/${item.id}`).pipe(
      catchError(error => {
        if (error.status == 401) {
          this.accountService.logout();
          this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });
        }
        return throwError(error);;
      }),
      map((item: any): Item => {
        item = Item.fromJSON(item);
        return item;
      })
    );
  }

  addItem$(naam: string, merk: string, materiaal: string, categorie: string, inhoud: string, aankoopDatum: Date): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Item`,
      { naam, merk, materiaal, categorie, inhoud, aankoopDatum }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });
          }
          return throwError(error);;
        }),
        map((item: any): Item => {
          item = Item.fromJSON(item);
          return item;
        })
      );
  }

  putItem$(item: Item): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Item/${item.id}`,
      {
        id: item.id,
        naam: item.naam,
        gearchiveerd: item.gearchiveerd,
        merk: item.merk,
        materiaal: item.materiaal,
        inhoud: item.inhoud,
        aankoopDatum: item.aankoopDatum,
        categorie: item.categorie
      }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });
          }
          return throwError(error);;
        }),
        map((item: any): Item => {
          item = Item.fromJSON(item);
          return item;
        })
      );
  }

  getItemContainsWordInName$ = (naam: string): Observable<Item[]> => {
    return this.http.get<Item[]>(`${environment.apiUrl}/Item/byContainsName/${naam}`);
  };

  getItemsWithFilter$(
    itemsVanaf: number,
    aantalItems: number,
    NaamSorterenASC: boolean,
    NaamSorterenDESC: boolean,
    BeschikbaarSorterenASC: boolean,
    BeschikbaarSorterenDESC: boolean,
    ToegevoegdOpSorterenASC: boolean,
    ToegevoegdOpSorterenDESC: boolean,
    ItemFilter: string,
    BeschikbaarFilter: string,
    Gearchiveerd: Boolean,
    CategorieFilter: number): Observable<Item[]> {
    return this.http.post(`${environment.apiUrl}/Item/getAllWithFilter`,
      {
        itemsVanaf,
        aantalItems,
        NaamSorterenASC,
        NaamSorterenDESC,
        BeschikbaarSorterenASC,
        BeschikbaarSorterenDESC,
        ToegevoegdOpSorterenASC,
        ToegevoegdOpSorterenDESC,
        ItemFilter,
        BeschikbaarFilter,
        Gearchiveerd,
        CategorieFilter
      },
      { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
            this.accountService.logout();
            this.translate.get('tokenVerstreken').subscribe((text: string) => { this.router.navigate([`/login`], { state: { errorMessage: text } }) });
          }
          return throwError(error);;
        }),
        map((json: any[]): any[] => {
          json["items"] = json["items"].map(Item.fromJSON);
          return json;
        })
      );
  }
}
