import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { VaccinationModel } from "../../../_models/vaccination.model";
import { HolidayModel } from "../../../_models/holiday.model";

const API_GENERAL_INFORMATION_URL = `${environment.apiUrl}/general-information`;

@Injectable({
    providedIn: "root",
})
export class GeneralInformationHTTPService {
    constructor(private http: HttpClient) {}

    getVisaInformation$(): Observable<String> {
        return this.http
        .get(`${API_GENERAL_INFORMATION_URL}/visa`, {
            responseType: "text",
        })
        .pipe(
            catchError((error) => {
                if(error.status == 401) {
                    console.error("Login please...");
                } else {
                    console.error(error);
                }
                return throwError(error);
            })
        )
    }

    getVaccinationInformation$(): Observable<VaccinationModel[]> {
        return this.http
        .get(`${API_GENERAL_INFORMATION_URL}/vaccinations`, {
            responseType: "json",
        })
        .pipe(
            catchError((error) => {
                if(error.status == 401) {
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

    getHolidayInformation$(): Observable<HolidayModel[]> {
        return this.http
        .get(`${API_GENERAL_INFORMATION_URL}/holidays`, {
            responseType: "json",
        })
        .pipe(
            catchError((error) => {
                if(error.status == 401) {
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
}