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
  @Input() public role: FormRole;
  @Input() public initialData: RegistrationDTO;

  @Output() navigateToTab = new EventEmitter<string>();
  @Output() public organizationalFormChange = new EventEmitter<FormGroup>();
  @Output() public organizationalFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();

  public isTimeExceedingLimit = false;

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
        onlineStartDate: [this.initialData.onlineStartDate],
        onlineEndDate: [this.initialData.onlineEndDate],
        weeks: [this.initialData.weeks],
        offlineStartDate: [this.initialData.offlineStartDate],
        offlineEndDate: [this.initialData.offlineEndDate],
      }),
      motivationLetter: this.fb.group({
        motivationLetter: [this.initialData.motivationLetter, Validators.required],
      }),
      info: this.fb.group({
        occupation: [this.initialData.occupation, Validators.required],
        tasks: [this.initialData.tasks, Validators.required],
        expectations: [this.initialData.expectations],
        proposals: [this.initialData.proposals],
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

    this.organizationalForm.controls.spanish.get("onlineEndDate").disable();
    this.organizationalForm.controls.spanish.get("offlineEndDate").disable();

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

  calculateTimeDifference() {
    const leaveStartDate = this.organizationalForm.get("dates.leaveStartDate").value;
    const leaveEndDate = this.organizationalForm.get("dates.leaveEndDate").value;

    if (leaveStartDate && leaveEndDate) {
      const leaveStart = leaveStartDate ? new Date(leaveStartDate) : null;
      const leaveEnd = leaveEndDate ? new Date(leaveEndDate) : null;

      const leaveDiff = leaveStart && leaveEnd ? leaveEnd.getTime() - leaveStart.getTime() : 0;

      const days = leaveDiff / (1000 * 3600 * 24);

      if (days >= 90) {
        this.isTimeExceedingLimit = true;
      } else {
        this.isTimeExceedingLimit = false;
      }
    }
  }

  /**
   * Emits the navigation to the parent class.
   * @param tabId The tabId to navigate to.
   */
  onNavigateToTab(tabId: string) {
    this.navigateToTab.emit(tabId);
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;
    
    textarea.style.height = 'auto';
    
    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height = (newHeight > initialHeight ? newHeight : initialHeight) + 'px';
  } 

  calculateSpanishEndDate(startDateIdentifier: string, weeksIdentifier: string, endDateIdentifier: string) {
    const spanishStartDate = this.organizationalForm.get(`spanish.${startDateIdentifier}`).value;
    const spanishWeeks = this.organizationalForm.get(`spanish.${weeksIdentifier}`).value;
  
    if (spanishStartDate && spanishWeeks) {
      const startDate = new Date(spanishStartDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + (spanishWeeks * 7));
  
      this.organizationalForm.get(`spanish.${endDateIdentifier}`).setValue(
        this.datePipe.transform(endDate, 'yyyy-MM-dd')
      );
    }
  }
}
