import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthModel } from "../modules/auth/_models/auth.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.getAuthFromLocalStorage()) {
      const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${this.getAuthFromLocalStorage().token}`,
      });
      const clonedRequest = req.clone({
        headers: httpHeaders,
      });
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token has expired or is invalid
            // Clear token and user data from storage
            localStorage.removeItem(this.authLocalStorageToken);
            // Redirect to the login page
            this.router.navigate(["/auth/login"]);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      return undefined;
    }
  }
}