import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment'
import { catchError, finalize, map } from 'rxjs/operators'
import { RoleModel } from '../../../_models/role.model'

const API_ITEMS_URL = `${environment.apiUrl}/user`

@Injectable({
  providedIn: 'root',
})
export class RoleHTTPService {
  constructor(private http: HttpClient) {}

  getAllRoles$(): Observable<RoleModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}/getAllRoles`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map((items: any): RoleModel[] => {
          console.log(items)
          return items
        }),
      )
  }

  getItemById(id: number): Observable<RoleModel> {
    return this.http
      .get(`${API_ITEMS_URL}/getById/${id}`, {
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
          (item: any): RoleModel => {
            console.log(item)
            return item
          },
        ),
      )
  }
}
