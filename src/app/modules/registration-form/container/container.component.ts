import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthUtil } from "src/app/_utils/auth_util";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { RegistrationService } from "../data-services/registration.service";
import { FormRole } from "../models/form-role";
import { RegistrationModel as RegistrationDTO } from "src/app/shared/models/registration/registration.model";
import { RegistrationStudentModel as RegistrationStudentDTO } from "src/app/shared/models/registration/registration-student.model";
import { RegistrationVolunteerModel as RegistrationVolunteerDTO } from "src/app/shared/models/registration/registration-volunteer.model";
 
@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  public formContainer: FormGroup;
  public agreementControl: FormControl;
  public role: FormRole;
  public initialData$: Observable<RegistrationDTO>;
  public errorMessage: string;
  public saving: boolean;
  public sending: boolean;
  public savingScans: boolean;
  public sendingScans: boolean;
  public saveScanFiles = new Subject<boolean>();
  public savingPayments: boolean;
  public sendingPayments: boolean;
  public savePaymentFiles = new Subject<boolean>();
  public personalFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public organizationalFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public scansFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };
  public questionsFormProgress: {
    all: number;
    required: number;
    requiredAndValid: number;
  };

  public activeTabId: string = "kt_tab_pane_7_1";

  constructor(
    private auth: AuthUtil,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private toastr: ToastrUtil
  ) {
    if (
      this.auth
        .getAuthFromLocalStorage()
        .roles.some((role) => role.toLowerCase() === "superadmin")
    ) {
      this.route.data.subscribe(
        (data) =>
          (this.role = data["fallbackRole"]
            ? data["fallbackRole"]
            : FormRole.VOLUNTEER)
      );
    } else if (
      this.auth
        .getAuthFromLocalStorage()
        .roles.some((role) => role.toLowerCase() === "student")
    ) {
      this.role = FormRole.STUDENT;
    } else if (
      this.auth
        .getAuthFromLocalStorage()
        .roles.some((role) => role.toLowerCase() === "volunteer")
    ) {
      this.role = FormRole.VOLUNTEER;
    } else {
      this.route.data.subscribe(
        (data) =>
          (this.role = data["fallbackRole"]
            ? data["fallbackRole"]
            : FormRole.VOLUNTEER)
      );
    }

    if (this.role === FormRole.STUDENT) {
      this.initialData$ = this.registrationService
        .getStudentRegistration$()
        .pipe(
          catchError((error) => {
            console.error("An error occured when loading initial data.");
            this.errorMessage = error;
            return EMPTY;
          })
        );
    } else {
      this.initialData$ = this.registrationService
        .getVolunteerRegistration$()
        .pipe(
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        );
    }

    this.saving = false;
    this.sending = false;
  }

  ngOnInit() {
    this.formContainer = this.fb.group({
      personalForm: this.fb.group({}),
      organizationalForm: this.fb.group({}),
      scansForm: this.fb.group({}),
      questionsForm: this.fb.group({}),
    });

    this.agreementControl = this.fb.control(false, Validators.requiredTrue);

    this.personalFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.organizationalFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.scansFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
    this.questionsFormProgress = {
      all: 0,
      required: 0,
      requiredAndValid: 0,
    };
  }

  saveForm(submit: boolean) {
    if (submit) this.sending = true;
    else this.saving = true;

    this.saveScanFiles.next(submit);
    this.savePaymentFiles.next(submit);

    let dto;

    if (this.role === FormRole.STUDENT) { 
      dto = new RegistrationStudentDTO();
    } else if(this.role === FormRole.VOLUNTEER) {
      dto = new RegistrationVolunteerDTO();
    }


    const personalForm = this.formContainer.get("personalForm") as FormGroup;

    const general = personalForm.get("general") as FormGroup;
    dto.userDetails.firstName = general.get("firstName").value;
    dto.userDetails.lastName = general.get("lastName").value;
    dto.userDetails.middleName = general.get("middleName").value;
    dto.userDetails.phone = general.get("phone").value;
    dto.userDetails.dateOfBirth = new Date(general.get("dateOfBirth").value);
    dto.userDetails.birthplace = general.get("birthplace").value;
    dto.userDetails.nationality = general.get("nationality").value;
    dto.userDetails.passportNumber = general.get("passportNumber").value;

    const address = personalForm.get("address") as FormGroup;
    dto.address.street = address.get("street").value;
    dto.address.houseNumber = address.get("houseNumber").value;
    dto.address.mailbox = address.get("mailbox").value;
    dto.address.postalCode = address.get("postalCode").value;
    dto.address.city = address.get("township").value;
    dto.address.country = address.get("country").value;

    const contactPerson = personalForm.get("contactPerson") as FormGroup;
    dto.emergencyPerson.firstName = contactPerson.get("firstName").value;
    dto.emergencyPerson.middleName = contactPerson.get("middleName").value;
    dto.emergencyPerson.lastName = contactPerson.get("lastName").value;
    dto.emergencyPerson.relation = contactPerson.get("relation").value;
    dto.emergencyPerson.email = contactPerson.get("email").value;
    dto.emergencyPerson.phone = contactPerson.get("phone").value;

    const medical = personalForm.get("medical") as FormGroup;
    dto.medicalDetails.allergies = medical.get("allergies").value;
    dto.medicalDetails.medicalConditions = medical.get("medicalConditions").value;

    const organizationalForm = this.formContainer.get(
      "organizationalForm"
    ) as FormGroup;

    const dates = organizationalForm.get("dates") as FormGroup;
    dto.internDetails.internshipOnline = Boolean(dates.get("internshipOnline").value);
    dto.internDetails.startOfInternship = new Date(dates.get("startDate").value);
    dto.internDetails.endOfInternship = new Date(dates.get("endDate").value);

    const flightInformation = organizationalForm.get("flightInformation") as FormGroup;
    dto.internDetails.flightNumber = flightInformation.get("flightNumber").value;  
    dto.internDetails.flightDateArrival = new Date(flightInformation.get("flightDateArrival").value);

    const spanish = organizationalForm.get("spanish") as FormGroup;
    dto.internDetails.spanishLessons.spanishLevel = spanish.get("level").value;
    dto.internDetails.spanishLessons.spanishLessonWeeksOnline = Number(spanish.get("weeksOnline").value);
    dto.internDetails.spanishLessons.spanishLessonWeeks = Number(spanish.get("weeks").value);

    const payments = organizationalForm.get("payments") as FormGroup;
    dto.internDetails.paymentDescription = payments.get("paymentDescription").value;

    const motivationLetter = organizationalForm.get("motivationLetter") as FormGroup;
    dto.internDetails.motivationLetter = motivationLetter.get("motivationLetter").value;

    const info = organizationalForm.get("info") as FormGroup;
    dto.internDetails.professionOrEducation = info.get("occupation").value;
    dto.internDetails.internshipTasks = info.get("tasks").value;
    dto.internDetails.internshipExpectations = info.get("expectations").value;
    dto.internDetails.internshipProposals = info.get("proposals").value;

    const questionsForm = this.formContainer.get("questionsForm") as FormGroup;
    dto.internDetails.otherQuestions = questionsForm.get("otherQuestions").value;
    dto.internDetails.experience = questionsForm.get("experience").value;
    dto.internDetails.whyAnanau = questionsForm.get("whyAnanau").value;
    dto.internDetails.whereFirstHeard = questionsForm.get("firstHeard").value;

    if (this.role === FormRole.STUDENT) {
      let studentDto = dto as RegistrationStudentDTO;

      studentDto.userDetails.schoolEmail = general.get("schoolEmail").value;


      studentDto.internDetails.startOfPeriodOfAccomodation = new Date(dates.get("leaveStartDate").value);
      studentDto.internDetails.endOfPeriodOfAccomodation = new Date(dates.get("leaveEndDate").value);
      studentDto.internDetails.educationDegree = info.get("degree").value;
      studentDto.internDetails.internshipContext = info.get("internshipContext").value;
      

      this.registrationService
        .postStudentRegistration$(studentDto, submit)
        .subscribe(
          () =>
            this.toastr.showSuccess(
              submit
                ? this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SUBMIT_SUCCESS"
                  )
                : this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SAVE_SUCCESS"
                  ),
              this.translate.instant("REGISTRATION.GENERAL.TOASTS.SUCCESS")
            ),
          (error) => {
            this.toastr.showError(
              submit
                ? this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SUBMIT_ERROR"
                  )
                : this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SAVE_ERROR"
                  ),
              this.translate.instant("REGISTRATION.GENERAL.TOASTS.ERROR")
            );
            console.error(error);
          },
          () => {
            this.saving = false;
            this.sending = false;
            this.cdRef.detectChanges();
          }
        );
    } else {
      this.registrationService
        .postVolunteerRegistration$(dto, submit)
        .subscribe(
          () =>
            this.toastr.showSuccess(
              submit
                ? this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SUBMIT_SUCCESS"
                  )
                : this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SAVE_SUCCESS"
                  ),
              this.translate.instant("REGISTRATION.GENERAL.TOASTS.SUCCESS")
            ),
          (error) => {
            this.toastr.showError(
              submit
                ? this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SUBMIT_ERROR"
                  )
                : this.translate.instant(
                    "REGISTRATION.GENERAL.TOASTS.TEXT_SAVE_ERROR"
                  ),
              this.translate.instant("REGISTRATION.GENERAL.TOASTS.ERROR")
            );
            console.error(error);
          },
          () => {
            this.saving = false;
            this.sending = false;
            this.cdRef.detectChanges();
          }
        );
    }
  }

  static getErrorMessage(
    errors: ValidationErrors,
    translate: TranslateService
  ): string {
    if (errors.required) {
      return translate.instant("REGISTRATION.GENERAL.ERRORS.REQUIRED");
    } else if (errors.email) {
      return translate.instant("REGISTRATION.GENERAL.ERRORS.EMAIL");
    } else if (errors.minlength) {
      return translate.instant("REGISTRATION.GENERAL.ERRORS.CHARACTERS", {
        value: errors.minlength.requiredLength,
      });
    } else {
      return translate.instant("REGISTRATION.GENERAL.ERRORS.INCORRECT");
    }
  }

  /**
   * Returns for a given AbstractControl the amount of FormControls, the amount of FormControls labelled as required and the amount of FormControls labelled as required and valid.
   *
   * @remarks
   * This method is loosely based on the discussion found {@link https://stackoverflow.com/questions/49778432/reactive-forms-count-all-formcontrols-in-a-formgroup here}.
   *
   * @param control - The `AbstractControl` to be processed
   *
   * @returns An object containing three numbers:
   * 1) `all`: The amount of all objects of type `FormControl` present in the given `AbstractControl`
   * 2) `required`: The amount of all objects of type `FormControl`, containing a `required` validator, present in the given `AbstractControl`
   * 3) `requiredAndValid`: The amount of all objects of type `FormControl`, containing a `required` validator and labelled as `valid`, present in the given `AbstractControl`
   */
  static countFields(
    control: AbstractControl
  ): { all: number; required: number; requiredAndValid: number } {
    if (control instanceof FormControl) {
      let isRequired = ContainerComponent.isFieldRequired(control);
      return {
        all: 1,
        required: isRequired ? 1 : 0,
        requiredAndValid: isRequired && control.valid ? 1 : 0,
      };
    }

    if (control instanceof FormArray) {
      return control.controls.reduce(
        (valuesObject, currentControl) => {
          const intermediateResult = ContainerComponent.countFields(
            currentControl
          );
          return {
            all: valuesObject.all + intermediateResult.all,
            required: valuesObject.required + intermediateResult.required,
            requiredAndValid:
              valuesObject.requiredAndValid +
              intermediateResult.requiredAndValid,
          };
        },
        { all: 0, required: 0, requiredAndValid: 0 }
      );
    }

    if (control instanceof FormGroup) {
      return Object.keys(control.controls)
        .map((key) => control.controls[key])
        .reduce(
          (valuesObject, currentControl) => {
            const intermediateResult = ContainerComponent.countFields(
              currentControl
            );
            return {
              all: valuesObject.all + intermediateResult.all,
              required: valuesObject.required + intermediateResult.required,
              requiredAndValid:
                valuesObject.requiredAndValid +
                intermediateResult.requiredAndValid,
            };
          },
          { all: 0, required: 0, requiredAndValid: 0 }
        );
    }
  }

  /**
   * Returns a boolean indicating whether or not the given FormControl is labelled as required.
   *
   * @remarks
   * This method is loosely based on the discussion found {@link https://stackoverflow.com/questions/39819123/angular2-find-out-if-formcontrol-has-required-validator here}.
   *
   * @param control - The `FormControl` to be processed
   *
   * @returns A boolean where `true` indicates a `required` validator is present and `false` indicates no `required` validator is present
   */
  static isFieldRequired(control: FormControl): boolean {
    let isRequired = false;
    if (control.validator) {
      const validator = control.validator({} as FormControl);
      if (validator && validator.required) {
        isRequired = true;
      }
    }
    return isRequired;
  }

  /**
   * Navigates to the tab with the given tabId.
   * @param tabId The tabId to navigate to.
   */
  onNavigateToTab(tabId: string) {
    this.activeTabId = tabId;
  }
}
