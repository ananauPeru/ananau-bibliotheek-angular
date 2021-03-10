import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContainerComponent } from "../container/container.component";

@Component({
  selector: "app-organizational-information",
  templateUrl: "./organizational-information.component.html",
  styleUrls: ["./organizational-information.component.scss"],
})
export class OrganizationalInformationComponent implements OnInit {
  @Input() public organizationalForm: FormGroup;
  @Output() public organizationalFormChange = new EventEmitter<FormGroup>();
  @Output() public organizationalFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.organizationalForm = this.fb.group({
      dates: this.fb.group({}),
      spanish: this.fb.group({
        level: ["", Validators.required],
        weeks: [""],
      }),
      info: this.fb.group({
        proposals: [""],
      }),
    });

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.organizationalForm.valueChanges.subscribe(() => this.emitForm());
  }

  private emitForm() {
    this.organizationalFormChange.emit(this.organizationalForm);
    this.organizationalFormCounted.emit(
      ContainerComponent.countFields(this.organizationalForm)
    );
  }
}
