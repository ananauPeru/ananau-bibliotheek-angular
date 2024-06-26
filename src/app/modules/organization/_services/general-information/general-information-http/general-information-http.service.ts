import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { VaccinationModel } from "../../../_models/vaccination.model";
import { HolidayModel } from "../../../_models/holiday.model";

const API_GENERAL_INFORMATION_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class GeneralInformationHTTPService {
  private fakeHolidays: HolidayModel[] = [
    { id: 1, name: "New Year", date: new Date("2023-01-01") },
    { id: 2, name: "Christmas", date: new Date("2023-12-25") },
    { id: 3, name: "Independence Day", date: new Date("2023-07-04") },
  ];

  constructor(private http: HttpClient) {}

  // Visa requests

  getVisaInformation$(): Observable<string> {
    return this.http
      .get(`${API_GENERAL_INFORMATION_URL}/visa`)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        }),
        map((response: any): string => {
          return response.description;
        }
      ));
  }

  putVisaInformation$(visaDescription: {
    description: string;
  }): Observable<any> {
    return this.http
      .put(`${API_GENERAL_INFORMATION_URL}/visa`, visaDescription)
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
        map((response: any): VaccinationModel[] => {
          return response.vaccinations.map((vaccination: any) => ({
            id: vaccination.id,
            name: vaccination.name,
            required: vaccination.required,
          }));
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
        map((response: any): HolidayModel[] => {
          return response.holidays.map((holiday: any) => ({
            id: holiday.id,
            name: holiday.name,
            date: holiday.date,
          }));
        })
      );
  }

  postHolidayInformation$(
    name: string,
    date: string
  ): Observable<HolidayModel> {
    return this.http
      .post<HolidayModel>(`${API_GENERAL_INFORMATION_URL}/holidays`, {
        name,
        date,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        }),
        map((response: any): HolidayModel => {
          return response.holiday;
        })
      );
  }

  deleteHolidayInformation$(holidayId: number): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, {
        responseType: "json",
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

  deleteHolidaysInformation$(): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/holidays`, {
        responseType: "json",
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
