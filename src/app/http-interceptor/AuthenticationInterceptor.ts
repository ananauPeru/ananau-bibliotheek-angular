import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthModel } from '../modules/auth/_models/auth.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTING OUTGOING CALL')
    console.log(this.getAuthFromLocalStorage())
    if (this.getAuthFromLocalStorage()) {
      const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${this.getAuthFromLocalStorage().token}`,
      })
      const clonedRequest = req.clone({
        headers: httpHeaders,
        // headers: req.headers.set(
        //   'Authorization',
        //   `Bearer ${this.authService.getAuthFromLocalStorage().token}`,
        // ),
      })
      return next.handle(clonedRequest)
    }
    return next.handle(req)
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      // console.log(localStorage)
      // console.log(this.authLocalStorageToken)
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken),
      )
      // console.log(authData)
      return authData
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }
}
