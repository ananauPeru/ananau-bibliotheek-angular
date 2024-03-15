import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GeneralInformationService } from '../../registration-form/_services/general-information/general-information.service';
import { Observable } from 'rxjs';
import { VaccinationModel } from '../../registration-form/_models/vaccination.model';

@Component({
  selector: 'app-edit-general-information',
  templateUrl: './edit-general-information.component.html',
  styleUrls: ['./edit-general-information.component.scss']
})
export class EditGeneralInformationComponent implements OnInit {
  visaInformation$: Observable<string>;
  visaInformationForm: FormGroup;
  vaccinations$: Observable<VaccinationModel[]>;
  vaccinationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private generalInformationService: GeneralInformationService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getVisaInformation();
    this.getAllVaccinations();
  }

  initForm() {
    this.visaInformationForm = this.formBuilder.group({
      visaInformation: ['', Validators.required]
    });

    this.vaccinationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      required: new FormControl(false)
    });
  }

  getVisaInformation() {
    this.visaInformation$ = this.generalInformationService.getVisaInformation$();
    this.visaInformation$.subscribe(
      (visaInfo) => {
        this.visaInformationForm.patchValue({ visaInformation: visaInfo });
      },
      (error) => {
        console.error('Error retrieving visa information:', error);
      }
    );
  }

  getAllVaccinations() {
    this.vaccinations$ = this.generalInformationService.getAllVaccinationInformation$();
  }

  getErrorMessage(errors: any) {
    if (errors.required) {
      return 'This field is required';
    }
  }

  //Not working untill new API endpoints
  addVaccination() {
    if (this.vaccinationForm.valid) {
      const vaccination: VaccinationModel = this.vaccinationForm.value;
      this.generalInformationService.addVaccinationInformation$(vaccination).subscribe(
        (addedVaccination) => {
          this.vaccinations$ = this.generalInformationService.getAllVaccinationInformation$();
          this.vaccinationForm.reset();
        },
        (error) => {
          console.error('Error adding vaccination:', error);
        }
      );
    }
  }

  //Not working untill new API endpoints
  removeVaccination(vaccination: VaccinationModel) {
    this.generalInformationService.deleteVaccinationInformation$(vaccination.id).subscribe(
      () => {
        this.vaccinations$ = this.generalInformationService.getAllVaccinationInformation$();
      },
      (error) => {
        console.error('Error removing vaccination:', error);
      }
    );
  }

  saveVisaInformation() {
    if (this.visaInformationForm.valid) {
      const visaData = this.visaInformationForm.value.visaInformation;
      this.generalInformationService.postVisaInformation$(visaData).subscribe(
        () => {
          console.log('Visa information updated successfully');
        },
        (error) => {
          console.error('Error updating visa information:', error);
        }
      );
    }
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;
    textarea.style.height = 'auto';
    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height = (newHeight > initialHeight ? newHeight : initialHeight) + 'px';
  }
}