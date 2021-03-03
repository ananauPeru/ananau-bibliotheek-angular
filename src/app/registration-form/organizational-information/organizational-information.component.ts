import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-organizational-information",
  templateUrl: "./organizational-information.component.html",
  styleUrls: ["./organizational-information.component.scss"],
})
export class OrganizationalInformationComponent implements OnInit {
  @Input() public organizationalForm: FormGroup;
  @Output() public organizationalFormChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    // When the form is changed, the parent form is also updated
    this.organizationalForm.valueChanges.subscribe(() => {
      this.organizationalFormChange.emit(this.organizationalForm);
    });
  }
}
