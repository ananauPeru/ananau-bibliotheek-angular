import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { Observable } from "rxjs";
import { ContainerComponent } from "../container/container.component";
import { UserStorageService } from "../data-services/user-storage.service";
import { BlobNamePrefix } from "../models/blob-name-prefix";
import { ScansFile } from "../models/scans-file";
import { v4 as uuidv4 } from "uuid";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-scan-uploads",
  templateUrl: "./scan-uploads.component.html",
  styleUrls: ["./scan-uploads.component.scss"],
})
export class ScanUploadsComponent implements OnInit {
  @Input() public scansForm: FormGroup;
  @Output() public scansFormChange = new EventEmitter<FormGroup>();
  @Output() public scansFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();
  @Input() public upload: Observable<boolean>;
  @Output() public saving = new EventEmitter<boolean>();
  @Output() public sending = new EventEmitter<boolean>();
  public internationalPassportFiles = new Array<ScansFile>();
  public goodConductCertificateFiles = new Array<ScansFile>();
  public diplomaFiles = new Array<ScansFile>();
  public passportPhotoFiles = new Array<ScansFile>();
  private filesToDelete = new Array<ScansFile>();

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private userStorageService: UserStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Initialize scansForm
    this.scansForm = this.fb.group({
      internationalPassport: [false, Validators.requiredTrue],
      goodConductCertificate: [false, Validators.requiredTrue],
      diploma: [false, Validators.requiredTrue],
      passportPhoto: [false, Validators.requiredTrue],
    });

    this.emitForm();

    // When the form is changed, the parent form should also be updated
    this.scansForm.valueChanges.subscribe(() => this.emitForm());

    // Everytime a new Azure blob image comes in, update the form
    this.userStorageService.getNewFile$.subscribe((file) => {
      if (file.name.startsWith(BlobNamePrefix.InternationalPassport)) {
        this.internationalPassportFiles.push(file);
        this.updateInternationalPassport(false);
      }
      if (file.name.startsWith(BlobNamePrefix.GoodConductCertificate)) {
        this.goodConductCertificateFiles.push(file);
        this.updateGoodConductCertificate(false);
      }
      if (file.name.startsWith(BlobNamePrefix.Diploma)) {
        this.diplomaFiles.push(file);
        this.updateDiploma(false);
      }
      if (file.name.startsWith(BlobNamePrefix.PassportPhoto)) {
        this.passportPhotoFiles.push(file);
        this.updatePassportPhoto(false);
      }
    });

    // Ask the storage service to begin fetching blob images from Azure
    this.userStorageService.fetchImages$();

