import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContainerComponent } from "../container/container.component";
import { FormRole } from "../models/form-role";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.personalForm = this.fb.group({
      general: this.fb.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required]],
        dateOfBirth: ["", Validators.required],
        birthplace: ["", Validators.required],
        nationality: ["", Validators.required],
        passportNumber: ["", Validators.required],
      }),
      address: this.fb.group({
        street: ["", Validators.required],
        houseNumber: ["", Validators.required],
        mailbox: [""],
        postalCode: ["", Validators.required],
        township: ["", Validators.required],
      }),
      contactPerson: this.fb.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        relation: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", Validators.required],
      }),
      medical: this.fb.group({
        allergies: [""],
        medicalConditions: [""],
      }),
    });

    // Add controls only targeted to students
    if (this.role === FormRole.STUDENT) {
      const general = this.personalForm.get("general") as FormGroup;
      general.addControl(
        "schoolEmail",
        this.fb.control("", [Validators.required, Validators.email])
      );
    }

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.personalForm.valueChanges.subscribe(() => this.emitForm());
  }

  private emitForm() {
    this.personalFormChange.emit(this.personalForm);
    this.personalFormCounted.emit(
      ContainerComponent.countFields(this.personalForm)
    );
  }
}