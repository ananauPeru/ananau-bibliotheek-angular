import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthModel } from "../modules/auth/_models/auth.model";
import { environment } from "src/environments/environment";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { AuthService } from "../modules/auth";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.logoutIfTokenExpired();
    if (this.getAuthFromLocalStorage()) {
      const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${this.getAuthFromLocalStorage().token}`,
      });
      const clonedRequest = req.clone({
        headers: httpHeaders,
      });
      return next.handle(clonedRequest);
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
