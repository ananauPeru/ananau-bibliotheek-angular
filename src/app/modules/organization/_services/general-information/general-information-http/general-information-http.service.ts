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

  getVisaInformation$(): Observable<{
    visaId: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  }> {
    return this.http
      .get<{
        visaId: number;
        description: string;
        createdAt: string;
        updatedAt: string;
      }>(`${API_GENERAL_INFORMATION_URL}/visa`)
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

  postVisaInformation$(visaDescription: {
    description: string;
  }): Observable<any> {
    return this.http
      .post(`${API_GENERAL_INFORMATION_URL}/visa`, visaDescription)
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
        map((response: any): HolidayModel[] => {
          return response.holidays;
        })
      );
  }

  // getHolidayInformationById$(holidayId: number): Observable<HolidayModel> {
  //   return this.http
  //     .get(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, {
  //       responseType: "json",
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         if (error.status == 401) {
  //           console.error("Login please...");
  //         }
  //         return throwError(error);
  //       }),
  //       map((response: any): HolidayModel => {
  //         return response.holiday;
  //       })
  //     );
  // }

  postHolidayInformation$(name: string, date: string): Observable<HolidayModel> {
    return this.http
      .post<HolidayModel>(`${API_GENERAL_INFORMATION_URL}/holidays`, {name, date})
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
        }
      ));
  }

  // putHolidayInformation$(
  //   holidayId: number,
  //   updatedHoliday: HolidayModel
  // ): Observable<HolidayModel> {
  //   return this.http
  //     .put<HolidayModel>(
  //       `${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`,
  //       updatedHoliday
  //     )
  //     .pipe(
  //       catchError((error) => {
  //         if (error.status === 401) {
  //           console.error("Login please...");
  //         } else {
  //           console.error(error);
  //         }
  //         return throwError(error);
  //       })
  //     );
  // }

  deleteHolidayInformation$(holidayId: number): Observable<any> {
    return this.http
      .delete(`${API_GENERAL_INFORMATION_URL}/holidays/${holidayId}`, {
        responseType: 'json'
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

  //TODO: Delete all holidays

  // deleteAllHolidayInformation$(): Observable<any> {
  //   return this.http
  //     .delete(`${API_GENERAL_INFORMATION_URL}/holidays`, {
  //       responseType: 'text'
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         if (error.status === 401) {
  //           console.error("Login please...");
  //         } else {
  //           console.error(error);
  //         }
  //         return throwError(error);
  //       })
  //     );
  // }
}
