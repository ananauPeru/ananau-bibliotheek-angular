import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VaccinationModel } from '../../_models/vaccination.model';
import { HolidayModel } from '../../_models/holiday.model';
import { GeneralInformationHTTPService } from './general-information-http/general-information-http.service';
import { VisaModel } from '../../_models/visa.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformationService {

  constructor(
    private generalInformationHttpService: GeneralInformationHTTPService
  ) {}

  getVisaInformation$(): Observable<string> {
    return this.generalInformationHttpService.getVisaInformation$();
  }

  postVisaInformation$(visaData: string): Observable<any> {
    return this.generalInformationHttpService.postVisaInformation$(visaData);
  }

  getAllVaccinationInformation$(): Observable<VaccinationModel[]> {
    return this.generalInformationHttpService.getAllVaccinationInformation$();
  }

  addVaccinationInformation$(vaccination: VaccinationModel): Observable<VaccinationModel> {
    return this.generalInformationHttpService.postVaccinationInformation$(vaccination);
  }

  deleteVaccinationInformation$(vaccinationId: number): Observable<any> {
    return this.generalInformationHttpService.deleteVaccinationInformation$(vaccinationId);
  }

  getAllHolidayInformation$(): Observable<HolidayModel[]> {
    return this.generalInformationHttpService.getAllHolidayInformation$();
  }

  getHolidayInformationById$(holidayId: number): Observable<HolidayModel> {
    return this.generalInformationHttpService.getHolidayInformationById$(holidayId);
  }

  addHolidayInformation$(holiday: HolidayModel): Observable<HolidayModel> {
    return this.generalInformationHttpService.postHolidayInformation$(holiday);
  }

  updateHolidayInformation$(holidayId: number, updatedHoliday: HolidayModel): Observable<HolidayModel> {
    return this.generalInformationHttpService.putHolidayInformation$(holidayId, updatedHoliday);
  }

  deleteHolidayInformation$(holidayId: number): Observable<any> {
    return this.generalInformationHttpService.deleteHolidayInformation$(holidayId);
  }

  deleteAllHolidayInformation$(): Observable<any> {
    return this.generalInformationHttpService.deleteAllHolidayInformation$();
  }

}