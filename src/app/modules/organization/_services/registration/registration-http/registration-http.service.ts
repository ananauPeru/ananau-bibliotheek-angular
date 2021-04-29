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
            console.log("Login please...");
          }
          return throwError(error);
        }),
        map((registrations: any): SmallRegistrationModel[] => registrations)
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
            console.log("Login please...");
          }
          return throwError(error);
        }),
        map((registration: any): RegistrationStudentModel => registration)
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
            console.log("Login please...");
          }
          return throwError(error);
        }),
        map((registration: any): RegistrationModel => registration)
      );
  }
}
