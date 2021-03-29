import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Gebruiker } from '../models/gebruiker.model'
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { UserDTO } from '../_dto/UserDTO'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly _tokenKey = 'currentUser'
  public user: BehaviorSubject<Gebruiker>
  public huidigeGebruiker: Observable<Gebruiker>
  public redirectUrl: string

  constructor(
    private http: HttpClient,
    private router: Router,
    public translate: TranslateService,
  ) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey))
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date()
      if (expires) {
        localStorage.removeItem(this._tokenKey)
        parsedToken = null
      }
    }
    if (JSON.parse(localStorage.getItem('loggedUser')) != null) {
      this.user = new BehaviorSubject<Gebruiker>(
        Gebruiker.fromJSON(JSON.parse(localStorage.getItem('loggedUser'))),
      )
    } else {
      this.user = new BehaviorSubject<Gebruiker>(
        JSON.parse(localStorage.getItem('loggedUser')),
      )
    }

    this.huidigeGebruiker = this.user.asObservable()
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/user`,
        { email, password },
        { responseType: 'text' },
      )
      .pipe(
        map((token: any) => {
          if (token) {
            const local = JSON.parse(token)
            localStorage.setItem(this._tokenKey, local.token)
            console.log(local.user)
            var angularGebruiker = Gebruiker.fromJSON(local.user)
            console.log('Logged in!')
            console.log(angularGebruiker)
            localStorage.setItem('loggedUser', JSON.stringify(angularGebruiker))
            this.user.next(angularGebruiker)
            return true
          } else {
            return false
          }
        }),
      )
  }

  public registreer(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    dateOfBirth: Date,
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/user/register`,
        {
          firstName,
          lastName,
          phone,
          email,
          password,
          passwordConfirmation,
          dateOfBirth,
        },
        { responseType: 'text' },
      )
      .pipe(
        map((token: any) => {
          if (token) {
            const local = JSON.parse(token)
            localStorage.setItem(this._tokenKey, local.token)
            var angularGebruiker = Gebruiker.fromJSON(local.user)
            localStorage.setItem('loggedUser', JSON.stringify(angularGebruiker))
            this.user.next(angularGebruiker)
            return true
          } else {
            return false
          }
        }),
      )
  }

  public updateGebruiker(userDTO: UserDTO): Observable<Gebruiker> {
    return this.http
      .put(`${environment.apiUrl}/user/${userDTO.userId}`, userDTO, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            this.logout()
            this.translate.get('tokenVerstreken').subscribe((text: string) => {
              this.router.navigate([`/login`], {
                state: { errorMessage: text },
              })
            })
          }
          return throwError(error)
        }),
        map((gebruiker: any) => {
          if (gebruiker) {
            const local = JSON.parse(gebruiker)
            /*localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(gebruiker)
                        );*/
            var angualargebruiker = Gebruiker.fromJSON(local)
            this.user.next(angualargebruiker)
            return angualargebruiker
          }
        }),
      )
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey)
    return !!localToken ? localToken : ''
  }

  public logout(): void {
    if (this.user.getValue()) {
      localStorage.removeItem(this._tokenKey)
      localStorage.removeItem('loggedUser')
      this.user.next(null)
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(`${environment.apiUrl}/user/checkusername`, {
      params: { email },
    })
  }
}

function parseJwt(token) {
  if (!token) {
    return null
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}
