import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from '../../organization/_services/general-information/general-information.service';
import { VaccinationModel } from '../../organization/_models/vaccination.model';
import { Observable } from 'rxjs';
import { HolidayModel } from '../../organization/_models/holiday.model';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  visaInformation$: Observable<string>;
  vaccinations$: Observable<VaccinationModel[]>;
  holidays$: Observable<HolidayModel[]>;

  constructor(private generalInformationService: GeneralInformationService) { }

  ngOnInit() {
    this.fetchVisaInformation();
    this.fetchVaccinations();
    this.fetchHolidays();

  }
  
  private fetchVisaInformation() {
    this.visaInformation$ = this.generalInformationService.getVisaInformation();
  }
  
  private fetchVaccinations() {
    this.vaccinations$ = this.generalInformationService.getVaccinations();
  }


  private fetchHolidays() {
    this.holidays$ = this.generalInformationService.getHolidays();
  }



}
