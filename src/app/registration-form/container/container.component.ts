import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  public formContainer: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formContainer = this.fb.group({
      personalForm: this.fb.group({
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
        volunteering: this.fb.group({
          occupation: ["", Validators.required],
          experiences: [""],
          levelSpanish: ["", Validators.required],
          tasks: ["", Validators.required],
          expectations: [""],
          proposals: [""],
        }),
      }),
      organizationalForm: this.fb.group({
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
        appartmentStartDate: ["", Validators.required],
        appartmentEndDate: ["", Validators.required],
        weeksSpanish: ["", Validators.required],
      }),
      scansForm: this.fb.group({}),
      questionsForm: this.fb.group({}),
    });
  }

  onSumbit() {
    console.log(this.formContainer);
  }
}
