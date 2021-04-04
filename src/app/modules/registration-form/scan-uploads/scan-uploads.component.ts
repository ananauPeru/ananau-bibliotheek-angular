import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ContainerComponent } from "../container/container.component";

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
  @Output() public internationalPassportFiles = new Array<File>();
  @Output() public goodConductCertificateFiles = new Array<File>();
  @Output() public diplomaFiles = new Array<File>();
  @Output() public passportPhotoFiles = new Array<File>();
  public getErrorMessage = ContainerComponent.getErrorMessage;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.scansForm = this.fb.group({
      internationalPassport: [false, Validators.requiredTrue],
      goodConductCertificate: [false, Validators.requiredTrue],
      diploma: [false, Validators.requiredTrue],
      passportPhoto: [false, Validators.requiredTrue],
    });

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.scansForm.valueChanges.subscribe(() => this.emitForm());
  }

  public onSelectInternationalPassportFile(event: NgxDropzoneChangeEvent) {
    this.internationalPassportFiles.push(...event.addedFiles);
    this.updateInternationalPassport();
  }

  public onSelectGoodConductCertificateFile(event: NgxDropzoneChangeEvent) {
    this.goodConductCertificateFiles.push(...event.addedFiles);
    this.updateGoodConductCertificate();
  }

  public onSelectDiplomaFile(event: NgxDropzoneChangeEvent) {
    this.diplomaFiles.push(...event.addedFiles);
    this.updateDiploma();
  }

  public onSelectPassportPhotoFile(event: NgxDropzoneChangeEvent) {
    this.passportPhotoFiles.push(...event.addedFiles);
    this.updatePassportPhoto();
  }

  public onRemoveInternationalPassportFile(event: File) {
    this.internationalPassportFiles.splice(
      this.internationalPassportFiles.indexOf(event),
      1
    );
    this.updateInternationalPassport();
  }

  public onRemoveGoodConductCertificateFile(event: File) {
    this.goodConductCertificateFiles.splice(
      this.goodConductCertificateFiles.indexOf(event),
      1
    );
    this.updateGoodConductCertificate();
  }

  public onRemoveDiplomaFile(event: File) {
    this.diplomaFiles.splice(this.diplomaFiles.indexOf(event), 1);
    this.updateDiploma();
  }

  public onRemovePassportPhotoFile(event: File) {
    this.passportPhotoFiles.splice(this.passportPhotoFiles.indexOf(event), 1);
    this.updatePassportPhoto();
  }

  private updateInternationalPassport() {
    const internationalPassport = this.scansForm.get("internationalPassport");
    if (this.internationalPassportFiles.length > 0) {
      internationalPassport.setValue(true);
    } else {
      internationalPassport.setValue(false);
    }
    internationalPassport.markAsTouched();
    this.emitForm();
  }

  private updateGoodConductCertificate() {
    const goodConductCertificate = this.scansForm.get("goodConductCertificate");
    if (this.goodConductCertificateFiles.length > 0) {
      goodConductCertificate.setValue(true);
    } else {
      goodConductCertificate.setValue(false);
    }
    goodConductCertificate.markAsTouched();
    this.emitForm();
  }

  private updateDiploma() {
    const diploma = this.scansForm.get("diploma");
    if (this.diplomaFiles.length > 0) {
      diploma.setValue(true);
    } else {
      diploma.setValue(false);
    }
    diploma.markAsTouched();
    this.emitForm();
  }

  private updatePassportPhoto() {
    const passportPhoto = this.scansForm.get("passportPhoto");
    if (this.passportPhotoFiles.length > 0) {
      passportPhoto.setValue(true);
    } else {
      passportPhoto.setValue(false);
    }
    passportPhoto.markAsTouched();
    this.emitForm();
  }

  private emitForm() {
    this.scansFormChange.emit(this.scansForm);
    this.scansFormCounted.emit(ContainerComponent.countFields(this.scansForm));
  }
}
