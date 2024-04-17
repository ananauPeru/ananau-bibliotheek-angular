import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ContainerComponent } from "../container/container.component";
import { FormRole } from "../models/form-role";
import { RegistrationModel as RegistrationDTO } from "src/app/shared/models/registration/registration.model";
import { RegistrationStudentModel as RegistrationStudentDTO } from "src/app/shared/models/registration/registration-student.model";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
})
export class PersonalInformationComponent implements OnInit {
  @Input() public personalForm: FormGroup;
  @Output() public personalFormChange = new EventEmitter<FormGroup>();
  @Output() public personalFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();
  @Input() public role: FormRole;
  @Input() public initialData: RegistrationDTO;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.personalForm = this.fb.group({
      general: this.fb.group({
        firstName: [
          this.initialData.userDetails.firstName,
          [Validators.required],
        ],
        middleName: [this.initialData.userDetails.middleName],
        lastName: [
          this.initialData.userDetails.lastName,
          [Validators.required],
        ],
        email: [{ value: this.initialData.userDetails.email, disabled: true }], // read-only
        phone: [this.initialData.userDetails.phone, [Validators.required]],
        dateOfBirth: [
          this.initialData.userDetails.dateOfBirth
            ? this.datePipe.transform(
                new Date(this.initialData.userDetails.dateOfBirth),
                "yyyy-MM-dd"
              )
            : "",
          Validators.required,
        ],
        birthplace: [
          this.initialData.userDetails.birthplace,
          Validators.required,
        ],
        nationality: [
          this.initialData.userDetails.nationality,
          Validators.required,
        ],
        passportNumber: [
          this.initialData.userDetails.passportNumber,
          Validators.required,
        ],
      }),
      address: this.fb.group({
        street: [this.initialData.address.street, Validators.required],
        houseNumber: [
          this.initialData.address.houseNumber,
          Validators.required,
        ],
        mailbox: [this.initialData.address.mailbox],
        postalCode: [this.initialData.address.postalCode, Validators.required],
        township: [this.initialData.address.city, Validators.required],
        country: [this.initialData.address.country, Validators.required],
      }),
      contactPerson: this.fb.group({
        firstName: [
          this.initialData.emergencyPerson.firstName,
          Validators.required,
        ],
        middleName: [this.initialData.emergencyPerson.middleName],
        lastName: [
          this.initialData.emergencyPerson.lastName,
          Validators.required,
        ],
        relation: [
          this.initialData.emergencyPerson.relation,
          Validators.required,
        ],
        email: [
          this.initialData.emergencyPerson.email,
          [Validators.required, Validators.email],
        ],
        phone: [this.initialData.emergencyPerson.phone, Validators.required],
      }),
      medical: this.fb.group({
        allergies: [this.initialData.medicalDetails.allergies],
        medicalConditions: [this.initialData.medicalDetails.medicalConditions],
      }),
    });

    if (this.role === FormRole.STUDENT) {
      // Add controls only targeted to students
      const general = this.personalForm.get("general") as FormGroup;
      general.addControl(
        "schoolEmail",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).userDetails.schoolEmail,
          [Validators.required, Validators.email]
        )
      );
    } else if (this.role === FormRole.VOLUNTEER) {
      // Add controls only targeted to volunteers

      // const general = this.personalForm.get("general") as FormGroup;
      // general.addControl(
      //   "volunteerEmail",
      //   this.fb.control(
      //     (this.initialData as RegistrationVolunteerDTO).userDetails.schoolEmail,
      //     [Validators.required, Validators.email]
      //   )
      // );
    }

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.personalForm.valueChanges.subscribe(() => this.emitForm());
  }

  getErrorMessage(errors: ValidationErrors): string {
    return ContainerComponent.getErrorMessage(errors, this.translate);
  }

  private emitForm() {
    this.personalFormChange.emit(this.personalForm);
    this.personalFormCounted.emit(
      ContainerComponent.countFields(this.personalForm)
    );
  }
}
