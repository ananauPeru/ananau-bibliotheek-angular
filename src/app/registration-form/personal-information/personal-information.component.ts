import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
})
export class PersonalInformationComponent implements OnInit {
  @Input() public personalForm: FormGroup;
  @Output() public personalFormChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    // When the form is changed, the parent form is also updated
    this.personalForm.valueChanges.subscribe(() => {
      this.personalFormChange.emit(this.personalForm);
    });
  }
}
