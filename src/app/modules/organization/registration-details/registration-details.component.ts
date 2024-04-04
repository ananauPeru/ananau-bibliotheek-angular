import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as FileSaver from "file-saver";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { BlobNamePrefix } from "../_models/blob-name-prefix";
import { RegistrationRole } from "../_models/registration-role";
import { RegistrationModel } from "../_models/registration.model";
import { RegistrationService } from "../_services/registration/registration.service";
import { UserStorageService } from "../_services/registration/user-storage.service";
import { M } from "@angular/cdk/keycodes";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-registration-details",
  templateUrl: "./registration-details.component.html",
  styleUrls: ["./registration-details.component.scss"],
})
export class RegistrationDetailsComponent implements OnInit {

  private _registration: BehaviorSubject<RegistrationModel> =
    new BehaviorSubject(null);
  private _userId: number;
  public role: RegistrationRole;
  public registration$: Observable<RegistrationModel> =
    this._registration.asObservable();
  public errorMessage: string;
  public confirming: boolean;
  public deleting: boolean;
  public internationalPassportFiles = new Array<File>();
  public goodConductCertificateFiles = new Array<File>();
  public diplomaFiles = new Array<File>();
  public passportPhotoFiles = new Array<File>();

  public isEditingStartDateInternship = false;
  public isEditingEndDateInternship = false;
  public isEditingStartDateStay = false;
  public isEditingEndDateStay = false;

