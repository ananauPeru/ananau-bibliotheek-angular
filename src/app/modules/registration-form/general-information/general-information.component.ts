import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from '../_services/general-information/general-information.service';
import { VaccinationModel } from '../_models/vaccination.model';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  constructor(private generalInformationService: GeneralInformationService) { }

  ngOnInit() {
  }

  submitTestButton() {
      
  }

}
