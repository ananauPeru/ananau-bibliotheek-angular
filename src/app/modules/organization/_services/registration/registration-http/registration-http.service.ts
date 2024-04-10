import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { RegistrationStudentModel } from "../../../_models/registration-student.model";
import { RegistrationModel } from "../../../_models/registration.model";
import { SmallRegistrationModel } from "../../../_models/small-registration.model";

const API_REGISTRATIONS_URL = `${environment.apiUrl}/registrations`;

@Injectable({
  providedIn: "root",
})
export class RegistrationHttpService {
  constructor(private http: HttpClient) {}

  getAllRegistrations$(): Observable<SmallRegistrationModel[]> {
    return this.http
      .get(`${API_REGISTRATIONS_URL}`, { responseType: "json" })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): SmallRegistrationModel[] => response.registrations)
      );
  }

  getStudentRegistrationById$(
    userId: number
  ): Observable<RegistrationStudentModel> {
    return this.http
      .get(`${API_REGISTRATIONS_URL}/students/${userId}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): RegistrationStudentModel => response.details)
      );
  }

  getVolunteerRegistrationById$(userId: number): Observable<RegistrationModel> {
    return this.http
      .get(`${API_REGISTRATIONS_URL}/volunteers/${userId}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): RegistrationModel => response.details)
      );
  }

  confirmRegistration$(userId: number, confirm: boolean) {
    return this.http
      .patch(
        `${API_REGISTRATIONS_URL}/${userId}/confirm`,
        {
          "internshipConfirmed": confirm
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        })
      );
  }

  deleteRegistration$(userId: number) {
    return this.http.delete(`${API_REGISTRATIONS_URL}/${userId}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      })
    );
  }

  updateRegistrationDates$(userId: number, dates: any) {
    return this.http
    .put(
      `${API_REGISTRATIONS_URL}/students/${userId}`,
      dates
    )
    .pipe(
      catchError((error) => {
        if(error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      })
    )
  }
}
