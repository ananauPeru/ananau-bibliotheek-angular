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
import { RegistrationDTO } from "../_dto/registration-dto";
import { RegistrationStudentDTO } from "../_dto/registration-student-dto";

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
        firstName: [this.initialData.firstName, [Validators.required]],
        middleName: [this.initialData.middleName],
        lastName: [this.initialData.lastName, [Validators.required]],
        email: [{ value: this.initialData.email, disabled: true }], // read-only
        phone: [this.initialData.phone, [Validators.required]],
        dateOfBirth: [
          this.initialData.dateOfBirth
            ? this.datePipe.transform(
                new Date(this.initialData.dateOfBirth),
                "yyyy-MM-dd"
              )
            : "",
          Validators.required,
        ],
        birthplace: [this.initialData.birthplace, Validators.required],
        nationality: [this.initialData.nationality, Validators.required],
        passportNumber: [this.initialData.passportNumber, Validators.required],
      }),
      address: this.fb.group({
        street: [this.initialData.street, Validators.required],
        houseNumber: [this.initialData.houseNumber, Validators.required],
        mailbox: [this.initialData.mailbox],
        postalCode: [this.initialData.postalCode, Validators.required],
        township: [this.initialData.township, Validators.required],
        country: [this.initialData.country, Validators.required],
      }),
      contactPerson: this.fb.group({
        firstName: [this.initialData.firstNameContact, Validators.required],
        middleName: [this.initialData.middleNameContact],
        lastName: [this.initialData.lastNameContact, Validators.required],
        relation: [this.initialData.relation, Validators.required],
        email: [
          this.initialData.emailContact,
          [Validators.required, Validators.email],
        ],
        phone: [this.initialData.phoneContact, Validators.required],
      }),
      medical: this.fb.group({
        allergies: [this.initialData.allergies],
        medicalConditions: [this.initialData.medicalConditions],
      }),
    });

    // Add controls only targeted to students
    if (this.role === FormRole.STUDENT) {
      const general = this.personalForm.get("general") as FormGroup;
      general.addControl(
        "schoolEmail",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).schoolEmail,
          [Validators.required, Validators.email]
        )
      );
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
