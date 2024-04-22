import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
// import { AccountService } from "src/app/account/data-services/account.service";
import { environment } from "src/environments/environment";
import { AuthModel } from "../../auth/_models/auth.model";
import { RegistrationVolunteerModel as RegistrationVolunteerDTO } from "src/app/shared/models/registration/registration-volunteer.model";
import { RegistrationStudentModel as RegistrationStudentDTO } from "src/app/shared/models/registration/registration-student.model";

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

  getVolunteerRegistration$(): Observable<RegistrationVolunteerDTO> {
    return this.http
      .get(`${environment.apiUrl}/registrations/volunteers/current`, {
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
          (dto: any): RegistrationVolunteerDTO => {
            return dto.details;
          }
        )
      );
  }

  getStudentRegistration$(): Observable<RegistrationStudentDTO> {
    return this.http
      .get(`${environment.apiUrl}/registrations/students/current`, {
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
            return dto.details;
          }
        )
      );
  }

  postVolunteerRegistration$(
    registration: RegistrationVolunteerDTO,
    submit: boolean
  ): Observable<RegistrationVolunteerDTO> {
    return this.http
      .post(
        `${environment.apiUrl}/registrations/volunteers/current`,
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
          (dto: any): RegistrationVolunteerDTO => {
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
        `${environment.apiUrl}/registrations/students/current`,
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
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      return undefined;
    }
  }
}
