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
import { RegistrationDTO } from "../_dto/registration-dto";
import { RegistrationStudentDTO } from "../_dto/registration-student-dto";

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

    let dto = new RegistrationDTO();

    const personalForm = this.formContainer.get("personalForm") as FormGroup;

    const general = personalForm.get("general") as FormGroup;
    dto.firstName = general.get("firstName").value;
    dto.lastName = general.get("lastName").value;
    dto.middleName = general.get("middleName").value;
    dto.phone = general.get("phone").value;
    dto.dateOfBirth = new Date(general.get("dateOfBirth").value);
    dto.birthplace = general.get("birthplace").value;
    dto.nationality = general.get("nationality").value;
    dto.passportNumber = general.get("passportNumber").value;

    const address = personalForm.get("address") as FormGroup;
    dto.street = address.get("street").value;
    dto.houseNumber = address.get("houseNumber").value;
    dto.mailbox = address.get("mailbox").value;
    dto.postalCode = address.get("postalCode").value;
    dto.township = address.get("township").value;
    dto.country = address.get("country").value;

    const contactPerson = personalForm.get("contactPerson") as FormGroup;
    dto.firstNameContact = contactPerson.get("firstName").value;
    dto.middleNameContact = contactPerson.get("middleName").value;
    dto.lastNameContact = contactPerson.get("lastName").value;
    dto.relation = contactPerson.get("relation").value;
    dto.emailContact = contactPerson.get("email").value;
    dto.phoneContact = contactPerson.get("phone").value;

    const medical = personalForm.get("medical") as FormGroup;
    dto.allergies = medical.get("allergies").value;
    dto.medicalConditions = medical.get("medicalConditions").value;

    const organizationalForm = this.formContainer.get(
      "organizationalForm"
    ) as FormGroup;

    const dates = organizationalForm.get("dates") as FormGroup;
    dto.internshipOnline = Boolean(dates.get("internshipOnline").value);
    dto.startDate = new Date(dates.get("startDate").value);
    dto.endDate = new Date(dates.get("endDate").value);

    const flightInformation = organizationalForm.get("flightInformation") as FormGroup;
    dto.flightNumber = flightInformation.get("flightNumber").value;  
    dto.flightDateArrival = new Date(flightInformation.get("flightDateArrival").value);

    const spanish = organizationalForm.get("spanish") as FormGroup;
    dto.level = spanish.get("level").value;
    dto.weeksOnline = Number(spanish.get("weeksOnline").value);
    dto.weeks = Number(spanish.get("weeks").value);

    const payments = organizationalForm.get("payments") as FormGroup;
    dto.paymentDescription = payments.get("paymentDescription").value;

    const motivationLetter = organizationalForm.get("motivationLetter") as FormGroup;
    dto.motivationLetter = motivationLetter.get("motivationLetter").value;

    const info = organizationalForm.get("info") as FormGroup;
    dto.occupation = info.get("occupation").value;
    dto.tasks = info.get("tasks").value;
    dto.expectations = info.get("expectations").value;
    dto.proposals = info.get("proposals").value;

    const questionsForm = this.formContainer.get("questionsForm") as FormGroup;
    dto.otherQuestions = questionsForm.get("otherQuestions").value;
    dto.experience = questionsForm.get("experience").value;
    dto.whyAnanau = questionsForm.get("whyAnanau").value;
    dto.firstHeard = questionsForm.get("firstHeard").value;

    if (this.role === FormRole.STUDENT) {
      let studentDto = dto as RegistrationStudentDTO;

      studentDto.schoolEmail = general.get("schoolEmail").value;
      studentDto.leaveStartDate = new Date(dates.get("leaveStartDate").value);
      studentDto.leaveEndDate = new Date(dates.get("leaveEndDate").value);
      studentDto.degree = info.get("degree").value;
      studentDto.internshipContext = info.get("internshipContext").value;

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
}
