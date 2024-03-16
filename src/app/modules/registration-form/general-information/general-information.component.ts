import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from '../../organization/_services/general-information/general-information.service';
import { VaccinationModel } from '../_models/vaccination.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  vaccinations$: Observable<VaccinationModel[]>;


  constructor(private generalInformationService: GeneralInformationService) { }

  ngOnInit() {
    this.fetchVaccinations();
  }
  
  private fetchVaccinations() {
    this.vaccinations$ = this.generalInformationService.getAllVaccinationInformation$();
  }

}
