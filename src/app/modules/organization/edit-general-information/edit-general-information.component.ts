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

  initForm() {
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

  private getAllVaccinations() {
    this.vaccinations$ =
      this.generalInformationService.getAllVaccinationInformation$();
  }

  private getAllHolidays() {
    this.holidays$ = this.generalInformationService.getAllHolidayInformation$();
  }

  getErrorMessage(errors: any) {
    if (errors.required) {
      return "This field is required";
    }
  }

  addVaccination() {
    if (this.vaccinationForm.valid) {
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
              this.translate.instant(
                "GENERAL_INFORMATION.TOASTS.VACCINATION.CREATE_SUCCESS"
              ),
              this.translate.instant("GENERAL_INFORMATION.TOASTS.SUCCESS")
            );
          },
          (error) => {
            console.error("Error adding vaccination:", error);
            this.toastr.showError(
              this.translate.instant(
                "GENERAL_INFORMATION.TOASTS.VACCINATION.CREATE_ERROR"
              ),
              this.translate.instant("GENERAL_INFORMATION.TOASTS.ERROR")
            );
          }
        );
    }
  }

  addHoliday() {
    if (!this.holidayForm.valid) return;

    const holiday: HolidayModel = this.holidayForm.value;

    this.generalInformationService.addHolidayInformation$(holiday).subscribe(
      (addedHoliday) => {
        this.getAllHolidays();
        this.holidayForm.reset();
        this.cdr.detectChanges();

        this.toastr.showSuccess(
          this.translate.instant(
            "GENERAL_INFORMATION.TOASTS.HOLIDAY.CREATE_SUCCESS"
          ),
          this.translate.instant("GENERAL_INFORMATION.TOASTS.SUCCESS")
        );
      },
      (error) => {
        console.error("Error adding holiday:", error);
        this.toastr.showError(
          this.translate.instant(
            "GENERAL_INFORMATION.TOASTS.HOLIDAY.CREATE_ERROR"
          ),
          this.translate.instant("GENERAL_INFORMATION.TOASTS.ERROR")
        );
      }
    );
  }

  saveVisaInformation() {
    if (!this.visaInformationForm.valid) return;

    const visaData = this.visaInformationForm.value.visaInformation;
    this.generalInformationService.postVisaInformation$(visaData).subscribe(
      () => {
        this.getVisaInformation();
        this.toastr.showSuccess(this.translate.instant("GENERAL_INFORMATION.TOASTS.VISA.UPDATE_SUCCESS"), this.translate.instant("GENERAL_INFORMATION.TOASTS.SUCCESS"));

      },
      (error) => {
        console.error("Error updating visa information:", error);
        this.toastr.showSuccess(this.translate.instant("GENERAL_INFORMATION.TOASTS.VISA.UPDATE_ERROR"), this.translate.instant("GENERAL_INFORMATION.TOASTS.ERROR"));
      }
    );
  }

  removeVaccination(vaccination: VaccinationModel) {
    this.generalInformationService
      .deleteVaccinationInformation$(vaccination.id)
      .subscribe(
        () => {
          this.getAllVaccinations();
          this.cdr.detectChanges();
          this.toastr.showSuccess(
            this.translate.instant(
              "GENERAL_INFORMATION.TOASTS.VACCINATION.DELETE_SUCCESS"
            ),
            this.translate.instant("GENERAL_INFORMATION.TOASTS.SUCCESS")
          );
        },
        (error) => {
          console.error("Error removing vaccination:", error);
          this.toastr.showError(
            this.translate.instant(
              "GENERAL_INFORMATION.TOASTS.VACCINATION.DELETE_ERROR"
            ),
            this.translate.instant("GENERAL_INFORMATION.TOASTS.ERROR")
          );
        }
      );
  }

  removeHoliday(holiday: HolidayModel) {
    this.generalInformationService
      .deleteVaccinationInformation$(holiday.id)
      .subscribe(
        () => {
          this.getAllHolidays();
          this.cdr.detectChanges();

          this.toastr.showSuccess(
            this.translate.instant(
              "GENERAL_INFORMATION.TOASTS.HOLIDAY.DELETE_SUCCESS"
            ),
            this.translate.instant("GENERAL_INFORMATION.TOASTS.SUCCESS")
          );
        },
        (error) => {
          console.error("Error removing holiday:", error);
          this.toastr.showError(
            this.translate.instant(
              "GENERAL_INFORMATION.TOASTS.HOLIDAY.DELETE_ERROR"
            ),
            this.translate.instant("GENERAL_INFORMATION.TOASTS.ERROR")
          );
        }
      );
  }


  getTranslatedText(input: string): string {
    return this.translate.instant(input);
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height =
      (newHeight > initialHeight ? newHeight : initialHeight) + "px";
  }
}