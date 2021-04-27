import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment'
import { catchError, finalize, map } from 'rxjs/operators'
import { UserModel } from 'src/app/modules/auth/_models/user.model'

const API_USERS_URL = `${environment.apiUrl}/user`

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  constructor(private http: HttpClient) {}

  getAllUsersWithDetails$(): Observable<UserModel[]> {
    return this.http
      .get(`${API_USERS_URL}/getAllDetails`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          } else {
            console.log(error)
          }
          return throwError(error)
        }),
        map((users: any): UserModel[] => {
          console.log(users)
          return users
        }),
      )
  }

  getAllUsers$(): Observable<UserModel[]> {
    return this.http
      .get(`${API_USERS_URL}`, {
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

  changeRoles(id: number, roles: string[]): Observable<string[]> {
    return this.http.post<string[]>(`${API_USERS_URL}/changeRoles/${id}`, roles).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (roles: any): string[] => {
          console.log(roles)
          return roles
        },
      ),
    )
  }
}
