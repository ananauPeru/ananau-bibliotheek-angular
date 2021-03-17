import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContainerComponent } from "../container/container.component";
import { FormRole } from "../models/form-role";

@Component({
  selector: "app-organizational-information",
  templateUrl: "./organizational-information.component.html",
  styleUrls: ["./organizational-information.component.scss"],
})
export class OrganizationalInformationComponent implements OnInit {
  @Input() public organizationalForm: FormGroup;
  @Output() public organizationalFormChange = new EventEmitter<FormGroup>();
  @Output() public organizationalFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();
  @Input() public role: FormRole;
  getErrorMessage = ContainerComponent.getErrorMessage;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.organizationalForm = this.fb.group({
      dates: this.fb.group({
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
      }),
      spanish: this.fb.group({
        level: ["", Validators.required],
        weeks: [""],
      }),
      info: this.fb.group({
        occupation: ["", Validators.required],
        tasks: ["", Validators.required],
        expectations: [""],
        proposals: [""],
      }),
    });

    // Add controls only targeted to students
    if (this.role === FormRole.STUDENT) {
      const dates = this.organizationalForm.get("dates") as FormGroup;
      dates.addControl("leaveStartDate", this.fb.control(""));
      dates.addControl("leaveEndDate", this.fb.control(""));

      const info = this.organizationalForm.get("info") as FormGroup;
      info.addControl("degree", this.fb.control("", Validators.required));
      info.addControl(
        "internshipContext",
        this.fb.control("", Validators.required)
      );
    }

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.organizationalForm.valueChanges.subscribe(() => this.emitForm());
  }

  private emitForm() {
    this.organizationalFormChange.emit(this.organizationalForm);
    this.organizationalFormCounted.emit(
      ContainerComponent.countFields(this.organizationalForm)
    );
  }
}
