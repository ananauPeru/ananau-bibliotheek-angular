import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment'
import { catchError, finalize, map } from 'rxjs/operators'
import { ItemModel } from '../../../_models/item.model'
import { ItemDTO } from '../../../_dto/item-dto'
import { UserModel } from 'src/app/modules/auth/_models/user.model'

const API_USERS_URL = `${environment.apiUrl}/user`

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  constructor(private http: HttpClient) {}

  getAllUsers$(): Observable<UserModel[]> {
    return this.http
      .get(`${API_USERS_URL}/getall`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map((users: any): UserModel[] => {
          console.log(users)
          return users
        }),
      )
  }

  // CREATE
  // server should return the object with ID
  create(item: ItemDTO): Observable<ItemModel> {
    return this.http.post<ItemModel>(`${API_USERS_URL}`, item).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (item: any): ItemModel => {
          console.log(item)
          return item
        },
      ),
    )
  }

  edit(id: number, item: ItemDTO): Observable<ItemModel> {
    return this.http.put<ItemModel>(`${API_USERS_URL}/${id}`, item).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (item: any): ItemModel => {
          console.log(item)
          return item
        },
      ),
    )
  }

  getItemById(id: number): Observable<ItemModel> {
    return this.http
      .get(`${API_USERS_URL}/getById/${id}`, {
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
          (item: any): ItemModel => {
            console.log(item)
            return item
          },
        ),
      )
  }
}
