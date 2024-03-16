import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { VaccinationModel } from '../../_models/vaccination.model';
import { HolidayModel } from '../../_models/holiday.model';
import { GeneralInformationHTTPService } from './general-information-http/general-information-http.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformationService {

  private visaInformation: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private vaccinationInformation: BehaviorSubject<VaccinationModel[]> = new BehaviorSubject<VaccinationModel[]>([]);
  private holidayInformation: BehaviorSubject<HolidayModel[]> = new BehaviorSubject<HolidayModel[]>([]);

  constructor(
    private generalInformationHttpService: GeneralInformationHTTPService
  ) {
    this.loadInitialData();
  }

  /**
   * Load initial data from the server
   */
  private loadInitialData() {
    this.refreshVisaInformation();
    this.refreshVaccinationInformation();
    this.refreshHolidayInformation();
  }

  /**
   * Refresh visa information from the server
   */
  public refreshVisaInformation() {
    this.generalInformationHttpService.getVisaInformation$().subscribe(
      (res) => {
        this.visaInformation.next(res.description);
      },
      (err) => console.error("Error refreshing visa information", err)
    );
  }

  /**
   * Refresh vaccination information from the server
   */
  public refreshVaccinationInformation() {
    this.generalInformationHttpService.getAllVaccinationInformation$().subscribe(
      (res) => {
        this.vaccinationInformation.next(res);
      },
      (err) => console.error("Error refreshing vaccination information", err)
    );
  }

  /**
   * Refresh holiday information from the server
   */
  public refreshHolidayInformation() {
    this.generalInformationHttpService.getAllHolidayInformation$().subscribe(
      (res) => {
        this.holidayInformation.next(res);
      },
      (err) => console.error("Error refreshing holiday information", err)
    );
  }

  /**
   * Get visa information
   * @returns Visa information
   */
  public getVisaInformation(): Observable<string> {
    return this.visaInformation.asObservable();
  }

  /**
   * Post visa information
   * @param visaData Visa information
   */
  public updateVisaInformation(visaData: string): Observable<any> {

    //TODO: Change post to put
    return this.generalInformationHttpService.postVisaInformation$({description: visaData});
  }

  /**
   * Get all vaccinations
   * @returns All vaccinations
   */
  public getVaccinations(): Observable<VaccinationModel[]> {
    return this.vaccinationInformation.asObservable();
  }

  /**
   * Create vaccination
   * @param vaccination Vaccination
   */
  public createVaccination(vaccination: VaccinationModel): Observable<VaccinationModel> {
    return this.generalInformationHttpService.postVaccinationInformation$(vaccination);
  }

  /**
   * Remove vaccination
   * @param vaccinationId Vaccination ID
   */
  public removeVaccination(vaccinationId: number): Observable<any> {
    return this.generalInformationHttpService.deleteVaccinationInformation$(vaccinationId);
  }

  /**
   * Get all holiday information
   * @returns All holiday information
   */
  public getHolidays(): Observable<HolidayModel[]> {
    return this.holidayInformation.asObservable();
  }

  /**
   * Create holiday
   * @param holiday Holiday
   */
  public createHoliday(holiday: HolidayModel): Observable<HolidayModel> {
    return this.generalInformationHttpService.postHolidayInformation$(holiday);
  }

  /**
   * Remove holiday
   * @param holidayId Holiday ID
   */
  public removeHoliday(holidayId: number): Observable<any> {
    return this.generalInformationHttpService.deleteHolidayInformation$(holidayId);
  }

  /**
   * Remove all holidays
   */
  public removeHolidays(): Observable<any> {
    return this.generalInformationHttpService.deleteAllHolidayInformation$();
  }

}