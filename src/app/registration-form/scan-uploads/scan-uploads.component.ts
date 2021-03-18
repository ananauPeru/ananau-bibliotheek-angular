import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  getErrorMessage = ContainerComponent.getErrorMessage;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.scansForm = this.fb.group({
      internationalPassport: ["", Validators.required],
      goodConductCertificate: ["", Validators.required],
      diploma: ["", Validators.required],
      passportPhoto: ["", Validators.required],
    });

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.scansForm.valueChanges.subscribe(() => this.emitForm());
  }

  private emitForm() {
    this.scansFormChange.emit(this.scansForm);
    this.scansFormCounted.emit(ContainerComponent.countFields(this.scansForm));
  }
}