    // Everytime 'upload' is triggered, upload the newly imported images to Azure and mark them as 'old' afterwards
    this.upload.subscribe((submit) => {
      if (submit) this.sending.emit(true);
      else this.saving.emit(true);

      Promise.all([
        this.userStorageService.storeImages$(
          this.internationalPassportFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.storeImages$(
          this.goodConductCertificateFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.storeImages$(
          this.diplomaFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.storeImages$(
          this.passportPhotoFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.deleteImages$(this.filesToDelete),
      ])
        .then(() => {
          this.internationalPassportFiles.forEach(
            (file) => (file.isNew = false)
          );
          this.goodConductCertificateFiles.forEach(
            (file) => (file.isNew = false)
          );
          this.diplomaFiles.forEach((file) => (file.isNew = false));
          this.passportPhotoFiles.forEach((file) => (file.isNew = false));
          this.filesToDelete.length = 0;

          this.toastr.success(
            submit
              ? this.translate.instant(
                  "REGISTRATION.GENERAL.TOASTS.IMAGE_SUBMIT_SUCCESS"
                )
              : this.translate.instant(
                  "REGISTRATION.GENERAL.TOASTS.IMAGE_SAVE_SUCCESS"
                ),
            this.translate.instant("REGISTRATION.GENERAL.TOASTS.SUCCESS")
          );
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error(
            submit
              ? this.translate.instant(
                  "REGISTRATION.GENERAL.TOASTS.IMAGE_SUBMIT_ERROR"
                )
              : this.translate.instant(
                  "REGISTRATION.GENERAL.TOASTS.IMAGE_SAVE_ERROR"
                ),
            this.translate.instant("REGISTRATION.GENERAL.TOASTS.ERROR")
          );
        })
        .finally(() => {
          this.sending.emit(false);
          this.saving.emit(false);
        });
    });
  }

  getErrorMessage(errors: ValidationErrors): string {
    return ContainerComponent.getErrorMessage(errors, this.translate);
  }

  public onSelectInternationalPassportFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.InternationalPassport
    );
    this.internationalPassportFiles.push(...newFiles);
    this.updateInternationalPassport(true);
  }

  public onSelectGoodConductCertificateFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.GoodConductCertificate
    );
    this.goodConductCertificateFiles.push(...newFiles);
    this.updateGoodConductCertificate(true);
  }

  public onSelectDiplomaFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.Diploma
    );
    this.diplomaFiles.push(...newFiles);
    this.updateDiploma(true);
  }

  public onSelectPassportPhotoFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.PassportPhoto
    );
    this.passportPhotoFiles.push(...newFiles);
    this.updatePassportPhoto(true);
  }

  public onRemoveInternationalPassportFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.internationalPassportFiles.splice(
      this.internationalPassportFiles.indexOf(event),
      1
    );
    this.updateInternationalPassport(true);
  }

  public onRemoveGoodConductCertificateFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.goodConductCertificateFiles.splice(
      this.goodConductCertificateFiles.indexOf(event),
      1
    );
    this.updateGoodConductCertificate(true);
  }

  public onRemoveDiplomaFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.diplomaFiles.splice(this.diplomaFiles.indexOf(event), 1);
    this.updateDiploma(true);
  }

  public onRemovePassportPhotoFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.passportPhotoFiles.splice(this.passportPhotoFiles.indexOf(event), 1);
    this.updatePassportPhoto(true);
  }

  private updateInternationalPassport(markAsTouched: boolean) {
    const internationalPassport = this.scansForm.get("internationalPassport");
    if (this.internationalPassportFiles.length > 0) {
      internationalPassport.setValue(true);
    } else {
      internationalPassport.setValue(false);
    }
    if (markAsTouched) internationalPassport.markAsTouched();
  }

  private updateGoodConductCertificate(markAsTouched: boolean) {
    const goodConductCertificate = this.scansForm.get("goodConductCertificate");
    if (this.goodConductCertificateFiles.length > 0) {
      goodConductCertificate.setValue(true);
    } else {
      goodConductCertificate.setValue(false);
    }
    if (markAsTouched) goodConductCertificate.markAsTouched();
  }

  private updateDiploma(markAsTouched: boolean) {
    const diploma = this.scansForm.get("diploma");
    if (this.diplomaFiles.length > 0) {
      diploma.setValue(true);
    } else {
      diploma.setValue(false);
    }
    if (markAsTouched) diploma.markAsTouched();
  }

  private updatePassportPhoto(markAsTouched: boolean) {
    const passportPhoto = this.scansForm.get("passportPhoto");
    if (this.passportPhotoFiles.length > 0) {
      passportPhoto.setValue(true);
    } else {
      passportPhoto.setValue(false);
    }
    if (markAsTouched) passportPhoto.markAsTouched();
  }

  private emitForm() {
    this.scansFormChange.emit(this.scansForm);
    this.scansFormCounted.emit(ContainerComponent.countFields(this.scansForm));
  }

  private createNewScansFiles(files: File[], prefix: string): ScansFile[] {
    return files.map((file) => {
      let f: any = file;
      f.uniqueName = `${prefix}-${uuidv4()}`;
      f.isNew = true;
      return file as ScansFile;
    });
  }
}
