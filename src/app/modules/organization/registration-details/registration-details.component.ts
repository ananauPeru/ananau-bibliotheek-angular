import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as QRCode from "qrcode";
import { QRCodeData } from "../_models/qr-code-data";

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
  public paymentApartmentFiles = new Array<File>();
  public paymentGuaranteeFiles = new Array<File>();
  public paymentSpanishFiles = new Array<File>();

  public isEditingStartDateInternship = false;
  public isEditingEndDateInternship = false;
  public isEditingStartDateStay = false;
  public isEditingEndDateStay = false;

  dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    leaveStartDate: new FormControl(),
    leaveEndDate: new FormControl(),
  });

  @ViewChild("confirmationModal") confirmationModal: TemplateRef<any>;

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
      this.registrationService
        .getStudentRegistrationById$(this._userId)
        .subscribe(
          (registration) => this._registration.next(registration),
          (err) => {
            console.error(err);
            this.errorMessage = err;
          }
        );
    } else {
      this.registrationService
        .getVolunteerRegistrationById$(this._userId)
        .subscribe(
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
      if (file.name.startsWith(BlobNamePrefix.PaymentApartment)) {
        this.paymentApartmentFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.PaymentGuarantee)) {
        this.paymentGuaranteeFiles.push(file);
      }
      if (file.name.startsWith(BlobNamePrefix.PaymentSpanish)) {
        this.paymentSpanishFiles.push(file);
      }
      this.cdRef.detectChanges();
    });

    this.userStorageService.fetchFiles$(this._userId);
  }

  toggleEditingStartDateInternship(): void {
    this.isEditingStartDateInternship = !this.isEditingStartDateInternship;

    if (!this.isEditingStartDateInternship) {
      this.dateForm.patchValue({ startDate: null });
    }
  }

  toggleEditingEndDateInternship(): void {
    this.isEditingEndDateInternship = !this.isEditingEndDateInternship;

    if (!this.isEditingEndDateInternship) {
      this.dateForm.patchValue({ endDate: null });
    }
  }

  toggleEditingStartDateStay(): void {
    this.isEditingStartDateStay = !this.isEditingStartDateStay;

    if (!this.isEditingStartDateStay) {
      this.dateForm.patchValue({ leaveStartDate: null });
    }
  }

  toggleEditingEndDateStay(): void {
    this.isEditingEndDateStay = !this.isEditingEndDateStay;

    if (!this.isEditingEndDateStay) {
      this.dateForm.patchValue({ leaveEndDate: null });
    }
  }

  openConfirmationModal() {
    this.modalService.open(this.confirmationModal, { centered: true });
  }

  private setEditingFalse(): void {
    this.isEditingStartDateInternship = false;
    this.isEditingEndDateInternship = false;
    this.isEditingStartDateStay = false;
    this.isEditingEndDateStay = false;
  }

  isDateSaveButtonDisabled(): boolean {
    const formValues = Object.values(this.dateForm.value);
    return formValues.every((value) => value === null);
  }

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
    } else if (file.name.startsWith(BlobNamePrefix.PaymentApartment)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.PAYMENT_APARTMENT"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else if (file.name.startsWith(BlobNamePrefix.PaymentGuarantee)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.PAYMENT_GUARANTEE"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } 
    else if (file.name.startsWith(BlobNamePrefix.PaymentSpanish)) {
      fileName =
        this.translate.instant(
          "REGISTRATIONS.DETAILS.FILE_NAMES.PAYMENT_SPANISH"
        ) + ` - ${fileName}`;
      FileSaver.saveAs(file, fileName);
    } else {
      this.toastr.showError(
        this.translate.instant("REGISTRATIONS.TOASTS.DELETE_ERROR"),
        this.translate.instant("REGISTRATIONS.TOASTS.DOWNLOAD_ERROR")
      );
    }
  }

  async downloadQRCode(): Promise<void> {
    const data: QRCodeData = {
      id: this._userId,
      firstName: `${this._registration.value.firstName}`,
      lastName: `${this._registration.value.lastName}`,
      dateOfBirth: `${this._registration.value.dateOfBirth}`
    };
  
    const qrCodeData = JSON.stringify(data);
  
    const qrCodeOptions = {
      errorCorrectionLevel: "M",
      type: "png",
      width: 256,
      color: {
        dark: "#008037",
        light: "#F7EBDA",
      }
    };
  
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, qrCodeData, qrCodeOptions);
  
      // Load the image
      const image = await this.loadImage('../../../../../assets/images/ananau-logo-color.png');
  
      // Calculate the position to place the image at the center
      const imageSize = 128; // Adjust the size of the image as needed
      const imageX = (canvas.width - imageSize) / 2;
      const imageY = (canvas.height - imageSize) / 2;
  
      // Draw the image on the QR code canvas
      const context = canvas.getContext('2d');
      context.drawImage(image, imageX, imageY, imageSize, imageSize);
  
      // Convert the canvas to a data URL
      const qrCodeDataUrl = canvas.toDataURL();
  
      // Convert the data URL to a Blob and save it
      const blob = this.dataURLtoBlob(qrCodeDataUrl);
      saveAs(blob, `${data.firstName}_${data.lastName}_qr_code.png`);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
  
  private async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  }

  private dataURLtoBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  onSubmitDateChange() {
    this.registrationService
      .updateRegistrationDates$(this._userId, this.dateForm.value)
      .subscribe(
        () => {
          this.setEditingFalse();
          this.fetchRegistrationData();
          this.toastr.showSuccess(
            this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_SUCCESS"),
            this.translate.instant("REGISTRATIONS.TOASTS.SUCCESS")
          );
        },
        (err) => {
          console.error(err);
          this.toastr.showError(
            this.translate.instant("REGISTRATIONS.TOASTS.DATES_CHANGE_ERROR"),
            this.translate.instant("REGISTRATIONS.TOASTS.ERROR")
          );
        },
        () => {
          this.cdRef.detectChanges();
        }
      );
  }
}
