import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { RegistrationModel } from "../../../_models/registration.model";

const API_REGISTRATIONS_URL = `${environment.apiUrl}/registrations`;

@Injectable({
  providedIn: "root",
})
export class RegistrationHttpService {
  constructor(private http: HttpClient) {}

  getAllRegistrations$(): Observable<RegistrationModel[]> {
    return this.http
      .get(`${API_REGISTRATIONS_URL}`, { responseType: "json" })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log("Login please...");
          }
          return throwError(error);
        }),
        map((registrations: any): RegistrationModel[] => {
          return registrations;
        })
      );
  }
}
