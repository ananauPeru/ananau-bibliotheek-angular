import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { GeneralInformationService } from "../../registration-form/_services/general-information/general-information.service";
import { Observable } from "rxjs";
import { VaccinationModel } from "../../registration-form/_models/vaccination.model";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { TranslateService } from "@ngx-translate/core";
import { HolidayModel } from "../../registration-form/_models/holiday.model";

@Component({
  selector: "app-edit-general-information",
  templateUrl: "./edit-general-information.component.html",
  styleUrls: ["./edit-general-information.component.scss"],
})
export class EditGeneralInformationComponent implements OnInit {
  visaInformation$: Observable<string>;
  visaInformationForm: FormGroup;
  vaccinations$: Observable<VaccinationModel[]>;
  vaccinationForm: FormGroup;
  holidays$: Observable<HolidayModel[]>;
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
    this.getVisaInformation();
    this.getAllVaccinations();
    this.getAllHolidays();
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
   * Gets the visa information, and loads it to the UI.
   */
  private getVisaInformation() {
    this.visaInformation$ =
      this.generalInformationService.getVisaInformation$();
    this.visaInformation$.subscribe(
      (visaInfo) => {
        this.visaInformationForm.patchValue({ visaInformation: visaInfo });
      },
      (error) => {
        console.error("Error retrieving visa information:", error);
      }
    );
  }

  /**
   * Gets the vaccinations, and loads them to the UI.
   */
  private getAllVaccinations() {
    this.vaccinations$ =
      this.generalInformationService.getAllVaccinationInformation$();
  }

  /**
   * Gets the holidays, and loads them to the UI.
   */
  private getAllHolidays() {
    this.holidays$ = this.generalInformationService.getAllHolidayInformation$();
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

    this.generalInformationService
      .addVaccinationInformation$(vaccination)
      .subscribe(
        (addedVaccination) => {
          this.getAllVaccinations();
          this.vaccinationForm.reset();
          this.cdr.detectChanges();

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
   * Adds a new holiday to the list.
   */
  addHoliday() {
    if (!this.holidayForm.valid) return;

    const holiday: HolidayModel = this.holidayForm.value;

    this.generalInformationService.addHolidayInformation$(holiday).subscribe(
      (addedHoliday) => {
        this.getAllHolidays();
        this.holidayForm.reset();
        this.cdr.detectChanges();

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
   * Saves the new visa information.
   */
  saveVisaInformation() {
    if (!this.visaInformationForm.valid) return;

    const visaData = this.visaInformationForm.value.visaInformation;
    this.generalInformationService.postVisaInformation$(visaData).subscribe(
      () => {
        this.getVisaInformation();
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
   * Removes the given vaccination from the list.
   * @param vaccination The vaccination to be removed.
   */
  removeVaccination(vaccination: VaccinationModel) {
    this.generalInformationService
      .deleteVaccinationInformation$(vaccination.id)
      .subscribe(
        () => {
          this.getAllVaccinations();
          this.cdr.detectChanges();

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
   * Removes the given holiday from the list.
   * @param holiday The holiday to be removed.
   */
  removeHoliday(holiday: HolidayModel) {
    this.generalInformationService
      .deleteVaccinationInformation$(holiday.id)
      .subscribe(
        () => {
          this.getAllHolidays();
          this.cdr.detectChanges();

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
