import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ContainerComponent } from "../container/container.component";
import { FormRole } from "../models/form-role";
import { RegistrationDTO } from "../_dto/registration-dto";
import { RegistrationStudentDTO } from "../_dto/registration-student-dto";
import { UserStorageService } from "../data-services/user-storage.service";
import { ScansFile } from "../models/scans-file";
import { v4 as uuidv4 } from "uuid";
import { BlobNamePrefix } from "../models/blob-name-prefix";
import { HttpClient } from "@angular/common/http";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { Observable } from "rxjs";


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
  @Input() public role: FormRole;
  @Input() public initialData: RegistrationDTO;
  @Input() public upload: Observable<boolean>;
  @Output() public saving = new EventEmitter<boolean>();
  @Output() public sending = new EventEmitter<boolean>();
  public paymentApartmentFiles = new Array<ScansFile>();
  public paymentGuaranteeFiles = new Array<ScansFile>();
  public paymentSpanishFiles = new Array<ScansFile>();
  private filesToDelete = new Array<ScansFile>();
  private previewImageForNonImageFiles: File;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private userStorageService: UserStorageService,
    private toastr: ToastrUtil,
    private http: HttpClient,
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
      flightInformation: this.fb.group({
        flightNumber: [this.initialData.flightNumber],
        flightDateArrival: [
          this.initialData.flightDateArrival
            ? this.datePipe.transform(
                new Date(this.initialData.flightDateArrival),
                "yyyy-MM-dd"
              )
            : "",
        ],
      }),
      spanish: this.fb.group({
        level: [this.initialData.level, Validators.required],
        weeksOnline: [this.initialData.weeksOnline],
        weeks: [this.initialData.weeks],
      }),
      payments: this.fb.group({
        paymentApartment: [false],
        paymentGuarantee: [false],
        paymentSpanish: [false],
        paymentDescription: [this.initialData.paymentDescription],
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

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.organizationalForm.valueChanges.subscribe(() => this.emitForm());

    // Everytime a new Azure blob image comes in, update the form
    this.userStorageService.getNewFile$.subscribe((file) => {
      if (file.name.startsWith(BlobNamePrefix.PaymentApartment)) {
        this.paymentApartmentFiles.push(file);
        this.updatePaymentApartment(false);
      }
      if (file.name.startsWith(BlobNamePrefix.PaymentGuarantee)) {
        this.paymentGuaranteeFiles.push(file);
        this.updatePaymentGuarantee(false);
      }
      if (file.name.startsWith(BlobNamePrefix.PaymentSpanish)) {
        this.paymentSpanishFiles.push(file);
        this.updatePaymentSpanish(false);  
      }
    });

    // Fetch the preview image from assets (will be shown when file is no image)
    this.http.get("/assets/images/pdf.png", { responseType: "blob" }).subscribe(
      (image) => {
        this.previewImageForNonImageFiles = new File([image], "pdf.png", {
          type: "image/png",
        });
      },
      (error) => console.error(error),
      () =>
        // Ask the storage service to begin fetching blob images from Azure
        this.userStorageService.fetchImages$()
    );

    // Everytime 'upload' is triggered, upload the newly imported images to Azure and mark them as 'old' afterwards
    this.upload.subscribe((submit) => {
      if (submit) this.sending.emit(true);
      else this.saving.emit(true);

      Promise.all([
        this.userStorageService.storeImages$(
          this.paymentApartmentFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.storeImages$(
          this.paymentGuaranteeFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.storeImages$(
          this.paymentSpanishFiles.filter((file) => file.isNew)
        ),
        this.userStorageService.deleteImages$(this.filesToDelete),
      ])
        .then(() => {
          this.paymentApartmentFiles.forEach(
            (file) => (file.isNew = false)
          );
          this.paymentGuaranteeFiles.forEach((file) => (file.isNew = false));
          this.paymentSpanishFiles.forEach((file) => (file.isNew = false));

          this.filesToDelete.length = 0;

          this.toastr.showSuccess(
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
          this.toastr.showError(
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

  public isImageFile(file: ScansFile): boolean {
    if (file.type.startsWith("image")) return true;
    else return false;
  }

  public getPreviewImage(file: ScansFile): File {
    if (this.isImageFile(file)) return file;
    else return this.previewImageForNonImageFiles;
  }

  public onSelectApartmentFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.PaymentApartment
    );
    this.paymentApartmentFiles.push(...newFiles);
    this.updatePaymentApartment(true);
  }

  public onSelectGuaranteeFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.PaymentGuarantee
    );
    this.paymentGuaranteeFiles.push(...newFiles);
    this.updatePaymentGuarantee(true);
  }

  public onSelectSpanishFile(event: NgxDropzoneChangeEvent) {
    const newFiles = this.createNewScansFiles(
      event.addedFiles,
      BlobNamePrefix.PaymentSpanish
    );
    this.paymentSpanishFiles.push(...newFiles);
    this.updatePaymentSpanish(true);
  }

  public onRemoveApartmentFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.paymentApartmentFiles.splice(this.paymentApartmentFiles.indexOf(event), 1);
    this.updatePaymentApartment(true);
  }

  public onRemoveGuaranteeFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.paymentGuaranteeFiles.splice(this.paymentGuaranteeFiles.indexOf(event), 1);
    this.updatePaymentGuarantee(true);
  }

  public onRemoveSpanishFile(event: ScansFile) {
    if (!event.isNew) this.filesToDelete.push(event); // files that are already stored in Azure, will need to be deleted when the form is saved
    this.paymentSpanishFiles.splice(this.paymentSpanishFiles.indexOf(event), 1);
    this.updatePaymentSpanish(true);
  }

  private updatePaymentApartment(markAsTouched: boolean) {
      const paymentApartment = this.organizationalForm.get('paymentApartment');
      if (this.paymentApartmentFiles.length > 0) {
        paymentApartment.setValue(true);
      } else {
        paymentApartment.setValue(false);
      }
      if (markAsTouched) paymentApartment.markAsTouched();
    }

  private updatePaymentGuarantee(markAsTouched: boolean) {
    const paymentGuarantee = this.organizationalForm.get('paymentGuarantee');
    if (this.paymentGuaranteeFiles.length > 0) {
      paymentGuarantee.setValue(true);
    } else {
      paymentGuarantee.setValue(false);
    }
    if (markAsTouched) paymentGuarantee.markAsTouched();
  }

  private updatePaymentSpanish(markAsTouched: boolean) {
    const paymentSpanish = this.organizationalForm.get('paymentSpanish');
    if (this.paymentSpanishFiles.length > 0) {
      paymentSpanish.setValue(true);
    } else {
      paymentSpanish.setValue(false);
    }
    if (markAsTouched) paymentSpanish.markAsTouched();
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


