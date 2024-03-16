import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from '../../organization/_services/general-information/general-information.service';
import { VaccinationModel } from '../../organization/_models/vaccination.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  vaccinations$: Observable<VaccinationModel[]>;
  visaInformation$: Observable<string>;

  constructor(private generalInformationService: GeneralInformationService) { }

  ngOnInit() {
    this.fetchVaccinations();
    this.fetchVisaInformation();
  }
  
  private fetchVaccinations() {
    this.vaccinations$ = this.generalInformationService.getVaccinations();
  }

  private fetchVisaInformation() {
    this.visaInformation$ = this.generalInformationService.getVisaInformation();
  }



}
