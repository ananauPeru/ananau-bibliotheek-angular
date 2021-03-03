import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-scan-uploads",
  templateUrl: "./scan-uploads.component.html",
  styleUrls: ["./scan-uploads.component.scss"],
})
export class ScanUploadsComponent implements OnInit {
  @Input() public scansForm: FormGroup;
  @Output() public scansFormChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    // When the form is changed, the parent form is also updated
    this.scansForm.valueChanges.subscribe(() => {
      this.scansFormChange.emit(this.scansForm);
    });
  }
}
