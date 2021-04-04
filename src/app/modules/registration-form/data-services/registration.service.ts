import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
// import { AccountService } from "src/app/account/data-services/account.service";
import { environment } from "src/environments/environment";
import { AuthModel } from "../../auth/_models/auth.model";
import { RegistrationDTO } from "../_dto/registration-dto";
import { RegistrationStudentDTO } from "../_dto/registration-student-dto";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(
    private router: Router,
    // private accountService: AccountService,
    private http: HttpClient,
    public translate: TranslateService
  ) {}

  getVolunteerRegistration$(): Observable<RegistrationDTO> {
    return this.http
      .get(`${environment.apiUrl}/registrations/volunteer`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            // this.accountService.logout();
            this.translate.get("tokenVerstreken").subscribe((text: string) => {
              this.router.navigate([`/account/login`], {
                state: { errorMessage: text },
              });
            });
          }
          return throwError(error);
        }),
        map(
          (dto: any): RegistrationDTO => {
            return dto;
          }
        )
      );
  }

  getStudentRegistration$(): Observable<RegistrationStudentDTO> {
    return this.http
      .get(`${environment.apiUrl}/registrations/student`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            // this.accountService.logout();
            this.translate.get("tokenVerstreken").subscribe((text: string) => {
              this.router.navigate([`/account/login`], {
                state: { errorMessage: text },
              });
            });
          }
          return throwError(error);
        }),
        map(
          (dto: any): RegistrationStudentDTO => {
            return dto;
          }
        )
      );
  }

  postVolunteerRegistration$(
    registration: RegistrationDTO,
    submit: boolean
  ): Observable<RegistrationDTO> {
    return this.http
      .post(
        `${environment.apiUrl}/registrations/volunteer${
          submit ? "/submit" : ""
        }`,
        registration,
        {
          responseType: "json",
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            // this.accountService.logout();
            this.translate.get("tokenVerstreken").subscribe((text: string) => {
              this.router.navigate([`/account/login`], {
                state: { errorMessage: text },
              });
            });
          }
          return throwError(error);
        }),
        map(
          (dto: any): RegistrationDTO => {
            return dto;
          }
        )
      );
  }

  postStudentRegistration$(
    registration: RegistrationStudentDTO,
    submit: boolean
  ): Observable<RegistrationStudentDTO> {
    return this.http
      .post(
        `${environment.apiUrl}/registrations/student${submit ? "/submit" : ""}`,
        registration,
        {
          responseType: "json",
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            // this.accountService.logout();
            this.translate.get("tokenVerstreken").subscribe((text: string) => {
              this.router.navigate([`/account/login`], {
                state: { errorMessage: text },
              });
            });
          }
          return throwError(error);
        }),
        map(
          (dto: any): RegistrationStudentDTO => {
            return dto;
          }
        )
      );
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      // console.log(localStorage)
      // console.log(this.authLocalStorageToken)
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      console.log(authData);
      return authData;
    } catch (error) {
      // console.error(error)
      return undefined;
    }
  }
}
