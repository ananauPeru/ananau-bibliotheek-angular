import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { GeneralInformationService } from "../_services/general-information/general-information.service";
import { Observable } from "rxjs";
import { VaccinationModel } from "../_models/vaccination.model";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { TranslateService } from "@ngx-translate/core";
import { HolidayModel } from "../_models/holiday.model";

@Component({
  selector: "app-edit-general-information",
  templateUrl: "./edit-general-information.component.html",
  styleUrls: ["./edit-general-information.component.scss"],
})
export class EditGeneralInformationComponent implements OnInit {
  visaInformation$: Observable<string>;
  vaccinations$: Observable<VaccinationModel[]>;
  holidays$: Observable<HolidayModel[]>;

  visaInformationForm: FormGroup;
  vaccinationForm: FormGroup;
  holidayForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private generalInformationService: GeneralInformationService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrUtil,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchVaccinations();
    this.fetchHolidays();
    this.getVisaInformation();
  }

  /**
   * Initiates the forms, and adds validators to the fields.
   */
  private initForm() {
    this.visaInformationForm = this.formBuilder.group({
      visaInformation: ["", Validators.required],
    });

    this.vaccinationForm = new FormGroup({
      name: new FormControl("", Validators.required),
      required: new FormControl(false),
    });

    this.holidayForm = new FormGroup({
      name: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    });
  }

  /**
   * Fetches all vaccinations from the server.
   */
  private fetchVaccinations() {
    this.vaccinations$ = this.generalInformationService.getVaccinations();
  }

  /**
   * Fetches all holidays from the server.
   */
  private fetchHolidays() {
    this.holidays$ = this.generalInformationService.getHolidays();
  }

  /**
   * Fetches the visa information from the server.
   */
  private getVisaInformation() {
    this.visaInformation$ = this.generalInformationService.getVisaInformation();
  }


  /**
   * Gets an error message for a specific error.
   * @param errors The error that requests an error message.
   * @returns The error message of the given error.
   */
  getErrorMessage(errors: any) {
    if (errors.required) {
      return "This field is required";
    }
  }

  /**
   * Adds a new vaccination to the list.
   */
  addVaccination() {
    if (!this.vaccinationForm.valid) return;

    const vaccination: VaccinationModel = this.vaccinationForm.value;
    vaccination.required = vaccination.required ?? false; //when unchecking the checkbox, it sets it to null instead of false. Therefore we override it here

    this.generalInformationService.createVaccination(vaccination)
      .subscribe(
        (addedVaccination) => {
          this.generalInformationService.refreshVaccinationInformation();
          this.vaccinationForm.reset();

          this.toastr.showSuccess(
            this.t_translate("VACCINATION.CREATE_SUCCESS"),
            this.t_translate("SUCCESS")
          );
        },
        (error) => {
          console.error("Error adding vaccination:", error);

          this.toastr.showError(
            this.t_translate("VACCINATION.CREATE_ERROR"),
            this.t_translate("ERROR")
          );
        }
      );
  }

  /**
   * Removes the given vaccination from the list.
   * @param vaccination The vaccination to be removed.
   */
  removeVaccination(vaccination: VaccinationModel) {
    this.generalInformationService
      .removeVaccination(vaccination.id)
      .subscribe(
        () => {
          this.generalInformationService.refreshVaccinationInformation();
          this.toastr.showSuccess(
            this.t_translate("VACCINATION.DELETE_SUCCESS"),
            this.t_translate("SUCCESS")
          );
        },
        (error) => {
          console.error("Error removing vaccination:", error);
          this.toastr.showError(
            this.t_translate("VACCINATION.DELETE_ERROR"),
            this.t_translate("ERROR")
          );
        }
      );
  }

  /**
   * Adds a new holiday to the list.
   */
  addHoliday() {
    if (!this.holidayForm.valid) return;

    const holiday: HolidayModel = this.holidayForm.value;

    this.generalInformationService.createHoliday(holiday).subscribe(
      (addedHoliday) => {
        this.generalInformationService.refreshHolidayInformation();
        this.holidayForm.reset();

        this.toastr.showSuccess(
          this.t_translate("HOLIDAY.CREATE_SUCCESS"),
          this.t_translate("SUCCESS")
        );
      },
      (error) => {
        console.error("Error adding holiday:", error);
        this.toastr.showError(
          this.t_translate("HOLIDAY.CREATE_ERROR"),
          this.t_translate("ERROR")
        );
      }
    );
  }

  /**
   * Removes the given holiday from the list.
   * @param holiday The holiday to be removed.
   */
  removeHoliday(holiday: HolidayModel) {
    this.generalInformationService
      .removeHoliday(holiday.id)
      .subscribe(
        () => {
          this.generalInformationService.refreshHolidayInformation();

          this.toastr.showSuccess(
            this.t_translate("HOLIDAY.DELETE_SUCCESS"),
            this.t_translate("SUCCESS")
          );
        },
        (error) => {
          console.error("Error removing holiday:", error);
          this.toastr.showError(
            this.t_translate("HOLIDAY.DELETE_ERROR"),
            this.t_translate("ERROR")
          );
        }
      );
  }

  removeHolidays() {
    this.generalInformationService
      .removeHolidays()
      .subscribe(
        () => {
          this.generalInformationService.refreshHolidayInformation();

          this.toastr.showSuccess(
            this.t_translate("HOLIDAY.DELETE_ALL_SUCCESS"),
            this.t_translate("SUCCESS")
          );
        },
        (error) => {
          console.error("Error removing holidays:", error);
          this.toastr.showError(
            this.t_translate("HOLIDAY.DELETE_ERROR"),
            this.t_translate("ERROR")
          );
        }
      );
  }

  /**
   * Saves the new visa information.
   */
  saveVisaInformation() {
    if (!this.visaInformationForm.valid) return;

    const visaData = this.visaInformationForm.value.visaInformation;
    this.generalInformationService.updateVisaInformation(visaData).subscribe(
      () => {
        this.generalInformationService.refreshVisaInformation();

        this.toastr.showSuccess(
          this.t_translate("VISA.UPDATE_SUCCESS"),
          this.t_translate("SUCCESS")
        );
      },
      (error) => {
        console.error("Error updating visa information:", error);
        this.toastr.showError(
          this.t_translate("VISA.UPDATE_ERROR"),
          this.t_translate("ERROR")
        );
      }
    );
  }

  

  /**
   * Translates the identifier.
   * @param identifier The identifier for the translated text.
   * @returns The translated text.
   */
  getTranslatedText(identifier: string): string {
    return this.translate.instant(identifier);
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height =
      (newHeight > initialHeight ? newHeight : initialHeight) + "px";
  }

  /**
   * Translates the identifier without the toastr prefix.
   * @param identifier The identifier without the toastr prefix for the translated text.
   * @returns The translated text.
   */
  private t_translate(identifier: string): string {
    return this.translate.instant(`GENERAL_INFORMATION.TOASTS.${identifier}`);
  }
}
