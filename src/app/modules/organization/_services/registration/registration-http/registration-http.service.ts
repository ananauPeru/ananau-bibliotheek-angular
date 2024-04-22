import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SmallRegistrationModel } from "../../../_models/small-registration.model";
import { RegistrationStudentModel } from "src/app/shared/models/registration/registration-student.model";
import { RegistrationVolunteerModel } from "src/app/shared/models/registration/registration-volunteer.model";

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

  getVolunteerRegistrationById$(userId: number): Observable<RegistrationVolunteerModel> {
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
        map((response: any): RegistrationVolunteerModel => response.details)
      );
  }

  confirmRegistration$(userId: number, confirm: boolean) {
    return this.http
      .patch(
        `${API_REGISTRATIONS_URL}/${userId}/confirmation`,
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

  updateRegistrationDates$(userId: number, isStudent: boolean, dates: any) {

    const url = isStudent ? `${API_REGISTRATIONS_URL}/students` : `${API_REGISTRATIONS_URL}/volunteers`;
    
    const filteredDates = Object.entries(dates)
    .filter(([_, value]) => value !== null)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    return this.http
    .put(
      `${url}/${userId}`,
      filteredDates
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
