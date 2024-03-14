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
  @Input() public initialData: RegistrationDTO;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.organizationalForm = this.fb.group({
      dates: this.fb.group({
        internshipOnline: [this.initialData.internshipOnline],
        startDate: [
          this.initialData.startDate
            ? this.datePipe.transform(
                new Date(this.initialData.startDate),
                "yyyy-MM-dd"
              )
            : "",
          Validators.required,
        ],
        endDate: [
          this.initialData.endDate
            ? this.datePipe.transform(
                new Date(this.initialData.endDate),
                "yyyy-MM-dd"
              )
            : "",
          Validators.required,
        ],
      }),
      spanish: this.fb.group({
        level: [this.initialData.level, Validators.required],
        weeksOnline: [this.initialData.weeksOnline],
        weeks: [this.initialData.weeks],
      }),
      info: this.fb.group({
        occupation: [this.initialData.occupation, Validators.required],
        tasks: [this.initialData.tasks, Validators.required],
        expectations: [this.initialData.expectations],
        proposals: [this.initialData.proposals],
        motivationLatter: [this.initialData.motivationLatter],
      }),
    });

    // Add controls only targeted to students
    if (this.role === FormRole.STUDENT) {
      const dates = this.organizationalForm.get("dates") as FormGroup;
      dates.addControl(
        "leaveStartDate",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).leaveStartDate
            ? this.datePipe.transform(
                new Date(
                  (this.initialData as RegistrationStudentDTO).leaveStartDate
                ),
                "yyyy-MM-dd"
              )
            : ""
        )
      );
      dates.addControl(
        "leaveEndDate",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).leaveEndDate
            ? this.datePipe.transform(
                new Date(
                  (this.initialData as RegistrationStudentDTO).leaveEndDate
                ),
                "yyyy-MM-dd"
              )
            : ""
        )
      );

      const info = this.organizationalForm.get("info") as FormGroup;
      info.addControl(
        "degree",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).degree,
          Validators.required
        )
      );
      info.addControl(
        "internshipContext",
        this.fb.control(
          (this.initialData as RegistrationStudentDTO).internshipContext,
          Validators.required
        )
      );
    }

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.organizationalForm.valueChanges.subscribe(() => this.emitForm());
  }

  getErrorMessage(errors: ValidationErrors): string {
    return ContainerComponent.getErrorMessage(errors, this.translate);
  }

  private emitForm() {
    this.organizationalFormChange.emit(this.organizationalForm);
    this.organizationalFormCounted.emit(
      ContainerComponent.countFields(this.organizationalForm)
    );
  }
}
