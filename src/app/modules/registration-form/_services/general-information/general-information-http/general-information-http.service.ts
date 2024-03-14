import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { VaccinationModel } from "../../../_models/vaccination.model";
import { HolidayModel } from "../../../_models/holiday.model";

const API_GENERAL_INFORMATION_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class GeneralInformationHTTPService {
  constructor(private http: HttpClient) {}

  // Visa requests

  getVisaInformation$(): Observable<string> {
    return this.http
      .get(`${API_GENERAL_INFORMATION_URL}/visa`, {
        responseType: "text",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  postVisaInformation$(visaData: string): Observable<any> {
    return this.http
      .post(`${API_GENERAL_INFORMATION_URL}/visa`, visaData, {
        responseType: "text",
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  // Vaccination requests

  getAllVaccinationInformation$(): Observable<VaccinationModel[]> {
    return this.http
      .get(`${API_GENERAL_INFORMATION_URL}/vaccinations`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        }),
        map((vaccinations: any): VaccinationModel[] => {
          return vaccinations;
        })
      );
  }

  postVaccinationInformation$(
    vaccination: VaccinationModel
  ): Observable<VaccinationModel> {
    return this.http
      .post<VaccinationModel>(
        `${API_GENERAL_INFORMATION_URL}/vaccinations`,
        vaccination
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

  deleteVaccinationInformation$(vaccinationId: number): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/vaccinations/${vaccinationId}`, {
        responseType: "text",
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  // Holiday requests

  getAllHolidayInformation$(): Observable<HolidayModel[]> {
    return this.http
      .get(`${API_GENERAL_INFORMATION_URL}/holidays`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        }),
        map((holidays: any): HolidayModel[] => {
          return holidays;
        })
      );
  }

  getHolidayInformationById$(holidayId: number): Observable<HolidayModel> {
    return this.http
      .get(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((holiday: any): HolidayModel => {
          return holiday;
        })
      );
  }

  postHolidayInformation$(holiday: HolidayModel): Observable<HolidayModel> {
    return this.http
      .post<HolidayModel>(`${API_GENERAL_INFORMATION_URL}/holidays`, holiday)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  putHolidayInformation$(holidayId: number, updatedHoliday: HolidayModel): Observable<HolidayModel> {
    return this.http
      .put<HolidayModel>(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, updatedHoliday)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  deleteHolidayInformation$(holidayId: number): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, {
        responseType: 'text'
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }

  deleteAllHolidayInformation$(): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/holidays`, {
        responseType: 'text'
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        })
      );
  }
}
