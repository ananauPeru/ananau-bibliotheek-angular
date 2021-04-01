import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../environments/environment'
import { catchError, map } from 'rxjs/operators'
import { ItemModel } from '../../_models/item.model'

const API_ITEMS_URL = `${environment.apiUrl}/item`

@Injectable({
  providedIn: 'root',
})
export class ItemHTTPService {
  constructor(private http: HttpClient) {}

  getAllItems$(): Observable<ItemModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}/getAll`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map(
          (items: any): ItemModel[] => {
            console.log(items)
            return items 
          },
        ),
      )
  }

}