  public isEditingStartDateOnline = false;
  public isEditingEndDateOnline = false;
  public isEditingStartDateOffline = false;
  public isEditingEndDateOffline = false;


  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    leaveStartDate: new FormControl(),
    leaveEndDate: new FormControl(),
  });

  spanishDateForm = new FormGroup({
    onlineStartDate: new FormControl(),
    onlineEndDate: new FormControl(),
    offlineStartDate: new FormControl(),
    offlineEndDate: new FormControl(),
  });

  @ViewChild('confirmationModal') confirmationModal: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrUtil,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private userStorageService: UserStorageService,
    private modalService: NgbModal
  ) {
    this.route.data.subscribe(
      (data) =>
        (this.role = data["role"] ? data["role"] : RegistrationRole.VOLUNTEER)
    );
    this.route.params.subscribe((params) => (this._userId = params["id"]));

    this.fetchRegistrationData();
  }

  private fetchRegistrationData() {
    if (this.role === RegistrationRole.STUDENT) {
      this.registrationService.getStudentRegistrationById$(this._userId).subscribe(
        (registration) => this._registration.next(registration),
        (err) => {
          console.error(err);
          this.errorMessage = err;
        }
      );
    } else {
      this.registrationService.getVolunteerRegistrationById$(this._userId).subscribe(
        (registration) => this._registration.next(registration),
        (err) => {
          console.error(err);
          this.errorMessage = err;
        }
      );
    }
  }

  ngOnInit(): void {
    this.userStorageService.getNewFile$.subscribe((file) => {
      if (file.name.startsWith(BlobNamePrefix.InternationalPassport)) {
        this.internationalPassportFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.GoodConductCertificate)) {
        this.goodConductCertificateFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.Diploma)) {
        this.diplomaFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.PassportPhoto)) {
        this.passportPhotoFiles.push(file);
      }
      this.cdRef.detectChanges();
    });

    this.userStorageService.fetchFiles$(this._userId);
  }

  toggleEditingStartDateInternship(): void {
    this.isEditingStartDateInternship = !this.isEditingStartDateInternship;

    if(!this.isEditingStartDateInternship) {
      this.dateForm.patchValue({ startDate: null });
    }
  }

  toggleEditingEndDateInternship(): void {
    this.isEditingEndDateInternship = !this.isEditingEndDateInternship;

    if(!this.isEditingEndDateInternship) {
      this.dateForm.patchValue({ endDate: null });
    }
  }

  toggleEditingStartDateStay(): void {
    this.isEditingStartDateStay = !this.isEditingStartDateStay;

    if(!this.isEditingStartDateStay) {
      this.dateForm.patchValue({ leaveStartDate: null });
    }
  }

  toggleEditingEndDateStay(): void {
    this.isEditingEndDateStay = !this.isEditingEndDateStay;

    if(!this.isEditingEndDateStay) {
      this.dateForm.patchValue({ leaveEndDate: null });
    }
  }

  toggleSpanishDateLock(isOnline: boolean): void {
    const isLocked = isOnline ? this._registration.value.isOnlineDateLocked : this._registration.value.isOfflineDateLocked;
    this.registrationService.setSpanishDateLocked$(this._userId, isOnline, !isLocked).subscribe(
      () => {
        this.fetchRegistrationData();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  toggleEditingStartDateOnline(): void {
    this.isEditingStartDateOnline = !this.isEditingStartDateOnline;

    if(!this.isEditingStartDateOnline) {
      this.dateForm.patchValue({ onlineStartDate: null });
    }
  }

  toggleEditingEndDateOnline(): void {
    this.isEditingEndDateOnline = !this.isEditingEndDateOnline;

    if(!this.isEditingEndDateOnline) {
      this.dateForm.patchValue({ onlineEndDate: null });
    }
  }

  toggleEditingStartDateOffline(): void {
    this.isEditingStartDateOffline = !this.isEditingStartDateOffline;

    if(!this.isEditingStartDateOffline) {
      this.dateForm.patchValue({ offlineStartDate: null });
    }
  }

  toggleEditingEndDateOffline(): void {
    this.isEditingEndDateOffline = !this.isEditingEndDateOffline;

    if(!this.isEditingEndDateOffline) {
      this.dateForm.patchValue({ offlineEndDate: null });
    }
  }

  openConfirmationModal() {
    this.modalService.open(this.confirmationModal, { centered: true });
  }

  private setEditingFalse() : void {
    this.isEditingStartDateInternship = false;
    this.isEditingEndDateInternship = false;
    this.isEditingStartDateStay = false;
    this.isEditingEndDateStay = false;
  }

  private setSpanishEditingFalse() : void {
    this.isEditingStartDateOnline = false;
    this.isEditingEndDateOnline = false;
    this.isEditingStartDateOffline = false;
    this.isEditingEndDateOffline = false;
  }

  isDateSaveButtonDisabled(): boolean {
    const formValues = Object.values(this.dateForm.value);
    return formValues.every(value => value === null);
  }

  isSpanishDateSaveButtonDisabled() {
    const formValues = Object.values(this.spanishDateForm.value);
    return formValues.every(value => value === null);
  }

  // Fix the errors in registration-detauls.component.html

 

  
  confirm(confirm: boolean) {
    this.confirming = true;
    this.registrationService
      .confirmRegistration$(this._userId, confirm)
      .subscribe(
        () => {
          let updatedRegistration = this._registration.value;
          updatedRegistration.confirmed = confirm;
          this._registration.next(updatedRegistration);
          this.toastr.showSuccess(
            this.translate.instant(
              confirm
                ? "REGISTRATIONS.TOASTS.CONFIRM_SUCCESS"
                : "REGISTRATIONS.TOASTS.DISCONFIRM_SUCCESS"
            ),
            this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS")
          );
        },
        (err) => {
          console.error(err);
          this.toastr.showError(
            this.translate.instant(
              confirm
                ? "REGISTRATIONS.TOASTS.CONFIRM_ERROR"
                : "REGISTRATIONS.TOASTS.DISCONFIRM_ERROR"
            ),
            this.translate.instant("REGISTRATIONS.TOASTS.ERROR")
          );
        },
        () => {
          this.confirming = false;
          this.cdRef.detectChanges();
        }
      );
  }

  delete() {
    this.deleting = true;
    this.registrationService.deleteRegistration$(this._userId).subscribe(
      () => {
        this.toastr.showSuccess(
          this.translate.instant("REGISTRATIONS.TOASTS.DELETE_SUCCESS"),
          this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS")
        );
        this.router.navigate(["/organization/registrations"]);
      },
      (err) => {
        console.error(err);
        this.toastr.showError(
          this.translate.instant("REGISTRATIONS.TOASTS.DELETE_ERROR"),
          this.translate.instant("REGISTRATIONS.TOASTS.ERROR")
        );
      },
      () => {
        this.confirming = false;
        this.cdRef.detectChanges();
      }
    );
  }

  downloadFile(file: File, firstName: string, lastName: string, index: number) {
    let fileName = `${lastName} ${firstName}`;

    if (index > 0) fileName = fileName + ` (${index + 1})`;

    if (file.name.startsWith(BlobNamePrefix.InternationalPassport)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.INTERNATIONAL_PASSPORT"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else if (file.name.startsWith(BlobNamePrefix.GoodConductCertificate)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.GOOD_CONDUCT_CERTIFICATE"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else if (file.name.startsWith(BlobNamePrefix.Diploma)) {
      fileName =
        this.translate.instant("REGISTRATIONS.DETAILS.FILE_NAMES.DIPLOMA") +
        ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else if (file.name.startsWith(BlobNamePrefix.PassportPhoto)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.PASSPORT_PHOTO"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else {
      this.toastr.showError(
        this.translate.instant("REGISTRATIONS.TOASTS.DELETE_ERROR"),
        this.translate.instant("REGISTRATIONS.TOASTS.DOWNLOAD_ERROR")
      );
    }
  }

  onSubmitDateChange() {
    this.registrationService.updateRegistrationDates$(this._userId, this.dateForm.value).subscribe(
      () => {
        this.setEditingFalse();
        this.fetchRegistrationData();
        this.toastr.showSuccess(this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_SUCCESS"), this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS"));
      },
      (err) => {
        console.error(err);
        this.toastr.showError(this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_ERROR"), this.translate.instant("REGISTRATIONS.TOASTS.ERROR"));
      },
      () => {
        this.cdRef.detectChanges();
      }
    )
  }

  onSubmitSpanishDateChange() {
    this.registrationService.updateSpanishDates$(this._userId, this.spanishDateForm.value).subscribe(
      () => {
        this.setSpanishEditingFalse();
        this.fetchRegistrationData();
        this.toastr.showSuccess(this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_SUCCESS"), this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS"));
      },
      (err) => {
        console.error(err);
        this.toastr.showError(this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_ERROR"), this.translate.instant("REGISTRATIONS.TOASTS.ERROR"));
      },
      () => {
        this.cdRef.detectChanges();
      }
    )
  }
}
